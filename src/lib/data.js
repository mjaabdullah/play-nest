export const getFeaturedFacilities = async () => {
  const res = await fetch(`${process.env.SERVER_API_URL}/feature-facilities`);
  return res.json();
};
