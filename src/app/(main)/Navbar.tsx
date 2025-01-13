"use client";

import Logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/theme-switch";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="font-bold tracking-tight">AI Resume Builder</span>
        </Link>
        <div className="flex gap-4">
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
