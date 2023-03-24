import React, {useEffect, useState } from 'react'
import {Alert, Container, Col, Form, Row, Button} from 'react-bootstrap';
import { useUpdateAppointmentScheduleMutation } from "../services/appApi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { updateAppointmentsSchedule } from "../features/appointmentScheduleSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import '../pages/Calendar.css'
import './AppointmentSchedule.css'
const times =  [{"start": "07:00", "end":"07:00"}, 
                {"start": "07:20", "end":"07:20"},
                {"start": "07:40", "end":"07:40"},
                {"start": "08:00", "end":"08:00"},
                {"start": "08:20", "end":"08:20"},
                {"start": "08:40", "end":"08:40"},
                {"start": "09:00", "end":"09:00"},
                {"start": "09:20", "end":"09:20"},
                {"start": "09:40", "end":"09:40"},
                {"start": "10:00", "end":"10:00"},
                {"start": "10:20", "end":"10:20"},
                {"start": "10:40", "end":"10:40"},
                {"start": "11:00", "end":"11:00"},
                {"start": "11:20", "end":"11:20"},
                {"start": "11:40", "end":"11:40"},
                {"start": "12:00", "end":"12:00"},
                {"start": "12:20", "end":"12:20"},
                {"start": "12:40", "end":"12:40"},
                {"start": "13:00", "end":"13:00"},
                {"start": "13:20", "end":"13:20"},
                {"start": "13:40", "end":"13:40"},
                {"start": "14:00", "end":"14:00"},
                {"start": "14:20", "end":"14:20"},
                {"start": "14:40", "end":"14:40"},
                {"start": "15:00", "end":"15:00"},
                {"start": "15:20", "end":"15:20"},
                {"start": "15:40", "end":"15:40"},
                {"start": "16:00", "end":"16:00"},
                {"start": "16:20", "end":"16:20"},
                {"start": "16:40", "end":"16:40"},
                {"start": "17:00", "end":"17:00"},
                {"start": "17:20", "end":"17:20"},
                {"start": "17:40", "end":"17:40"},
                {"start": "18:00", "end":"18:00"},
                {"start": "18:20", "end":"18:20"},
                {"start": "18:40", "end":"18:40"},
                {"start": "19:00", "end":"19:00"},
                {"start": "19:20", "end":"19:20"},
                {"start": "19:40", "end":"19:40"},
                {"start": "20:00", "end":"20:00"},
                {"start": "20:20", "end":"20:20"},
                {"start": "20:40", "end":"20:40"},
                {"start": "21:00", "end":"21:00"},
                {"start": "21:20", "end":"21:20"},
                {"start": "21:40", "end":"21:40"},
                {"start": "22:00", "end":"22:00"} ]


function AppointmentSchedule(props){

    /* const [id, setId] = useState("");  */
    const [idMon, setIdMon] = useState(""); 
    const [appointmentTimesMon, setAppointmentTimesMon] = useState([]);
    const [updateAppointmentSchedule, { isError, error, isLoading, isSuccess }] = useUpdateAppointmentScheduleMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mon, setMon]=useState([{"start": "", "end":""}]);   
    const [isEnabledMonday, setIsEnabledMonday]=useState(false);   
    const [isEnabledButton, setIsEnabledButton]=useState(true);   
    const [isErrorSelect, setIsErrorSelect]=useState(false);  
    const [mensaje, setMensaje]=useState("");  

    useEffect(() => {
        axios.get("/appointmentsschedule").then(({ data }) => dispatch(updateAppointmentsSchedule(data)));
        
    }, []);     

    const appointmentsschedule = useSelector((state) => state.appointmentsSchedule);

    console.log(appointmentsschedule, "<<<<<<appointmentsschedule INICIO>>>>>>>>>")

    useEffect(() => {
        
        appointmentsschedule.map((item)=> {
                                            if(item.appointmentDay === props.appointmentDay){
                                                if(item.isEnabled===true){
                                                    setIsEnabledMonday(true);
                                                }
                                                else{
                                                    setIsEnabledMonday(false);
                                                }   
                                                    const monday=[...item.appointmentTimes]; 
                                                    setMon(monday);    
                                                    setAppointmentTimesMon(monday);
                                                    setIdMon(item._id)                   
                                                }
                                            }
            )
            }, []); 

    
 
    /*Schedule Monday*/      
    const handleAddMon=()=>{ 
        
        const monday=[...mon,{"start": "Inicio", "end":"Fin"}] 
        setMon(monday) 
    }   

    const handleChangeMonStart=(onChangeValue,i)=>{  
        const inputdata=[...mon] 

        if ( (inputdata.length>=2) && ( parseInt(onChangeValue.target.value) <= parseInt(inputdata[inputdata.length-2].end) ) ){ 
            setIsErrorSelect(true);
            setMensaje(`Seleccione un  horario de Inicio mayor a ${times[parseInt(inputdata[inputdata.length-2].end)].end  }!`)
            setIsEnabledButton(true)   
        }
        else{
            if (parseInt(onChangeValue.target.value) >= parseInt(inputdata[i].end)){
                setIsErrorSelect(true);
                setMensaje(`El horario de Inicio ${times[parseInt(onChangeValue.target.value)].end } no puede ser mayor o igual al de Fin ${ times[parseInt(inputdata[i].end)].end  }!`)
                setIsEnabledButton(true)             
            }  
            else{
                setIsErrorSelect(false);
                setIsEnabledButton(false)    
            }   
        }
       
        inputdata[i] = {
            "start": onChangeValue.target.value,
            "end": inputdata[i].end
        } 
        setMon (inputdata) 
        setAppointmentTimesMon(inputdata)
        setIdMon(idMon/* appointmentsschedule[6]._id */)   /*Monday*/  
    }
   
    const handleChangeMonEnd=(onChangeValue,i)=>{         
        const inputdata=[...mon]  
        if (parseInt(inputdata[i].start) >=  parseInt(onChangeValue.target.value) )      {
            setIsErrorSelect(true);
            setMensaje(`El horario de Fin ${times[parseInt(onChangeValue.target.value)].end} no puede ser menor o igual al de Inicio ${ times[parseInt(inputdata[i].start)].start  }!`)
            setIsEnabledButton(true)             
        }  
        else{
            setIsErrorSelect(false);
            setIsEnabledButton(false)    
        }
        
        inputdata[i] = {
            "start": inputdata[i].start,
            "end": onChangeValue.target.value
        } 
        setMon (inputdata) 
        setAppointmentTimesMon(inputdata)
        setIdMon(idMon /* appointmentsschedule[6]._id */)   /*Monday*/  
    }     

    const handleDeleteMon=(i)=>{ 
        const deletMon=[...mon] 
        setIsEnabledButton(false) 
        deletMon.splice(i, 1) 
        setMon (deletMon)
        setAppointmentTimesMon(deletMon)
        setIdMon(idMon /* appointmentsschedule[6]._id */)  /*Monday*/  
    }
   

    /*  /*Schedule Tuesday* /
     const [tue, setTue]=useState([{"start": "", "end":""}]);   
     const handleAddTue=()=>{ 
         const tuesday=[...tue,{"start": "", "end":""}] 
         setTue(tuesday)       
          
     }     
     const handleChangeTueStart=(onChangeValue,i)=>{ 
         const inputdata=[...tue]
         inputdata[i].start = onChangeValue.target.value
         setTue (inputdata) 
     }
     const handleChangeTueEnd=(onChangeValue,i)=>{         
         const inputdata=[...tue]        
         inputdata[i].end = onChangeValue.target.value; 
         setTue (inputdata) 
     }        
     const handleDeleteTue=(i)=>{ 
         const deletTue=[...tue] 
         deletTue.splice(i, 1) 
         setTue (deletTue)
     }
 */


     const handleCheckboxChange = (event) => {
        setIsEnabledMonday(event.target.checked) 
        setIsEnabledButton(false)  
        setIdMon(idMon /* appointmentsschedule[6]._id */)  /*Monday*/  
     };


     function handleSubmit(e) {
        e.preventDefault();

        if (!appointmentTimesMon) {
            return alert("Por favor, complete todos los campos!");
        }         
          const id = idMon
          const isEnabled = isEnabledMonday
          const appointmentTimes = appointmentTimesMon
          console.log(id, "id antes de grabar!") 
          updateAppointmentSchedule({id, isEnabled, appointmentTimes }).then(({ data }) => {
            if (data.length > 0) {
                /* setTimeout(() => {
                    navigate("/");
                }, 300); */
                console.log(data, "<<--data updateAppointmentSchedule");
                setIsEnabledButton(true);  
            }
        });  
    }



return(
    <> 
    <Container>
        <Row className="d-flex justify-content-center align-items-center">
            <Col md={6} className="form_appointment">
                <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                    {/* <h2 className="mt-4">Configuración del esquema de turnos</h2> */}
                    {isSuccess && <Alert variant="success">Esquema de turnos actualizado correctamente para el día {props.appointmentDay}</Alert>}
                    {isError && <Alert variant="danger">{error.data}</Alert>}                    
                    <Form.Group className="mb-3">
                            <div>  
                                <Form.Check style={{ fontWeight: 'bold' }}
                                    inline
                                    label= {props.appointmentDay}
                                    name="group1"
                                    type={'checkbox'}
                                    id={`inline-{'checkbox'}-1`}
                                    checked={isEnabledMonday}
                                    onChange={handleCheckboxChange}
                                />
                                <Button onClick={() =>handleAddMon()} className="my-4" disabled={!isEnabledMonday} variant="outline-secondary"> + </Button> 
                                {isErrorSelect && <Alert variant="danger">{mensaje}</Alert>} 
                                { isEnabledMonday &&  <>
                                    {mon.map((data,i)=>{
                                        return(
                                            <div>
                                                <Form className='text-center'>
                                                    <Row>
                                                        <Col  xs={4} sm={4} md={4} lg={4} className="mb-2 container-fluid">
                                                            <Form.Select style={{"font-size": "97%"}} value={data.start} onChange={e=>handleChangeMonStart (e,i)} key={i}>
                                                                <option disabled>Inicio</option>
                                                                {times.map((elemento, j)=>{                                                                                                           
                                                                    return( 
                                                                        <option  value={j}>{elemento.start}</option>)                                                                                                                                        
                                                                })}
                                                            </Form.Select> 
                                                        </Col>
                                                         -
                                                        <Col xs={4} sm={4} md={4} lg={4} >
                                                            <Form.Select style={{"font-size": "97%"}} value={data.end} onChange={e=>handleChangeMonEnd (e,i)} key={i+50}>
                                                                <option disabled>Fin</option>
                                                                {times.map((elemento, j)=>{                                            
                                                                    return( 
                                                                        <option value={j}>{elemento.end}</option>)
                                                                })}
                                                            </Form.Select>                            
                                                        </Col>                                                        
                                                        
                                                        <Col>
                                                            <Button onClick={() =>handleDeleteMon(i)} key={i+100} variant="outline-secondary"> <FontAwesomeIcon icon={faTrashCan} /> </Button>                                 
                                                        </Col>
                                                    </Row>
                                                </Form>                    
                                            </div>
                                        )
                                                         })}
                                                      </>
                                }
                            </div>                    
                    </Form.Group>               
             

                   <Form.Group className='text-center'> 
                            <Button className="mt-1 mb-3" type="submit"   disabled={isEnabledButton} variant={isEnabledButton === false ? 'danger' : 'secondary'}>
                                Guardar esquema día {props.appointmentDay}
                            </Button>
                    </Form.Group>         

                </Form>
            </Col>        
        </Row>
    </Container>       

        
    </>
);
}

export default AppointmentSchedule;