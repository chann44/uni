import type { ReactNode } from 'react';

import { Footer } from './Fotter';
import { Navbar } from './Navbar/Index';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="max-w-[82rem]   min-h-screen mx-auto p-4">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
