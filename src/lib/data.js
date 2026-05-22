import axios from "axios";
import { getMyToken } from "./token";

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
  const token = await getMyToken();
  const res = await fetch(`${serverUrl}/facility/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getManageFacilities = async (userId) => {
  const token = await getMyToken();
  const res = await fetch(`${serverUrl}/manage-facilities/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};


export const getBookingData = async (id) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/booking/${id}`,
  );
  return res;
};
