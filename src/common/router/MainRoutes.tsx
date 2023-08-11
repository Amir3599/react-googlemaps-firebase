import React, { lazy } from 'react'
import { Loadable } from '../../components'
import { MainPagesLayout } from '../../components/layouts'
import { RouteObject } from 'react-router-dom'

const MapPage = Loadable(lazy(() => import('../../pages/main/MapPage/MapPage')))

const MainRoutes: RouteObject = {
    path: '/main',
    element: <MainPagesLayout />,
    children: [
        {
            path: '/main',
            element: <MapPage />
        }
    ]
}


export default MainRoutes