
import { onGetSubscriptionPlan } from '@/actions/settings';
import React from 'react'
import {Section} from '../section-label/Section';
import { Card, CardContent, CardDescription } from '../ui/card';
import { Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { pricingCards } from '@/constants/pricingplans';
import { features } from 'process';


type Props = {}


const BillingSettings = async (props: Props) => {
      const plan = await onGetSubscriptionPlan();
      const planFeatures = pricingCards.find((card) => card.title.toUpperCase() === plan?.toUpperCase())?.features

      if(!planFeatures) return
      
  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
        <div className='lg:col-span-1'>
            <Section label="Billing settings" message="Add payment information, upgrade and modify your plan."/>
        </div>
        <div className='lg:col-span-2 flex justify-start lg:justify-center pr-4'>
          <Card className={cn('border-dashed  border-gray-400 w-full cursor-pointer lg:h-[240px] h-[200px] flex justify-center items-center')} >
            <CardContent className='flex gap-2 items-center'>
              <div className='rounded-full border-2 p-1'>
                  <Plus className='text-gray-400'/>
              </div>
              <CardDescription className='font-semibold'>
                Upgrade Plan
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className='lg:col-span-2'>
          <h3 className='text-xl font-semibold mb-2'>Current plan</h3>
             <p className='text-sm font-semibold pb-2'>{plan}</p>
             {planFeatures.map((plan) => (
              <div key={plan} className='flex gap-2'>
                <Check className='text-muted-foreground' />
                <p className='text-muted-foreground'>{plan}</p>
                </div>
             ))}
        </div>
    </div>
  )
}

export default BillingSettings