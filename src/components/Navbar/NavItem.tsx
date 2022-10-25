import Link from 'next/link';
import { useRouter } from 'next/router';

export const NavbarItem = ({ name, link }: any) => {
  const router = useRouter();
  return (
    <Link href={link}>
      <a
        className={` border-g text-lg mx-4 p-2${
          router.pathname === `${link}`
            ? ' text-white opacity-80  '
            : '  text-text '
        }`}
      >
        {name}
      </a>
    </Link>
  );
};
