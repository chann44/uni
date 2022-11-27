import { Stats } from "./Stats";
import { trpc } from "@/utils/trpc";


export const TopNFTCard = () => {
    const { data } = trpc.getNFtData.useQuery(1);

  return (
    <>
    {
      data? 

      <div className="grid grid-cols-6 col-span-6 col-start-1 bg-secondary sm:max-h-[270px] ">
        <div className="h-[270px] sm:col-start-1 sm:col-span-3 col-start-1 col-span-6 rounded-xl">
          <img
            className="h-[100%] w-[100%]  object-cover object-center rounded-xl"
            src={data?.nftData?.img}
            alt=" h-[100%] w-[100%]"
          />
        </div>
        <div className="col-start-1 sm:col-start-4 sm:col-span-4 col-span-6 grid grid-cols-5 items-center px-6  min-h-[250px]">
          <Stats
            displayName={data?.nftData?.display_name}
            variation={data?.nftData.variation_eth}
            floorPrice={data?.nftData.floor_price}
            slug={data?.nftData?.slug}
            history_data_table={data?.nftData.history_data_table}
          />
          <Stats
            displayName={"u" + data?.nftData.display_name}
            variation={data?.nftData.variation_eth}
            floorPrice={data?.nftData.floor_price}
            history_data_table={data?.nftData?.history_data_table}
            slug={data?.nftData?.slug}
          />
        </div>
      </div>
      : null
}
    </>
  );
};
