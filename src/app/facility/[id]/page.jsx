import BookingForm from "@/components/facilityDetails/BookingForm";
import FacilityInfo from "@/components/facilityDetails/FacilityInfo";
import { getFacilityById } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const facility = await getFacilityById(id);
  return {
    title: `${facility.name} — Book Now`,
    description: facility.description,
  };
}

const FacilityDetailsPage = async ({ params }) => {
  const { id } = await params;
  const facility = await getFacilityById(id);

  return (
    <div className="min-h-screen">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#b5f522]/60 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-10 items-start">
          {/* Left Column */}
          <FacilityInfo facility={facility} />

          {/* Right Column */}
          <div className="lg:sticky lg:top-8">
            <BookingForm facility={facility} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
