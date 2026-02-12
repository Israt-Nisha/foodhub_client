import CustomerProfilePage from "@/components/customerPage/profile/CustomerProfile";
import { userService } from "@/services/user.service";

const CustomerProfile = async () => {
    const { data } = await userService.getSession();
    const user = data?.user;


    return (
        <div >
            <CustomerProfilePage userId={user.id} />
        </div>
    );
};

export default CustomerProfile;
