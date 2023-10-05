import { configureStore } from '@reduxjs/toolkit'
import setUserSlice from './setUser/slice'

export default configureStore({
    reducer: {
        user: setUserSlice
    }

})
