import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="max-w-7xl border min-h-screen mx-auto p-4">{children}</div>
  );
};
