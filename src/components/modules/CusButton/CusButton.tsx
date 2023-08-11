import React, { ButtonHTMLAttributes } from 'react'
import { Oval } from 'react-loader-spinner'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

const CusButton: React.FC<CustomButtonProps> = (props) => {

    const {
        loading = false,
        disabled = loading,
        children,
        ...rest
    } = props

    return (
        <button disabled={disabled} {...rest}>
            {
                loading ? (
                    <Oval
                        height={20}
                        width={20}
                        color="#000"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#ffffffbb"
                        strokeWidth={4}
                        strokeWidthSecondary={4}
                    />
                ) :
                    children
            }
        </button>
    )
}

export default CusButton