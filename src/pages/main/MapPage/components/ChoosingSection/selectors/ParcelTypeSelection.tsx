import React, { useEffect, useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { useGetParcells } from '../../../../../../hooks'
import ParcellCard from '../ParcellCard/ParcellCard';
import { ParcellsType } from '../../../../../../common/types';
import { CusButton } from '../../../../../../components/modules';

interface props {
    setParcellType: React.Dispatch<React.SetStateAction<ParcellsType | undefined>>
    parcelType: ParcellsType | undefined
    onGetPrice: () => Promise<void>
    disabled?: boolean
    nextStep?: () => void
}

function ParcelTypeSelection({ parcelType, setParcellType, onGetPrice, disabled, nextStep }: props) {

    const { data, isLoading, error } = useGetParcells()
    const [loading, setLoading] = useState<boolean>()

    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        if (!disabled) {
            setOpen(true)
            return
        }
    }, [disabled])

    const getParcellFromCahche = async () => {
        const cahcedParcell = localStorage.getItem('selected-Parcell')
        if (cahcedParcell) {
            const jsonParcell = await JSON.parse(cahcedParcell)
            return jsonParcell
        }
    }

    useEffect(() => {
        getParcellFromCahche().then((data) => setParcellType(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const selectParcell = (parcell: ParcellsType) => {
        setParcellType(parcell)
        localStorage.setItem('selected-Parcell', JSON.stringify(parcell))
    }

    const goToNextStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setLoading(true)
        e.stopPropagation()
        onGetPrice().then(() => {
            if (parcelType) {
                setOpen(false)
            }
        }).finally(() => {
            setLoading(false)
            nextStep?.()
        })
    }

    const onSelectParcell = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ParcellsType) => {
        e.stopPropagation()
        selectParcell(item)
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
                        <p className='accordion-summary-head'>Parcel's Type</p>

                    </div>
                    <p className='accordion-summary-text'>{parcelType?.parcel_type}</p>
                </div>
            </AccordionSummary>
            <AccordionDetails className='accordion-details-text'>
                <div>
                    {data?.map((item, i) => (
                        <button key={item.parcel_type} type='button' onClick={(e) => onSelectParcell(e, item)} className={`w-full transition-colors duration-300 ${parcelType?.parcel_type === item.parcel_type ? 'bg-sky-400 text-white' : 'bg-slate-100'}`}>
                            <ParcellCard key={i} parcell={item} />
                        </button>
                    ))}
                </div>
                <div className='flex justify-center'>
                    <CusButton
                        type='button'
                        className='acc-btns w-1/2 mx-auto mt-4 flex justify-center'
                        onClick={goToNextStep}
                        loading={loading}
                    >
                        Confirm
                    </CusButton>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default React.memo(ParcelTypeSelection)