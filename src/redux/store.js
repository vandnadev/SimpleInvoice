import { configureStore } from '@reduxjs/toolkit'
import invoices from './reducer'

export const store = configureStore({
  reducer: {
    invoices
  },
})