import React from 'react'
import { Outlet } from 'react-router-dom'

// login pages layout implementation
// outlet will render nested routes in auth pathname

function LoginPagesLayout() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default LoginPagesLayout