import {useState} from 'react';
import Calendar from 'react-calendar';
/* import './App.css'; */
import Times from '../components/Times'

import React from 'react'

function Time(props) {
 
 return (
    <div>
        {props.showTime ? <Times date={props.date} date2={props.date2} service_id={props.service_id}/> : <div className="fw-bold fs-5 my-3">Seleccione el día del turno</div>}
    </div>
  )
}

export default Time;