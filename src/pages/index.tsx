import { EarnCard } from '@/components/Earn';
import { Layout } from '@/components/Layout';
import { NFTCard } from '@/components/NFTCard';

const EarnCardTitle = () => {
  return (
    <div className="flex flex-col items-center space-y-3 my-16">
      <p className="gradient-text   text-sm ">uniAsset.io</p>
      <h1 className="text-lg font-bold sm:text-xl lg:text-4xl">Earn </h1>
    </div>
  );
};

const Index = () => {
  return (
    <Layout>
      <NFTCard />
      <EarnCardTitle />
      <EarnCard />
    </Layout>
  );
};

export default Index;
