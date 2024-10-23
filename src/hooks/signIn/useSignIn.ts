import React, { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useToast } from '../use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserLoginProps, UserLoginSchema } from '@/schemas/auth.schema'


export const useSignInForm = () => {
    
    const { isLoaded, setActive, signIn } = useSignIn()
    const[loading, setLoading ]= useState<boolean>(false)
    const router = useRouter();
    const {toast} = useToast()
    const methods = useForm<UserLoginProps>({
        resolver: zodResolver(UserLoginSchema),
        mode: 'onChange'
    })

    const onHandleSubmit = methods.handleSubmit(async(values: UserLoginProps)=>{
        if(!isLoaded) return

        try{
            setLoading(true)
            const authenticated = await signIn.create({
                identifier: values.email,
                password: values.password
            })
            if(authenticated.status === 'complete'){
                await setActive({session: authenticated.createdSessionId})
                toast({
                    title: 'Sucess',
                    description: 'Welcome back'
                })
                router.push('/dashboard')
            }
        }catch(error: any){
            setLoading(false)
            if(error.errors[0].code === 'form_password_incorrect')
                toast({
                title: 'Error',
                description: 'email/password is incorrect try again'
            })
        }
    })
  return {

    methods,
    onHandleSubmit,
    loading
  }
}

