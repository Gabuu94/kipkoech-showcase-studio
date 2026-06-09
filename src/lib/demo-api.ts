import { supabase } from "@/integrations/supabase/client";

export type LedgerTx = {
  id: string;
  occurred_on: string;
  description: string;
  category: string;
  kind: "income" | "expense";
  amount: number;
};

export async function fetchLedger() {
  const { data, error } = await supabase
    .from("ledger_transactions")
    .select("*")
    .order("occurred_on", { ascending: false });
  if (error) throw error;
  return (data ?? []) as LedgerTx[];
}

export async function insertLedger(row: Omit<LedgerTx, "id" | "occurred_on">) {
  const { data, error } = await supabase
    .from("ledger_transactions")
    .insert({ ...row, occurred_on: new Date().toISOString().slice(0, 10) })
    .select()
    .single();
  if (error) throw error;
  return data as LedgerTx;
}

export type Staff = {
  id: string;
  full_name: string;
  role: string;
  branch: string;
  clocked_in: boolean;
  last_in: string | null;
};

export async function fetchStaff() {
  const { data, error } = await supabase.from("shiftboard_staff").select("*").order("full_name");
  if (error) throw error;
  return (data ?? []) as Staff[];
}

export async function toggleStaff(s: Staff) {
  const update = {
    clocked_in: !s.clocked_in,
    last_in: !s.clocked_in
      ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : s.last_in,
  };
  const { error } = await supabase.from("shiftboard_staff").update(update).eq("id", s.id);
  if (error) throw error;
}

export type KazanaItem = {
  id: string;
  sku: string;
  name: string;
  outlet: string;
  stock: number;
  reorder: number;
  price: number;
};

export async function fetchKazana() {
  const { data, error } = await supabase.from("kazana_items").select("*").order("name");
  if (error) throw error;
  return (data ?? []) as KazanaItem[];
}

export async function restockKazana(id: string, newStock: number) {
  const { error } = await supabase.from("kazana_items").update({ stock: newStock }).eq("id", id);
  if (error) throw error;
}

export type Truck = {
  id: string;
  plate: string;
  driver: string;
  fuel_km: number;
  trips: number;
  spend: number;
  status: string;
};

export async function fetchTrucks() {
  const { data, error } = await supabase.from("routeline_trucks").select("*").order("plate");
  if (error) throw error;
  return (data ?? []) as Truck[];
}

export type Clinician = { id: string; full_name: string; specialty: string; slots: string[] };
export type Appointment = { id: string; patient: string; clinician: string; slot: string };

export async function fetchClinicians() {
  const { data, error } = await supabase.from("clinic_clinicians").select("*").order("full_name");
  if (error) throw error;
  return (data ?? []) as Clinician[];
}

export async function fetchAppointments() {
  const { data, error } = await supabase
    .from("clinic_appointments")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Appointment[];
}

export async function bookAppointment(row: Omit<Appointment, "id">) {
  const { error } = await supabase.from("clinic_appointments").insert(row);
  if (error) throw error;
}

export type Course = { id: string; title: string; modules: number; done: number; learners: number };

export async function fetchCourses() {
  const { data, error } = await supabase.from("soma_courses").select("*").order("title");
  if (error) throw error;
  return (data ?? []) as Course[];
}
