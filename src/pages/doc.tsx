import { Layout } from '@/components/Layout';

const Doc = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-around h-[60vh] ">
        <div>
          <p className="gradient-text   text-sm ">uniAsset.io</p>
        </div>
        <h1 className="text-xl sm:text-3xl text-center">
          For details, please contact our email: ry@uniasset.io{' '}
        </h1>
      </div>
    </Layout>
  );
};

export default Doc;
