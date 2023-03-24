import React from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDeleteProfessionalMutation } from "../services/appApi";
import "./DashboardProfessionals.css";
import Pagination from "./Pagination";

function DashboardProfessionals() {
    const professionals = useSelector((state) => state.professionals);
    console.log(professionals, "<<<<<.... professionals")
    
    const user = useSelector((state) => state.user);
    console.log(user, "<<<<<..... user")
   
    // removing a Professionals
    const [deleteProfessional, { isLoading, isSuccess }] = useDeleteProfessionalMutation();
    function handleDeleteProfessional(id) {
        // logic here
        if (window.confirm("¿Confirma la eliminación del Professional?")) deleteProfessional({ professional_id: id, user_id: user._id });
    }

    function TableRow({ picture, _id, name, lastName }) {
        return (
            <tr>
                <td>
                    <img src={picture} className="dashboard-professionals-preview" />
                </td>
                <td>{_id}</td>
                <td>{name}</td>
                <td>{lastName}</td>
                <td className="text-center">
                    <Button variant="danger" onClick={() => handleDeleteProfessional(_id, user._id)} disabled={isLoading}>
                        Eliminar
                    </Button>
                    <Link to={`/professional/${_id}/edit`} className="mx-1 btn btn-warning">
                        Editar
                    </Link>
                </td>
            </tr>
        );
    }

    return (
        <Container style={{ minHeight: "75vh" }}>  
            <Button href="/new-professional" variant="success" className='mx-1 mb-3'>(+) Añadir nuevo Profesional</Button> 
  
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID del Professional</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <Pagination data={professionals} RenderComponent={TableRow} pageLimit={1} dataLimit={5} tablePagination={true} />
                </tbody>
            </Table>
        </Container>
    );
}

export default DashboardProfessionals;
