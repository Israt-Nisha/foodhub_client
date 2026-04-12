import { userService } from "@/services/user.service";
import { User } from "@/types";
import CustomerProfile from "./CustomerProfile";
import ProviderProfile from "./ProviderProfile";
import AdminProfile from "./AdminProfile";
import ManagerProfile from "./ManagerProfile";
import VendorProfile from "./VendorProfile";

interface Props {
    userId?: string;
}

export default async function ProfileRouter({ userId }: Props) {
    const { data, error } = await userService.getSession();
    const user = data?.user as User | undefined;

    if (error || !user) {
        return (
            <div className="container px-4 py-8 max-w-md mx-auto">
                <div className="bg-card border border-border rounded-3xl p-8 text-center">
                    <p className="text-muted-foreground">Unable to load user profile. Please try again.</p>
                </div>
            </div>
        );
    }

    const profileUserId = userId || user.id;

    switch (user.role) {
        case "CUSTOMER":
            return <CustomerProfile userId={profileUserId} />;
        case "PROVIDER":
            return <ProviderProfile userId={profileUserId} />;
        case "ADMIN":
            return <AdminProfile userId={profileUserId} />;
        case "MANAGER":
            return <ManagerProfile userId={profileUserId} />;
        case "VENDOR":
            return <VendorProfile userId={profileUserId} />;
        default:
            return <CustomerProfile userId={profileUserId} />;
    }
}