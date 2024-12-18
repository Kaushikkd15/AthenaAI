import { onGetSubscriptionPlan } from '@/actions/settings'
import Infobar from '@/Components/Infobar'
import BillingSettings from '@/Components/settings/billingSettings'
import ChangePassword from '@/Components/settings/changePassword'
import DarkModeToggle from '@/Components/settings/DarkModeToggle'
import { useThemeMode } from '@/hooks/settings/useSettings'
import React from 'react'

type Props = {}

const Page = async (props : Props) => {
  
  return (
    <>
       <Infobar />
       <div className='overflow-y-auto w-full chat-window flex-1 h-0 flex flex-col gap-10'>
        <BillingSettings />
        <DarkModeToggle />
        <ChangePassword />
       </div>
    </>
  )
}

export default Page