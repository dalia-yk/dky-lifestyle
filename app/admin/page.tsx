import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ADMIN_EMAILS = ["dkylifestyle@gmail.com"];

export default async function AdminPage() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0]?.emailAddress;

  if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-brand-black flex flex-col items-center justify-center gap-4 p-10">
      <h1 className="font-heading text-brand-ivory text-3xl">
        Dashboard Admin
      </h1>
      <p className="font-sans text-brand-ivory/70">
        Connectée en tant que : {userEmail}
      </p>
    </main>
  );
}