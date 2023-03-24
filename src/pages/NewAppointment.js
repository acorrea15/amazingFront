import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCreateAppointmentMutation } from "../services/appApi";
/* import axios from "../config/axiosInstance"; */
import { v4 as uuidv4 } from 'uuid';
import "./NewAppointment.css";


const timesService  = [
    "07:00",
    "07:20",
    "07:40",
    "08:00",
    "08:20",
    "08:40",
    "09:00",
    "09:20",
    "09:40",
    "10:00",
    "10:20",
    "10:40",
    "11:00",
    "11:20",
    "11:40",
    "12:00",
    "12:20",
    "12:40",
    "13:00",
    "13:20",
    "13:40",
    "14:00",
    "14:20",
    "14:40",
    "15:00",
    "15:20",
    "15:40",
    "16:00",
    "16:20",
    "16:40",
    "17:00",
    "17:20",
    "17:40",
    "18:00",
    "18:20",
    "18:40",
    "19:00",
    "19:20",
    "19:40",
    "20:00",
    "20:20",
    "20:40",
    "21:00",
    "21:20",
    "21:40",
    "22:00"
  ]; 


function NewAppointment() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");    
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dni, setDni] = useState("");
    const [professional, setProfessional] = useState("");
    const [appointmentDay, setAppointmentDay] = useState("");
    const [appointmentHourLs, setAppointmentHourLs] = useState("");
    const [appointmentHour1, setAppointmentHour1] = useState("");
    const [appointmentHour2, setAppointmentHour2] = useState("");
    const [appointmentHour3, setAppointmentHour3] = useState("");
    const [appointmentServiceLs, setAppointmentServiceLs] = useState("");
    const [appointmentService2, setAppointmentService2] = useState("")

    const navigate = useNavigate();
    const [createAppointment, { isError, error, isLoading, isSuccess }] = useCreateAppointmentMutation();

    const [items, setItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('dataKeyAppointment'));
        if (items) {
         setItems(items);
         setProfessional(" "/* items.appointmentProfessional */);
         setAppointmentDay(items.appointmentDay);
         setAppointmentHourLs(items.appointmentHour);
         setAppointmentServiceLs(items.appointmentServiceId);
        }

      }, []);

    
    
    switch (appointmentServiceLs) {
        case 'service1': 
            setAppointmentServiceLs("Diseño y perfilado de cejas");
            break;
        case 'service2':    
            setAppointmentServiceLs("Diseño y perfilado + alisado de cejas");
            break;  
        case 'service3':    
            setAppointmentServiceLs("Alisado de cejas");
            break;        
        default:
          /* console.log(`appointmentServiceLs no está llegando a NewAppointment.js`); */
      }

      
    function handleSubmit(e) {
        e.preventDefault();

        console.log(appointmentServiceLs, "<<xxx-- appointmentServiceLs NewAppointment")

        const appointmentServiceId = appointmentServiceLs
        const appointmentHour = appointmentHourLs
        const id_turnos = uuidv4(); /*Genero mismo id único para los turnos de las diferentes agendas*/

        console.log(id_turnos, "<<--id_turnos")

        if (!name || !lastName || !email || !phone || !professional || !appointmentDay || !appointmentHour || !appointmentServiceId || !dni || !id_turnos) {
            console.log(name ,lastName ,email ,phone ,professional ,appointmentDay ,appointmentHour ,appointmentServiceId, "<<<<---")
            return alert("Por favor complete todos los campos para dar de alta el nuevo turno!");
        }              

        const sendEmail = true

        createAppointment({ name, lastName, email, phone, professional, appointmentDay, appointmentHour, appointmentServiceId, sendEmail, dni, id_turnos }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                   /*  navigate("/admin");  */
                }, 100);
            }
        });

       

        if(appointmentServiceLs === "Diseño y perfilado + alisado de cejas"){ 
            var indice = timesService.indexOf(appointmentHourLs);
            console.log(indice, "<<-- indice? NewAppointment Diseño y perfilado + alisado de cejas")
            console.log(appointmentServiceLs, "<<-- appointmentServiceLs NewAppointment") // Diseño y perfilado + alisado de cejas
            console.log(appointmentHourLs, "<<-- appointmentHourLs NewAppointment") //20:20

            if (indice > -1 ){   
                
                if (timesService[indice] !== undefined){
                    const hour = timesService[indice];                  
                    
                    const appointmentServiceId = "Alisado de cejas"
                    const appointmentHour = hour
            
                    if (!name || !lastName || !email || !phone || !professional || !appointmentDay || !appointmentHour || !appointmentServiceId || !dni || !id_turnos) {
                        console.log(name ,lastName ,email ,phone ,professional ,appointmentDay ,appointmentHour ,appointmentServiceId, "<<<<---")
                        return alert("Por favor complete todos los campos para dar de alta el nuevo turno!");
                    }              
            
                    console.log(appointmentHour1, appointmentHour2, appointmentService2, "<<-xzxzxz- appointmentHour1, appointmentHour2, appointmentService2")
                    createAppointment({ name, lastName, email, phone, professional, appointmentDay, appointmentHour, appointmentServiceId, dni, id_turnos }).then(({ data }) => {
                        if (data.length > 0) {
                            setTimeout(() => {
                               /* navigate("/admin"); */
                            }, 100);
                        }
                    });     
                    
                    console.log(hour, "hour2!!!") 
                }
                              
                if (timesService[(indice+1)+1] !== undefined){
                    const hour = timesService[(indice+1)+1];                  
                    
                    const appointmentServiceId = "Diseño y perfilado de cejas"
                    const appointmentHour = hour
            
                    if (!name || !lastName || !email || !phone || !professional || !appointmentDay || !appointmentHour || !appointmentServiceId || !dni || !id_turnos) {
                        console.log(name ,lastName ,email ,phone ,professional ,appointmentDay ,appointmentHour ,appointmentServiceId, "<<<<---")
                        return alert("Por favor complete todos los campos para dar de alta el nuevo turno!");
                    }              
            
                    console.log(appointmentHour1, appointmentHour2, appointmentService2, "<<-xzxzxz- appointmentHour1, appointmentHour2, appointmentService2")
                    createAppointment({ name, lastName, email, phone, professional, appointmentDay, appointmentHour, appointmentServiceId, dni, id_turnos }).then(({ data }) => {
                        if (data.length > 0) {
                            setTimeout(() => {
                               /* navigate("/admin"); */
                            }, 100);
                        }
                    });     
                    
                    console.log(hour, "hour2!!!") 
                }
            }
            
        } 

        if(appointmentServiceLs === "Diseño y perfilado de cejas"){ 
            var indice = timesService.indexOf(appointmentHourLs);
            console.log(indice, "<<-- indice? NewAppointment Diseño y perfilado de cejas")
            console.log(appointmentServiceLs, "<<-- appointmentServiceLs NewAppointment Diseño y perfilado de cejas") // Diseño y perfilado de cejas
            console.log(appointmentHourLs, "<<-- appointmentHourLs NewAppointment Diseño y perfilado de cejas") //20:20

            if (indice > -1 ){                 
                
                if (timesService[(indice-1)-1] !== undefined){
                    const hour = timesService[(indice-1)-1];                  
                    
                    const appointmentServiceId = "Diseño y perfilado + alisado de cejas"
                    const appointmentHour = hour
            
                    if (!name || !lastName || !email || !phone || !professional || !appointmentDay || !appointmentHour || !appointmentServiceId || !dni || !id_turnos) {
                        console.log(name ,lastName ,email ,phone ,professional ,appointmentDay ,appointmentHour ,appointmentServiceId, "<<<<---")
                        return alert("Por favor complete todos los campos para dar de alta el nuevo turno!");
                    }              
            
                    console.log(appointmentHour1, appointmentHour2, appointmentService2, "<<-xzxzxz- appointmentHour1, appointmentHour2, appointmentService2")
                    createAppointment({ name, lastName, email, phone, professional, appointmentDay, appointmentHour, appointmentServiceId, dni, id_turnos }).then(({ data }) => {
                        if (data.length > 0) {
                            setTimeout(() => {
                               /* navigate("/admin"); */
                            }, 100);
                        }
                    });                         
                    console.log(hour, "hour2!!!") 
                }
            }
            
        } 

        /* setTimeout(() => {
           if(!isError)
                 navigate("/admin"); 
         }, 1500); */
    }

    function regresar(){
        navigate(`/service/${items.appointmentServiceId}`)
    }

    return ( 
        <Container>
            <Row  className="d-flex justify-content-center align-items-center">
                <Col md={6} className="form_appointment">
                    
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            
                            <h5 className="mt-4 mb-4 text-center">{appointmentServiceLs}</h5>  
                            <Form.Group as={Col} md="12" className="mb-3">  
                                <hr />  
                            </Form.Group>  
                            <div className="ml-4 mr-4">
                                {isSuccess && <Alert variant="success">Turno creado de forma exitosa. Verificá tu email!</Alert>}
                                {isError && <Alert variant="danger">{error.data}</Alert>}                            
                            </div>
                            <Form.Group as={Col} md="3" className="mb-3">
                                <Form.Label>Fecha:</Form.Label>
                                <Form.Control type="text" value={appointmentDay} disabled />
                            </Form.Group>

                            <Form.Group as={Col} md="2" className="mb-3">
                                <Form.Label>Hora:</Form.Label>
                                <Form.Control type="text" value={appointmentHourLs} disabled />
                            </Form.Group>

                            <Form.Group as={Col} md="7"  className="mb-3">
                                <Form.Label>Ubicación:</Form.Label>
                                <Form.Control type="text" value="Lobo de la Vega 202, Yerba Buena" disabled />
                            </Form.Group>
                            
                            <Form.Group as={Col} md="6" className="mb-3">
                                <Form.Label>* Nombre:</Form.Label>
                                <Form.Control type="text" placeholder="" value={name} maxLength="40" required onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} md="6" className="mb-3">
                                <Form.Label>* Apellido:</Form.Label>
                                <Form.Control type="text" placeholder="" value={lastName} maxLength="40" required onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} md="6" className="mb-3">
                                <Form.Label>* Correo Electrónico:</Form.Label>
                                <Form.Control type="email" placeholder="ejemplo@correo.com" value={email} maxLength="40" required onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
    
                            <Form.Group as={Col} md="6" className="mb-3">
                                <Form.Label>* Teléfono:</Form.Label>
                                <Form.Control type="text" placeholder="(381) 1234 567" value={phone} maxLength="40" required onChange={(e) => setPhone(e.target.value)} />
                            </Form.Group>

                            <Form.Group as={Col} md="6" className="mb-3">
                                <Form.Label>* DNI:</Form.Label>
                                <Form.Control type="text" placeholder="" value={dni} maxLength="40" required onChange={(e) => setDni(e.target.value)} />
                            </Form.Group>

                            {/* <Form.Group className="mb-3">
                                <Form.Label>Profesional</Form.Label>
                                <Form.Control type="text" defaultValue={professional} disabled />
                            </Form.Group> */}      
                            <Form.Group as={Col} md="12" className="mb-3">  
                                <hr />  
                            </Form.Group>    

                           {/*  <div className ="position-relative">
                                <h5 className = "position-absolute top-0 start-2">Precio Base</h5>                                 
                                <h5 class="position-absolute top-0 end-0">$4000</h5>
                            </div>       */}      

                    </Row>
                        <Form.Group className="d-flex justify-content-center align-items-center">
                            <Button variant="outline-secondary" className="mt-3 mb-1 mx-4" type="submit" onClick={() => regresar()}>
                                Volver
                            </Button>
                            <Button variant="outline-secondary" className="mt-3 mb-1" type="submit" disabled={isLoading || isSuccess}>
                                Confirmar
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                {/* <Col md={6} className=""></Col> */}
            </Row>
        </Container>
    );
}

export default NewAppointment;
