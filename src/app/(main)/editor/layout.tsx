import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor",
  description: "Create your resume with ease, and land your dream job!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
