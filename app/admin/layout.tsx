import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "../../components/admin/admin-sidebar";

const ADMIN_EMAILS = ["dkylifestyle@gmail.com"];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-brand-black flex">
      <AdminSidebar />
      <div className="flex-1 p-10 overflow-x-auto">{children}</div>
    </div>
  );
}