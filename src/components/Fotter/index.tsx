import { NavItem } from "../../@types/Nav";
import { NAVITEMS } from "../Navbar/Index";
import { FooterNav } from "./fotternav";
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="p-2 lg:py-28 py-10  ">
      <div className="flex justify-center">
        <div className="flex-col flex items-center space-y-5">
          <div className="flex-col flex items-center space-y-4">
            <img
              src="/l.png"
              className="w-10 lg:w-12 hover:scale-125  opacity-80"
              alt="logo"
            />
            <p className="text-text text-xs sm:text-sm">
              Trade BlueChip NFT with $1 Dollor
            </p>
          </div>
          <div>
            {NAVITEMS?.map((navItem: NavItem) => {
              return (
                <FooterNav
                  key={navItem.name}
                  name={navItem.name}
                  link={navItem.link}
                />
              );
            })}
          </div>
          <div className="flex space-x-3 sm:space-x-6">
            <a
              href="https://twitter.com/UniAssetio"
              target={"_blank"}
              rel={"morefreer noreferrer"}
            >
              <FaTwitter size={26} />
            </a>
            <FaDiscord size={26} />
            <a
              href="https://www.linkedin.com/company/uniasset/"
              rel={"morefreer noreferrer"}
              target={"_blank"}
            >
              <FaLinkedin size={26} />
            </a>
          </div>
          <p className="text-text text-xs  text-center sm:text-sm">
            Media inquires for UniAsset.io - Contact media@uniasset.io
          </p>
          <p className="text-text text-xs sm:text-sm">
            © 2022 UniAsset Limited
          </p>
        </div>
      </div>
    </div>
  );
};
