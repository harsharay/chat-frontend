import React from 'react'
import CentralChatWindow from '../CentralChatWindow/CentralChatWindow'
import SideUserList from '../SideUserList/SideUserList'
import './Main.css'

const Main = () => {
  return (
    <div className="main-container">
        <div className="main-content">
            <div className='sideList-container'>
                <SideUserList />
            </div>
            <div className='centralChat-container'>
                <CentralChatWindow />
            </div>
        </div>
    </div>
  )
}

export default Main