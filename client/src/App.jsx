import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Preloader from "./components/Pre";
import { CustomNavbar } from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Register } from "./components/Authentication/Register";
import { Login } from "./components/Authentication/Login";
import { Contact } from "./components/Authentication/Contact";
import { AuthProvider } from "./components/Authentication/Auth";
import { Logout } from "./components/Authentication/Logout";
import { Error } from "./components/Error/Error";
import { DashboardLayout } from "./components/Admin/Admin-Dashboard";
import { AdminUsers } from "./components/Admin/Admin-Users";
import { AdminContacts } from "./components/Admin/Admin-Contacts";
import { AdminUpdate } from "./components/Admin/Admin-Update";
import { AdminProjects } from "./components/Admin/Admin-Projects";
import Settings from "./components/Admin/Admin-Setting";
import AuthRedirect from "./components/Authentication/Auth-Redirect"

function AppContent() {
  const location = useLocation(); // Hook to track current route

  return (
    <div className="App">
      <CustomNavbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route
          path="/register"
          element={
            <AuthRedirect>
              <Register />
            </AuthRedirect>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
            
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
        <Route path="/admin/*" element={<DashboardLayout />}>
          <Route path="projects" element={<AdminProjects />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      {!location.pathname.includes("/admin") && <Footer />}
    </div>
  );
}

export function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Preloader load={load} />
        <div id={load ? "no-scroll" : "scroll"}>
          <AppContent />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
