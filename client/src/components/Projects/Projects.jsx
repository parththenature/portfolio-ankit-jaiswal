import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectsCard";
import Particle from "../Particle";
import EduTech from "../../Assets/Projects/EduTech.png";
import Portfolio from "../../Assets/Projects/Portfolio.png";
import ECommerce from "../../Assets/Projects/ECommerce.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I&apos;ve worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={EduTech}
              isBlog={false}
              title="EduTech"
              description="An EduTech platform developed with the MERN stack, offering a user-friendly study portal with interactive lessons, quizzes, and resources. It provides a comprehensive learning experience, accessible anytime for students and educators."
              ghLink="https://github.com/parththenature/EduTech"
              demoLink="https://edutech/ankit-jaiswal"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Portfolio}
              isBlog={false}
              title="Portfolio"
              description="My personal Portfolio website built with React and styled using modern UI frameworks. It showcases my skills, projects, and experience, offering an interactive and user-friendly interface for potential clients and employers."
              ghLink="https://github.com/parththenature/portfolio-ankit-jaiswal"
              demoLink="https://portfolio-ankit-jaiswal.onrender.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={ECommerce}
              isBlog={false}
              title="ECommerce"
              description="An E-commerce website built with the MERN stack, offering a seamless shopping experience with product management, user authentication, and a responsive design for smooth online shopping."
              ghLink="https://github.com/parththenature/ecommerce.io"
              demoLink="https://ecommerce/ankit-jaiswal"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
