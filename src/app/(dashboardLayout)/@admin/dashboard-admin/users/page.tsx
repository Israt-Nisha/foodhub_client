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

    <section className="">
      <div className="max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Users Management
          </h1>
        </div>

        <ManageUsers />
      </div>
    </section>
 

  );
};

export default AllUsers;