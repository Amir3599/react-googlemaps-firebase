import React from 'react'
import store from '../../store/store'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// all app providers must be here
// like redux, context, router, ...

export default function Providers({ children }: { children: React.ReactNode }) {

    const queryClient = new QueryClient()

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    )
}