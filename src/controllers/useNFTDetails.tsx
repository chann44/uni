import axios from "axios";
import qs from "qs"

export const getNftBasicInfo = async (slug) => {
  const res = await axios("https://wegroup.app/searchNFT", {
    method: "POST",
    headers: {
      "Content-Type":
        "application/x-www-form-urlencoded; charset=UTF-8"
    },
    data: qs.stringify({
      slug: slug,
    }),
  });
  return res.data;
};
