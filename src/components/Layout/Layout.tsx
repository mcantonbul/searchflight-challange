import { ReactNode, useContext } from "react";

/** Contexts */
import { ThemaContext } from "@/contexts/ThemaContext/ThemaContext";

/** Components */
import Header from "@/components/Header/Header";

/** Styles */
import s from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
  backgroundColor?: string;
}

const Layout = ({ children}: LayoutProps) => {
  const {thema} = useContext(ThemaContext);

  return (
    <div
      className={s.layout}
      style={{ backgroundColor: thema.backgroundColor }}
    >
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
