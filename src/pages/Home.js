import axios from "../config/axiosInstance";
import React, { useEffect } from "react";
/* import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom"; */
/* import categories from "../categories"; */
/* import "./Home.css"; */
import { useDispatch, useSelector } from "react-redux";
import { updateProfessionals } from "../features/professionalSlice";
import { updateAppointments } from "../features/appointmentSlice";
import { updateAppointmentsSchedule } from "../features/appointmentScheduleSlice";
/*import ProductPreview from "../components/ProductPreview";
import Carrusel from "../components/Carrusel"; */
import Image from 'react-bootstrap/Image'


function Home() {
    const dispatch = useDispatch();
    const professionals = useSelector((state) => state.professionals);
    /* const appointments = useSelector((state) => state.appointments); */
    console.log(professionals, "<<<<---professionals HOME!")
        /*const lastProfessionals = products.slice(0, 8);*/
    useEffect(() => {
        axios.get("/professionals").then(({ data }) => dispatch(updateProfessionals(data)));
    }, []);  

    useEffect(() => {
        axios.get("/appointments").then(({ data }) => dispatch(updateAppointments(data)));
    }, []); 

    useEffect(() => {
        axios.get("/appointmentsSchedule").then(({ data }) => dispatch(updateAppointmentsSchedule(data)));
    }, []); 

    return (
        
        <div className="body p-2">
                    {/* <Carrusel/>
            
            <div className="featured-products-container container mt-4">
                <div className="textocontainer">
                    
                <h2 className="texto p-2" >Novedades</h2>
                 

                </div>
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))}
                </div>
                <div>
                    <Link to="/category/todos" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>
                        Ver todos los productos {">>"}
                    </Link>
                </div>
            </div> */}

            <Image src="https://merygarcia.com.ar/wp-content/uploads/WEB-02-2-CEJAS-1.jpg" className="img-fluid rounded" alt="...">
            </Image>


            {/* <div className="recent-products-container container mt-4">
                <div className="textocontainer">
                <h2 className="texto p-2">Productos por categorías</h2>

                </div>
                <Row>
                    {categories.map((category) => (
                        <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div> */}
        </div>
    );
}

export default Home;
