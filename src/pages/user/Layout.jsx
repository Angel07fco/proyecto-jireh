import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/Navbar";

function Layout({ children }) {
    return (
        <>
            <Navbar />
                <div>
                    {children}
                </div>
            <Footer />
        </>
    )
}

export default Layout