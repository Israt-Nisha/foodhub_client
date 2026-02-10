"use client";

import { Menu, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Accordion } from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@/types";
import { cartService } from "@/services/cart.service";



interface NavItem {
  name: string;
  href: string;
}

export const Navbar = () => {
  const { data: session } = authClient.useSession();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

 const fetchCartCount = async () => {
  if (!userInfo || userInfo.role !== "CUSTOMER") {
    setCartCount(0);
    return;
  }

  try {
    const res = await cartService.getCartItems();
    console.log("Cart API response:", res); // for debugging

    const items = res.data || [];
    const totalQty = items.reduce((sum: number, item: any) => sum + item.quantity, 0);

    setCartCount(totalQty);
    console.log("Cart count:", totalQty);
  } catch (error) {
    console.error("Failed to fetch cart count", error);
  }
};



useEffect(() => {
  if (session) {
    setUserInfo(session.user as User);
  } else {
    setUserInfo(null);
    setCartCount(0);
  }
}, [session]);


useEffect(() => {
  if (!userInfo || userInfo.role !== "CUSTOMER") return;

  fetchCartCount();

  const handleCartUpdate = () => fetchCartCount();
  window.addEventListener("cartUpdated", handleCartUpdate);

  return () => {
    window.removeEventListener("cartUpdated", handleCartUpdate);
  };
}, [userInfo]);


  const handleSignOut = async () => {
    const toastId = toast.loading("Logging out...");
    setLoading(true);

    try {
      await authClient.signOut();
      toast.success("You have been signed out!", { id: toastId });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const baseNavItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Meals", href: "/meals" },
    { name: "Providers", href: "/providers" },
  ];

  const dashboardLink: NavItem | null = userInfo
    ? {
      name: "Dashboard",
      href:
        userInfo.role === "ADMIN"
          ? "/dashboard-admin"
          : userInfo.role === "PROVIDER"
            ? "/dashboard-provider"
            : "/dashboard-customer",
    }
    : null;

  const navItems: NavItem[] = dashboardLink ? [...baseNavItems, dashboardLink] : baseNavItems;

  return (
    <section className={cn("py-4")}>
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-bold">
              FoodHub
            </Link>
          </div>

          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => renderMenuItem(item, pathname))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-2">
            <div className="flex gap-2 items-center">
              {userInfo ? (
                <>
                  {userInfo.role === "CUSTOMER" && (
                    <Link href="/cart" className="relative mr-6">
                      <ShoppingCart className="w-5 h-5" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  )}

                  <Button
                    variant="default"
                    onClick={handleSignOut}
                    disabled={loading}
                  >
                    {loading ? "Logging Out..." : "LogOut"}
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>

          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              FoodHub
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="text-2xl font-bold">
                      FoodHub
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                    {navItems.map((item) => renderMobileMenuItem(item, pathname))}
                  </Accordion>

                  <div className="flex flex-col gap-4 mt-4">
                    {userInfo ? (
                      <>
                        {userInfo.role === "CUSTOMER" && (
                          <Link href="/cart" className="relative">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center">
                                {cartCount}
                              </span>
                            )}
                          </Link>
                        )}

                        <Button
                          variant="default"
                          onClick={handleSignOut}
                          disabled={loading}
                        >
                          {loading ? "Logging Out..." : "LogOut"}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/register">Register</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};


const renderMenuItem = (item: NavItem, pathname: string) => {
  const isActive = pathname === item.href;
  return (
    <NavigationMenuItem key={item.href}>
      <NavigationMenuLink
        asChild
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground",
          isActive && "bg-muted text-accent-foreground"
        )}
      >
        <Link href={item.href}>{item.name}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: NavItem, pathname: string) => {
  const isActive = pathname === item.href;
  return (
    <Link
      key={item.href}
      href={item.href}
      className={cn("text-md font-semibold", isActive && "text-accent-foreground")}
    >
      {item.name}
    </Link>
  );
};
