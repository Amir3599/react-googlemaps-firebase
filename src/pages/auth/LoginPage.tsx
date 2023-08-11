import React, { useEffect } from 'react'
import { getParcells } from '../../firebase/api'

function LoginPage() {

    useEffect(() => {
        getParcells().then((res) => console.log(res[0].vehicle_type))
    }, [])


    return (
        <div>
            LoginPage
        </div>
    )
}

export default LoginPage