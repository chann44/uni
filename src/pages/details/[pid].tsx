import { DetailsComponet } from "@/components/Details";
import { Layout } from "@/components/Layout";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const Details = () => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(pid)
  const { data } = trpc.getNFtData.useQuery(Number(pid));

  if(!data?.nftData) return <div></div>

  return (
    <div className="min-h-screen w-full relative bg-center -mb-10 -mt-6 ">
      <div className="absolute border w-full h-full z-10 top-0 bottom-0">
        <img className="w-full h-full object-cover" src={data.nftData?.img} alt="" />
      </div>
      <div className="min-h-screen relative  z-30">
        <Layout>

          { data.nftData?  <DetailsComponet
            asset_address={data.nftData.asset_address}
            uasset_contract_address={data.nftData.uasset_contract_address}
            belong={data.nftData.belong}
            bought={data.nftData.bought}
            count_onsale={data.nftData.count_onsale}
            display_name={data.nftData.display_name}
            floor_price={data.nftData.floor_price}
            variation_eth={data.nftData.variation_eth}
            history_data_table={data.nftData.history_data_table}
            slug={data.nftData.slug}
            id={data.nftData.id}
            in_hold={data.nftData.in_hold}
            listed_ratio={data.nftData.listed_ratio}
            name={data.nftData.name}
            num_owners={data.nftData.num_owners}
            total_supply={data.nftData.total_supply}
            total_volume={data.nftData.total_volume}
            type={data.nftData.type}
            url={data.nftData.url}
            description={data.nftData.description}
            uName={data.nftData.uName}
            img={data?.nftData?.img}
            
          /> : null
}
        </Layout>
      </div>
      <div className="absolute w-full h-full bg-black bg-opacity-60 z-20 top-0 bottom-0"></div>
    </div>
  );
};

export default Details;
