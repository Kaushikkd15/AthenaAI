'use client'
import LoginForm from '@/Components/Forms/SignIn/loginForm'
import SignInFormProvider from '@/Components/Forms/SignIn/SignInFormProvider'
import Link  from 'next/link'
import React from 'react'
import { Button } from '@/Components/ui/button'

type Props = {}

const Signin = () => {
  return (
    <div className='flex-1 py-36 md:px-16 w-full'>
     <div className='flex flex-col h-full gap-3'>
      <SignInFormProvider>
      <div className='flex flex-col gap-3'>
       <LoginForm />
       <div className='w-full flex flex-col gap-3 items-center'>
         <Button type="submit" className='w-full'>
          Submit
         </Button>
         <p>Don't have an account?{' '}
         <Link href='/auth/signup' className='font-bold'>Create one</Link>
         </p>
        </div>
      </div>
      </SignInFormProvider>
     </div>
    </div>
  )
}

export default Signin;