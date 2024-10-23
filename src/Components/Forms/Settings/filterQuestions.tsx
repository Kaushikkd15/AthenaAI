'use client'
import { Section } from '@/Components/section-label/Section'
import { Card, CardContent, CardDescription, CardTitle } from '@/Components/ui/card'
import { useFilterQuestions, useHelpDesk } from '@/hooks/settings/useSettings'
import React from 'react'
import FormGenerator from '../formGenerator'
import { Button } from '@/Components/ui/button'
import { Loader } from '@/Components/loader'
import Accordion from '@/Components/accordion'

type Props = {
    id: string
}

const FilterQuestions = ({id}: Props) => {
    const {register, errors, onAddFilterQuestion, isQuestions, loading } = useFilterQuestions(id)
  return (
    <Card className='w-full grid grid-cols-1 lg:grid-cols-2'>
        <CardContent className='p-6 border-r-[1px]'>
            <CardTitle>helpDesk</CardTitle>
            <form 
            onSubmit={onAddFilterQuestion}
            className='flex flex-col gap-6 mt-10'>
             <div className='flex flex-col gap-3'>
                <Section 
                label={'Question'} 
                message={'Add all the freuently asked question'}/>
                  <FormGenerator
                        inputType='input'
                        register={register}
                        errors={errors}
                        form='filter-questions-form'
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
                  form='filter-questions-form'
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
             <p 
             key={question.id}
             className='font-semibold'>
                {question.question}
             </p>
            ))
          ) : (
            <CardDescription> No Questions</CardDescription>
          )}
          </Loader>
        </CardContent>
    </Card>
  )
}

export default FilterQuestions