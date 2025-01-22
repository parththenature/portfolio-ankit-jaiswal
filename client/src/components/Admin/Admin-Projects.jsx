import { Row, Col, Card, Button } from "react-bootstrap";
// import { Outlet } from "react-router-dom";

export const AdminProjects = () => {
  return (
    <>
      {/* Recent Projects Row */}
      <h5 className="mb-3" style={{ color: "#c770f0" }}>
        Recent Projects
      </h5>
      <Row className="g-3 mb-4">
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card
            className="border-0 shadow-sm"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h6 style={{ color: "#c770f0" }}>Portfolio</h6>
                <span className="badge bg-success">Completed</span>
              </div>
              <p className="mb-3">
                Portfolio site with showcasing skills and projects
                professionally and seamlessly.
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="small">
                  <span style={{ color: "#fff" }}>Tech: </span>
                  <span style={{ color: "#fff" }}>
                    React, Bootstrap, Node.js, Express.js, MongoDB
                  </span>
                </div>
                <Button variant="outline-primary" size="sm">
                  Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card
            className="border-0 shadow-sm"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h6 style={{ color: "#c770f0" }}>E-Commerce</h6>
                <span className="badge bg-primary">Progress</span>
              </div>
              <p className="mb-3">
                E-commerce site with providing seamless shopping and secure
                transactions effortlessly.
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="small">
                  <span style={{ color: "#fff" }}>Tech: </span>
                  <span style={{ color: "#fff" }}>
                    React, Bootstrap, Node.js, Express.js, MongoDB
                  </span>
                </div>
                <Button variant="outline-primary" size="sm">
                  Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card
            className="border-0 shadow-sm"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h6 style={{ color: "#c770f0" }}>Chat Application</h6>
                <span className="badge bg-warning text-dark">Planning</span>
              </div>
              <p className="mb-3">
                Advanced Chat App with seamless communication, real-time
                messaging effortlessly.
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="small">
                  <span style={{ color: "#fff" }}>Tech: </span>
                  <span style={{ color: "#fff" }}>
                    React, Bootstrap, Node.js, Express.js, MongoDB
                  </span>
                </div>
                <Button variant="outline-primary" size="sm">
                  Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card
            className="border-0 shadow-sm"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h6 style={{ color: "#c770f0" }}>Study Portal</h6>
                <span className="badge bg-primary">Progress</span>
              </div>
              <p className="mb-3">
                Advanced Study Portal with simplifying learning and managing
                resources effectively.
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="small">
                  <span style={{ color: "#fff" }}>Tech: </span>
                  <span style={{ color: "#fff" }}>
                    React, Bootstrap, Node.js, Express.js, MongoDB
                  </span>
                </div>
                <Button variant="outline-primary" size="sm">
                  Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card
            className="border-0 shadow-sm"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h6 style={{ color: "#c770f0" }}>Restaurant</h6>
                <span className="badge bg-warning text-dark">Planning</span>
              </div>
              <p className="mb-3">
                Advanced Restaurant System with streamlining orders and
                reservations seamlessly.
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="small">
                  <span style={{ color: "#fff" }}>Tech: </span>
                  <span style={{ color: "#fff" }}>
                    React, Bootstrap, Node.js, Express.js, MongoDB
                  </span>
                </div>
                <Button variant="outline-primary" size="sm">
                  Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} lg={6} md={6} sm={12}>
          <Card
            className="border-0 shadow-sm"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h6 style={{ color: "#c770f0" }}>News Portal</h6>
                <span className="badge bg-warning text-dark">Planning</span>
              </div>
              <p className="mb-3">
                Cutting-edge News Portal built with delivering real-time
                updates.
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="small">
                  <span style={{ color: "#fff" }}>Tech: </span>
                  <span style={{ color: "#fff" }}>
                    React, Bootstrap, Node.js, Express.js, MongoDB
                  </span>
                </div>
                <Button variant="outline-primary" size="sm">
                  Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Outlet/> */}
    </>
  );
};
