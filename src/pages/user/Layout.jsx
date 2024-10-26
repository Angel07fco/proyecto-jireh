import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="md:pt-32">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
