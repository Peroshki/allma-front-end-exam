import React, { Component } from 'react';

import '../styles/incidentreport.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {convertSecondsToDateString} from '../services/Helpers';
import CardColumns from 'react-bootstrap/CardColumns';
import data from '../data/incidents.json';
import Header from './Header';
import IncidentCard from './IncidentCard';


const currentDate: Date = new Date(Date.now());
const recentIncidentDays: number = 30; // The maximum number of days for an incident to be considered recent

export default class IncidentReport extends Component <{}, 
    { openIncidents: number, recentIncidents: number, resolvedIncidents: number, 
    resolvedTime: number, statusFilters: string[], searchFilter: string }> {

    openIncidents: number = 0;
    recentIncidents: number = 0;
    resolvedIncidents: number = 0;
    resolvedTime: number = 0;
    statusIds: string[] = [];

    constructor(props: any) {
        super(props);

        this.updateStatusFilter = this.updateStatusFilter.bind(this);
        this.updateSearchFilter = this.updateSearchFilter.bind(this);

        // Calculate the number of open, resolved and recent incidents
        // as well as the total amount of time spent resolving incidents
        data.incidents.map((incident) => {
            const incidentCreatedOn: Date = new Date(incident.createdOn);
            const diffTime: number = (currentDate.getTime() - incidentCreatedOn.getTime());
            const diffDays: number = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            const statusId: string = incident.incidentStatusId;
            this.openIncidents += statusId !== 'RESOLVED' ? 1 : 0;
            this.recentIncidents += diffDays <= recentIncidentDays ? 1 : 0;
            this.resolvedIncidents += statusId === 'RESOLVED' ? 1 : 0;
            this.resolvedTime += statusId === 'RESOLVED' ? incident.duration : 0;

            if (!this.statusIds.includes(statusId)) {
                this.statusIds.push(statusId);
            }

            return false;
        });

        this.state = {
            openIncidents : this.openIncidents,
            recentIncidents: this.recentIncidents,
            resolvedIncidents: this.resolvedIncidents,
            resolvedTime: this.resolvedTime,
            statusFilters: [],
            searchFilter: ""
        }
    }

    updateStatusFilter(filter: string[]) {
        this.setState({
            statusFilters: filter
        })
    }

    updateSearchFilter(filter: string) {
        this.setState({
            searchFilter: filter.toLowerCase().trim()
        })
    }

    render() {
        // Filter incidents by selected status IDs
        let incidents: any = data.incidents.filter((incident: any) => !this.state.statusFilters.includes(incident.incidentStatusId));
        
        // Filter incidents by name and summary using search bar text
        incidents = incidents.filter((incident: any) => incident.name.toLowerCase().includes(this.state.searchFilter) || 
            (incident.summary && incident.summary.toLowerCase().includes(this.state.searchFilter)));

        return (
            <div className="irContainer">
                <Header
                    openIncidents={this.state.openIncidents}
                    recentIncidents={this.state.recentIncidents}
                    recentIncidentLimit={recentIncidentDays}
                    resolvedIncidents={this.state.resolvedIncidents}
                    resolvedTime={this.state.resolvedTime}
                    statusIds={this.statusIds}
                    updateStatusFilter={this.updateStatusFilter}
                    updateSearchFilter={this.updateSearchFilter}
                />
                <CardColumns className="cardColumns">
                    {incidents.map((incident: any) => {
                        const incidentSummary: string = incident.summary ? incident.summary : "None";
                        const incidentSeverity: string = incident.severity ? incident.severity.name : "N/A";

                        // Filter users who have a role ID of 1 and find the 
                        // incident commander from this filtered list, if there is any
                        const incidentCommanderQuery: any[] = incident.participants.filter( (user: any) => user.role && user.role.id === 1 );
                        const incidentCommanderName: string = incidentCommanderQuery.length > 0 ? incidentCommanderQuery[0].user.realName : "None";
                        const incidentCommanderImg: string = incidentCommanderQuery.length > 0 ? incidentCommanderQuery[0].user.avatarUrl : "";
                        
                        // Create a deep link to Slack
                        const incidentChannelLink: string = `slack://channel?team=${incident.workspace.teamId}&id=${incident.channelId}`;
                        
                        const incidentCreatedOn: Date = new Date(incident.createdOn);
                        const incidentDuration: string = convertSecondsToDateString(incident.duration);

                        return(<IncidentCard
                            key={incident.id}
                            name={incident.name}
                            summary={incidentSummary}
                            severity={incidentSeverity}
                            incidentCommander={incidentCommanderName}
                            incidentCommanderAvatar={incidentCommanderImg}
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
}
