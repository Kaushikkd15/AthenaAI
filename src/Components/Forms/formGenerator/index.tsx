import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import React from 'react'
import { FieldError, FieldErrors, FieldValue, FieldValues, UseFormRegister } from 'react-hook-form'
import {ErrorMessage} from '@hookform/error-message'
import { Textarea } from '@/Components/ui/textarea'

type Props = {
    type: 'email' | 'text' | 'password'
    inputType: 'select' | 'input' |  'textarea'
    options?: {value:string; label: string; id: string}[]
    label?: string
    placeholder: string
    name: string
    register: UseFormRegister<any>
    errors: FieldErrors<FieldValues>
    lines?:number
    form?: string
    defaultValue?: string
}

const FormGenerator = ({defaultValue,errors,inputType,name,placeholder,register,type,form,label,lines,options}: Props) => {
      switch(inputType){
        case "input":
        default:
            return (
                <Label className='flex flex-col gap-2'
                htmlFor={`input-${label}`}>
                {label && label}
                <Input id={`input-${label}`} type={type} placeholder={placeholder} form={form} defaultValue={defaultValue} {...register(name)} />
                <ErrorMessage errors={errors} name={name} render={({message}) => (
                    <p className='text-red-400 mt-2'>
                        {message === 'Required' ? '' : message}
                    </p>
                )} 
                />
                </Label>
              ) 
             case 'select': 
              return (
                <Label htmlFor={`select-${label}`}>
                {label && label}
                <select id={`select-${label}`} form={form} {...register(name)}>
                    {
                        options?.length && 
                           options.map((option) => (
                           <option value={option.value} key={option.id}>
                             {option.label}
                           </option> 
                           ))
                    }
                     </select>
                <ErrorMessage errors={errors} name={name} render={({message}) => (
                    <p className='text-red-400 mt-2'>
                        {message === 'Required' ? '' : message}
                    </p>
                )} 
                />
                </Label>
              )  
              case "textarea": 
              return (
                <Label htmlFor={`select-${label}`}>
                {label && label}
                
                <Textarea 
                form={form}
                id={`input-${label}`}
                placeholder={placeholder}
                defaultValue={defaultValue}
                {...register(name)}
                rows={lines} />
                <ErrorMessage errors={errors} name={name} render={({message}) => (
                    <p className='text-red-400 mt-2'>
                        {message === 'Required' ? '' : message}
                    </p>
                )} 
                />
                </Label>
              )     
      }

  
}

export default FormGenerator