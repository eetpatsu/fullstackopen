import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      const notification = action.payload
      return notification
    },
    removeNotification(state, action) {
      return initialState
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer