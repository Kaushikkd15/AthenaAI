'use client'
import { useAuthContextHook } from '@/context/use-auth-context'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {}

export const Highlightbar = (props: Props) => {
    const {currentStep} = useAuthContextHook()
  return (
    <div className='grid grid-cols-3 gap-3'>
        <div className={cn('h-2 rounded-full col-span-1', currentStep==1 ? 'bg-gravel' : 'bg-platinum' )}>
        </div>
        <div className={cn('h-2 rounded-full col-span-1', currentStep==2 ? 'bg-gravel' : 'bg-platinum' )}>
        </div>
        <div className={cn('h-2 rounded-full col-span-1', currentStep==3 ? 'bg-gravel' : 'bg-platinum' )}>
        </div>
    </div>
  )
}