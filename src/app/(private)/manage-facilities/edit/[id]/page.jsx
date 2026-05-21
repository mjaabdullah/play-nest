import EditFacilityForm from "@/components/manage/EditFacilityForm";
import { getFacilityById } from "@/lib/data";

const FacilityEditPage = async ({ params }) => {
  const { id } = await params;
  const facility = await getFacilityById(id);

  return (
    <div className="container mx-auto px-4 py-5">
      <EditFacilityForm facility={facility} />
    </div>
  );
};

export default FacilityEditPage;
