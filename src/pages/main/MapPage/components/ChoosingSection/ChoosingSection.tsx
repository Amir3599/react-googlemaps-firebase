import React, { useState } from 'react'
import { DestinationSelection, OriginSelection, ParcelTypeSelection, TransportOptSelection } from './selectors'
import { ParcellsType, PricingDataRes } from '../../../../../common/types'

export interface placeSelectionProps {
    setOriginPlace: React.Dispatch<React.SetStateAction<google.maps.places.Autocomplete | undefined>>
    onPlaceChanged: (isOrigin: boolean) => void
    setDestinationPlace: React.Dispatch<React.SetStateAction<google.maps.places.Autocomplete | undefined>>
    setParcellType: React.Dispatch<React.SetStateAction<ParcellsType | undefined>>
    parcelType: ParcellsType | undefined
    onGetPrice: () => Promise<void>
    transportOpts?: PricingDataRes
    disabled?: boolean
    nextStep?: () => void
    places: [google.maps.places.Autocomplete | undefined, google.maps.places.Autocomplete | undefined]
    address?: string
}

function ChoosingSection({
    onPlaceChanged,
    setDestinationPlace,
    setOriginPlace,
    parcelType,
    setParcellType,
    onGetPrice,
    transportOpts,
    places
}: placeSelectionProps): JSX.Element {

    const [activeStep, setActiveStep] = useState<number>(0)
    const [approval, setApproval] = useState<boolean>(false)

    const stepsAvailablity = (s: number) => {
        if (s > activeStep) {
            return true
        } else {
            return false
        }
    }

    const nextStep = (step: number) => {
        if (step === 0 && !places[0]?.getPlace?.()) {
            return
        }
        if (step === 1 && !places[1]?.getPlace?.()) {
            return
        }
        if (step === 2 && !parcelType) {
            return
        }
        setActiveStep((prev) => prev + 1)
    }

    return (
        <div className='h-full overflow-y-scroll pb-6'>
            <OriginSelection
                nextStep={() => nextStep(0)}
                disabled={stepsAvailablity(0)}
                onPlaceChanged={onPlaceChanged}
                setOriginPlace={setOriginPlace}
                address={places[0]?.getPlace?.()?.formatted_address}
            />
            <DestinationSelection
                nextStep={() => nextStep(1)}
                disabled={stepsAvailablity(1)}
                setDestinationPlace={setDestinationPlace}
                onPlaceChanged={onPlaceChanged}
                approval={approval}
                setApproval={setApproval}
                address={places[1]?.getPlace?.()?.formatted_address}
            />
            <ParcelTypeSelection
                nextStep={() => nextStep(2)}
                disabled={stepsAvailablity(2)}
                parcelType={parcelType}
                setParcellType={setParcellType}
                onGetPrice={onGetPrice}
            />
            <TransportOptSelection
                disabled={stepsAvailablity(3)}
                transportOpts={transportOpts}
            />
        </div>
    )
}

export default ChoosingSection