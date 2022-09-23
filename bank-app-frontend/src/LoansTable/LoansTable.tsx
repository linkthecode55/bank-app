import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { LoanApi, Loan } from '../api';

export default function LoansTable() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Loan ID', width: 80 },
    {
      field: 'creditFacilityId',
      headerName: 'Credit Facility Id',
      width: 130,
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 160,
    },
    { field: 'loanType', headerName: 'Loan Type', width: 100 },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 80,
    },
  ];

  const loanApi = LoanApi();

  const [allLoans, setAllLoans] = React.useState<Loan[]>([]);

  React.useEffect(() => {
    loanApi.getAllLoans().then(function (response) {
      if (response.status === 200 && allLoans.length === 0) {
        setAllLoans(response.data);
        console.log(response.data);
      }
    });
  }, [allLoans]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={allLoans}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
