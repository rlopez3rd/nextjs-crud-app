import { Box, Card, CardContent, Paper, Typography } from "@mui/material"
import { User } from "../types"
import { memo } from "react"

type PartialUser = Partial<User>

const UserDetails = memo((props: PartialUser) => {
  // console.log("Child Component Render")
  return (
  <Card sx={{my: 3, py:3, px:2}}>
    <CardContent>
      <Typography variant="h6">User Details</Typography>

      <Box sx={{display: 'flex', gap: 2}}>
          <label>Name:</label>
         <Typography>{props.name}</Typography>
      </Box>
      
      <Box sx={{display: 'flex', gap: 2}}>
          <label>Email:</label>
         <Typography>{props.email}</Typography>
      </Box>
      <Box sx={{display: 'flex', gap: 2}}>
          <label>Birthday:</label>
         <Typography>{props.dob}</Typography>
      </Box>
      <Box sx={{display: 'flex', gap: 2}}>
          <label>Address:</label>
         <Typography>{props.address}</Typography>
      </Box>
    </CardContent>
  </Card>
  )
})

export default UserDetails