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

export const deleteBooking = async (id, userId) => {
  "use server";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/booking?id=${id}&user=${userId}`,
    {
      method: "DELETE",
    },
  );
  const data = await res.json();
  if (data.deletedCount > 0) {
    revalidatePath("/my-bookings");
  }
  return data;
};