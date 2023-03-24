import React, { useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
/* import { Link } from "react-router-dom"; */
import { useDeleteAppointmentMutation } from "../services/appApi";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
 

function AppointmentCancel() {

    const { id } = useParams();
    const { service } = useParams(); 
    console.log(id, "ididididididididididididididididid AppointmentCancel")
    console.log(service, "serviceserviceserviceservice  AppointmentCancel")
    const appointment = useSelector((state) => state.appointments);
    console.log(appointment, "<<<<--- appointment AppointmentCancel!!!")
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    const search = id

    // Filter by id_turnos
    /* let results = []
    if(!search)
    {
        results = appointment
    }else{
        results = appointment.filter( (turno) =>               
            turno.id_turnos.toLowerCase().includes(search.toLocaleLowerCase())       
        )
    } */

    let results = []
    results[0] = appointment.find( (turno) => {
        if ( (turno.id_turnos.toLowerCase() === search.toLocaleLowerCase()) && (turno.appointmentServiceId === service) ){
            return turno
        }
    });
    

    console.log(results, "<<<---results luego del filtro!!!")

    // removing a appointment 
    const [deleteAppointment, { isLoading/* , isSuccess */ }] = useDeleteAppointmentMutation();
    
    function handleDeleteAppointment(id){
        if (window.confirm("¿Confirma la cancelación del Turno?")) {
            deleteAppointment({ appointment_id: id, user_id: user._id });
            setTimeout(() => {
                navigate("/admin");
             }, 100);
        }
    }

    function TableRow({ id_turnos, name, lastName, appointmentServiceId, appointmentDay, appointmentHour }) {
        return (
            <>
                <tr>
                {/*  <td>{id_turnos}</td> */}
                    <td>{name}</td>
                    <td>{lastName}</td>
                    {/* <td>{appointmentServiceId}</td> */}
                    <td>{appointmentDay}</td>
                    <td>{appointmentHour}</td>               
                </tr>                
           </>
        );
    }

    return (
        <Container className="text-center" style={{ minHeight: "75vh" }}>  
           <h5 className="my-3 text-center"> {results[0].appointmentServiceId} </h5>
           {/*  <input value={search} onChange={searcher} type={"text"} placeholder="Buscar por Apellido" className="form-control mb-3" /> */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>                        
                        {/* <th>ID del Turno</th> */}
                        <th>Nombre</th>
                        <th>Apellido</th>
                        {/* <th>Servicio</th>  */}
                        <th>Día</th>
                        <th>Horario</th>
                        {/* <th>Acciones</th> */}
                    </tr>
                </thead>
                <tbody>
                    <Pagination data={results} RenderComponent={TableRow} pageLimit={1} dataLimit={200} tablePagination={true} />
                </tbody>
            </Table>
            <Button className="my-4 mx-1" variant="danger" onClick={() => handleDeleteAppointment(results[0].id_turnos, user._id)} disabled={isLoading}>
                    Cancelar Turno
                </Button>  
        </Container>
    );
}

export default AppointmentCancel;
