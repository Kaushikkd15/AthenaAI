import { onGetAllAccountDomains } from '@/actions/settings';
import ConversationMenu from '@/Components/Conversations';
import Messenger from '@/Components/Conversations/messenger';
import Infobar from '@/Components/Infobar';
import { Separator } from '@/Components/ui/separator';
import React from 'react'

type Props = {}

const ConversationsPage = async (props: Props) => {
    const domains = await onGetAllAccountDomains();
  return (
    <div className='w-full h-full flex'>
        <ConversationMenu domains={domains?.domains} />
        <Separator orientation='vertical'/>
        <div className='flex flex-col w-full'>
            <div className='px-5'>
                <Infobar />
            </div>
            <Messenger />
        </div>
    </div>
  )
}

export default ConversationsPage