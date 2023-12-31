import React, { useMemo, useRef, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import Button from '@leafygreen-ui/button';
import { useRouter } from 'next/router';


export default function CreateTable({data}) {

  const router = useRouter()

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: '글번호',
        size: 100,
        muiTableHeadCellProps: {
          align: 'left',
        },
        muiTableBodyCellProps: {
          align: 'left',
        },
      },
      {
        accessorKey: 'title',
        header: '제목',
        size: 100,
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'user',
        header: '작성자',
        muiTableHeadCellProps: {
          align: 'right',
        },
        muiTableBodyCellProps: {
          align: 'right',
        },
      },
      {
        accessorKey: 'created_at',
        header: '작성일',
        muiTableHeadCellProps: {
          align: 'right',
        },
        muiTableBodyCellProps: {
          align: 'right',
        }
      }
    ]
  )

  return (
    <>
    <Button style={{width: 100}} onClick={()=> router.push('/qpost/write')}>글쓰기</Button>

    <MaterialReactTable 
      columns={columns} 
      // data={data.slice().reverse()} 
      data={data}
      enableColumnActions={false}
      enableColumnFilters={false}
      enableSorting={false}
      enablePagination={false}
      initialState={{ density: 'compact' }}

      enableTopToolbar={false}
      enableBottomToolbar={false}
        // initialState={{ showGlobalFilter: true }}

        // muiTablePaginationProps={{
        //   rowsPerPageOptions: [10],
        // }}

        muiTableBodyCellProps={({ cell }) => ({
          onClick: (event) => {
            // console.log(event, cell);
            router.push('qpost/' + cell.row.original.id )
          },
          sx: {
            cursor: 'pointer',
         },
        })}

        muiTablePaperProps={{
          elevation: 0, //change the mui box shadow
          //customize paper styles
          sx: {
            // borderRadius: '100',
            borderLeft: '2px solid #10162f',
            borderRight: '3px solid #10162f',
            borderBottom: '8px solid #10162f',
            outline: '0.2rem solid #fff'
          },
        }}

        
    
        // renderTopToolbarCustomActions={({ table }) => (
        //   <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
        //     {/* <ThemeProvider theme={theme}> */}
        //       <Button variant="contained" color="primary"
        //         onClick={() => {
        //           alert('clicked');
        //         }}
        //       >            
        //         글쓰기
        //       </Button>
        //     {/* </ThemeProvider> */}
        //   </Box>        
        // )}
        // renderToolbarInternalActions={({ table }) => (
        //   <Box/>
        // )}
      />
  </>
  );
}
