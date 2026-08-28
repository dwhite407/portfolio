import type { Metadata } from "next";
import { favorites } from "@/lib/data/favorites";
import { JsonCodeView } from "@/components/renderers/JsonCodeView";

export const metadata: Metadata = { title: "favorites.json" };

export default function FavoritesPage() {
  return (
    <div>
      <div className="mb-6 font-mono text-sm text-term-muted">
        <span className="text-term-accent">drew.white@portfolio</span>
        <span className="text-term-text">:</span>
        <span className="text-term-accent2">~/about</span>
        <span className="text-term-text">$ cat favorites.json</span>
      </div>
      <JsonCodeView data={favorites} />
    </div>
  );
}
