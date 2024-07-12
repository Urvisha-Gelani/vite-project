import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} md={3}>
            <Sidebar />
          </Col>
          <Col xs={12} md={9}>
            <Outlet />
            
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Layout;
