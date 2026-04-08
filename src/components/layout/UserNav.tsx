"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Settings, User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User as UserType } from "@/types";

interface UserNavProps {
  user: UserType;
}

export function UserNav({ user }: UserNavProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      await authClient.signOut();
      toast.success("You have been signed out!", { id: toastId });
      startTransition(() => {
        router.refresh();
        router.push("/login");
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  const getDashboardPath = () => {
    switch (user.role) {
      case "ADMIN":
        return "/dashboard-admin";
      case "PROVIDER":
        return "/dashboard-provider";
      default:
        return "/dashboard-customer";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-muted border border-border overflow-hidden">
          <UserIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal border-b pb-4">
          <div className="flex flex-col space-y-1 mt-1">
            <p className="text-sm font-semibold leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground mt-1">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup className="py-2">
          <DropdownMenuItem onClick={() => router.push(`${getDashboardPath()}`)}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive cursor-pointer py-2"
          onClick={handleSignOut}
          disabled={isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isPending ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
