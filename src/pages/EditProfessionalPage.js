import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProfessionalMutation } from "../services/appApi";
import axios from "../config/axiosInstance";
/* import "./NewProfessional.css"; */

function EditProfessionalPage() {
    const { id } = useParams();

    console.log(id, "idididididididididididididididididxxx")
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(null);
    const [specialty, setSpecialty] = useState("");
    /* const [admissionDate, setAdmissionDate] = useState(null); */
    const [picture, setPicture] = useState(null);
    

    const navigate = useNavigate();
    const [updateProfessional, { isError, error, isLoading, isSuccess }] = useUpdateProfessionalMutation();

    useEffect(() => {
        axios
            .get("/professionals/" + id)
            .then(({ data }) => {
                const professional = data.professional;
                setName(professional.name);
                setLastName(professional.lastName);
                setAddress(professional.address);
                setEmail(professional.email);
                setPhone(professional.phone);
                setSpecialty(professional.specialty);
                setPicture(professional.picture);
            })
            .catch((e) => console.log(e));
    }, [id]);


    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !lastName || !address || !email || !phone || !specialty || !picture) {
            return alert("Por favor, complete todos los campos!");
        }
        updateProfessional({  id , name, lastName, address, email, phone, specialty, picture }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }


    return (
        <Container>
            <Row>
                <Col md={6} className="">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Editar Profesional</h1>
                        {isSuccess && <Alert variant="success">Profesional actualizado correctamente</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                       
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Profesional</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el nombre del profesional" value={name} maxlength="40" required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Apellido del Profesional</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el apellido del profesional" value={lastName} maxlength="40" required onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese la dirección del profesional" value={address} maxlength="40" required onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Ingrese el email del profesional" value={email} maxlength="40" required onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
 
                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el teléfono del profesional" value={phone} maxlength="40" required onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setSpecialty(e.target.value)}>
                            <Form.Label>Especialidad</Form.Label>
                            <Form.Select value={specialty}>
                                <option disabled selected>
                                    -- Seleccionar --
                                </option>
                                <option value="Perfilado de Cejas">Perfilado de Cejas</option>
                                <option value="Tratamientos capilares">Tratamientos capilares</option>
                                <option value="Manicura">Manicura</option>
                                <option value="Maquillaje facial">Maquillaje facial</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el teléfono del profesional" value={picture} maxlength="250" required onChange={(e) => setPicture(e.target.value)} />
                        </Form.Group>                


                        <Form.Group>
                            <Button className="mb-5" type="submit" disabled={isLoading || isSuccess}>
                                Actualizar Profesional
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                {/* <Col md={6} className=""></Col> */}
            </Row>
        </Container>
    );
}

export default EditProfessionalPage;
