import React from 'react'
import Image from 'next/image'

type Props = {}

const PortalBanner = () => {
  return (
    <div className='w-full bg-muted flex justify-center py-5'>
    <Image
    src="/images/AthenaAi.png"
    alt="Logo"
    sizes='100vw'
    style={{
        width: '100px',
        height: 'auto',
    }}
    width={0}
    height={0}
    />
    </div>
  )
}

export default PortalBanner