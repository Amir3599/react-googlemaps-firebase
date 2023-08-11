import React from 'react'
import { Link } from 'react-router-dom'

function RootPage() {
    return (
        <div className='flex items-center justify-center h-screen w-screen gap-x-8'>
            <Link to='auth' className='transition-all duration-500 w-52 aspect-square hover:bg-rose-600 hover:rounded-2xl hover:text-white border border-rose-800 flex items-center justify-center text-4xl'>Login</Link>
            <Link to='main' className='transition-all duration-500 w-52 aspect-square hover:bg-sky-600 hover:rounded-2xl hover:text-white border border-sky-800 flex items-center justify-center text-4xl'>Main</Link>
        </div>
    )
}

export default RootPage