'use client'

import { useThemeMode } from '@/hooks/settings/useSettings'
import React from 'react'
import { Section } from '../section-label/Section'
import { cn } from '@/lib/utils'
import { SystemMode } from '../theme-placeholder/systemMode'
import { DarkMode } from '../theme-placeholder/darkMode'
import { LightMode } from '../theme-placeholder/lightMode'

type Props = {}

const DarkModeToggle = (props: Props) => {
    const {setTheme, theme} =useThemeMode()
  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
        <div className='lg:col-span-1'>
            <Section label='Interface-theme' message='Select or customize your UI theme' />
        </div>
        <div className='lg:col-span-4 flex lg:flex-row flex-col items-start gap-5'>
            <div className={cn('rounded-xl overflow-hidden cursor-pointer border-4 border-transparent', theme=='system' && 'border-iridium')} onClick={() => setTheme('system')}>
                <SystemMode /> 
            </div>
            <div className={cn('rounded-xl overflow-hidden cursor-pointer border-4 border-transparent', theme=='dark' && 'border-iridium')} onClick={() => setTheme('dark')}>
                <DarkMode /> 
            </div>
            <div className={cn('rounded-xl overflow-hidden cursor-pointer border-4 border-transparent', theme=='light' && 'border-iridium')} onClick={() => setTheme('light')}>
                <LightMode/> 
            </div>
        </div>
    </div>
  )
}

export default DarkModeToggle