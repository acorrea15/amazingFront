import React from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
/* import { useDispatch, useSelector } from "react-redux";*/
import { useForm } from 'react-hook-form';
import ProfessionalPreview from "../components/ProfessionalPreview";
/* import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; */
import "./DashboardAppointments.css"; 


const DashboardAppointments = () => {

  /* const professionals = useSelector((state) => state.professionals); */

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data, "data!!");
    console.log(data, "data!!")
     
    window.location.href = `https://amazing-admin.netlify.app/service/${data.Service}`;

};
  console.log(errors);
  

  return (    
    <div className='form_service2'>
      <Container className='container-fluid form_service'>
        <Row className="justify-content-center align-items-center">
          <Col md={6}>  
            <div className='d-flex justify-content-center formulario-container'>
              <Form onSubmit={handleSubmit(onSubmit)}>
                  <h5 className='text-center'>Por favor seleccioná el servicio que desees:</h5>
                  <Form.Label>* Servicio:</Form.Label>
                  <Form.Select style={{ "border-color": "#717070", "box-shadow": "0 0 0 0.23rem rgba(56, 56, 56, 0.056)" }} {...register("Service", { required: true })}>          
                    <option value="service1">Diseño y perfilado de cejas</option>
                    <option value="service2">Diseño y perfilado + alisado de cejas</option> 
                    <option value="service3">Alisado de cejas</option>           
                  </Form.Select>        
                  <div className='text-center'>
                    <Button variant="outline-secondary" className='mt-3 form_service_button_continue' type="submit">Continuar</Button>
                  </div>
              </Form>
            </div>
          </Col>    
        </Row>
        {/*  <h2 className="texto p-2" >Seleccione el Profesional</h2>
          <div className="d-flex justify-content-center flex-wrap">
            {professionals.map(
                                (professional) => ( <ProfessionalPreview {...professional} /> )
                              )
            }
          </div> */}

      </Container> 
    </div>
  )
}

export default DashboardAppointments