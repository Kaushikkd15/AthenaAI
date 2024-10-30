import { ChatBotMessageProps } from '@/schemas/conversation.schema'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import { register } from 'module'
import React, { forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import RealTimeMode from './realtime'
import Image from 'next/image'
import TabsMenu from '../tabs'
import { BOT_TABS_MENU } from '@/constants/menu'
import ChatIcon from '@/icons/chat-icon'
import { TabsContent } from '@radix-ui/react-tabs'
import { Separator } from '../ui/separator'
import Bubble from './bubble'
import { Responding } from './responding'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Paperclip, Send } from 'lucide-react'
import { Label } from '../ui/label'

type Props = {
     register: UseFormRegister<ChatBotMessageProps>
     chats: {role: 'assistant' | 'user'; content: string; link?: string} []
     onChat(): void
     onResponding: boolean
     domainName: string
     theme?: string | null
     textColor?: string | null
     help?: boolean
     realtimeMode: 
        | {
            chatroom: string
            mode: boolean
        }
        | undefined
    helpdesk: {
        id: string
        question: string
        answer: string
        domainId: string | null
    } []

    setChat: React.Dispatch<
            React.SetStateAction<{
                role: 'user' | 'assistant'
                content: string
                link?: string | undefined
            }[]
            >
        >
}

const BotWindow = forwardRef< HTMLDivElement, Props> ((
    {
        register,
        chats,
        onChat,
        onResponding,
        domainName,
        helpdesk,
        realtimeMode,
        setChat,
        textColor,
        theme,
        help,
    },
    ref
)=> {
    return <div className="h-[670px] w-[450px] flex flex-col bg-white rounded-xl mr-[80px] border-[1px] overflow-hidden">
        <div className="flex justify-between px-4 pt-4">
          <div className="flex gap-2">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col">
              <h3 className="text-lg font-bold leading-none">
                Sales Rep - Kaushik
              </h3>
              <p className="text-sm">{domainName.split('.com')[0]}</p>
              {realtimeMode?.mode && (
                <RealTimeMode
                  setChats={setChat}
                  chatRoomId={realtimeMode.chatroom}
                />
              )}
            </div>
          </div>
       <div className='relative w-16 h-16'>
          <Image
          src="https://ucarecdn.com/6a091c03-ba44-4080-86b6-5d1847aa78e4/propuser.png"
          fill
          alt='users'
          objectFit='contain'
          />
          </div>
        </div>
        <TabsMenu
        triggers={
          help ? BOT_TABS_MENU : [{label: 'chat', icon: <ChatIcon /> }]
        }
        className='bg-transparent border-[1px] border-border m-2'
        >
        <TabsContent value='chat'>
         <Separator orientation="horizontal" />
          <div className='flex flex-col h-full'>
           <div 
               style={{
                background: theme || '',
                color: textColor || '',
               }}
              className='px-3 flex h-[400px] flex-col py-5 gap-3 chat-window overflow-y-auto' ref={ref} >
              {chats.map((chat, key) => (
                <Bubble key={key} message={chat} />
              ))} 
              { onResponding && <Responding />}
              </div>
              <form onSubmit={onChat}
              className='flex px-3 py-1 flex-col flex-1 bg-porcelain'>
                <div className='flex justify-between'>
                  <Input 
                  {...register('content')}
                  placeholder="Type your message..."
                  className="focus-visible:ring-0 flex-1 p-0
                  focus-visible:ring-offset-0 bg-porcelain rounded-none outline-none border-none" />
                  <Button type="submit" className="mt-3">
                    <Send />
                  </Button>
                </div>
                <Label htmlFor="upload">
                  <Paperclip />
                  <Input type='file'
                  id="upload"
                  {...register('image')}
                  className='hidden'
                  />
                </Label>
              </form>
          </div>
        </TabsContent>
        </TabsMenu>
    </div>
})

export default BotWindow
BotWindow.displayName = 'BotWindow'