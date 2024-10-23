'use client'
import { Loader } from '@/Components/loader'
import { AuthContextProvider } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/signup/useSignUp'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {
    children: React.ReactNode
}

const SignUpFormProvider = ({children}: Props) => {
    const {methods, onHandleSubmit, loading} = useSignUpForm()
  return (
    <div>
         <AuthContextProvider>
            <FormProvider {...methods}>
                <form onSubmit={onHandleSubmit}
                className='h-full'>
                <div className='flex flex-col justify-between gap-3 h-full'>
                    <Loader loading={loading}>{children}</Loader>
                </div>
                </form>
            </FormProvider>
         </AuthContextProvider>
    </div>
  )
}

export default SignUpFormProvider;