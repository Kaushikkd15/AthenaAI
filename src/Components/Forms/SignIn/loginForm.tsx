"use client"
import { UserLoginForm } from '@/constants/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import FormGenerator from '../formGenerator'

type Props = {}

const loginForm = (props: Props) => {
   const {register, formState: {errors},} = useFormContext();

  return (
    <>
    <h2 className='text-gravel md:text-4xl font-bold'>Login</h2>
    <p className='text-slate-500 md:text-sm'>Enter your Credentials</p>
    {UserLoginForm.map((field)=> (
        <FormGenerator 
        key={field.id}
        {...field}
        errors={errors}
        register={register}
        name={field.name} />
    ))}
    </>
  )
}

export default loginForm