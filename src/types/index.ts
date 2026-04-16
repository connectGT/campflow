/* ─── Database Row Types ─── */

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}

export interface Child {
  id: string;
  parent_id: string;
  name: string;
  age: number | null;
  grade: string | null;
  created_at: string;
}

export interface Sport {
  id: string;
  name: string;
  description: string | null;
  trainer: string | null;
  schedule_slot: string | null;
  icon_url: string | null;
}

export interface Registration {
  id: string;
  parent_id: string;
  child_id: string;
  sports: string[]; // array of 3 sport UUIDs
  amount: number;
  payment_status: PaymentStatus;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  tally_synced: boolean;
  created_at: string;
}

export type PaymentStatus = "pending" | "paid" | "failed";

export interface WhatsAppSession {
  wa_id: string; // phone number (primary key)
  state: BotState;
  context: BotContext;
  updated_at: string;
}

/* ─── WhatsApp Bot ─── */

export type BotState =
  | "IDLE"
  | "MENU"
  | "SPORTS_LIST"
  | "ASK_CHILD_NAME"
  | "ASK_CHILD_AGE"
  | "ASK_SPORTS"
  | "CONFIRM"
  | "SEND_PAYMENT_LINK";

export interface BotContext {
  child_name?: string;
  child_age?: number;
  selected_sports?: string[];
  registration_id?: string;
}

/* ─── Supabase Database Type (simplified) ─── */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      children: {
        Row: Child;
        Insert: Omit<Child, "id" | "created_at">;
        Update: Partial<Omit<Child, "id" | "parent_id" | "created_at">>;
      };
      sports: {
        Row: Sport;
        Insert: Omit<Sport, "id">;
        Update: Partial<Omit<Sport, "id">>;
      };
      registrations: {
        Row: Registration;
        Insert: Omit<Registration, "id" | "created_at" | "tally_synced">;
        Update: Partial<Omit<Registration, "id" | "parent_id" | "created_at">>;
      };
      whatsapp_sessions: {
        Row: WhatsAppSession;
        Insert: Omit<WhatsAppSession, "updated_at">;
        Update: Partial<Omit<WhatsAppSession, "wa_id">>;
      };
    };
  };
}

/* ─── Registration Flow ─── */

export interface RegistrationFormData {
  childName: string;
  childAge: number;
  parentPhone: string;
  selectedSports: string[]; // exactly 3
}

export type RegistrationStep = 1 | 2 | 3 | 4;

/* ─── API Responses ─── */

export interface ApiErrorResponse {
  error: string;
}

export interface CreateOrderResponse {
  order_id: string;
  amount: number;
  currency: string;
}

export interface PaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
