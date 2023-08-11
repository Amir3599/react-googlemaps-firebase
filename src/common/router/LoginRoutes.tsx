import React, { lazy } from 'react'
import { Loadable } from '../../components'
import { LoginPagesLayout } from '../../components/layouts'
import { RouteObject } from 'react-router-dom'

const RootPage = Loadable(lazy(() => import('../../pages/auth/LoginPage')))

const AuthenticationRoutes: RouteObject = {
    path: '/auth',
    element: <LoginPagesLayout />,
    children: [
        {
            path: '/auth',
            element: <RootPage />
        }
    ]
}


export default AuthenticationRoutes