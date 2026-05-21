import axios from "axios";
import { headers } from "next/headers";
import { auth } from "./auth";
const getMyToken = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  return token;
};
const token = await getMyToken();
const serverUrl = process.env.SERVER_API_URL;
export const getFeaturedFacilities = async () => {
  const res = await fetch(`${serverUrl}/feature-facilities`);
  return res.json();
};

export const getAllFacilities = async () => {
  console.log(token);
  const res = await fetch(`${serverUrl}/all-facilities`);
  return res.json();
};

export const getFacilityById = async (id) => {
  const res = await fetch(`${serverUrl}/facility/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const getManageFacilities = async (userId) => {
  const res = await fetch(`${serverUrl}/manage-facilities/${userId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const postFacility = async (payload) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/add-facility`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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

export const bookingHandle = async (data) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/booking`,
    data,
  );
  return res;
};

export const getBookingData = async (id) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/booking/${id}`,
  );
  return res;
};