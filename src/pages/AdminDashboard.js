import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
 import DashboardAppointments from "../components/DashboardAppointments";
import DashboardProfessionals from "../components/DashboardProfessionals";
import AppointmentList from "../components/AppointmentList";
import AppointmentSchedule from "../components/AppointmentSchedule.js";
import SelectRangeDays from "../components/SelectRangeDays.js";



/* import OrdersAdminPage from "../components/OrdersAdminPage";   */

function AdminDashboard() {
    return (
        <Container>
            <Tab.Container defaultActiveKey="appointments">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="appointments">Reserva de Turnos</Nav.Link>
                            </Nav.Item>
                            {/* <Nav.Item>
                                <Nav.Link eventKey="professionals">Dashboard Profesionales</Nav.Link>
                            </Nav.Item> */}
                            <Nav.Item>
                                <Nav.Link eventKey="appointmentList">Listado de Turnos</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="appointmentSchedule">Esquema para Turnos</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="appointments">
                                <DashboardAppointments />
                            </Tab.Pane>
                            {/* <Tab.Pane eventKey="professionals">
                                <DashboardProfessionals />
                            </Tab.Pane> */}
                            <Tab.Pane eventKey="appointmentList">
                                <AppointmentList />
                            </Tab.Pane>
                            <Tab.Pane eventKey="appointmentSchedule">
                                <SelectRangeDays /> 
                                <hr />
                                <AppointmentSchedule appointmentDay={"Lunes"}/> 
                                <hr />                               
                                <AppointmentSchedule appointmentDay={"Martes"}/>
                                <hr />                               
                                <AppointmentSchedule appointmentDay={"Miércoles"}/>
                                <hr />                               
                                <AppointmentSchedule appointmentDay={"Jueves"}/>
                                <hr />                               
                                <AppointmentSchedule appointmentDay={"Viernes"}/>
                                <hr />                               
                                <AppointmentSchedule appointmentDay={"Sábado"}/>
                                <hr />                               
                                <AppointmentSchedule appointmentDay={"Domingo"}/>
                                <hr />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default AdminDashboard;
