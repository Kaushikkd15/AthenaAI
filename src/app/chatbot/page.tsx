import AiChatBot from '@/Components/chatBot'
import { useChatBot } from '@/hooks/chatbot/useChatBot'
import React from 'react'

type Props = {}

const ChatBot = (props: Props) => {
    const { onOpenChatBot, botOpened, onChats, register, onStartChatting, onAiTyping, messageWindowRef, currentBot, loading, onRealTime, setOnChats} = useChatBot()
  return <AiChatBot/>
}

export default ChatBot