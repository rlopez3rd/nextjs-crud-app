"use client";

import { IconButton, Menu, MenuItem, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useState } from 'react';

export interface AppTableProps<T = Record<string, any>> {
  rows: T[],
  columns: T[],
  actionsMenu?: T[]
}

const AppTable = (props: AppTableProps) => {
  console.log("APP TABLE RENDERED")
  const {rows, columns, actionsMenu } = props;
  const [row, setRow] = useState<any>()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleActions = (event: React.MouseEvent<HTMLButtonElement>, row: any) => {
    setRow(row)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{py: 3, px:2, my: 3}}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => { 
              return (
                <TableCell
                  key={column.field}
                > 
                {column.label || column}
                </TableCell>
              )})}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? 
            <TableRow sx={{'&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell
                colSpan={100}
                align='center'
              >No records
              </TableCell>
            </TableRow>
          : rows.map((row, i) => {
              return (
                <TableRow
                  key={`${row.id}-${i}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {columns.map(column => {
                    if (row[column.field]) {
                      return (
                        <TableCell
                          key={`${column.field}-${i}`}
                        > {row[column.field].value || row[column.field]} </TableCell>
                      )
                    }
                  })}

                {
                   actionsMenu && actionsMenu.length > 0 && (
                    <TableCell>
                      <IconButton
                          id="basic-button"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          size='small'
                          sx={{ color: '#000' }}
                          onClick={(e) => handleActions(e, row)}
                      >
                          <MoreHorizIcon  />
                      </IconButton>
                  </TableCell>  
                  )
                }
               </TableRow>)
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {
        actionsMenu &&
        actionsMenu.map((item, i) => {
          return (
            <MenuItem 
              key={`${item}-${i}`}
              className='flex w-full items-center'
              onClick={() => {item.onClick(row); handleClose();}}
            >
              <span className='mr-3'>{item.icon}</span>
              <span>{item.label}</span>
            </MenuItem>
          )
        })

      }
    </Menu>
    </>
    
  ) 
}

export default AppTable;