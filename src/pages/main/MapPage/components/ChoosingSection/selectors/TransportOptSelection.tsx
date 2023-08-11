import React, { useEffect, useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { PricingDataRes } from '../../../../../../common/types'
import { BikeImg, MotorImg, WalkingImg } from '../../../../../../assets/img'

interface props {
    transportOpts?: PricingDataRes
    disabled?: boolean
}

function TransportOptSelection({ transportOpts, disabled }: props) {

    const [selectedOpt, setSelectedOpt] = useState<number>()
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        if (!disabled) {
            setOpen(true)
            return
        }
    }, [disabled])

    useEffect(() => {
        const cachedOpt = localStorage.getItem('selected-opt')
        if (cachedOpt) {
            setSelectedOpt(Number(cachedOpt))
        }
    }, [])


    const checkAvailablity = (tpType: 'walking' | 'riding' | 'cycling') => {
        if (!transportOpts || !transportOpts[tpType]) {
            return true
        } else {
            return false
        }
    }

    const selectOption = (opt: number) => {
        setSelectedOpt(opt)
        localStorage.setItem('selected-opt', opt.toString())
    }

    const openAccordion = () => {
        if (!disabled) {
            setOpen((prev) => !prev)
        }
    }

    return (
        <Accordion expanded={open} className='mt-4' disabled={disabled}>
            <AccordionSummary onClick={openAccordion}>
                <div>
                    <div className='flex justify-between'>
                        <p className='accordion-summary-head'>Transport Options</p>

                    </div>
                    <p className='accordion-summary-text'>Transport Options</p>
                </div>
            </AccordionSummary>
            <AccordionDetails className='accordion-details-text'>
                <div className='grid grid-cols-3 grid-rows-1 gap-x-3'>
                    {transportOpts?.status === 'success' && transportOpts.message ?
                        <p className='row-span-full col-span-full text-red-500'>{transportOpts.message}</p>
                        :
                        <>
                            <button onClick={() => selectOption(1)} disabled={checkAvailablity('riding')} type='button' className={`TPOpt ${selectedOpt === 1 ? 'bg-sky-500 text-white' : ''}`}>
                                <MotorImg className='w-16 aspect-square' />
                                <p>
                                    A$ {transportOpts?.riding?.price}
                                    <br />
                                    {transportOpts?.riding?.time}
                                </p>
                            </button>
                            <button onClick={() => selectOption(2)} disabled={checkAvailablity('cycling')} type='button' className={`TPOpt ${selectedOpt === 2 ? 'bg-sky-500 text-white' : ''}`}>
                                <BikeImg className='w-16 aspect-square' />
                                <p>
                                    A$ {transportOpts?.cycling?.price}
                                    <br />
                                    {transportOpts?.cycling?.time}
                                </p>
                            </button>
                            <button onClick={() => selectOption(3)} disabled={checkAvailablity('walking')} type='button' className={`TPOpt ${selectedOpt === 3 ? 'bg-sky-500 text-white' : ''}`}>
                                <WalkingImg className='w-16 aspect-video' />
                                <p>
                                    A$ {transportOpts?.walking?.price}
                                    <br />
                                    {transportOpts?.walking?.time}
                                </p>
                            </button>
                        </>
                    }
                </div>
                <div className='flex justify-center'>
                    <button type='button' className='acc-btns w-1/2 mx-auto mt-4'>Confirm</button>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default React.memo(TransportOptSelection)