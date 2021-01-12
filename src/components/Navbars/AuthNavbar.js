import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  // UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  // NavItem,
  // NavLink,
  // Nav,
  Container,
  // Row,
  // Col,
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark"
          expand="md"
        >
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <img
                alt="..."
                src={require("assets/img/brand/argon-react-white.png")}
              />
            </NavbarBrand>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
