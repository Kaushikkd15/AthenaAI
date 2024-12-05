import { Separator } from '@/Components/ui/separator'
import { CloudIcon } from 'lucide-react'
import React from 'react'
import { Card } from '../ui/card'
import Modal from '../modal'
import { IntegrationModalBody } from './integrationModalBody'

type Props = {
    name: 'stripe'
    logo: string
    title: string
    description: string
    connections: {
        [key in 'stripe']: boolean
    }
}

const integrationTrigger = ({name, logo, title, description, connections}: Props) => {
  return (
   <Modal
   title={title}
   type="Integration"
   logo={logo}
   description={description}
   trigger={
    <Card className="px-3 py-2 cursor-pointer flex gap-2">
        <CloudIcon />
        {connections[name] ? 'connected' : 'connect'}
    </Card>
   }
   >
   <Separator orientation='horizontal' />
    <IntegrationModalBody
    connections={connections}
    type={name}
    />
   </Modal>
  )
}

export default integrationTrigger