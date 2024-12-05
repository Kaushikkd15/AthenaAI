'use client'

import React from 'react'
import { Loader } from '../loader'
import { Button } from '../ui/button'
import { useStripe } from '@/hooks/billings/useBillings'

type StripeConnectProps = {
    connected: boolean
}

const stripeConnect = ({connected}: StripeConnectProps) => {
    const {onStripeConnect, onStripeAccountPending } = useStripe()
  return (
     <Button disabled={connected}
             onClick={onStripeConnect}
     >
    <Loader loading={onStripeAccountPending}>
        {connected ? 'Connected' : 'Connect to stripe'}
    </Loader>    
     </Button>
  )
}

export default stripeConnect