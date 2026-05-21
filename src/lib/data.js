import axios from "axios";

const serverUrl = process.env.SERVER_API_URL;
export const getFeaturedFacilities = async () => {
  const res = await fetch(`${serverUrl}/feature-facilities`);
  return res.json();
};

export const getAllFacilities = async () => {
  const res = await fetch(`${serverUrl}/all-facilities`);
  return res.json();
};

export const getFacilityById = async (id) => {
  const res = await fetch(`${serverUrl}/facility/${id}`);
  return res.json();
};

export const getManageFacilities = async (userId) => {
  const res = await fetch(`${serverUrl}/manage-facilities/${userId}`);
  return res.json();
};

export const postFacility = async (payload) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/add-facility`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return res;
};

export const editFacility = async (id, editedFacility) => {
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/facility/${id}`,
    editedFacility,
  );
  return res;
};
