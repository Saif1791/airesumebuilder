import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Resumes",
  description: "Create your resume with ease, and land your dream job!",
};

export default function Page() {
  return (
    <main className="mx-auto my-10 max-w-7xl px-3">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusCircle size={20} />
          New Resume
        </Link>
      </Button>
    </main>
  );
}
