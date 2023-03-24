import React, { useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
/* import { Link } from "react-router-dom"; */
import { useDeleteAppointmentMutation } from "../services/appApi";
import "./DashboardProfessionals.css";
import Pagination from "./Pagination";

 

function AppointmentList() {
    const appointment = useSelector((state) => state.appointments);

    console.log(appointment, "appointment Appointment List")
        
    const user = useSelector((state) => state.user);

    const [search, setSearch] = useState("");
    
    const searcher = (e) => {
        setSearch(e.target.value)
        /* console.log(e.target.value) */       
    }
    
    // Filter by LastName
    let results = []
    if(!search)
    {
        results = appointment
    }else{
        results = appointment.filter( (turno) => 
        turno.lastName.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    // removing a appointment
    const [deleteAppointment, { isLoading/* , isSuccess */ }] = useDeleteAppointmentMutation();
    function handleDeleteAppointment(id) {
        // logic here
        if (window.confirm("¿Confirma la cancelación del Turno?")) deleteAppointment({ appointment_id: id, user_id: user._id });
    }

    function TableRow({ id_turnos, name, lastName, appointmentServiceId, appointmentDay, appointmentHour }) {
        return (
            <tr>
                <td>{id_turnos}</td>
                <td>{name}</td>
                <td>{lastName}</td>
                <td>{appointmentServiceId}</td>
                <td>{appointmentDay}</td>
                <td>{appointmentHour}</td>

                <td className="text-center">
                    <Button variant="danger" onClick={() => handleDeleteAppointment(id_turnos, user._id)} disabled={isLoading}>
                        Cancelar Turno
                    </Button>                    
                </td>
            </tr>
        );
    }

    return (
        <Container style={{ minHeight: "75vh" }}>  

            <input value={search} onChange={searcher} type={"text"} placeholder="Buscar por Apellido" className="form-control mb-3" />
            <Table striped bordered hover responsive>
                <thead>
                    <tr>                        
                        <th>ID del Turno</th>
                        <th>Nombre del Paciente</th>
                        <th>Apellido del Paciente</th>
                        <th>Servicio</th> 
                        <th>Día</th>
                        <th>Horario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <Pagination data={results} RenderComponent={TableRow} pageLimit={1} dataLimit={200} tablePagination={true} />
                </tbody>
            </Table>
        </Container>
    );
}

export default AppointmentList;
