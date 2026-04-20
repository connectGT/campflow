import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import JSZip from "jszip";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createClient();

    // 1. Fetch all registrations with joined child and profile data
    const { data: records, error } = await supabase
      .from("registrations")
      .select(`
        id,
        amount,
        payment_status,
        utr_number,
        proof_image_url,
        aadhar_photo_url,
        transport_pickup,
        emergency_contact_name,
        emergency_contact_phone,
        slot_1_sport,
        slot_2_sport,
        slot_3_sport,
        created_at,
        children ( name, age, grade, photo_url ),
        profiles ( full_name, email, phone )
      `);

    if (error) {
      console.error("[Export] Failed to fetch data:", error);
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    // 2. Initialize JSZip
    const zip = new JSZip();

    // 3. Construct master CSV as a fallback
    const csvHeaders = [
      "ID", "Student Name", "Age", "Grade",
      "Parent Name", "Parent Email", "Parent Phone",
      "Emergency Contact Name", "Emergency Contact Phone",
      "Transport Pickup",
      "Slot 1 (7AM)", "Slot 2 (8AM)", "Slot 3 (9AM)",
      "Amount", "Payment Status", "UTR Number", "Date Created"
    ];

    let csvContent = csvHeaders.join(",") + "\n";

    const escapeCsv = (val: any) => {
      if (val == null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    // Helper functions
    const fetchBlobInfo = async (url: string | null) => {
      if (!url) return null;
      try {
        const res = await fetch(url);
        if (res.ok) {
          const contentType = res.headers.get("content-type") || "";
          let ext = "jpg";
          if (contentType.includes("pdf")) ext = "pdf";
          else if (contentType.includes("png")) ext = "png";
          else if (contentType.includes("webp")) ext = "webp";
          
          const arrayBuffer = await res.arrayBuffer();
          // Explicitly wrap into a Node.js Buffer so JSZip doesn't drop the data inside Vercel's Node stream
          return { buffer: Buffer.from(arrayBuffer), ext };
        }
      } catch (e) {
        console.error("Failed to fetch image/pdf:", url);
      }
      return null;
    };

    // 4. Process all records
    for (const record of records || []) {
      const child = record.children as any || {};
      const profile = record.profiles as any || {};
      const safeName = (child.name || "Unknown").replace(/[^a-zA-Z0-9]/g, "_");
      
      const phoneLabel = profile.phone ? `+91${profile.phone}` : `ID-${record.id.slice(0,6)}`;
      const folderName = `Registrations/${safeName}_${phoneLabel}`;
      const studentFolder = zip.folder(folderName);
      if (!studentFolder) continue;

      // 4a. Master CSV Append
      const row = [
        record.id, child.name, child.age, child.grade,
        profile.full_name, profile.email, profile.phone,
        record.emergency_contact_name, record.emergency_contact_phone,
        record.transport_pickup,
        record.slot_1_sport, record.slot_2_sport, record.slot_3_sport,
        record.amount, record.payment_status, record.utr_number,
        new Date(record.created_at).toLocaleString()
      ];
      csvContent += row.map(escapeCsv).join(",") + "\n";

      // 4b. Download Media securely
      const [photoInfo, aadharInfo, receiptInfo] = await Promise.all([
        fetchBlobInfo(child.photo_url),
        fetchBlobInfo(record.aadhar_photo_url),
        fetchBlobInfo(record.proof_image_url)
      ]);

      if (photoInfo) studentFolder.file(`01_Student_Photo.${photoInfo.ext}`, photoInfo.buffer);
      if (aadharInfo) studentFolder.file(`02_Aadhar_Card.${aadharInfo.ext}`, aadharInfo.buffer);
      if (receiptInfo) studentFolder.file(`03_Payment_Receipt.${receiptInfo.ext}`, receiptInfo.buffer);

      // 4c. Generate `00_Student_Data_Sheet.html` natively
      const htmlSheet = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Registration: ${child.name}</title>
    <style>
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: #fdfdfd; color: #111; max-width: 800px; margin: 40px auto; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        h1 { color: #ff5745; border-bottom: 3px solid #ff5745; padding-bottom: 10px; margin-top: 0; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px margin-top: 20px; }
        .box { background: #f4f4f5; padding: 20px; border-radius: 12px; border: 1px solid #e4e4e7; }
        .box h3 { margin: 0 0 15px 0; color: #333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #666; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px 0; border-bottom: 1px solid #e4e4e7; }
        td:first-child { font-weight: bold; color: #555; width: 40%; }
        .status { display: inline-block; padding: 4px 10px; border-radius: 10px; font-size: 12px; font-weight: bold; text-transform: uppercase; background: #22c55e; color: white; }
        .pending { background: #f59e0b; }
        .header-logo { font-size: 24px; font-weight: 900; color: #111; margin-bottom: 40px; }
    </style>
</head>
<body>
    <div class="header-logo">CAMP<span style="color: #ff5745;">FLOW</span> Registration Archive</div>
    <h1>${child.name || "Unknown"}</h1>
    
    <div class="grid">
        <div class="box">
            <h3>Student Details</h3>
            <table>
                <tr><td>Age / Grade</td><td>${child.age || "N/A"} yrs / ${child.grade || "N/A"}</td></tr>
                <tr><td>Parent Name</td><td>${profile.full_name || "N/A"}</td></tr>
                <tr><td>Parent Phone</td><td>${profile.phone || "N/A"}</td></tr>
                <tr><td>Parent Email</td><td>${profile.email || "N/A"}</td></tr>
            </table>
        </div>
        
        <div class="box">
            <h3>Camp Logistics</h3>
            <table>
                <tr><td>Transport Drop</td><td>${record.transport_pickup || "N/A"}</td></tr>
                <tr><td>Emergency Name</td><td>${record.emergency_contact_name || "N/A"}</td></tr>
                <tr><td>Emergency Phone</td><td>${record.emergency_contact_phone || "N/A"}</td></tr>
                <tr><td>Registration Date</td><td>${new Date(record.created_at).toLocaleString()}</td></tr>
            </table>
        </div>
    </div>

    <div class="box" style="margin-top: 20px;">
        <h3>Sports Time Slots</h3>
        <table>
            <tr><td>07:00 AM - 08:00 AM</td><td>${record.slot_1_sport || "None"}</td></tr>
            <tr><td>08:00 AM - 09:00 AM</td><td>${record.slot_2_sport || "None"}</td></tr>
            <tr><td>09:00 AM - 10:00 AM</td><td>${record.slot_3_sport || "None"}</td></tr>
        </table>
    </div>

    <div class="box" style="margin-top: 20px;">
        <h3>Payment Status</h3>
        <table>
            <tr><td>Amount Expected</td><td>₹${record.amount}</td></tr>
            <tr><td>Current Status</td><td><span class="status ${(record.payment_status || "").includes("pending") ? "pending" : ""}">${record.payment_status}</span></td></tr>
            <tr><td>Bank UTR Ref</td><td><code style="background:#e4e4e7;padding:2px 6px;border-radius:4px;">${record.utr_number || "No UTR"}</code></td></tr>
        </table>
    </div>
</body>
</html>`;
      studentFolder.file("00_Student_Data_Sheet.html", htmlSheet);
    }

    // 5. Add Master CSV to root of ZIP
    zip.file("00_Master_Database.csv", csvContent);

    // 6. Generate ZIP safely for Vercel/Node
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    // 7. Return ZIP response
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="Camp_Registrations_${new Date().toISOString().split('T')[0]}.zip"`,
      },
    });

  } catch (err: any) {
    console.error("[Export API] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
