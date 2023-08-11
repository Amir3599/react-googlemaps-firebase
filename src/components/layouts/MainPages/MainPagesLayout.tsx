import React from 'react'
import { Outlet } from 'react-router-dom'

// Main  pages layout implementation
// outlet will render nested routes in main pathname

function MainPagesLayout() {
    return (
        <div className='w-screen h-screen bg-gray-100'>
            <Outlet />
        </div>
    )
}

export default MainPagesLayout