import { getFeaturedFacilities } from "@/lib/data";
import Link from "next/link";
import FacilityCard from "./FacilityCard";

const Facilities = async () => {
  const facilities = await getFeaturedFacilities();

  return (
    <div className="container mx-auto px-4 py-5 mb-10">
      <div>
        <h2 className="text-2xl md:text-4xl mb-2">Featured Facilities</h2>
        <div className="flex justify-between items-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Top-rated venues ready for your next match.
          </p>
          <button>
            <Link
              href="/all-facilities"
              className="text-[#00C853] hover:text-[#009624]"
            >
              View All
            </Link>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mt-5">
        {facilities.map((facility) => (
          <FacilityCard key={facility._id} facility={facility} />
        ))}
      </div>
    </div>
  );
};

export default Facilities;
