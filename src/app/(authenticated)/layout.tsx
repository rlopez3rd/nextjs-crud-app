'use client'
import { JSX, useState } from "react"

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import AppBar from "@mui/material/AppBar";

import AppBar from "./_components/_layouts/AppBar";
import SideBar from "./_components/_layouts/SideBar";


const AuthLayout = ({children} : {children: React.ReactNode}) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <AppBar toggleDrawer={toggleDrawer}/>
      <Box sx={{display: 'flex'}}>
        <SideBar open={open} />
        <main className="w-screen px-6 py-3">
          {children}
        </main>
      </Box>
    </Box>
  )
}

export default AuthLayout