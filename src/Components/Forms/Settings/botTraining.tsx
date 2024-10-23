import TabsMenu from '@/Components/tabs'
import { TabsContent} from '@/Components/ui/tabs'
import { HELP_DESK_TABS_MENU } from '@/constants/menu'
import React from 'react'
import HelpDesk from './helpDesk'
import FilterQuestions from './filterQuestions'

type Props = {
    id: string
}

const BotTrainingForm = ({id}: Props) => {
  return (
    <div className='py-5 flex flex-col gap-5 items-start'>
        <div>
            <h2 className='font-bold text-2xl'>
                Bot Training
            </h2>
            <p className='text-sm font-light'>
                Set FAQ questions, create questions for capturing lead information and train your bot
                to act the way you want it to.
            </p>
        </div>
        <TabsMenu triggers={HELP_DESK_TABS_MENU}>
            <TabsContent value="help desk" className='w-full'>
                  <HelpDesk id={id} />
            </TabsContent>
            <TabsContent value="questions">
                <FilterQuestions id={id}/> 
            </TabsContent>
        </TabsMenu>
    </div>
  )
}

export default BotTrainingForm