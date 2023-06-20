'use client'

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const data = [
  {
    name: 'John',
    age: 30,
  },
  {
    name: 'Sara',
    age: 25,
  },
]

export default function App() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
      },
      {
        accessorFn: (row) => row.age, //alternate way
        id: 'age', //id required if you use accessorFn instead of accessorKey
        header: 'Age',
        Header: () => <i>Age</i>, //optional custom header render
      },
    ],
    [],
  );

  //optionally, you can manage any/all of the table state yourself
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  //Or, optionally, you can get a reference to the underlying table instance
  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    //read the table state during an event from the table instance ref
    console.log(tableInstanceRef.current.getState().sorting);
  }
  
  return (

    <MaterialReactTable 
      columns={columns} 
      data={data} 
      enableColumnActions={false}
      enableColumnFilters={false}
      enableSorting={false}

      initialState={{ showGlobalFilter: true }}

      muiTablePaginationProps={{
        rowsPerPageOptions: [10],
        showFirstButton: false,
        showLastButton: false,
      }}
   
      renderTopToolbarCustomActions={() => (
        <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="neutral"
              onClick={() => {
                alert('clicked');
              }}
            >            
              글쓰기
            </Button>
          </ThemeProvider>
        </Box>        
      )}
      renderToolbarInternalActions={() => (
        <Box/>
      )}
    />
  );
}
