import { onGetPaymentConnected } from '@/actions/settings'
import Infobar from '@/Components/Infobar'
import IntegrationsList from '@/Components/integrations'
import React from 'react'

type Props = {}

const IntegrationsPage = async() => {
    const payment = await onGetPaymentConnected()

    const connections= {
        stripe: payment ? true : false
    }

  return (
   <>
   <Infobar />
   <IntegrationsList connections= {connections} />
   </>
  )
}

export default IntegrationsPage