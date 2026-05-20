import FacilityCard from "@/components/facilities/FacilityCard";
import { getAllFacilities } from "@/lib/data";
import { SearchField } from "@heroui/react";

const AllFacilitiesPage = async () => {
  const facilities = await getAllFacilities();
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold">All Facilities</h1>
      <div className="my-5">
        <SearchField name="search">
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              className="w-[280px]"
              placeholder="Search facilities"
            />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mt-5">
        {facilities.map((facility) => (
          <FacilityCard key={facility._id} facility={facility} />
        ))}
      </div>
    </div>
  );
};

export default AllFacilitiesPage;
