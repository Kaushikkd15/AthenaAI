import ButtonHandler from '@/Components/Forms/Signup/buttonHandler'
import { Highlightbar } from '@/Components/Forms/Signup/highlightbar'
import RegistrationFormStep from '@/Components/Forms/Signup/registration-step'
import SignUpFormProvider from '@/Components/Forms/Signup/SignUpFormProvider'
import React from 'react'

type Props = {}

const Signup = (props: Props) => {
  return (
    <div className='flex-1 pb-16 pt-16 md:px-16 w-full'>
        <div className='flex flex-col h-full gap-3'>
            <SignUpFormProvider>
                <div className='flex flex-col gap-3'>
                    <RegistrationFormStep/>
                    <ButtonHandler />
                </div>
                <Highlightbar />
            </SignUpFormProvider>  
        </div>
       
    </div>
  )
}

export default Signup