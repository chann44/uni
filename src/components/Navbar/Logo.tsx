import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/">
      <a>
        <div className="flex cursor-pointer items-center space-x-3">
          <img
            src="/l.png"
            alt="logo"
            className="w-9 hover:scale-110 opacity-70 cursor-pointer"
          />
          <p className="text-xl ">uniAsset</p>
        </div>
      </a>
    </Link>
  );
};
