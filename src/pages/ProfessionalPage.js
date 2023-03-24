import axios from "../config/axiosInstance";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Container, Row, Col, Badge, ButtonGroup, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
/* import SimilarProfessional from "../components/SimilarProfessional"; */
import "./ProfessionalPage.css";
import { LinkContainer } from "react-router-bootstrap";
import './Calendar.css'
import Calendar from 'react-calendar';
import Time from '../components/Time'
 
function ProfessionalPage() {
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [professional, setProfessional] = useState(null);
    const [date, setDate] = useState(new Date())
    const [date2, setDate2] = useState(new Date())
    const [showTime, setShowTime] = useState(true) 
    /* const [similar, setSimilar] = useState(null); */
 
  /*   const handleDragStart = (e) => e.preventDefault(); */
    
    useEffect(() => {
        axios.get(`/professionals/${id}`).then(({ data }) => {
            setProfessional(data.professional);
            /* setSimilar(data.similar); */
        });
    }, [id]);

    if (!professional) {
        return <Loading />;
    }
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

  /*   const images = professional.pictures.map((picture) => <img className="professional__carousel--image" src={picture.url} onDragStart={handleDragStart} />); */
    /*  let similarProfessionals = []; 
    if (similar) {
        similarProfessionals = similar.map((professional, idx) => (
            <div className="item" data-value={idx}>
                <SimilarProfessional {...professional} />
            </div>
        ));
    }*/ 


    return (        
        <Container className="pt-4" style={{ position: "relative", minHeight: "75vh" }}>
            <Row>
                <Col lg={3}>
                    <img src={professional.picture} className="professional__carousel--image" />
                    {/* <AliceCarousel mouseTracking items={professional.picture} controlsStrategy="alternate" /> */}
                </Col>
                <Col lg={3} className="pt-4">
                    <h1>{professional.name} {professional.lastName}</h1>
                    <p>
                        <Badge bg="primary">{professional.specialty}</Badge>
                    </p>
                    
                    <p style={{ textAlign: "justify" }} className="py-1">
                        <strong>Teléfono:</strong> {professional.phone}                        
                    </p>

                    <p style={{ textAlign: "justify" }} className="py-1">
                        <strong>Email:</strong> {professional.email}                      
                    </p>

                    <p style={{ textAlign: "justify" }} className="py-1">
                        <strong>Dirección:</strong> {professional.address}                   
                    </p>

                    {user && user.isAdmin && (
                        <LinkContainer to={`/professional/${professional._id}/edit`}>
                            <Button size="lg" className="mb-4">Editar Profesional</Button>
                        </LinkContainer>
                    )}                     
                </Col>
              
                <Col lg={6}>
                    <div className="text-center">     
                        <div className="calendar-container abs-center">
                            <Calendar onChange={setDate} value={date} 
                                      minDate={new Date(Date.now())}
                                      onClickDay={() => setDate2(date)} 
                            />
                        </div>

                        <div>
                            <div className="fw-bold fs-5 my-3">
                                Turnos disponibles para el {date.toLocaleDateString()}
                            </div>
                            <Time showTime={showTime} date={date} date2={date2} professionalName={professional.name} professionalLastName={professional.lastName}/>
                        </div>

                    </div>
                </Col>

            </Row>
{/*             <div className="my-4">
                <h2>Profesionales con especialidades similares</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <AliceCarousel mouseTracking items={similarProfessionals} responsive={responsive} controlsStrategy="alternate" />
                </div>
            </div> */}
        </Container>
    );
}

export default ProfessionalPage;
