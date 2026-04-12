import { AppSidebar } from "@/components/layout/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { ReactNode } from "react";

import { UserNav } from "@/components/layout/UserNav";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  admin,
  customer,
  provider,
  manager,
  vendor,

}: {
  admin: ReactNode;
  customer: ReactNode;
  provider: ReactNode;
  manager: ReactNode;
  vendor: ReactNode;
}) {

  const { data } = await userService.getSession();

  const userInfo = data.user;

   const renderDashboard = () => {
    switch (userInfo.role) {
      case Roles.admin:
        return admin;
      case Roles.provider:
        return provider;
      case Roles.manager:
        return manager;
      case Roles.vendor:
        return vendor;
      case Roles.customer:
      default:
        return customer;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div className="flex items-center gap-4">
            <UserNav user={userInfo} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {renderDashboard()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}