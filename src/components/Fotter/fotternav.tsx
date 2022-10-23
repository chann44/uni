import Link from "next/link";
import { useRouter } from "next/router";
import { NavItem } from "../../@types/Nav";

export const FooterNav = ({ name, link }: NavItem) => {
  const router = useRouter();
  return (
    <Link href={link}>
      <a
        className={
          " text-xs mx-1 sm:mx-4 border-g p-2" +
          (router.pathname == `${link}`
            ? " text-white opacity-90"
            : "  text-text ")
        }
      >
        {name}
      </a>
    </Link>
  );
};
