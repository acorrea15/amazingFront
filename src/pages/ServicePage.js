import axios from "../config/axiosInstance";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Container, Row, Col, Badge, ButtonGroup, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import "./ServicePage.css";
import { LinkContainer } from "react-router-bootstrap";
import './Calendar.css'
import Calendar from 'react-calendar';
import Time from '../components/Time'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useUpdateAppointmentScheduleMutation } from "../services/appApi";
import { updateAppointmentsSchedule } from "../features/appointmentScheduleSlice";
import { useDispatch, useSelector } from "react-redux";

function ServicePage() {
    const { id } = useParams();    
   
    const user = useSelector((state) => state.user);   
 
    const [date, setDate] = useState(new Date())
    const [date2, setDate2] = useState(new Date())
    const [showTime, setShowTime] = useState(true) 
    const [updateAppointmentSchedule, { isError, error, isLoading, isSuccess }] = useUpdateAppointmentScheduleMutation();
    const dispatch = useDispatch();
    const [range, setRange] = useState(new Date());
    const [hoy, setHoy] = useState(new Date());
    const [idRange, setIdRange] = useState(""); 
    const [isEnabled, setIsEnabled] = useState(false); 

    useEffect(() => {
        axios.get("/appointmentsschedule").then(({ data }) => dispatch(updateAppointmentsSchedule(data)));
        
    }, []);     

    const appointmentsschedule = useSelector((state) => state.appointmentsSchedule);

    useEffect(() => {         
        const rangeFound = appointmentsschedule.find( element  =>   element.appointmentDay === "RANGOS"  );
        setIdRange(rangeFound._id); 
        setRange(rangeFound.appointmentTimes);

        if (range.length > 0 ){
            setDate(new Date(range[0]))  
            const today = new Date();
            const range0 = new Date(range[0])
            console.log(today,  "<<--today " )
            console.log(range0,  "<<--range0 " )

            if(range0<=today){
                setHoy(today);
            }
            else{
                setHoy(range0);    
            }
        }

} , [range]); 

console.log(range, "<<<<-range")



   function setDateAux(date){ 
    setDate2(date);
    setIsEnabled(true);
   }

    return (        
        <Container className="pt-4" style={{ position: "relative", minHeight: "75vh" }}>
            <Row>
            <Col lg={2}>
            </Col>
                <Col lg={4}>    
                {(id === "service1") &&   ( <>
                        <h5 className="service_title">Amazing Look</h5>
                        <h3> <strong>Diseño y perfilado de cejas</strong></h3>
                        <h5 className="service_title"> <FontAwesomeIcon icon={faClock} /> 20 min</h5>
                        <h5 className="service_title"> <FontAwesomeIcon icon={faLocationDot} /> Amazing Look Studio</h5>
                        
                        <p> {`¡Hola! Aquí podes reservar tu turno para diseño y perfilado de cejas en Amazing Look. ¡ATENCION a los siguientes ítems!`} </p>
                        <p> {`> Tiempo de demora perfilado -> 20' `} </p>
                        <p> {`> Lourdes atiende los días Martes y Jueves por la tarde, Martu atiende los días Lunes y Miércoles por la tarde & Jueves por la mañana.`} </p>
                        <p> {`> El precio del diseño y perfilado de cejas con Lourdes es de $1800`} </p>
                        <p> {`> El precio del diseño y perfilado de cejas con Martu es de $1500`} </p>
                        <p> {`> El local se encuentra FRENTE al estacionamiento (parte trasera de la Galeria Handicap Mall)`} </p>
                        <p> {`> En caso de no poder asistir a tu turno, la cancelación del mismo se hace a traves del LINK del mail de confirmación.`} </p>
                        <p> {`> En caso de no poder asistir y no cancelar, se debera abonar el turno en su totalidad.`} </p>
                        <p> {`> Rogamos puntualidad. El tiempo de tolerancia son 5' `} </p>
                        <p> {`¡Gracias! Te esperamos en Amazing`} </p>  </> )  }
                
                {(id === "service2") &&   ( <>
                    <h5 className="service_title">Amazing Look</h5>
                        <h3> <strong>Diseño y perfilado + alisado de cejas</strong></h3>
                        <h5 className="service_title"> <FontAwesomeIcon icon={faClock} /> 20 min</h5>
                        <h5 className="service_title"> <FontAwesomeIcon icon={faLocationDot} /> Amazing Look Studio</h5>

                        <p> {`¡Hola! Aquí podes reservar tu turno para diseño y perfilado de cejas y alisado en Amazing Look. ¡ATENCION a los siguientes ítems!`} </p>
                        <p> {`> Tiempo de demora perfilado + alisado -> 1 hs`} </p>
                        <p> {`> Lourdes atiende los días Martes y Jueves por la tarde, Martu atiende los días Lunes y Miércoles por la tarde & Jueves por la mañana.`} </p>
                        <p> {`> El precio del diseño y perfilado de cejas con Lourdes + alisado es de $4200`} </p>
                        <p> {`> El precio del diseño y perfilado de cejas con Martu + alisado es de $3900`} </p>
                        <p> {`> El local se encuentra FRENTE al estacionamiento (parte trasera de la Galeria Handicap Mall)`} </p>
                        <p> {`> En caso de no poder asistir a tu turno, la cancelación del mismo se hace a traves del LINK del mail de confirmación.`} </p>
                        <p> {`> En caso de no poder asistir y no cancelar, se debera abonar el turno en su totalidad.`} </p>
                        <p> {`> Rogamos puntualidad. El tiempo de tolerancia son 5'`} </p>
                        <p> {`¡Gracias! Te esperamos en Amazing`} </p>  </> )  }    
                
                {(id === "service3") &&   ( <>
                    <h5 className="service_title">Amazing Look</h5>
                        <h3> <strong>Alisado de cejas</strong></h3>
                        <h5 className="service_title"> <FontAwesomeIcon icon={faClock} /> 20 min</h5>
                        <h5 className="service_title"> <FontAwesomeIcon icon={faLocationDot} /> Amazing Look Studio</h5>

                        <p> {`¡Hola! Aquí podes reservar tu turno para alisado de cejas en Amazing Look. ¡ATENCION a los siguientes ítems!`} </p>
                        <p> {`> Tiempo de demora alisado -> 20' `} </p>
                        <p> {`> Lourdes atiende los días Martes y Jueves por la tarde, Martu atiende los días Lunes y Miércoles por la tarde & Jueves por la mañana.`} </p>
                        <p> {`> El precio del alisado de cejas con Lourdes es de $XXXX`} </p>
                        <p> {`> El precio del alisado de cejas con Martu es de $XXXX`} </p>
                        <p> {`> El local se encuentra FRENTE al estacionamiento (parte trasera de la Galeria Handicap Mall)`} </p>
                        <p> {`> En caso de no poder asistir a tu turno, la cancelación del mismo se hace a traves del LINK del mail de confirmación.`} </p>
                        <p> {`> En caso de no poder asistir y no cancelar, se debera abonar el turno en su totalidad.`} </p>
                        <p> {`> Rogamos puntualidad. El tiempo de tolerancia son 5'`} </p>
                        <p> {`¡Gracias! Te esperamos en Amazing`} </p>  </> )  }   
                </Col> 
              
                <Col lg={5}>
                    <div className="text-center">     
                        <div className="calendar-container abs-center">
                            <Calendar onChange={setDate} 
                                      value={date} 
                                      minDate={new Date(hoy)}
                                      maxDate={new Date(range[1])}
                                      onClickDay={() => setDateAux(date)} 
                                      key={1}
                            />
                        </div>

                        <div>
                            <div className="fw-bold fs-5 my-3">
                                { isEnabled && <>  Turnos disponibles para el {date.toLocaleDateString()}</>}
                            </div>
                            <Time showTime={isEnabled} date={date} date2={date2} service_id={id}/>
                        </div>

                    </div>
                </Col>

            </Row>
        </Container>
    );
}

export default ServicePage;
