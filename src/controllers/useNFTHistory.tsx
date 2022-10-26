import axios from "axios";
import { toSqlDatetime } from ".";

const getData = async (time, history_data_table, slug) => {
  let timeMax: any = new Date();
  var timeMin: any = new Date(
    new Date().getTime() - time * 24 * 60 * 60 * 1000
  ); //提前几天
  timeMax = toSqlDatetime(timeMax);
  timeMin = toSqlDatetime(timeMin);

  const res = await axios("https://wegroup.app/searchNFTHistory", {
    method: "POST",
    data: {
      history_data_table: history_data_table,
      timeMin: timeMin, //"2022-04-17 06:00:00",
      timeMax: timeMax, //"2022-04-24 05:00:00",
      slug: slug,
    },
  });
  return res.data;
};
