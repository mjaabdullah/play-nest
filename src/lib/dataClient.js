import axios from "axios";
import { getClientToken } from "./tokenClient";

const clientUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

export const postFacility = async (payload) => {
  const token = await getClientToken();
  const res = await axios.post(`${clientUrl}/add-facility`, payload, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const editFacility = async (id, editedFacility) => {
  const token = await getClientToken();
  const res = await axios.patch(`${clientUrl}/facility/${id}`, editedFacility, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res;
};

export const bookingHandle = async (data) => {
  const token = await getClientToken();
  const res = await axios.post(`${clientUrl}/booking`, data, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res;
};

export const getBookingData = async (id) => {
  const token = await getClientToken();
  const res = await axios.get(`${clientUrl}/booking/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res;
};
