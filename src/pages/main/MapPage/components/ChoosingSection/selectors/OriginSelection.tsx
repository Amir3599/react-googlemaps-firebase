import React, { useEffect, useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material'
import { Autocomplete } from '@react-google-maps/api'
import { placeSelectionProps } from '../ChoosingSection'
import { CusButton } from '../../../../../../components/modules'

function OriginSelection({ onPlaceChanged, setOriginPlace, disabled, nextStep, address }: Partial<placeSelectionProps>) {

    const [open, setOpen] = useState<boolean | undefined>(false)

    useEffect(() => {
        if (!disabled) {
            setOpen(true)
            return
        }
    }, [disabled])

    const goToNextStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        nextStep?.()
        if (address) {
            setOpen(false)
        }
    }

    const openAccordion = () => {
        if (!disabled) {
            setOpen((prev) => !prev)
        }
    }

    return (
        <Accordion expanded={open} disabled={disabled}>
            <AccordionSummary onClick={openAccordion}>
                <div>
                    <div className='flex justify-between'>
                        <p className='accordion-summary-head'>Origin</p>

                    </div>
                    <p className='accordion-summary-text'>{address}</p>
                </div>
            </AccordionSummary>

            <AccordionDetails
                className='w-full'
            >
                <Autocomplete
                    className='w-full'
                    onLoad={setOriginPlace}
                    onPlaceChanged={() => onPlaceChanged?.(true)}
                >
                    <TextField className='w-full' id="filled-basic" label="address" variant="filled" />
                </Autocomplete>
                <div className='flex justify-between gap-x-4 text-sky-600 mt-8'>
                    <button type='button' className='acc-btns'>
                        Choose from Favourites
                    </button>
                    <CusButton type='button' className='acc-btns' onClick={goToNextStep}>
                        Confirm Origin
                    </CusButton>
                </div>
            </AccordionDetails>

        </Accordion>
    )
}

export default React.memo(OriginSelection)