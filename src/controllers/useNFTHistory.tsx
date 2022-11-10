import axios from "axios";
import { toSqlDatetime } from "./uttils";
import qs from "qs"

export const getData = async (time, history_data_table, slug) => {
  let timeMax: any = new Date();
  var timeMin: any = new Date(
    new Date().getTime() - time * 24 * 60 * 60 * 1000
  );
  timeMax = toSqlDatetime(timeMax);
  timeMin = toSqlDatetime(timeMin);
  history_data_table = "`" + history_data_table + "`"

  const res = await axios("https://wegroup.app/searchNFTHistory", {
    method: "POST",
    headers: {
      "Content-Type":
        "application/x-www-form-urlencoded; charset=UTF-8"
    },
    data: qs.stringify({
      history_data_table: history_data_table,
      timeMin: timeMin, //"2022-04-17 06:00:00",
      timeMax: timeMax, //"2022-04-24 05:00:00",
      slug: slug,
    }),
  });
  return res.data;
};
