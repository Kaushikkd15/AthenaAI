import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/Components/ui/dialog'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type Props = {
    trigger: React.ReactNode
    children: React.ReactNode
    title: string
    description: string
    type?: 'Integration'
    logo?: string
}

const Modal = ({
    trigger,
    children,
    title,
    description,
    type,
    logo
}: Props) => {
  switch (type) {
    case "Integration" : 
      return (
        <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <div className="flex justify-center gap-3">
          <div className='pt-0.5'>
            <div className="w-12 h-10 relative">
              <Image
                src={`https://ucarecdn.com/5ff66b02-00ca-41a3-98b0-df8f7dfc908b/AthenaAiSmall.png`}
                fill
                alt="Athena AI"
              />
              </div>
            </div>
            <div className="text-gray-400">
              <ArrowLeft size={20} />
              <ArrowRight size={20} />
            </div>
            <div className="w-12 h-12 relative">
              <Image
                src={`https://ucarecdn.com/cbdbc2f4-5d3c-4caa-9bae-7cc3108a55d5/Stripe.png`}
                fill
                alt="Stripe"
              />
            </div>
          </div>
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription className=" text-center">
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  default:
    return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
      )
  }
}

export default Modal