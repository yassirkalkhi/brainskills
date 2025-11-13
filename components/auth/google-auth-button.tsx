import { signIn } from '@/lib/utils/auth/auth-client'
import React from 'react'

const GoogleButton = () => {
    const handleClick = async () => {
         await signIn.social({
            provider: 'google',
            callbackURL: "http://localhost:3000/dashboard",
         })
        }
  return (
    <button type='button' onClick={handleClick} className="flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors">
      Continue with Google
    </button>
  )
}

export default GoogleButton;