
import { cn } from "@/lib/utils";

import { Logo, LogoText } from "@/components/layout/logo";
import { Facebook, Instagram, LucideLinkedin, } from "lucide-react";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  className?: string;
  menuItems?: MenuItem[];
  copyright?: string;
}

const Footer = ({
  className,

  menuItems = [
    {
      title: "Quick Links",
      links: [
        { text: "Home", url: "/" },
        { text: "Meals", url: "/meals" },
        { text: "Providers", url: "/providers" },
      ],
    },

    {
      title: "Resources",
      links: [
        { text: "Register", url: "/register" },
        { text: "Login", url: "/login" },
      ],
    },
  

  ],
  copyright = "© 2026 FoodHub.com. All rights reserved.",

}: Footer2Props) => {
  return (
    <section className={cn("py-12 bg-black/90 text-white", className)}>
      <div className="container mx-auto px-4">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url="/">

                  <LogoText className="text-2xl font-bold">
                    FoodHub
                  </LogoText>
                </Logo>
              </div>
              <p className="mt-4 font-semibold text-muted-foreground">A smart platform connecting customers with verified food providers.
              </p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-white"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
             <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide">
                Contact
              </h3>

              <a
                href="#"
                className="mb-4 flex items-center gap-2 font-medium  text-muted-foreground hover:text-white"
              >
                support@foodhub.com
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="#"
                  target="_blank"
                  className="text-muted-foreground transition hover:border-white hover:text-white"
                >
                  <Facebook className="h-5 w-5" />
                </a>

              

                <a
                  href="#"
                  target="_blank"
                  className="text-muted-foreground transition hover:border-white hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                  <a
                  href="#"
                  target="_blank"
                  className="text-muted-foreground transition hover:border-white hover:text-white"
                >
                  <LucideLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-16 flex flex-col justify-between gap-4 border-t pt-6 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>

          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
