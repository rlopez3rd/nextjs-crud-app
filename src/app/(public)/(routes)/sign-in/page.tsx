"use client"

import { Box, Button, Card, CardContent, CardHeader, Container, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux"
import { login } from "@/_modules/store/auth/auth-slice"

import { Formik } from "formik";
import * as yup from "yup";

import { users } from "@/entities"
interface UserCredentials {
  email: string,
  password: string
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .required(),
  password: yup
    .string()
    .label('Password')
    .required(),
})

const SignIn = () => {

  const router = useRouter()
  const dispatch = useDispatch()

  const [ userForm, setUserForm ] = useState<UserCredentials>({email: "", password: ""}) 
  const [error, setError ] = useState<any>(null)


  const handleUserLogin = () => {
    const user = users.find(item => {
      return item.email === userForm.email && item.password === userForm.password
    })

    if (user) {
      dispatch(login(user))
      setError(undefined)
      setUserForm({email: "", password: ""})
      router.push('/users-maintenance')
    } else {
      setError("Invalid credentials.")
    }
  }
  
  return (
    <Container 
      sx={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{height: 'auto',  width: 400,}}>
        <CardHeader title="Sign In" />
        <Formik
          initialValues={
            {
              email: "",
              password: ""
            }
          }
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {}}
        >
          {
            ({values, errors, touched, isValid, handleChange, submitForm}) => { 
              return (
                <CardContent>
                  <Stack gap={4}>
                    <TextField 
                      name="email"
                      label="Email"
                      placeholder="ex: name@email.com"
                      variant="outlined" 
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(errors.email) && touched.email}
                      helperText={Boolean(errors.email) && touched.email ? errors.email : ''}
                    />
                    
                    <TextField 
                      name="password"
                      label="Password"
                      placeholder="ex: p@s5w0Rd"
                      variant="outlined" 
                      value={values.password}
                      onChange={handleChange}
                      error={Boolean(errors.password) && touched.password}
                      helperText={Boolean(errors.password) && touched.password ? errors.password : ''}
                    />
                    {/* {error?.length > 0 && <Typography variant="body1" color="warning" >{error}</Typography>} */}
                    <Button 
                      variant="contained"
                      onClick={handleUserLogin} 
                    >Login</Button>
                  </Stack>
                </CardContent>
              )
            }
          }

        </Formik>
       
      </Card>
    </Container>
  )
}

export default SignIn