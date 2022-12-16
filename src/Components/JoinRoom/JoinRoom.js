import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import './JoinRoom.css'

const StyledInput = styled.input`
    width: 300px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid var(--blackTint);
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 600;
    outline: none;
    margin-bottom: 20px;
`

const StyledSelect = styled.select`
    width: 300px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid var(--blackTint);
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 600;
    outline: none;
    margin-bottom: 20px;
`
const StyledSubmitButton = styled.button`
    width: 300px;
    height: 45px;
    background-color: var(--orange);
    color: var(--blackTint);
    font-size: 16px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 10px;
    border: none;
    outline: none;
    cursor: pointer;
`

const StyledP = styled.p`
    margin: -10px 0 40px 0;
    color: var(--blackTint);
    font-size: 20px;
`

const JoinRoom = ({socket}) => {

    const [username, setUserName] = React.useState('');
    const [selectedRoom, setSelectedRoom] = React.useState('Anime');

    const handleUsernameChange = e => {
        const name = e.target.value
        setUserName(name);
    }

    const handleDropdownChange = e => {
        setSelectedRoom(e.target.value)
    }

    const navigate = useNavigate()

    const handleClick = () => {
        if(!!username && !!selectedRoom) {
            // create a request
            socket.emit('join_room', {username, selectedRoom})
            navigate(`/chat?room=${selectedRoom}`, {replace: false})
            localStorage.setItem('chatUsername', username)
        }
    }

    return (
        <div className='joinRoom-container' style={{height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className='joinRoom-outerbox'>
                <StyledP>Enter your details</StyledP>
                <div className='joinRoom-content'>
                    <StyledInput type="text" value={username} placeholder="Enter you username..." onChange={handleUsernameChange}/>
                    <StyledSelect onChange={handleDropdownChange}>
                        <option value="Anime">Anime</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Horror">Horror</option>
                    </StyledSelect>
                    <StyledSubmitButton onClick={handleClick}>Submit & Proceed</StyledSubmitButton>
                </div>
            </div>

        </div>
    )
}

export default JoinRoom