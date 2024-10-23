'use client'
import { Button } from '@/Components/ui/button'
import { useAuthContextHook } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/signup/useSignUp'
import Link from 'next/link'
import React from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {}

const ButtonHandler = (props: Props) => {
    const{currentStep, setCurrentStep } = useAuthContextHook()
    const {formState, getFieldState, getValues} = useFormContext()
    const{onGenerateOtp} = useSignUpForm()

    const { isDirty: isName} = getFieldState('fullname', formState)
    const { isDirty: isEmail} = getFieldState('email', formState)
    const { isDirty: isPassword} = getFieldState('password', formState)
 

   if(currentStep === 3){
    return (
        <div className='w-full flex flex-col items-center gap-3'>
            <Button type='submit' className='w-full'>
             Create an account
            </Button>
            <p>
                Already have an account?{''}
                <Link href={"/auth/signin"} className='font-bold'>Sign In</Link>
            </p>
        </div>
      )
   } 

   if(currentStep === 2){
    return (
        <div className='w-full flex flex-col items-center gap-3 pb-4'>
            <Button type='submit' className='w-full' {...isName && isEmail && isPassword && { onClick:()=> onGenerateOtp(getValues('email'), getValues('password'), setCurrentStep)}}>
             Continue
            </Button>
            <p>
                Already have an account?{''}
                <Link href={"/auth/signin"} className='font-bold'>Sign In</Link>
            </p>
        </div>
      )
   } 

   
    return (
        <div className='w-full flex flex-col items-center gap-3 pb-20'>
            <Button type='submit' className='w-full' onClick={()=>setCurrentStep((prev: number)=> prev +1)}>
             Continue
            </Button>
            <p>
                Already have an account?{''}
                <Link href={"/auth/signin"} className='font-bold'>Sign In</Link>
            </p>
        </div>
      )
  
}

export default ButtonHandler