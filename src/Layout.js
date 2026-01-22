import { Outlet } from "react-router-dom";
import AuraLayer from "./components/AuraLayer";

function Layout() {
  return (
    <div className="app-shell">
      <AuraLayer />
      <a
        className="resume-pill"
        href="https://drive.google.com/file/d/1CgGyaktWdks0AhLIrAz8l2sS0c02njjC/view?usp=sharing"
        target="_blank"
        rel="noreferrer"
      >
        Resume
      </a>
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
