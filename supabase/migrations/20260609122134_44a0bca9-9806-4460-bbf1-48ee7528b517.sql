
-- LEDGERLY
CREATE TABLE public.ledger_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  occurred_on date NOT NULL DEFAULT CURRENT_DATE,
  description text NOT NULL,
  category text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('income','expense')),
  amount numeric NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.ledger_transactions TO anon, authenticated;
GRANT ALL ON public.ledger_transactions TO service_role;
ALTER TABLE public.ledger_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "demo read" ON public.ledger_transactions FOR SELECT USING (true);
CREATE POLICY "demo insert" ON public.ledger_transactions FOR INSERT WITH CHECK (true);

INSERT INTO public.ledger_transactions (occurred_on, description, category, kind, amount) VALUES
('2026-06-01','Client retainer — Kazana','Sales','income',180000),
('2026-06-02','AWS hosting','Infra','expense',12400),
('2026-06-03','Invoice #INV-204','Sales','income',64500),
('2026-06-04','Office rent','Admin','expense',35000),
('2026-06-05','Stripe payout fees','Fees','expense',2150),
('2026-06-06','Consulting — Routeline','Sales','income',92000),
('2026-06-07','Team lunch','Admin','expense',4800);

-- SHIFTBOARD
CREATE TABLE public.shiftboard_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  role text NOT NULL,
  branch text NOT NULL,
  clocked_in boolean NOT NULL DEFAULT false,
  last_in text
);
GRANT SELECT, UPDATE ON public.shiftboard_staff TO anon, authenticated;
GRANT ALL ON public.shiftboard_staff TO service_role;
ALTER TABLE public.shiftboard_staff ENABLE ROW LEVEL SECURITY;
CREATE POLICY "demo read" ON public.shiftboard_staff FOR SELECT USING (true);
CREATE POLICY "demo update" ON public.shiftboard_staff FOR UPDATE USING (true) WITH CHECK (true);

INSERT INTO public.shiftboard_staff (full_name, role, branch, clocked_in, last_in) VALUES
('Achieng'' Otieno','Cashier','Westlands',true,'08:02'),
('Brian Kemboi','Supervisor','Westlands',true,'07:54'),
('Cynthia Wanjiku','Stock','Kilimani',false,null),
('David Mwangi','Driver','CBD',true,'08:11'),
('Esther Chebet','Cashier','Kilimani',false,null),
('Felix Otieno','Supervisor','CBD',true,'07:48'),
('Grace Akinyi','Cashier','Westlands',true,'08:20'),
('Henry Kiplagat','Stock','CBD',false,null);

-- KAZANA RETAIL
CREATE TABLE public.kazana_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text NOT NULL,
  name text NOT NULL,
  outlet text NOT NULL,
  stock int NOT NULL,
  reorder int NOT NULL,
  price numeric NOT NULL
);
GRANT SELECT, UPDATE ON public.kazana_items TO anon, authenticated;
GRANT ALL ON public.kazana_items TO service_role;
ALTER TABLE public.kazana_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "demo read" ON public.kazana_items FOR SELECT USING (true);
CREATE POLICY "demo update" ON public.kazana_items FOR UPDATE USING (true) WITH CHECK (true);

INSERT INTO public.kazana_items (sku, name, outlet, stock, reorder, price) VALUES
('MZ-001','Maize flour 2kg','Westlands',142,50,220),
('SG-014','Sugar 1kg','Westlands',28,40,180),
('MZ-001','Maize flour 2kg','Kilimani',75,50,220),
('RC-007','Rice 2kg','Kilimani',12,30,380),
('OL-022','Cooking oil 1L','CBD',65,25,320),
('BR-101','Bread loaf','Westlands',88,40,65),
('MK-203','Milk 500ml','Kilimani',24,30,55),
('TE-308','Tea leaves 250g','CBD',55,20,210);

-- ROUTELINE
CREATE TABLE public.routeline_trucks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plate text NOT NULL,
  driver text NOT NULL,
  fuel_km numeric NOT NULL,
  trips int NOT NULL,
  spend numeric NOT NULL,
  status text NOT NULL
);
GRANT SELECT ON public.routeline_trucks TO anon, authenticated;
GRANT ALL ON public.routeline_trucks TO service_role;
ALTER TABLE public.routeline_trucks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "demo read" ON public.routeline_trucks FOR SELECT USING (true);

INSERT INTO public.routeline_trucks (plate, driver, fuel_km, trips, spend, status) VALUES
('KDA 221A','John Kiprono',6.8,14,48200,'Active'),
('KCB 980Z','Mary Atieno',7.4,11,41100,'Active'),
('KDH 552B','Peter Mutua',5.9,9,36200,'Service'),
('KDK 117C','Lilian Chebet',8.1,17,52400,'Active'),
('KDM 442D','Samuel Wafula',7.0,13,45800,'Active');

-- CLINICQUEUE
CREATE TABLE public.clinic_clinicians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  specialty text NOT NULL,
  slots text[] NOT NULL
);
GRANT SELECT ON public.clinic_clinicians TO anon, authenticated;
GRANT ALL ON public.clinic_clinicians TO service_role;
ALTER TABLE public.clinic_clinicians ENABLE ROW LEVEL SECURITY;
CREATE POLICY "demo read" ON public.clinic_clinicians FOR SELECT USING (true);

INSERT INTO public.clinic_clinicians (full_name, specialty, slots) VALUES
('Dr. Aisha Mohamed','General Practice', ARRAY['09:00','09:30','10:00','11:30']),
('Dr. Brian Otieno','Dental', ARRAY['09:15','10:45','13:00']),
('Dr. Caroline Njeri','Paediatrics', ARRAY['08:30','10:00','11:00','14:00']),
('Dr. Daniel Kamau','Cardiology', ARRAY['10:30','12:00','15:00']);

CREATE TABLE public.clinic_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient text NOT NULL,
  clinician text NOT NULL,
  slot text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.clinic_appointments TO anon, authenticated;
GRANT ALL ON public.clinic_appointments TO service_role;
ALTER TABLE public.clinic_appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "demo read" ON public.clinic_appointments FOR SELECT USING (true);
CREATE POLICY "demo insert" ON public.clinic_appointments FOR INSERT WITH CHECK (true);

INSERT INTO public.clinic_appointments (patient, clinician, slot) VALUES
('James Mwangi','Dr. Aisha Mohamed','08:30'),
('Ruth Wanjiru','Dr. Caroline Njeri','11:00');

-- SOMA BRIDGE
CREATE TABLE public.soma_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  modules int NOT NULL,
  done int NOT NULL DEFAULT 0,
  learners int NOT NULL DEFAULT 0
);
GRANT SELECT ON public.soma_courses TO anon, authenticated;
GRANT ALL ON public.soma_courses TO service_role;
ALTER TABLE public.soma_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "demo read" ON public.soma_courses FOR SELECT USING (true);

INSERT INTO public.soma_courses (title, modules, done, learners) VALUES
('Intro to Bookkeeping',6,4,84),
('Customer Service Essentials',8,8,142),
('Digital Marketing Basics',10,3,67),
('Workplace Safety',5,1,39),
('Inventory Management',7,5,52);
