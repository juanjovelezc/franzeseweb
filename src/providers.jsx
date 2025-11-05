import React from 'react'
import { DataProvider } from './context/DataContext'
import { AuthProvider } from './context/AuthContext'

export default function Providers({ children }){
  return <AuthProvider><DataProvider>{children}</DataProvider></AuthProvider>
}
