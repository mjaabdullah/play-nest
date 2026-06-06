import FacilityCard from "@/components/facilities/FacilityCard";
import Filter from "@/components/facilities/Filter";
import Search from "@/components/facilities/Search";
import { getAllFacilities, getFacilityCategories } from "@/lib/data";

const AllFacilitiesPage = async ({ searchParams }) => {
  const { category, search } = await searchParams;
  const newCategory = category?.charAt(0).toUpperCase() + category?.slice(1);
  const facilities = await getAllFacilities(search, category);
  const categories = await getFacilityCategories();
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold">All Facilities</h1>
      <div className="my-5 flex justify-between gap-6">
        <Search search={search} />
        <Filter categories={categories} category={newCategory} />
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
