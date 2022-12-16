import React from 'react'
import Section from '../Section/Section'
import {groupsAndUsersSections} from './../../Constants'
import './SideUserList.css'

const SideUserList = () => {

    console.table(groupsAndUsersSections)

    return (
        <div className="sideUserList-container">
            <div className="sideUserList-content">
                {groupsAndUsersSections.map((item, index) => {
                    return (
                        <Section data={item} key={index}/>
                    )
                })}
            </div>
        </div>
    )
}

export default SideUserList