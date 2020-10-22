import React from 'react';
import {convertSecondsToDateString} from '../services/Helpers';
import '../styles/header.css';

let statusFilter: string[] = [];

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
    let resolvedMeanTime: number = Math.ceil(resolvedTime / resolvedIncidents);

    return (
        <div className='mainContainer'>
            <table>
                <tbody>
                    <tr>
                        <td>
                            Open Incidents: <br/> {openIncidents}
                        </td>
                        <td>
                            Recent Incidents (within {recentIncidentLimit} days): <br/> {recentIncidents}
                        </td>
                        <td>
                            Mean Time to Resolution: <br/> {convertSecondsToDateString(resolvedMeanTime)}
                        </td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td>
                            {statusIds.map((status) => {
                                return(
                                    <div key={status}>
                                        <input type="checkbox" value={status} defaultChecked={true}
                                        onClick={() => {changeStatusFilter(status); updateStatusFilter(statusFilter)}}/>
                                        <label htmlFor="vehicle1"> {status}</label>    
                                    </div>
                                )
                            })}
                        </td>
                        <td>
                            <span>Search:</span> 
                            <input onChange={(event) => updateSearchFilter(event.target.value)}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}