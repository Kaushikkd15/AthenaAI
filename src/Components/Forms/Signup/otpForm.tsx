import  OTPInput  from '@/Components/otp'
import React from 'react'

type Props = {
    setOTP: React.Dispatch<React.SetStateAction<string>>
    onOTP: string
}

const OTPForm = ({onOTP, setOTP}: Props) => {
    
  return (
    <>
    <h2 className='text-gravel md:text-4xl font-bold'>
        Enter OTP
    </h2>
    <p className='text-slate-500 md:text-sm'>Enter the one time password that was sent on your email</p>
    <OTPInput otp={onOTP} setOtp={setOTP} />
    </>
  )
}

export default OTPForm