import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <Footer />
    </div>
  );
};

export default Layout;
