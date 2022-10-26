import axios from "axios";

export const getNftBasicInfo = async (slug) => {
  const res = await axios("https://wegroup.app/searchNFT", {
    method: "POST",
    data: {
      slug: slug,
    },
  });
  return res.data;
};
