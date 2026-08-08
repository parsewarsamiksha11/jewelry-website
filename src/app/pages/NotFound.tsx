import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <p
        className="text-[10px] tracking-[0.4em] uppercase text-accent mb-6"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        404
      </p>
      <h1
        className="text-5xl lg:text-6xl mb-6"
        style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
      >
        Page not found.
      </h1>
      <p className="text-sm text-muted-foreground font-light mb-12 max-w-sm leading-relaxed">
        The page you are looking for may have moved or no longer exists. Return to the atelier.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-300"
      >
        <ArrowLeft size={14} />
        Return Home
      </Link>
    </div>
  );
}
