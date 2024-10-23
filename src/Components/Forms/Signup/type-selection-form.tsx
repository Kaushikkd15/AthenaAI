import React from 'react'
import { FieldValue, FieldValues, UseFormRegister } from 'react-hook-form'
import { UserTypeCard } from './userTypeCard'

type Props = {
    register: UseFormRegister<FieldValues>
    userType: 'owner' | 'student'
    setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
}

const TypeSelectionForm = ({register, userType, setUserType}: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-gravel md:text-4xl font-bold'>Create an account</h2>
      <p className='text-iridium md:text-sm'>
        Tell us about yourself! What do you do? Let's tailor your
        <br/>experience so it best suits you.
      </p>
      <UserTypeCard 
      register={register}
      setUserType={setUserType}
      userType={userType}
      value= 'owner'
      title= 'I own a business'
      text= 'Setting up my account for my company.'
      ></UserTypeCard>
       <UserTypeCard 
      register={register}
      setUserType={setUserType}
      userType={userType}
      value= 'student'
      title= 'I am a student'
      text= 'Setting up my account for learning.'
      ></UserTypeCard>
    </div>
  )
}

export default TypeSelectionForm