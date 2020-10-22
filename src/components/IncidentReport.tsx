import React, { Component } from 'react';

import data from '../data/incidents.json';
import {convertSecondsToDateString} from '../services/Helpers';

import 'bootstrap/dist/css/bootstrap.min.css';
import CardColumns from 'react-bootstrap/CardColumns';
import IncidentCard from './IncidentCard';
import Header from './Header';

const currentDate: Date = new Date(Date.now());
const recentIncidentDays: number = 30;

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
        let incidents: any = data.incidents.filter((incident: any) => !this.state.statusFilters.includes(incident.incidentStatusId));
        incidents = incidents.filter((incident: any) => incident.name.toLowerCase().includes(this.state.searchFilter) || 
            (incident.summary && incident.summary.toLowerCase().includes(this.state.searchFilter)));

        return (
            <div>
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
                <CardColumns style={{ paddingTop: `${100 + (this.statusIds.length * 40)}px` }}>
                    {incidents.map((incident: any) => {
                        const incidentSummary: string = incident.summary ? incident.summary : "None";
                        const incidentSeverity: string = incident.severity ? incident.severity.name : "N/A";
                        const incidentCommanderQuery: any[] = incident.participants.filter( (user: any) => user.role && user.role.id === 1 );
                        const incidentCommanderName: string = incidentCommanderQuery.length > 0 ? incidentCommanderQuery[0].user.realName : "None";
                        const incidentChannelLink: string = `slack://channel?team=${incident.workspace.teamId}&id=${incident.channelId}`;
                        const incidentCreatedOn: Date = new Date(incident.createdOn);
                        const incidentDuration: string = convertSecondsToDateString(incident.duration);

                        return(<IncidentCard
                            key={incident.id}
                            name={incident.name}
                            summary={incidentSummary}
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
}
