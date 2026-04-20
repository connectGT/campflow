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
        children ( name, age, grade ),
        profiles ( full_name, email, phone )
      `);

    if (error) {
      console.error("[Export] Failed to fetch data:", error);
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }

    // 2. Initialize JSZip
    const zip = new JSZip();
    const photoFolder = zip.folder("Student_Photos");
    const aadharFolder = zip.folder("Aadhar_Cards");

    // 3. Construct CSV
    const csvHeaders = [
      "ID", "Student Name", "Age", "Grade",
      "Parent Name", "Parent Email", "Parent Phone",
      "Emergency Contact Name", "Emergency Contact Phone",
      "Transport Pickup",
      "Slot 1 (7AM)", "Slot 2 (8AM)", "Slot 3 (9AM)",
      "Amount", "Payment Status", "UTR Number", "Date Created"
    ];

    let csvContent = csvHeaders.join(",") + "\n";

    // Format safe CSV field
    const escapeCsv = (val: any) => {
      if (val == null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    // 4. Process all records
    for (const record of records || []) {
      const child = record.children as any;
      const profile = record.profiles as any;

      const row = [
        record.id,
        child?.name,
        child?.age,
        child?.grade,
        profile?.full_name,
        profile?.email,
        profile?.phone,
        record.emergency_contact_name,
        record.emergency_contact_phone,
        record.transport_pickup,
        record.slot_1_sport,
        record.slot_2_sport,
        record.slot_3_sport,
        record.amount,
        record.payment_status,
        record.utr_number,
        new Date(record.created_at).toLocaleString()
      ];

      csvContent += row.map(escapeCsv).join(",") + "\n";

      // 5. Fetch and append student photo
      if (child?.photo_url) {
        try {
          const res = await fetch(child.photo_url);
          if (res.ok) {
            const buffer = await res.arrayBuffer();
            // Try to extract ext or default to jpg
            const extMatch = child.photo_url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
            const ext = extMatch ? extMatch[1] : "jpg";
            photoFolder?.file(`photo_${record.id}.${ext}`, buffer);
          }
        } catch (e) {
          console.error("Failed to fetch photo for", record.id, e);
        }
      }

      // 6. Fetch and append Aadhar photo
      if (record.aadhar_photo_url) {
        try {
          const res = await fetch(record.aadhar_photo_url);
          if (res.ok) {
            const buffer = await res.arrayBuffer();
            const extMatch = record.aadhar_photo_url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
            const ext = extMatch ? extMatch[1] : "jpg";
            aadharFolder?.file(`aadhar_${record.id}.${ext}`, buffer);
          }
        } catch (e) {
          console.error("Failed to fetch aadhar for", record.id, e);
        }
      }
    }

    // 7. Add CSV to root of ZIP
    zip.file("full_database.csv", csvContent);

    // 8. Generate ZIP buffer
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // 9. Return ZIP response
    return new NextResponse(zipBlob, {
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
