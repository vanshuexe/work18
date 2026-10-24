import AdminApp from "../../components/admin/AdminApp";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function Page() {
  // The public (anon) key is meant for browsers. The service role key never leaves the server.
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const adminEmail = process.env.ADMIN_EMAIL || "admin@aeropolish.com";
  return <AdminApp supabaseUrl={url} supabaseAnonKey={anon} adminEmail={adminEmail} configured={Boolean(url && anon && (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY))} />;
}
