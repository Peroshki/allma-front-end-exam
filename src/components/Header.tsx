import React from 'react';

import '../styles/header.css';
import {convertSecondsToDateString} from '../services/Helpers';


let statusFilter: string[] = [];

// Add or remove a status ID filter.
function changeStatusFilter(status: string) {
    if (statusFilter.includes(status)) {
        let index: number = statusFilter.indexOf(status);
        statusFilter.splice(index, 1);
    } else {
        statusFilter.push(status);
    }
}

interface HeaderProps {
    openIncidents: number,
    recentIncidents: number,
    recentIncidentLimit: number,
    resolvedIncidents: number,
    resolvedTime: number,
    statusIds: string[],
    updateStatusFilter: Function,
    updateSearchFilter: Function
}

export default function Header({ openIncidents, recentIncidents, recentIncidentLimit, resolvedIncidents, 
    resolvedTime, statusIds, updateStatusFilter, updateSearchFilter }: HeaderProps) {
    
    // Calculate the average time to resolve an incident.
    let resolvedMeanTime: number = Math.ceil(resolvedTime / resolvedIncidents);

    return (
        <div className='headerContainer'>
            <div className="tableContainer">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <span>Search:</span> 
                                <input onChange={(event) => updateSearchFilter(event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="roundBorder">
                                    <span>Status ID:</span>
                                    {statusIds.map((status) => {
                                        return(
                                            <div key={status}>
                                                <input type="checkbox" value={status} defaultChecked={true}
                                                onClick={() => {changeStatusFilter(status); updateStatusFilter(statusFilter)}}/>
                                                <label> {status}</label>    
                                            </div>
                                        )
                                    })}
                                </div>
                            </td>
                        </tr>
                        <tr> <td> <div className="roundBorder"> Open Incidents: <br/> {openIncidents} </div> </td> </tr>
                        <tr> <td> <div className="roundBorder"> Recent Incidents (within {recentIncidentLimit} days): <br/> {recentIncidents} </div> </td> </tr>
                        <tr> <td> <div className="roundBorder"> Mean Time to Resolution: <br/> {convertSecondsToDateString(resolvedMeanTime)} </div> </td> </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}