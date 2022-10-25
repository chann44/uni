import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

import { ConnectWallet } from './connectWallet';
import { Logo } from './Logo';
import { NavbarItem } from './NavItem';

export const NAVITEMS = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Market',
    link: '/market',
  },
  {
    name: 'Earn',
    link: '/earn',
  },
  {
    name: 'Redeem',
    link: '/redeem',
  },
  {
    name: 'Doc',
    link: '/doc',
  },
];

const NavItemsComponet = () => {
  return (
    <div>
      {NAVITEMS?.map((navItem: any) => {
        return (
          <NavbarItem
            key={navItem.name}
            name={navItem.name}
            link={navItem.link}
          />
        );
      })}
    </div>
  );
};

export const Navbar = () => {
  const [showMobNav, setShowMobNav] = useState(false);
  return (
    <>
      <nav className="flex justify-between items-center  py-12 relative">
        <Logo />
        <div className=" flex items-center space-x-16">
          <div className="hidden sm:block">
            <NavItemsComponet />
          </div>
          <div className="lg:block hidden">
            <ConnectWallet />
          </div>
          <div
            className="sm:hidden block"
            onClick={() => {
              setShowMobNav(!showMobNav);
            }}
          >
            {showMobNav ? (
              <AiOutlineClose size={30} />
            ) : (
              <GiHamburgerMenu size={30} />
            )}
          </div>
        </div>
      </nav>
      <div className="relative w-full  bg-text">
        {showMobNav && (
          <div className=" absolute left-0 flex flex-col w-full bg-primary">
            {NAVITEMS?.map((navItem: any) => {
              return (
                <NavbarItem
                  key={navItem.name}
                  name={navItem.name}
                  link={navItem.link}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
