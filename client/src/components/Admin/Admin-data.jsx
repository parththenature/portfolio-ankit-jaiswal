import { Container, Row, Col, Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const DashboardContent = () => {
  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",

  };
  const cardTextColor = { color: "#fff" };
  
  const titleStyle = { color: "#c770f0" };

  // Data for the graph
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ], // X-axis labels
    datasets: [
      {
        label: "Website Traffic",
        data: [69, 64, 80, 81, 78, 76, 72, 79, 82, 78, 91, 96],
        fill: false,
        borderColor: "#c770f0",
        tension: 0.0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Website Traffic Over Time",
        color: "#fff",
        font: {
          size: 15,
        },
      },
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <main style={{ marginTop: "20px" }}>
      <Container fluid className="p-0">
        {/* Overview Stats Row */}
        <Row className="g-3 mb-4">
          {[
            {
              title: "Portfolio Views",
              value: "1,234",
              growth: "+12.5%",
              growthColor: "text-success",
            },
            {
              title: "Project Inquiries",
              value: "26",
              growth: "This Month",
              growthColor: "text-primary",
            },
            {
              title: "Completed Projects",
              value: "48",
              growth: "+3 New",
              growthColor: "text-success",
            },
            {
              title: "Client Reviews",
              value: "4.9",
              growth: "★★★★★",
              growthColor: "text-warning",
            },
          ].map((stat, idx) => (
            <Col key={idx} xl={3} lg={6} md={6} sm={12}>
              <Card className="border-0 shadow-sm" style={cardStyle}>
                <Card.Body style={cardTextColor}>
                  <h6 className="mb-2" style={titleStyle}>
                    {stat.title}
                  </h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">{stat.value}</h3>
                    <div className={stat.growthColor}>
                      <small>{stat.growth}</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Skills & Technologies Row */}
        <h5 className="mb-3" style={titleStyle}>
          Skills & Technologies
        </h5>
        <Row className="g-3">
          {[
            {
              category: "Frontend",
              skills: ["React", "Bootstrap", "HTML/CSS", "JS"],
            },
            {
              category: "Backend",
              skills: ["Node.js", "Express.js", "Next.js"],
            },
            {
              category: "Database",
              skills: ["MongoDB", "NoSQL", "MySQL"],
            },
            {
              category: "Tools",
              skills: ["Git", "GitHub", "Postman", "VS Code"],
            },
          ].map((section, idx) => (
            <Col key={idx} xl={3} lg={6} md={6} sm={12}>
              <Card className="border-0 shadow-sm" style={cardStyle}>
                <Card.Body>
                  <h6 className="mb-3" style={titleStyle}>
                    {section.category}
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {section.skills.map((skill, i) => (
                      <span key={i} className="badge bg-light text-dark">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Graph Section */}
        <h5 className="mb-3" style={{ ...titleStyle, marginTop: "20px" }}>
          Website Traffic Analytics
        </h5>
        <Row className="g-3">
          <Col xl={12}>
            <Card className="border-0 shadow-sm" style={cardStyle}>
              <Card.Body>
                <Line data={data} options={options} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};
