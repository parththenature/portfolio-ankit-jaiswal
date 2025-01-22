import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { useAuth } from "../Authentication/Auth";

const AboutCard = () => {
  const { user } = useAuth();
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi {user ? user.username : `Dear Customer`}, I&apos;m{" "}
            <span className="purple">Ankit Jaiswal </span>
            from <span className="purple"> Lucknow, India.</span>
            <br />I am currently working as a{" "}
            <span className="purple"> MERN Stack Developer.</span>
            <br />I have completed <span className="purple">Diploma</span> in 
            <span className="purple"> Information Technology.</span>
            <br />I am Currently pursuing{" "}
            <span className="purple">B.Tech</span> in 
            <span className="purple"> Computer Science & Engineering.</span>
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Music Listening
            </li>
            <li className="about-activity">
              <ImPointRight /> Traveling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            &quot;Strive to build things that make a difference!&quot;{" "}
          </p>
          <footer className="blockquote-footer">Ankit Jaiswal</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default AboutCard;
