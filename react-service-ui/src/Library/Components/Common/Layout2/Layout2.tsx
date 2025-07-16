import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { AVTUseEffect, AVTUseState } from "../../../customHooks";

const Layout2 = () => {
  const [screenWidth, setScreenWidth] = AVTUseState("Layout2 Width", window.innerWidth);

  AVTUseEffect("Layout2 Resize", () => {
    const resizeHandler = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <main className="p-4 flex-grow overflow-auto bg-gray-50">
          <p className="text-xs text-gray-400">Screen Width: {screenWidth}px</p>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
export default Layout2;
