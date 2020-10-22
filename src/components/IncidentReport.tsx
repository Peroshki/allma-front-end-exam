import React from 'react';

import data from '../data/incidents.json';
import {convertSecondsToDateString} from '../services/Helpers';

import 'bootstrap/dist/css/bootstrap.min.css';
import CardColumns from 'react-bootstrap/CardColumns';
import IncidentCard from './IncidentCard';
import Header from './Header';

let openIncidents: number = 0;
let recentIncidents: number = 0;
let resolvedIncidents: number = 0;
let resolvedTime: number = 0;

const currentDate: Date = new Date(Date.now());

export default function IncidentReport() {
    return (
        <div>
            <Header 
                openIncidents={openIncidents} 
                recentIncidents={recentIncidents}
                resolvedIncidents={resolvedIncidents} 
                resolvedTime={resolvedTime}
            />
            <CardColumns style={{ paddingTop: "50px" }}>
                {data.incidents.map((incident) => {
                    const incidentSeverity: string = incident.severity ? incident.severity.name : "N/A";

                    const incidentCommanderQuery: any[] = incident.participants.filter( (user: any) => user.role && user.role.id === 1 );
                    const incidentCommanderName: string = incidentCommanderQuery.length > 0 ? incidentCommanderQuery[0].user.realName : "None";

                    const incidentChannelLink: string = `slack://channel?team=${incident.workspace.teamId}&id=${incident.channelId}`;

                    const incidentCreatedOn: Date = new Date(incident.createdOn);
                    const diffTime: number = (currentDate.getTime() - incidentCreatedOn.getTime()); 
                    const diffDays: number = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                    const incidentDuration: string = convertSecondsToDateString(incident.duration);

                    openIncidents += incident.incidentStatusId !== 'RESOLVED' ? 1 : 0;
                    recentIncidents += diffDays <= 30 ? 1 : 0;
                    resolvedIncidents += incident.incidentStatusId === 'RESOLVED' ? 1 : 0;
                    resolvedTime += incident.incidentStatusId === 'RESOLVED' ? incident.duration : 0;
                    
                    return(<IncidentCard 
                        key={incident.id}
                        name={incident.name}
                        severity={incidentSeverity}
                        incidentCommander={incidentCommanderName}
                        channelName={incident.channelName}
                        channelLink={incidentChannelLink}
                        createdOn={incidentCreatedOn.toLocaleString()}
                        duration={incidentDuration}
                        status={incident.incidentStatusId}
                        />)
                })}
            </CardColumns>
        </div>
    );
}