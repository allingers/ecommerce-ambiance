// components/Layout.tsx
import { ReactNode } from 'react';
import Header from '../components/Header/Header';
import Footer from './Footer/Footer';

interface LayoutProps {
    children: ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      {/* Andra gemensamma komponenter kan läggas till här */}
      <Footer/>
    </div>
  );
};

export default Layout;