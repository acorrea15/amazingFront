import React, {useEffect, useState } from 'react'
import {Alert, Container, Col, Form, Row, Button} from 'react-bootstrap';
import { useUpdateAppointmentScheduleMutation } from "../services/appApi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { updateAppointmentsSchedule } from "../features/appointmentScheduleSlice";
import '../pages/Calendar.css'
import Calendar from 'react-calendar';
import moment from 'moment';

function SelectRangeDays(props){

    const [idRange, setIdRange] = useState(""); 
    const [updateAppointmentSchedule, { isError, error, isLoading, isSuccess }] = useUpdateAppointmentScheduleMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mon, setMon]=useState([{"start": "", "end":""}]);   
    const [isEnabledMonday, setIsEnabledMonday]=useState(false);   
    const [isDisabledButton, setIsDisabledButton]=useState(true);   
    const [isErrorSelect, setIsErrorSelect]=useState(false);  
    const [mensaje, setMensaje]=useState("");  
    const [date, setDate] = useState(new Date());
    const [range, setRange] = useState(date);

    useEffect(() => {
        axios.get("/appointmentsschedule").then(({ data }) => dispatch(updateAppointmentsSchedule(data)));
        
    }, []);     

    const appointmentsschedule = useSelector((state) => state.appointmentsSchedule);

    console.log(appointmentsschedule, "<<<<<<appointmentsschedule INICIO SelectRangeDays>>>>>>>>>")
    

    /*
    {
        "_id": "6414b207e17bac72326989a2",
        "appointmentDay": "RANGOS",
        "isEnabled": true,
        "appointmentTimes": [],
        "__v": 0
    }
    */


    useEffect(() => {         
            const rangeFound = appointmentsschedule.find( element  =>   element.appointmentDay === "RANGOS"  );
            setIdRange(rangeFound._id); 
            setRange(rangeFound.appointmentTimes);
    } , []);    
 

    function setDateRanges(date){
        setDate(date);
        setRange(date);
        setIsDisabledButton(false);
    }


     function handleSubmit(e) {
        e.preventDefault();

        if (!range) {
            return alert("Por favor, complete todos los campos!");
        }         
          const id = idRange
          const isEnabled = true
          const appointmentTimes = date
          console.log(id, "id antes de grabar!") 
          updateAppointmentSchedule({id, isEnabled, appointmentTimes }).then(({ data }) => {
            if (data.length > 0) {
                /* setTimeout(() => {
                    navigate("/");
                }, 300); */
                console.log(data, "<<--data updateAppointmentSchedule");
                setIsDisabledButton(true);  
            }
        });  
    }



return(
    <> 
    <Container>
        <Row>
            <Col md={12} className="">
                <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                    {<h5 className="mt-4 text-center">Seleccione el rango de días para los turnos</h5>}
                    {isSuccess && <Alert variant="success">Actualización correcta del rango de turnos!</Alert>}
                    {isError && <Alert variant="danger">{error.data}</Alert>}                    
                    <Form.Group className="mb-3">
                                             
                    </Form.Group>               
                        <div className='text-center'>     
                            <div className="calendar-container abs-center">
                                <Calendar onChange={setDate} 
                                          value={date} 
                                          minDate={new Date(Date.now())}
                                          onClickDay={() => setDateRanges(date)} 
                                          selectRange={true}
                                />
                            </div>

                            {date.length > 0 ? (
                                <p>
                                    <span>Seleccionado <strong>Desde:</strong></span>{' '} {date[0].toLocaleDateString()}
                                    &nbsp; - &nbsp;
                                    <span><strong>Hasta:</strong></span> {date[1].toLocaleDateString()}
                                </p>
                                        ) : (
                                <p>
                                    {range.length > 0 ? (
                                                            <p>
                                                                <span>Almacenado <strong>Desde:</strong></span>{' '}  {moment(range[0]).format('DD/MM/YYYY')} 
                                                                &nbsp; - &nbsp;
                                                                <span><strong>Hasta:</strong></span>  {moment(range[1]).format('DD/MM/YYYY')} 
                                                            </p>
                                                        ) : 
                                                        (
                                                            <span><strong>Sin rango seleccionado</strong></span> 
                                                        )
                                    }
                                </p>
                                )
                            }
                        </div>
                                

                   <Form.Group className='text-center'> 
                            <Button className="mt-1 mb-3" type="submit"   disabled={isDisabledButton} variant={isDisabledButton === false ? 'danger' : 'secondary'}>
                                Guardar Rango {props.appointmentDay}
                            </Button>
                    </Form.Group>         

                </Form>
            </Col>        
        </Row>
    </Container>       

        
    </>
);
}

export default SelectRangeDays;