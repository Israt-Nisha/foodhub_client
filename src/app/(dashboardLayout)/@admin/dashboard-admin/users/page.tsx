import ManageUsers from "@/components/adminDashboard/manageUserPage/UsersMange";
import { userService } from "@/services/user.service";

const AllUsers = async () => {
   const { data: session } = await userService.getSession();
  const loggedInUser = session?.user;

  if (!loggedInUser) {
    return <p className="text-red-600">You must be logged in!</p>;
  }

  if (loggedInUser.role !== "ADMIN") {
    return <p className="text-red-600">You are not authorized to manage users.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

      <ManageUsers userId={loggedInUser.id} />
    </div>
  );
};

export default AllUsers;