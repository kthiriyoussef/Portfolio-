import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found site-shell">
      <div>
        <p className="eyebrow">Page not found</p>
        <h1>404</h1>
        <p>This page may have moved, or the link may be out of date.</p>
        <Link className="button-primary" href="/">
          <ArrowLeft size={15} /> Back to portfolio
        </Link>
      </div>
    </main>
  );
}
