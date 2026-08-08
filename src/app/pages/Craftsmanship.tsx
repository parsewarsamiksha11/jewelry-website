import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const TIMELINE = [
  {
    year: "1987",
    title: "The Atelier Opens",
    body: "Élise Moreau, trained at the École Nationale des Arts du Bijou, opens a small workshop at 12, Rue de Bretagne in the Marais. The first twelve pieces sell within a week.",
  },
  {
    year: "1994",
    title: "First International Exhibition",
    body: "Vêlore debuts at Baselworld, introducing the Arc Pearl Strand that would become the house's enduring signature. Orders come in from Tokyo, New York, and London.",
  },
  {
    year: "2003",
    title: "The Bespoke Programme",
    body: "A bespoke commission service is established, allowing clients to collaborate directly with the atelier's goldsmith team on one-of-a-kind pieces.",
  },
  {
    year: "2011",
    title: "Ethical Sourcing Charter",
    body: "Vêlore becomes one of the first independent maisons to sign the Responsible Jewellery Council charter, committing to full supply-chain traceability.",
  },
  {
    year: "2019",
    title: "Second Generation",
    body: "Théo Moreau, Élise's son, joins the atelier as creative director, bringing a contemporary eye while preserving every founding technical standard.",
  },
  {
    year: "2026",
    title: "Spring–Summer Collection",
    body: "The SS 2026 collection — sixty-two pieces conceived over eighteen months — is the most ambitious in the house's history, spanning five material traditions.",
  },
];

const TECHNIQUES = [
  {
    id: "01",
    name: "Repoussé",
    description:
      "Metal is worked from behind using rounded tools, pushing the surface into relief. Each stroke is irreversible — the goldsmith must commit fully to each movement.",
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=700&h=500&fit=crop&auto=format",
    alt: "Gold rings showing intricate surface work",
  },
  {
    id: "02",
    name: "Milgrain",
    description:
      "A wheel of tiny beads is rolled along the metal edge to create a continuous decorative border. At Vêlore, milgrain is applied by hand rather than machine.",
    image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=700&h=500&fit=crop&auto=format",
    alt: "Close up of ring with fine detail work",
  },
  {
    id: "03",
    name: "Pavé Setting",
    description:
      "Stones are set close together across a metal surface, each held by tiny prongs that vanish into the composition. The effect is an unbroken field of brilliance.",
    image: "https://images.unsplash.com/photo-1713950920412-97799efdf870?w=700&h=500&fit=crop&auto=format",
    alt: "Ring with pavé diamond setting",
  },
  {
    id: "04",
    name: "Hand Knotting",
    description:
      "Each pearl in a strand is separated by a silk knot, tied by hand to prevent friction and ensure that if the thread breaks, only one pearl is lost.",
    image: "https://images.unsplash.com/photo-1654699991520-aaaf4dd2608b?w=700&h=500&fit=crop&auto=format",
    alt: "Pearl necklace with silk knotting",
  },
];

export function Craftsmanship() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        <div className="relative overflow-hidden bg-muted h-[60vw] lg:h-auto order-1">
          <img
            src="https://images.unsplash.com/photo-1727784892009-f3cf06199b65?w=1000&h=1300&fit=crop&auto=format"
            alt="Close-up of hands wearing fine gold jewelry"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-foreground/25" />
        </div>
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-24 order-2">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-accent mb-8"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            § Heritage
          </p>
          <h1
            className="text-5xl lg:text-6xl leading-[1.05] mb-8"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            Made slowly,
            <br />
            <em>made to last.</em>
          </h1>
          <p className="text-base leading-[1.9] text-muted-foreground font-light max-w-md">
            Vêlore exists at the intersection of historic technique and contemporary sensibility. Every piece produced in our Marais atelier is the work of a single goldsmith from first sketch to finished hallmark.
          </p>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-primary text-primary-foreground py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote
            className="text-3xl lg:text-4xl leading-[1.3]"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}
          >
            "I do not think of a ring as something to wear. I think of it as something to leave behind."
          </blockquote>
          <p
            className="mt-8 text-[10px] tracking-[0.4em] uppercase text-accent"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Élise Moreau — Founder, 1987
          </p>
        </div>
      </section>

      {/* Techniques */}
      <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="border-b border-border pb-6 mb-16">
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Techniques
          </p>
          <h2
            className="text-4xl lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            The methods
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
          {TECHNIQUES.map((t) => (
            <article key={t.id} className="grid grid-cols-1 gap-6">
              <div className="overflow-hidden bg-muted aspect-[7/5]">
                <img
                  src={t.image}
                  alt={t.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-baseline gap-4 mb-3">
                  <span
                    className="text-[10px] tracking-[0.3em] text-muted-foreground"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {t.id}
                  </span>
                  <h3
                    className="text-2xl"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
                  >
                    {t.name}
                  </h3>
                </div>
                <p className="text-sm leading-[1.85] text-muted-foreground font-light">
                  {t.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-card py-28 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="border-b border-border pb-6 mb-16">
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              History
            </p>
            <h2
              className="text-4xl lg:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            >
              Thirty-nine years
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="flex flex-col gap-12">
              {TIMELINE.map((item, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[9rem_1fr] gap-4 md:gap-12">
                  <div className="flex items-center gap-4">
                    <span
                      className="text-lg text-accent flex-shrink-0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {item.year}
                    </span>
                    {/* Dot */}
                    <div className="hidden md:block w-2 h-2 rounded-full bg-accent flex-shrink-0 ml-auto" />
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-2"
                      style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-[1.85]">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 lg:px-12 text-center">
        <p
          className="text-[10px] tracking-[0.4em] uppercase text-accent mb-8"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Commission a piece
        </p>
        <h2
          className="text-4xl lg:text-5xl mb-8 mx-auto max-w-2xl leading-[1.1]"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
        >
          Begin your{" "}
          <em>bespoke</em>
          {" "}conversation.
        </h2>
        <p className="text-sm text-muted-foreground font-light mb-12 max-w-md mx-auto leading-relaxed">
          Every bespoke Vêlore commission begins with a conversation. Write to us or visit the atelier in Paris.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-300"
        >
          Contact the Atelier
          <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
