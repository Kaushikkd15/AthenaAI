'use client'
import { Section } from '@/Components/section-label/Section'
import { Card, CardContent, CardDescription, CardTitle } from '@/Components/ui/card'
import { useHelpDesk } from '@/hooks/settings/useSettings'
import React from 'react'
import FormGenerator from '../formGenerator'
import { Button } from '@/Components/ui/button'
import Accordion from '@/Components/accordion'
import { Loader } from '@/Components/loader'

type Props = {
    id: string
}

const HelpDesk = ({id}: Props) => {
    const {register,loading, errors, isQuestions, onSubmitQuestion } = useHelpDesk(id)
  return (
    <Card className='w-full grid grid-cols-1 lg:grid-cols-2'>
        <CardContent>
            <CardTitle className='pt-2'>HelpDesk</CardTitle>
            <form onSubmit={onSubmitQuestion} className='flex flex-col gap-6 mt-10' >
                 <div className='flex flex-col gap-3'>
                    <Section label='Question' message='Add a frequently asked question'/>
                        <FormGenerator
                        inputType='input'
                        register={register}
                        errors={errors}
                        form='help-desk-form'
                        name='question'
                        placeholder='Type your question'
                        type='text'
                        lines={5}
                        />
                 </div>
                 <div className='flex flex-col gap-3'>
                  <Section label="Answer to question" message='The answer for the above question'/>
                  <FormGenerator
                  inputType='textarea'
                  register={register}
                  errors={errors}
                  name='answer'
                  form='help-desk-form'
                  placeholder='Type your answer'
                  type='text'
                  lines={5}
                  />
                 </div>
                 <Button type='submit' className='bg-black hover:bg-iridium hover:opacity-60 transition duration-150 ease-in-out font-semibold'>
                  Create
                  </Button>
            </form>
        </CardContent>
        <CardContent className='p-6 overflow-y-auto chat-window'>
          <Loader loading={loading}>
            {isQuestions.length ? ( isQuestions.map((question) => (
              <Accordion 
              key={question.id}
              trigger={question.question}
              content={question.answer}
              />
            ))
          ) : (
            <CardDescription> No Questions</CardDescription>
          )}
          </Loader>
        </CardContent>
    </Card>
  )
}

export default HelpDesk