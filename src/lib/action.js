import { revalidatePath } from "next/cache";

export const deleteFacility = async (facility_id) => {
  "use server";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/facility/${facility_id}`,
    {
      method: "DELETE",
    },
  );
  const data = await res.json();
  if (data.deletedCount > 0) {
    revalidatePath("/manage-facilities");
  }
  return data;
};
