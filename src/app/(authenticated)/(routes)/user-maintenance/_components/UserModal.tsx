import { useEffect, useState } from "react";
import { User } from "../types";
import { useModal } from "@/_modules/_contexts/ModalProvider"
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from "@/_modules/store/users/users-slice";

import { Formik } from "formik";
import * as yup from "yup";

import { 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  CardHeader, 
  Stack, 
  TextField,
  FormControl,
  FormHelperText
 } from "@mui/material"

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .label('Fullname')
    .required(),
  email: yup
    .string()
    .label('Email')
    .required()
    .email('Must be a valid email'),
  dob: yup
    .string()
    .label('Birthday')
    .required(),
  address: yup
    .string()
    .label('Address')
    .required(),
})

type PartialUser = Partial<User>

const UserModal = (props: PartialUser) => {
  const { closeModal } = useModal()
  const dispatch = useDispatch()

  const [ userForm, setUserForm ] = useState<PartialUser>({
    id: 0,
    name: "",
    email: "",
    dob: "",
    address: ""
  })

  useEffect(() => {
    if (props.name) {
      const { id, name, email, dob, address } = props
      setUserForm({id, name, email, dob, address})
    }
  }, [])

  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
     <Card 
        elevation={0}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <CardHeader title={props.name ? "Edit User" : "Create User"} sx={{backgroundColor: '#1565c0', color: "white"}}/>
        <Formik
          initialValues={
            {
              id: props.id || 0,
              name: props.name || "",
              email: props.email || "",
              dob: props.dob || "",
              address: props.address || ""
            }
          }
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {}}
        > 
          { ({values, errors, touched, isValid, handleChange, submitForm}) => {

            const handleSubmit = async () => {
              await submitForm();
              if (isValid) {
                if (props.name) {
                  setLoading(true)
                  setTimeout(() => {
                    dispatch(updateUser(values))
                    setLoading(false)
                    closeModal()
                  }, 3000)
                }
                else {
                  values.id = Date.now()
                  setLoading(true)
                  setTimeout(() => {
                    dispatch(createUser(values))
                    setLoading(false)
                    closeModal()
                  }, 3000)
                }
              }
            }

            return (
              <>
                <CardContent>
                  <Stack spacing={2}>
                    {/* <FormControl sx={{pb: 2}}> */}
                      <TextField
                        required
                        name="name"
                        label="Name" 
                        variant="outlined" 
                        size="small"
                        value={values.name}
                        onChange={handleChange}
                        error={Boolean(errors.name) && touched.name}
                        helperText={Boolean(errors.name) && touched.name ? errors.name : ''}
                      />
                      {/* {errors.name && touched.name &&
                                        <FormHelperText className="text-red-600 ml-3">{errors.name}</FormHelperText>} */}
                    {/* </FormControl> */}
                    
                    <TextField
                      required
                      name="email"
                      label="Email" 
                      variant="outlined" 
                      size="small"
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(errors.email) && touched.email}
                      helperText={Boolean(errors.email) && touched.email ? errors.email : ''}
                    />
                    <TextField
                      required
                      name="dob"
                      label="Birthday" 
                      variant="outlined" 
                      size="small"
                      value={values.dob}
                      onChange={handleChange}
                      error={Boolean(errors.dob) && touched.dob}
                      helperText={Boolean(errors.dob) && touched.dob ? errors.dob : ''}
                    />
                    <TextField
                      required
                      name="address"
                      label="Address" 
                      variant="outlined" 
                      size="small"
                      value={values.address}
                      onChange={handleChange}
                      error={Boolean(errors.address) && touched.address}
                      helperText={Boolean(errors.address) && touched.address ? errors.address : ''}
                    />
                  </Stack>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button 
                    variant="contained" 
                    sx={{ mt: 2 }} 
                    onClick={closeModal}
                  >
                    Close
                  </Button>
                  <Button 
                    variant="contained" 
                    sx={{ mt: 2 }} 
                    onClick={handleSubmit}
                    loading={loading}
                  >
                    Save
                  </Button>
                </CardActions>
              </>
            )
          }
          }
            
        </Formik>
      </Card>
    </>
     
  )
}

export default UserModal