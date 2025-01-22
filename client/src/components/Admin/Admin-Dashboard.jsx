import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button, Offcanvas } from "react-bootstrap";
import {
  Bell,
  Settings,
  User,
  Home,
  Briefcase,
  MessageSquare,
  Menu,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../Authentication/Auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { DashboardContent } from "./Admin-data";
import { AdminProjects } from "./Admin-Projects";

const styles = `
  .loading-container {
    min-height: 100vh;
    background: linear-gradient(to left, rgb(27 20 41), rgb(20 15 35));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }

  .loading-spinner {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
    margin-right: 25px;
    position: relative;
  }

  .loading-spinner:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-top-color: #c770f0;
    border-right-color: #c770f0;
    border-radius: 50%;
    animation: spinner 1s linear infinite;
  }

  .loading-spinner:after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-bottom-color: rgba(199, 112, 240, 0.3);
    border-left-color: rgba(199, 112, 240, 0.3);
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
  }

  .loading-text {
    color: #fff;
    margin-top: 20px;
    font-size: 1.5rem;
    font-weight: 500;
  }

  @keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingScreen = () => (
  <>
    <style>{styles}</style>
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  </>
);

export const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      icon: <Home size={20} color="#fff" />,
      label: <span style={{ color: "#fff" }}>Dashboard</span>,
      to: "/admin/dashboard",
    },
    {
      icon: <Briefcase size={20} color="#fff" />,
      label: "Projects",
      to: "/admin/projects",
    },
    {
      icon: <User size={20} color="#fff" />,
      label: "Users",
      to: "/admin/users",
    },
    {
      icon: <MessageSquare size={20} color="#fff" />,
      label: "Messages",
      to: "/admin/contacts",
    },
    {
      icon: <Settings size={20} color="#fff" />,
      label: "Settings",
      to: "/admin/settings",
    },
  ];

  const mainContainerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to left, rgb(27 20 41), rgb(20 15 35))",
    color: "#fff",
  };

  const sidebarStyle = {
    position: "fixed",
    top: "10rem",
    width: sidebarCollapsed ? "70px" : "250px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transition: "width 0.3s",
    overflowX: "hidden",
    zIndex: 1000,
    display: isMobile ? "none" : "block",
    color: "#fff",
    height: "calc(100vh - 11rem)",
    marginTop: "1.9rem",
  };

  const mainContentStyle = {
    marginLeft: isMobile ? "0" : sidebarCollapsed ? "70px" : "250px",
    marginTop: "10.5rem",
    padding: "20px",
    transition: "margin-left 0.3s",
  };

  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    console.error("Authentication error:", error);
    return (
      <div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>
        <h2>Error: Unable to load user data</h2>
        <p>Please try refreshing the page or contact support.</p>
      </div>
    );
  }

  if (!user) {
    console.error("User data is missing or undefined.");
    return <Navigate to="/" />;
  }

  if (!user.isAdmin) {
    console.warn("Access denied: User is not an admin.");
    return <Navigate to="/" />;
  }

  const renderContent = () => {
    switch (location.pathname) {
      case "/admin":
      case "/admin/dashboard":
        return <DashboardContent />;
      case "/admin/projects":
        return <AdminProjects />;
      default:
        return <Outlet />;
    }
  };

  return (
    <>
      <div style={mainContainerStyle}>
        <Navbar
          style={{
            color: "#fff",
            marginTop: "-3.8rem",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            position: "fixed",
            zIndex: 1000,
          }}
          className="navbar-custom shadow-sm"
        >
          <Container fluid className="px-3">
            <div className="d-flex align-items-center">
              <Button
                variant="light"
                onClick={() =>
                  isMobile
                    ? setShowMobileSidebar(true)
                    : setSidebarCollapsed(!sidebarCollapsed)
                }
                className="me-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  border: "none",
                }}
              >
                <Menu size={20} />
              </Button>
              <Navbar.Brand
                className="d-none d-sm-block"
                style={{ color: "#c770f0" }}
              >
                Dashboard
              </Navbar.Brand>
            </div>
            <div className="text-center" style={{ flexGrow: 1 }}>
              <h1 style={{ color: "#fff", fontSize: "1.5rem", margin: 0 }}>
                Admin Panel
              </h1>
            </div>
            <Nav
              className="ms-auto d-flex align-items-center"
              style={{ color: "#fff" }}
            >
              <Nav.Link className="position-relative p-2">
                <Bell size={20} color="#fff" />
                <span
                  className="position-absolute top-0 start-100 translate-middle p-1 bg-danger rounded-circle"
                  style={{ width: "8px", height: "8px" }}
                ></span>
              </Nav.Link>
              <Nav.Link className="p-2">
                <Settings size={20} color="#fff" />
              </Nav.Link>
              <Nav.Link className="d-flex align-items-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#c770f0",
                  }}
                >
                  <User size={20} color="#fff" />
                </div>
                <span
                  className="ms-2 d-none d-md-block"
                  style={{ color: "#fff" }}
                >
                  Ankit Jaiswal
                </span>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {!isMobile && (
          <div style={sidebarStyle}>
            <Nav className="flex-column pt-3">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="d-flex align-items-center p-3"
                  style={{
                    backgroundColor:
                      location.pathname === item.to
                        ? "rgba(199, 112, 240, 0.2)"
                        : "transparent",
                    textDecoration: "none",
                  }}
                >
                  {item.icon}
                  {!sidebarCollapsed && (
                    <span className="ms-3" style={{ color: "#fff" }}>
                      {item.label}
                    </span>
                  )}
                </Link>
              ))}
            </Nav>
          </div>
        )}

        <Offcanvas
          show={showMobileSidebar}
          onHide={() => setShowMobileSidebar(false)}
          placement="start"
        >
          <Offcanvas.Header
            closeButton
            closeVariant="white"
            className="custom-header"
            style={{
              background:
                "linear-gradient(to left, rgb(27 20 41), rgb(20 15 35))",
            }}
          >
            <Offcanvas.Title style={{ color: "#c770f0" }}>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="menu-body">
            <Nav className="flex-column menu-nav">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="d-flex align-items-center p-3"
                  onClick={() => setShowMobileSidebar(false)}
                  style={{
                    backgroundColor:
                      location.pathname === item.to
                        ? "rgba(199, 112, 240, 0.2)"
                        : "transparent",
                    textDecoration: "none",
                  }}
                >
                  {item.icon}
                  <span className="ms-3" style={{ color: "#fff" }}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        <main style={mainContentStyle}>
          <Container fluid className="p-0">
            {renderContent()}
          </Container>
        </main>
      </div>
    </>
  );
};
