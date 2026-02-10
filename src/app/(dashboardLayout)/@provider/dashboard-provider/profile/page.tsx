import ProviderProfileManage from "@/components/providerDashboard/providerProfile/CreateOrEditPro";
import { providerService } from "@/services/provider.service";

import { userService } from "@/services/user.service";

const ProviderProfilePage = async () => {
    const { data } = await userService.getSession();
    const user = data?.user;

   
    if (user?.role !== "PROVIDER") {
        return <p className="p-6">You are not from authorized</p>;
    }

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-semibold mb-6">
                Welcome {user.name}!
            </h1>
            <ProviderProfileManage  userId={user.id} />
        </div>
    );
};

export default ProviderProfilePage;
