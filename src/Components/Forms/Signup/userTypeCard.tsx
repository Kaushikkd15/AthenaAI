'use client'
import { Card, CardContent, CardDescription } from '@/Components/ui/card'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
    value: string
    title: string
    text: string
    register: UseFormRegister<FieldValues>
    userType: 'owner' | 'student' 
    setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
}

export const UserTypeCard = ({value, title, text, register, userType, setUserType} :  Props) => {
  return (
    <Label htmlFor={value}>
        <Card className={cn('w-full cursor-pointer', userType== value && 'border-gravel' ) }>
            <CardContent className='flex justify-between p-2'>
                <div className={cn('flex items-center gap-3', userType== value && 'border-gravel')}>
                    <Card className='flex justify-center p-3'>
                        <User size={30} className={cn(userType== value ? 'text-gravel': 'text-slate-400')} />
                    </Card>
                    <div className=''>
                        <CardDescription className={cn(userType == value ? 'text-gravel' : 'text-slate-400')}>
                             {title}
                        </CardDescription>
                        <CardDescription className={cn(userType == value ? 'text-slate-400' : 'text-slate-400')}>
                             {text}
                        </CardDescription>
                    </div>
                    </div>
                        <div>
                            <div className={cn(' w-4 h-4 rounded-full', userType == value ? 'bg-gravel opacity-40' : 'bg-transparent')}>
                                <Input {...register('type', {onChange: (event)=> setUserType(event.target.value),})}
                                  value={value}
                                  id={value}
                                  className="hidden"
                                  type="radio"
                                  />
                            </div>
                        </div>
            </CardContent>
        </Card>    
     </Label>
  )
}

