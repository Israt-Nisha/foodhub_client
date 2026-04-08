import { cn } from "@/lib/utils";
import { Logo, LogoText } from "@/components/layout/logo";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Send } from "lucide-react";
import Link from "next/link";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  className?: string;
  menuItems?: MenuItem[];
}

const Footer = ({
  className,
  menuItems = [
    {
      title: "Navigation",
      links: [
        { text: "Home", url: "/" },
        { text: "Browse Meals", url: "/meals" },
        { text: "Find Providers", url: "/providers" },
        { text: "About Us", url: "/about" },
      ],
    },
    {
      title: "Partnerships",
      links: [
        { text: "Join as Provider", url: "/register" },
        { text: "Terms of Service", url: "/terms" },
        { text: "Privacy Policy", url: "/privacy" },
      ],
    },
    {
      title: "Account",
      links: [
        { text: "Login", url: "/login" },
        { text: "Register", url: "/register" },
      ],
    },
  ],
}: FooterProps) => {
  return (
    <footer className={cn("bg-[#0A0A0B] text-white pt-24 pb-12 overflow-hidden", className)}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-4 lg:gap-8">
          {/* Brand Identity & Newsletter */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-center gap-2">
              <Logo url="/">
                <LogoText className="text-2xl font-bold tracking-tight text-white">
                  FoodHub
                </LogoText>
              </Logo>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              A premium marketplace connecting food connoisseurs with the best local providers. Quality you can taste.
            </p>

            {/* Newsletter */}
            {/* <div className="space-y-4 pt-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Subscribe to News</h4>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white transition-all focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 group-hover:border-white/20"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-primary p-2 text-white transition-transform hover:scale-105 active:scale-95">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div> */}
          </div>

          {/* Dynamic Menus */}
          {menuItems.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-lg font-bold text-white">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.url}
                      className="text-muted-foreground transition-colors hover:text-white hover:underline underline-offset-4 decoration-primary decoration-2"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-muted-foreground transition-all hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-muted-foreground transition-all hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-muted-foreground transition-all hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-muted-foreground transition-all hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-sm font-medium text-muted-foreground">
              © {new Date().getFullYear()} FoodHub. Built with passion for foodies.
            </p>
            <div className="flex items-center gap-4 text-xs text-zinc-500 uppercase tracking-widest font-bold">
              <span>Secure Payment</span>
              <span>•</span>
              <span>Certified Partners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
