'use client'
import ChangePassword from '@/Components/settings/changePassword'
import { changePasswordProps, changePasswordSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useForm } from 'react-hook-form'
import { useToast } from '../use-toast'
import { useEffect, useState } from 'react'
import { onChatBotImageUpdate, onCreateFilterQuestion, onCreateHelpDeskQuestion, onCreateNewDomainProduct, onDeleteUserDomain, onGetAllFilterQuestion, onGetAllHelpDeskQuestions, onUpdateDomain, onUpdatePassword, onUpdateWelcomeMessage } from '@/actions/settings'
import DomainSettingsPage from '@/app/(dashboard)/settings/[domain]/page'
import { AddProductProps, AddProductSchema, DomainSettingsProps, DomainSettingsSchema, FilterQuestionProps, FilterQuestionSchema, HelpDeskQuestionProps, HelpDeskQuestionsSchema } from '@/schemas/settings.schema'
import { useRouter } from 'next/navigation'
import {UploadClient} from '@uploadcare/upload-client'

const upload = new UploadClient({
     publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string
})

export const useThemeMode = () => {
    const {setTheme, theme} = useTheme()

    return {
       setTheme,
       theme
    }
}

export const useChangePassword = () =>{
    const {register, handleSubmit, 
        formState: {errors}, reset} 
        = useForm<changePasswordProps>({
            resolver: zodResolver(changePasswordSchema),
            mode: 'onChange'
        })
    const {toast}= useToast(); 
    const [loading, setLoading] = useState<boolean>(false);

    const onChangePassword= handleSubmit(async (values) => {
        try{
           setLoading(true) 
           const updated = await onUpdatePassword(values.password) 
           if(updated){
            reset()
            setLoading(false)
            toast({
                title: 'Success',
                description: updated.message
            })
           }
        }catch(error){
         console.log(error)
        }
    })
    return {
        register, 
        errors,
        loading,
        onChangePassword
    }
}

export const useSettings = (id: string) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<DomainSettingsProps>({
      resolver: zodResolver(DomainSettingsSchema),
    })
    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false)
    const [deleting, setDeleting] = useState<boolean>(false)
  
    const onUpdateSettings = handleSubmit(async (values) => {
      setLoading(true)
      if (values.domain) {
        const domain = await onUpdateDomain(id, values.domain)
        if (domain) {
          toast({
            title: 'Success',
            description: domain.message,
          })
        }
      }
      if (values.image[0]) {
        const uploaded = await upload.uploadFile(values.image[0])
        const image = await onChatBotImageUpdate(id, uploaded.uuid)
        if (image) {
          toast({
            title: image.status == 200 ? 'Success' : 'Error',
            description: image.message,
          })
          setLoading(false)
        }
      }
      if (values.welcomeMessage) {
        const message = await onUpdateWelcomeMessage(values.welcomeMessage, id)
        if (message) {
          toast({
            title: 'Success',
            description: message.message,
          })
        }
      }
      reset()
      router.refresh()
      setLoading(false)
    })
  
    const onDeleteDomain = async () => {
      setDeleting(true)
      const deleted = await onDeleteUserDomain(id)
      if (deleted) {
        toast({
          title: 'Success',
          description: deleted.message,
        })
        setDeleting(false)
        router.refresh()
      }
    }
    return {
      register,
      onUpdateSettings,
      errors,
      loading,
      onDeleteDomain,
      deleting,
    }
  }

export const useHelpDesk = (id: string) => {
    const {
      register,
      formState: {errors},
      handleSubmit,
      reset,
    } = useForm<HelpDeskQuestionProps>({
      resolver: zodResolver(HelpDeskQuestionsSchema),
    })

    const {toast} = useToast()

    const [loading, setLoading] = useState<boolean>(false)
    const [isQuestions, setIsQuestions] = useState<{id: string; question: string; answer: string}[]> ([])
  
  const onSubmitQuestion = handleSubmit(async (values) => {
    setLoading(true)
    const question = await onCreateHelpDeskQuestion(id, values.question, values.answer)
    if(question){
      setIsQuestions(question.questions!)
      toast({
        title: question.status == 200 ? 'Success' : 'Error',
        description: question.message,
      })
      setLoading(false)
      reset()
      
    }
  })
  const onGetQuestions = async () => {
    setLoading(true)
    const questions = await onGetAllHelpDeskQuestions(id)
    if(questions) {
      setIsQuestions(questions.questions)
      setLoading(false)
    }
}

useEffect(() => {
  onGetQuestions()
},[])

return{
  onSubmitQuestion,
  loading,
  errors,
  register,
  isQuestions
}
} 

export const useFilterQuestions = (id: string) => {

  const {
    register,
    formState: {errors},
    reset,
    handleSubmit
  } = useForm<FilterQuestionProps>({resolver: zodResolver(FilterQuestionSchema) })
  
  const {toast} = useToast()

  const [loading, setLoading] = useState<boolean>(false)
  const[isQuestions, setIsQuestions] = useState<{id:string, question:string}[]> ([])
  
  const onAddFilterQuestion = handleSubmit( async(values) => {
     setLoading(true)
     const question = await onCreateFilterQuestion(id, values.question)

     if(question){
      setIsQuestions(question.question!)
      toast({
        title: question.status == 200 ? 'Success' : 'Error',
        description: question.message,
      })
      setLoading(false)
      reset()
    }
  })
  const onGetQuestions = async() => {
    setLoading(true)
    const questions = await onGetAllFilterQuestion(id)
    if(questions){
     setIsQuestions(questions.question)
     setLoading(false)
    }
  }

  useEffect(() =>{
  onGetQuestions()
  }, [])

  return{
    register,
    loading,
    onAddFilterQuestion,
    isQuestions,
    errors
  } 
}

export const useProducts = (domainId: string) => {
  const {toast} = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const {register, reset, formState: {errors}, handleSubmit} = useForm<AddProductProps>({resolver: zodResolver(AddProductSchema)});

  const onCreateNewProduct = handleSubmit(async (values) => {
    try {
      setLoading(true)
      const uploaded = await upload.uploadFile(values.image[0]);
      const product = await onCreateNewDomainProduct(domainId, values.name, uploaded.uuid, values.price)
      if(product){
        reset()
        toast({
          title: "Success",
          description: product.message,
        })
      }
    } catch (error) {
      console.log(error)
    }
  })
  return {onCreateNewProduct, register, errors, loading }
}
