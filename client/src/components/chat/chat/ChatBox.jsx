import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import { getConversation } from '../../../service/api';
import { AccountContext } from '../../../context/AccountProvider';
import ChatHeader from './ChatHeader';
import Messages from './Messages';

const ChatBox = () => {

  const[conversation, setConversation] = useState([]);

  const { account, person } = useContext(AccountContext);

  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({ senderId: account.sub, receiverId: person.sub })
      setConversation(data);
    }
    getConversationDetails();
  }, [person.sub])

  return (
    <Box style={{height:'75%'}}>
      <ChatHeader person={person} />
      <Messages person={person} conversation={conversation} />
    </Box>
  )
}

export default ChatBox;