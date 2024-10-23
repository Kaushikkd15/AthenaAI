import { USER_REGISTRATION_FORM } from '@/constants/forms'
import { register } from 'module'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../formGenerator'

type Props = {
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
}

const AccountDetailsForm = ({errors, register}: Props) => {
  return (
    <>
    <h2 className='text-gravel md:text-4xl font-bold'>Account Details</h2>
    <p className='text-slate-500 md:text-sm'>Enter your Personal Details</p>
    {USER_REGISTRATION_FORM.map((field) =>(
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

export default AccountDetailsForm