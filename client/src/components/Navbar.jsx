import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/logo.png";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CgGitFork } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlinePhone,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { useAuth } from "./Authentication/Auth";
import { FaSignOutAlt } from "react-icons/fa";

export function CustomNavbar() {
  const { LogoutUser, isLoggedIn, user } = useAuth(); // Fetch user data from Auth
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  const isAdmin = user?.isAdmin || false; // Check if the user is admin

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                Projects
              </Nav.Link>
            </Nav.Item>

            {/* Conditional Admin Section */}
            {isLoggedIn && isAdmin && (
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/admin"
                  onClick={() => updateExpanded(false)}
                >
                  <MdDashboard style={{ marginBottom: "2px" }} /> Admin
                </Nav.Link>
              </Nav.Item>
            )}

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/contact"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlinePhone style={{ marginBottom: "2px" }} /> Contact
              </Nav.Link>
            </Nav.Item>

            {isLoggedIn ? (
              <>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/resume"
                    onClick={() => updateExpanded(false)}
                  >
                    <CgFileDocument style={{ marginBottom: "2px" }} /> Resume
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link as={Link} to="/login" onClick={LogoutUser}>
                    <FaSignOutAlt style={{ marginBottom: "2px" }} /> Logout
                  </Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/register"
                    onClick={() => updateExpanded(false)}
                  >
                    <AiOutlineUserAdd style={{ marginBottom: "2px" }} />{" "}
                    Register
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    onClick={() => updateExpanded(false)}
                  >
                    <AiOutlineLogin style={{ marginBottom: "2px" }} /> Login
                  </Nav.Link>
                </Nav.Item>
              </>
            )}

            <Nav.Item className="fork-btn">
              <Button
                href="https://github.com/parththenature"
                target="_blank"
                className="fork-btn-inner"
                aria-label="View my GitHub repository"
                title="View my GitHub repository"
              >
                <CgGitFork
                  style={{ fontSize: "1.2em" }}
                  aria-label="Fork"
                  title="Fork"
                />{" "}
                <AiFillStar
                  style={{ fontSize: "1.1em" }}
                  aria-label="Star"
                  title="Star"
                />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default { CustomNavbar };
