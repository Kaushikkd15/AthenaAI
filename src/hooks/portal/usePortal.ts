import { useForm } from "react-hook-form"
import { useToast } from "../use-toast"
import { useState } from "react"
import { onBookNewAppointment } from "@/actions/appointment"

export const usePortal = (
    customerId: string,
    domainId: string,
    email: string
) => {    
    const { register, setValue, handleSubmit, formState: {errors} } = useForm()
    const { toast } = useToast()
    const [step, setStep] = useState<number>(1)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [selectedSlot, setSelectedSlot] = useState<string | undefined>('')
    const [loading, setLoading] = useState<boolean>(false)

    setValue('date', date)

    const onNext = () => setStep((prev) => prev + 1)
    const onPrev = () => setStep((prev) => prev - 1)

    const onBookAppointment = handleSubmit( async (values) => {
        try {
            setLoading(true)
            const booked = await onBookNewAppointment(
                domainId,
                customerId,
                values.slot,
                values.date,
                email
            )

            if(booked && booked.status == 200){
                setLoading(false)
                toast({
                    title: 'Success',
                    description: booked.message,
                })
                setStep(3)
            }
        } catch (error) {
            console.log(error)
        }
    })

    const onSelectedTimeSlot = (slot: string) => setSelectedSlot(slot)

    return {
        step,
        onNext,
        onPrev,
        register,
        errors,
        loading,
        onBookAppointment,
        date,
        setDate,
        onSelectedTimeSlot,
        selectedSlot,
    }
}