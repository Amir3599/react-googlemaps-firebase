import React, { useEffect, useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { Autocomplete } from '@react-google-maps/api'
import { placeSelectionProps } from '../ChoosingSection'
import { CusButton } from '../../../../../../components/modules'

interface props extends Partial<placeSelectionProps> {
  approval: boolean
  setApproval: React.Dispatch<React.SetStateAction<boolean>>
}

function DestinationSelection({ onPlaceChanged, setDestinationPlace, approval, setApproval, disabled, nextStep, address }: props) {

  const [open, setOpen] = useState<boolean>(false)


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
    <Accordion expanded={open} className='mt-4' disabled={disabled}>

      <AccordionSummary onClick={openAccordion}>
        <div>
          <div className='flex justify-between'>
            <p className='accordion-summary-head'>Destination</p>

          </div>
          <p className='accordion-summary-text'>{address}</p>
        </div>
      </AccordionSummary>

      <AccordionDetails className='accordion-details-text'>
        <Autocomplete
          onLoad={setDestinationPlace}
          onPlaceChanged={() => onPlaceChanged?.(false)}
        >
          <TextField className='w-full' id="filled-basic" label="address" variant="filled" />
        </Autocomplete>
        <div>
          <p>Delivery Approval by:</p>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={approval}
            onChange={(e) => setApproval(JSON.parse(e.target.value))}
            row
          >
            <FormControlLabel value={true} control={<Radio />} label="Confirmation Code" />
            <FormControlLabel value={false} control={<Radio />} label="Not Needed" />
          </RadioGroup>
        </div>
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

export default React.memo(DestinationSelection)