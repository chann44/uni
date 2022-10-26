import { DetailsComponet } from "@/components/Details";
import { Layout } from "@/components/Layout";

const Details = () => {
  return (
    <div
      className="min-h-screen w-full relative bg-center border border-black"
      style={{
        backgroundImage: `url("https://ipfs.io/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/916.png")`,
      }}
    >
      <div className="min-h-screen relative  z-20">
        <Layout>
          <DetailsComponet />
        </Layout>
      </div>
      <div className="absolute w-full h-full bg-black bg-opacity-60 z-10 top-0 bottom-0"></div>
    </div>
  );
};

export default Details;
