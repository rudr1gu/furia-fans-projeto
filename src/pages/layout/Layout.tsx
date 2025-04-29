import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-black text-zinc-950 dark:text-white">
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;