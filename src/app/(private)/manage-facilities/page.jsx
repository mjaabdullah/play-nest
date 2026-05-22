import ManageFacilitiesCard from "@/components/manage/ManageFacilitiesCard";
import { auth } from "@/lib/auth";
import { getManageFacilities } from "@/lib/data";
import { headers } from "next/headers";

const ManageFacilitiesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;

  const myFacilities = await getManageFacilities(userId);
  return (
    <div className="container mx-auto px-4 py-5 ">
      <h1 className="text-2xl md:text-4xl font-bold mb-2.5 ">
        Manage My Facilities
      </h1>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700 dark:text-gray-400">
          Review, update, or remove your registered athletic venues.
        </span>
        <span className="text-[#00C853] font-semibold">
          Total: {myFacilities.length}
        </span>
      </div>
      {myFacilities.length <= 0 ? (
        <h1 className="text-4xl text-gray-500 text-center my-10">
          No Facility Found!
        </h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mt-5">
          {myFacilities.map((facility) => (
            <ManageFacilitiesCard key={facility._id} facility={facility} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageFacilitiesPage;
