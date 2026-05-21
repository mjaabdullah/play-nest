const serverUrl = process.env.SERVER_API_URL;
export const getFeaturedFacilities = async () => {
  const res = await fetch(`${serverUrl}/feature-facilities`);
  return res.json();
};

export const getAllFacilities = async () => {
  const res = await fetch(`${serverUrl}/all-facilities`);
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

