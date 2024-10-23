import { onGetCurrentDomainInfo } from '@/actions/settings'
import BotTrainingForm from '@/Components/Forms/Settings/botTraining'
import SettingsForm from '@/Components/Forms/Settings/SettingsForm'
import Infobar from '@/Components/Infobar'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = { params : {domain : string}}

const DomainSettingsPage = async({params}: Props) => {
    const domain = await onGetCurrentDomainInfo(params.domain)
    if (!domain || !('domains' in domain) || !domain.domains.length) {
      redirect('/dashboard');
    }
  
  return (
    <>
    <Infobar />
    <div className='overflow-y-auto w-full chat-window flex-1 h-0'>
        <SettingsForm 
        id={domain.domains[0].id} 
        name={domain.domains[0].chatBot} 
        plan={domain.subscription?.plan!} 
        chatBot={domain.domains[0].chatBot} />
        <BotTrainingForm id={domain.domains[0].id} />
    </div>
    </>
  )
}

export default DomainSettingsPage