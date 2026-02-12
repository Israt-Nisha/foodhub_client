import CustomerProfilePage from "@/components/customerPage/profile/CustomerProfile";
import { userService } from "@/services/user.service";

const CustomerProfile = async () => {
    const { data } = await userService.getSession();
    const user = data?.user;


    return (
        <div >
            {/* <h1 className="text-2xl font-semibold mb-6">
                Welcome {user.name}!
            </h1> */}
            <CustomerProfilePage userId={user.id} />
        </div>
    );
};

export default CustomerProfile;
