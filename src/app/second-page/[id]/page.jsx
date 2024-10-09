"use client"
import SecondStep from '@/app/components/SecondStep'
import StripeProvider from '@/app/components/StripeProvider'
import React from 'react'

const SecondPage = () => {
  return (
   <StripeProvider>
    <SecondStep />
   </StripeProvider>
  )
}

export default SecondPage