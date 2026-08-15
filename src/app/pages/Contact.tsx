import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const INQUIRY_TYPES = [
  "General Enquiry",
  "Bespoke Commission",
  "Book an Atelier Visit",
  "Order & Delivery",
  "Care & Repair",
  "Press & Media",
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border px-6 lg:px-12 py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
        <div>
          <p
            className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Contact
          </p>
          <h1
            className="text-5xl lg:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            Write to us.
          </h1>
        </div>
        <p className="text-sm text-muted-foreground font-light leading-[1.85] max-w-md">
          Whether you wish to commission a bespoke piece, arrange a private viewing, or simply have a question — our team reads every message and responds within one business day.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
        {/* Contact info */}
        <aside className="flex flex-col gap-10">
          <div>
            <p
              className="text-[9px] tracking-[0.35em] uppercase text-accent mb-5"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              The Atelier
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-light text-foreground leading-relaxed">
                    Tanish Orchid Phase 2,
                    <br />
                    Charoli (B.K)
                    <br />
                    Pune 412105
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-accent flex-shrink-0" />
                <a
                  href="tel:9112631008"
                  className="text-sm font-light text-foreground hover:text-accent transition-colors"
                >
                  9112631008
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-accent flex-shrink-0" />
                <a
                  href="mailto:aniketgat031299@gmail.com"
                  className="text-sm font-light text-foreground hover:text-accent transition-colors"
                >
                  aniketgat031299@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <p
              className="text-[9px] tracking-[0.35em] uppercase text-accent mb-5"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Opening Hours
            </p>
            <div className="flex flex-col gap-3">
              {[
                { days: "Monday – Friday", hours: "10:00 – 18:30" },
                { days: "Saturday", hours: "11:00 – 17:00" },
                { days: "Sunday", hours: "By appointment" },
              ].map((row) => (
                <div key={row.days} className="flex items-center gap-3">
                  <Clock size={12} className="text-accent flex-shrink-0" />
                  <div className="flex-1 flex justify-between text-xs font-light text-muted-foreground">
                    <span>{row.days}</span>
                    <span className="text-foreground">{row.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="overflow-hidden bg-muted aspect-[4/3] relative">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=450&fit=crop&auto=format"
              alt="Tanish Orchid showroom in Pune"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/90 px-4 py-3 text-center">
                <p
                  className="text-[9px] tracking-[0.3em] uppercase text-foreground"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Pune, Maharashtra
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Form */}
        <div>
          {sent ? (
            <div className="flex flex-col items-start justify-center h-full min-h-[400px]">
              <p
                className="text-[10px] tracking-[0.4em] uppercase text-accent mb-6"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Message received
              </p>
              <h2
                className="text-4xl mb-6"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
              >
                Thank you,{" "}
                <em>{form.name.split(" ")[0] || "friend"}.</em>
              </h2>
              <p className="text-sm text-muted-foreground font-light leading-[1.85] max-w-sm">
                We have received your message and will respond within one business day. For urgent enquiries, please call the atelier directly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Aniket Gat"
                    className="bg-transparent border-b border-border pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none font-light focus:border-foreground transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="aniketgat031299@gmail.com"
                    className="bg-transparent border-b border-border pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none font-light focus:border-foreground transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 91234 56789"
                    className="bg-transparent border-b border-border pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none font-light focus:border-foreground transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    Nature of Enquiry *
                  </label>
                  <select
                    name="type"
                    required
                    value={form.type}
                    onChange={handleChange}
                    className="bg-transparent border-b border-border pb-2 text-sm text-foreground outline-none font-light cursor-pointer focus:border-foreground transition-colors"
                  >
                    <option value="" disabled className="bg-background">
                      Please select…
                    </option>
                    {INQUIRY_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-background">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your enquiry or the piece you have in mind…"
                  className="bg-transparent border-b border-border pb-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none font-light resize-none focus:border-foreground transition-colors"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <p className="text-xs text-muted-foreground font-light">
                  * Required fields
                </p>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Private visit strip */}
      <section className="bg-secondary py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-accent mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Private Viewing
            </p>
            <h2
              className="text-4xl lg:text-5xl leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            >
              Visit us
              <br />
              <em>in Pune.</em>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground font-light leading-[1.85]">
            Private atelier visits are available by appointment. Spend an unhurried hour with a member of our team, see the full collection in hand, and explore bespoke possibilities at your own pace. Appointments are offered Monday through Saturday between 10:00 and 17:00.
          </p>
        </div>
      </section>
    </div>
  );
}
