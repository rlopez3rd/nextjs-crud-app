'use client'
import React, { useCallback, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AppTable, { AppTableProps } from '@/app/(authenticated)/_components/commons/AppTable';

import UserModal from './_components/UserModal';

import { useModal } from '@/_modules/_contexts/ModalProvider';
import { useSelector } from 'react-redux';
import { RootState } from '@/_modules/store/store';
import { User } from './types';
import { deleteUser } from '@/_modules/store/users/users-slice';
import { useDispatch } from 'react-redux';

interface Filters {
  search: string
}

const UserTable  = React.memo((props: AppTableProps) => {
  return (
    <AppTable
      {...props}
    />
  )
})

const UserMaintenance = () => {
  const dispatch = useDispatch()
  const { openModal } = useModal()
  const [ filters, setFilters ] = useState<Filters>({search: ''})
  const userData = useSelector((state : RootState) => state.user.data)

  const dataColumns = useMemo(() => ([
    {
      field: "name",
      label: "Name",
    },
    {
      field: "email",
      label: "Email",
    },
    {
      field: "dob",
      label: "Birthday",
    },
    {
      field: "address",
      label: "Address",
    },
    {
      field: "",
      label: "Actions",
    }
  ]), [])

  const filteredUsers = userData.filter((item) => {
    return filters.search ? item.name.toLowerCase().includes(filters.search.toLowerCase()) : true
  })
  
  const actionsMenu = useMemo(() => [
    {
      label: "Edit",
      icon: <EditIcon />,
      onClick: (user: User) => openModal(<UserModal {...user} />)
    },
    {
      label: "Delete",
      icon: <DeleteIcon />,
      onClick: (id: number) => dispatch(deleteUser({id}))
    },
  ], [dispatch, openModal])

  const handleFilters = (event: any, key: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: event.target.value
    }))
  }

  const showCreateModal = () => openModal(<UserModal />)

  return (
    <Box>
      {/* Page Header */}
      <Paper sx={{py: 3, display: 'flex', justifyContent: 'space-between'}} elevation={0}>
        <Typography variant='h6'>User Maintenance</Typography>
        <Button variant='contained' onClick={showCreateModal}>Add User</Button>
      </Paper>
      
      {/* filters */}
      <Paper sx={{py: 3, px:2}}>
        <Stack direction="row">
            <TextField 
              label="Search" 
              variant="outlined" 
              size="small"
              value={filters.search}
              onChange={(e) => handleFilters(e, 'search')}
            />
        </Stack>
      </Paper>

      <UserTable 
        columns={dataColumns}
        rows={filteredUsers}
        actionsMenu={actionsMenu}
      />
    </Box>
)
}

export default UserMaintenance