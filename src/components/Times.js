import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "../config/axiosInstance";
import { useUpdateAppointmentScheduleMutation } from "../services/appApi";
import { updateAppointmentsSchedule } from "../features/appointmentScheduleSlice";
import { updateAppointments } from "../features/appointmentSlice";
/* import './App.css'; */

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

const timesAux  = [
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

function Times(props) {
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);
  const [dataLs, setDataLs] = useState(null); 
  const [date2, setDate2] = useState(props.date2); 
  const user = useSelector((state) => state.user); 
  const appointment = useSelector((state) => state.appointments);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [service, setService] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [updateAppointmentSchedule, { isError, error, isLoading, isSuccess }] = useUpdateAppointmentScheduleMutation();
  const dispatch = useDispatch();
  


  useEffect(() => {
    axios.get("/appointments").then(({ data }) => dispatch(updateAppointments(data)));
  }, []); 


  useEffect(() => {
    axios.get("/appointmentsschedule").then(({ data }) => dispatch(updateAppointmentsSchedule(data)));
                                                                     
  }, []);     
  const appointmentsschedule = useSelector((state) => state.appointmentsSchedule);

  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
 
  const diaSeleccionado = dias[props.date.getDay()];

  const dia = appointmentsschedule.find((elemento) => elemento.appointmentDay === diaSeleccionado);

  /*Array con 7 elementos, por ejemplo, un elemento es el correspondiente al Jueves
  {
    "_id": "640fca11a3d343514f0758e1",
    "appointmentDay": "Jueves",
    "isEnabled": true,
    "appointmentTimes": [
        {
            "start": "3",
            "end": "15"
        },
        {
            "start": "30",
            "end": "42"
        }
    ],
    "__v": 0
}  */
 
  /*Este es el array con el esquema de horarios correspondientes al día props.date (Jueves)*/
 /* 
  "appointmentTimes": [    
    {
        "start": "3", 
        "end": "15"
    },

    {
        "start": "30",
        "end": "42"
    }
], 
Esta configuración significa que para el Jueves, los horarios disponibles son de "08:00" (posición 3 del array) a "12:00" (posición 15 del 
array) y de "17:00" (posición 30 del array) a "21:00" (posición 42 del array)

Debo armar un array con todos los horarios de esos rangos:

[
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
]
*/
 const timesServiceDay=[]
 dia.appointmentTimes.map((elemento) => {
  let i = parseInt(elemento.start)
  while ( i <= parseInt(elemento.end)){
    timesServiceDay.push(timesService[i]);
    i = i+1;
  }
})


const timesServiceDaySinRepetidos = timesServiceDay.filter((item, index)=>{
  return timesServiceDay.indexOf(item) === index;
})


  const appointmentSchedules=[]
  let time =  timesServiceDaySinRepetidos //timesService
  const today = new Date();
  
  if (props.date.toLocaleDateString() === today.toLocaleDateString()){
    if ( (dia.isEnabled===false) || (dia.appointmentTimes.length === 0) ){
      time = []
    }
    else{
      let hour = today.getHours().toString();   //17
      let minutes = today.getMinutes().toString(); //35       
      minutes = minutes.substring(0,1);
      console.log(minutes, "<<--- minutes")
      switch (minutes) {
        case '1':
          minutes = "0"
          break;
        case '3':
          minutes = "2"
          break;
        case '5':
          minutes = "4"
          break;        
        default:
          console.log(minutes, "minutes aceptados");
      }
      hour = hour +":"+minutes+"0"
      console.log(hour, "<<--hour")
      console.log(time, "time antes del splice")

      let idx = time.indexOf(hour);
      
      console.log(idx, "<<<--- idx")    
      if(idx !== undefined){
        if(time[idx+9] !== undefined){  
          time.splice(0, idx+9); 
        }
        else{
          time=[]
        }
      }
      
    }
  }else{
    
    if ( (dia.isEnabled===false) || (dia.appointmentTimes.length === 0) ){
      time = []
    }
    else{
      time = timesServiceDaySinRepetidos //timesAux  
    }
  }

  useEffect(() => {
    if (props.service_id === "service1"){
      setService("Diseño y perfilado de cejas")
      setIsEnabled(true)
    }  

    if (props.service_id === "service2"){
      setService("Diseño y perfilado + alisado de cejas")
      setIsEnabled(true)
    } 
    
    if (props.service_id === "service3"){
      setService("Alisado de cejas")
      setIsEnabled(true)
    }

}, []); 


  appointment.map(appointment => {
    if (appointment.appointmentDay === props.date.toLocaleDateString()  &&  appointment.appointmentServiceId === service ){
      appointmentSchedules.push(appointment.appointmentHour)      
    }
  });

 
  time = time.filter(item => !appointmentSchedules.includes(item)) 
 

  function displayInfo(e) {
    setInfo(true);
    setEvent(e.target.innerText);
    setDate2(props.date)    
    setDataLs({
                /* "appointmentProfessional":props.professionalName+" "+props.professionalLastName, */
                "appointmentDay":props.date.toLocaleDateString(),  
                "appointmentHour":e.target.innerText,
                "appointmentServiceId":props.service_id
              })
  }
  

  useEffect(() => {      
      localStorage.setItem('dataKeyAppointment', JSON.stringify(dataLs));
    }, [dataLs]);

  return (
    <Container>
      {time.map((times, i) => {
        return (
          <Button variant="outline-secondary" className="mx-1 my-1" onClick={(e) => displayInfo(e)} key={i}>
            {" "}{times}{" "}
          </Button>
        );
      })}

      <div>
        {info && (props.date === date2)
          ? `Turno seleccionado para el ${props.date.toLocaleDateString(undefined, options)} a las ${event}hs`
          : `Seleccione día y hora`}
      </div>

      {user && user.isAdmin && isEnabled && (
                        <LinkContainer to={`/new-appointment`}>
                          <Button
                            size="lg"
                            className="my-4"
                            variant="outline-secondary"
                            disabled={(info === false) || (props.date !== date2)}
                          >
                            Confirmar turno
                          </Button>        
                        </LinkContainer>
      )}

    </Container>
  );
}

export default Times;
