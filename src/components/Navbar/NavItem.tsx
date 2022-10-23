import Link from "next/link";
import { useRouter } from "next/router";
import { NavItem } from "../../@types/Nav";

export const NavbarItem = ({ name, link }: NavItem) => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <Link href={link}>
      <a
        className={
          " text-lg mx-4 border-g p-2" +
          (router.pathname == `${link}`
            ? " text-white opacity-80  "
            : "  text-text ")
        }
      >
        {name}
      </a>
    </Link>
  );
};
