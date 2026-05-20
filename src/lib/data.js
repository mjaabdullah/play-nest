const serverUrl = process.env.SERVER_API_URL;
export const getFeaturedFacilities = async () => {
  const res = await fetch(`${serverUrl}/feature-facilities`);
  return res.json();
};

export const getAllFacilities = async () => {
  const res = await fetch(`${serverUrl}/all-facilities`);
  return res.json();
};
