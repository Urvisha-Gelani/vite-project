import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div>
        <div className="d-flex flex-wrap ">
          <div  className="w-20">
            <Sidebar />
          </div>
          <div className="w-80 mx-auto">
            <Outlet />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
