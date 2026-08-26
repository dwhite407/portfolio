import type { Metadata } from "next";
import { DirectoryListing } from "@/components/renderers/DirectoryListing";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="mb-6 font-sans text-2xl font-semibold text-term-text">Projects</h1>
      <DirectoryListing />
    </div>
  );
}
