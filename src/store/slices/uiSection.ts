import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UiSectionType } from '../../common/types'

const initialUiSectionState: UiSectionType = {
    loading: false
}

const uiSectionSlice = createSlice({
    name: "uiSection",
    initialState: { ...initialUiSectionState },
    reducers: {
        setLoading(state, action: PayloadAction<UiSectionType>) {
            return state = action.payload
        }
    }
})

export const { setLoading } = uiSectionSlice.actions
export default uiSectionSlice.reducer