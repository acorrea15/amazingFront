import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function ProfessionalPreview({ _id, name, lastName, specialty, picture }) {
    return (
        <LinkContainer to={`/professional/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "10px" }}>
            <Card style={{ width: "20rem", margin: "10px" }}>
                <Card.Img variant="top" className="professional-preview-img" src={picture} style={{ height: "150px", objectFit: "cover" }} />
                <Card.Body>
                    <Card.Title>{name} {lastName}</Card.Title>
                    <Badge bg="warning" text="dark">
                        {specialty}
                    </Badge>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
}

export default ProfessionalPreview;
