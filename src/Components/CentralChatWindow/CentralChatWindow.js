import React from 'react';
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom';
import './CentralChatWindow.css';


const StyledTextArea = styled.textarea`
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 600;
    height: 100%;
    padding-bottom: 0px;
    padding: 5px 5px;
    font-family: 'Lato', sans-serif;
    resize: none;
`

const StyledSendMessageButton = styled.button`
    width: 100%;
    height: 50px;
    padding: 20px;
    border: none;
    outline: none;
    color: var(--lightOrange);
    background-color: var(--blackTint);
    border-radius: 5px;
    margin-left: 20px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`

const CentralChatWindow = ({socket}) => {

    const [params, setParams] = useSearchParams();

    const [currentMessage, setCurrentMessage] = React.useState('');

    const [allMessages, setAllMessages] = React.useState([]);

    const currentUserData = localStorage.getItem('chatUsername')

    const myRef = React.useRef(null)

    const handleSendMessage = () => {
       if(currentMessage !== '' && !!currentMessage) {
        const messageSendTime = new Date().getTime()
         // Sending current message to the send
         socket.emit('send-message', {currentMessage, currentUserData, messageSendTime})
         setCurrentMessage('')

         const textAreaRef = document.querySelector('#textarea-sendMessage')
         textAreaRef.focus();
       }
    }

    const handleCurrentMessageChange = e => {
        setCurrentMessage(e.target.value)
    }

    // Receive message from the socket
    socket.on('receive-message', (messageData, socketId) => {
        const usernameLocalStorage = currentUserData; // Name(details) stored in the localstorage
        const receivedMessageUsername = messageData.currentUserData; // Name(details) received from the server, socket emit event
        const messageTime = messageData.messageSendTime // Message sent time

        const messageTimeHours = new Date(messageTime).getHours();
        const messageTimeMinutes = new Date(messageTime).getMinutes();

        let currentUserIsTheSender = false

        if (usernameLocalStorage === receivedMessageUsername) {
            currentUserIsTheSender = true;
        }

        setAllMessages([...allMessages, { 
            data:messageData.currentMessage,
            user: messageData.currentUserData || socketId,
            isCurrentUserSender: currentUserIsTheSender,
            messageTime: {
                messageTimeHours,
                messageTimeMinutes
            }
        }])
    })

    const executeScroll = () => {
        if(myRef && myRef.current) {
            myRef.current.scrollTop = myRef.current.scrollHeight;
        }
    }

    React.useEffect(() => {
        executeScroll()
    },[allMessages])

    return (
        <div className='chatWindow-container'>
            <div className='flex-r-c-c chatWindow-title'>
                <p>The {params.get('room')} room</p>
            </div>
            <div className='chatWindow-receivedMessages'>
                {allMessages && allMessages.length > 0 && 
                    (
                        <div className='chatWindow-receivedMessages-content' ref={myRef}>
                            {allMessages.map((msg, indx) => {
                                // singleMessage-container
                                return (
                                    <div key={indx} className={`singleMessage-container ${msg.isCurrentUserSender ? 'right-align' : 'left-align'}`}>
                                        <p className={`singleMessage-user-name ${msg.isCurrentUserSender && 'right-name'}`}>
                                            {msg.user}{msg && msg.isCurrentUserSender && 
                                                <span style={{fontWeight: '600'}}>&nbsp;(You)</span>}
                                        </p>
                                        {msg && msg.data && <p>{msg.data}</p>}
                                        {msg && Object.keys(msg.messageTime).length > 0 && <p className={`smallText-time singleMessage-user-name ${msg.isCurrentUserSender && 'right-name'}`}>
                                            {msg.messageTime.messageTimeHours} : {msg.messageTime.messageTimeMinutes}
                                        </p>}
                                    </div>
                                )
                            })}
                            {/* <div id='anchor'></div> */}
                        </div>
                    )
                }
            </div>
            <div className='chatWindow-sendMessage-container flex-r-sb-c'>
                <div style={{height: '100%'}} className='chatWindow-sendMessage'>
                    <div style={{width: '100%', height: '100%'}}>
                        <StyledTextArea type="text" value={currentMessage} onChange={handleCurrentMessageChange} placeholder='Type the Message...' autoFocus={true} id='textarea-sendMessage'/>
                    </div>
                </div>
                <div style={{width: '10%', marginRight: '20px'}}>
                    <StyledSendMessageButton className='flex-r-c-c' onClick={handleSendMessage}>Send</StyledSendMessageButton>
                </div>
            </div>
        </div>
        
    )
}

export default CentralChatWindow