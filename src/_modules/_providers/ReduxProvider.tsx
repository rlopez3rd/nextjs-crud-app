"use client"

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { makeStore} from "../store/store"
import React from "react"

const ReduxProvider = ({ children } : { children : React.ReactNode}) => {
  const store : any = makeStore()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={store.__persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ReduxProvider