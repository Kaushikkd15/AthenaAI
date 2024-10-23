import React from 'react'
import Image from "next/image";
import { Button } from '../ui/button';
import Link from 'next/link';

type Props = {}

const Navbar = () => {
  return (
    <div className='flex gap-5 justify-between items-center px-7 py-1 max-md:flex-wrap max-md:px-5 border-b border-solid border-zinc-100'>
      <div className='flex justify-center gap-2 self-stretch text-2xl text-neutral-500'>
        <Image
            src="/images/AthenaAi.png"
            alt="LOGO"
            sizes="100vw"
            style= {{
            width: '120px',
            height: 'auto'
            }}
            width={0}
            height={0}
            />
        </div>
        <ul className='gap-5 justify-between self-stretch my-auto leading-5 text-sm text-neutral-700 max-md:flex-wrap max-md:max-w-full font-normal hidden md:flex '>
                <li>Home</li>
                <li>Pricing</li>
                <li>News Room</li>
                <li>Features</li>
                <li>Contact us</li>
        </ul>
        <Link href={'/dashboard'} className='bg-black px-6 rounded-md py-2 text-white font-medium'>Free Trail</Link>     
    </div>
  )
}

export default Navbar