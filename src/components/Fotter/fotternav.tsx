import Link from 'next/link';
import { useRouter } from 'next/router';

export const FooterNav = ({ name, link }: any) => {
  const router = useRouter();
  return (
    <Link href={link}>
      <a
        className={` border-g text-xs mx-1 sm:mx-4 p-2${
          router.pathname === `${link}`
            ? ' text-white opacity-90'
            : '  text-text '
        }`}
      >
        {name}
      </a>
    </Link>
  );
};
