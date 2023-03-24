import React, { useRef, useState } from "react";
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
/* import "./Navigation.css"; */
/* import logo from ''  */

function Navigation() {
  const user = useSelector((state) => state.user);
  
  const dispatch = useDispatch();  

  // Función para logout (debe estar en los reducers de los slice)
  // En redux debe asociarse al dispatch

    function handleLogout() {
    dispatch(logout());
  } 

 
  return (
    <Navbar expand="lg" className="containergeneral ">
      <Container >
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src= {/* logo */ "https://www.pngfind.com/pngs/m/685-6854994_react-logo-no-background-hd-png-download.png"}
              width="65"
              height="65"
              className="d-inline-block align-top"
              alt="Logo Amazing"
            />
          </Navbar.Brand>
        </LinkContainer>

        <LinkContainer to="/">
          <Navbar.Brand className=""> Amazing Navbar </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav.Link className="" href="/notfound">- Link1 </Nav.Link>
          <Nav.Link className="" href="/notfound">- Link2 </Nav.Link>
          <Nav.Link className="" href="/notfound">- Link3 </Nav.Link>

          <NavDropdown className="" title="- DropDown" id="collasible-nav-dropdown">
            <NavDropdown.Item className="" href="/category/1">Opcion 1</NavDropdown.Item>
            <NavDropdown.Item className="" href="/category/2">Opcion 2</NavDropdown.Item>
            <NavDropdown.Item className="" href="/category/3">Opcion 3</NavDropdown.Item>
            <NavDropdown.Item className="" href="/category/4">Opcion 4</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className="" href="/notfound">
              Ver todo...
            </NavDropdown.Item>
          </NavDropdown>

          <Nav className="ms-auto">
            {/* Si no hay un usuario registrado mostrar el botón login */}
            {!user && (
              <LinkContainer  to="/login">
                <Nav.Link className="text-primary login"> <button type="button" class="btn btn-outline-primary">Ingresá</button> </Nav.Link>
              </LinkContainer>
            )}


            {/* Usuario Admin */}
            {user && (
              <>
   
                <NavDropdown title={`${user.name} ${user.lastName}`} id="basic-nav-dropdown">
                  {/* Si el usuario es administrador: habilita el Dashboard*/}
                  {user.isAdmin && (
                    <>
                      <LinkContainer to="/admin">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}

                  {/* Botón para salir de la sesión con función handlelogout */}

                  <NavDropdown.Divider />
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    Salir
                  </Button>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      

    </Navbar>
  );
}

export default Navigation;
