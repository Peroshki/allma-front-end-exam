import React from 'react';

import "../styles/incidentcard.css"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';


interface CardProps {
    name: string,
    summary: string,
    severity: string,
    incidentCommander: string,
    channelName: string,
    channelLink: string,
    createdOn: string,
    duration: string,
    status: string
}

export default function IncidentCard({ name, severity, summary, incidentCommander, channelName, channelLink, createdOn, duration, status }: CardProps) {
    return (
        <Card className="card mx-auto">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
            </Card.Body>
            <ListGroup>
                <ListGroupItem>Summary: {summary}</ListGroupItem>
                <ListGroupItem>Severity: {severity}</ListGroupItem>
                <ListGroupItem>Incident Commander: {incidentCommander}</ListGroupItem>
                <ListGroupItem>Channel: <a href={channelLink}>{channelName}</a></ListGroupItem>
                <ListGroupItem>Created On: {createdOn}</ListGroupItem>
                <ListGroupItem>Duration: {duration}</ListGroupItem>
                <ListGroupItem>Status: {status}</ListGroupItem>
            </ListGroup>
        </Card>
    );
}