import React from 'react';
import {convertSecondsToDateString} from '../services/Helpers';
import '../styles/header.css';

interface HeaderProps {
    openIncidents: number,
    recentIncidents: number,
    resolvedIncidents: number,
    resolvedTime: number
}

export default function Header({ openIncidents, recentIncidents, resolvedIncidents, resolvedTime }: HeaderProps) {
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
                            Recent Incidents (within 30 days): <br/> {recentIncidents}
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
                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                            <label htmlFor="vehicle1"> Declared</label>
                            <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"/>
                            <label htmlFor="vehicle2"> Resolved</label>
                        </td>
                        <td>
                            <span>Search:</span> 
                            <input/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}