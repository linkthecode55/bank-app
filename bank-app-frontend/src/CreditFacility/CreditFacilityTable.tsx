import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { CreditFacility, CreditFacilityApi } from '../api';
import { Button } from '@mui/material';
import { TouchRippleActions } from '@mui/material/ButtonBase/TouchRipple';
import CreditFacilityForm from './CreditFacilityForm';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const RenderButton = (props: GridRenderCellParams) => {
  const { hasFocus, value, getValue, id } = props;
  const buttonElement = React.useRef<HTMLButtonElement | null>(null);
  const rippleRef = React.useRef<TouchRippleActions | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current?.querySelector('input');
      input?.focus();
    } else if (rippleRef.current) {
      rippleRef.current.stop({} as any);
    }
  }, [hasFocus]);

  return (
    <strong>
      {value?.getFullYear() ?? ''}
      <Button
        component="button"
        ref={buttonElement}
        touchRippleRef={rippleRef}
        variant="contained"
        size="small"
        style={{ marginLeft: 16 }}
        // Remove button from tab sequence when cell does not have focus
        tabIndex={hasFocus ? 0 : -1}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === ' ') {
            // Prevent key navigation when focus is on button
            event.stopPropagation();
          }
        }}
        onClick={handleClickOpen}
      >
        Create Loan
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogContent>
          <CreditFacilityForm
            id={getValue(id, 'id')}
            fullName={`${getValue(id, 'firstName') || ''} ${
              getValue(id, 'lastName') || ''
            }`}
          />
        </DialogContent>
      </Dialog>
    </strong>
  );
};

export default function CreditFacilityTable() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Credit Facility ID', width: 130 },
    { field: 'firstName', headerName: 'First name', width: 100 },
    { field: 'lastName', headerName: 'Last name', width: 100 },
    {
      field: 'birthday',
      headerName: 'Birthday',
      type: 'string',
      width: 100,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      width: 170,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'createLoan',
      headerName: 'Create Loan',
      sortable: false,
      width: 160,
      renderCell: RenderButton,
    },
  ];

  const creditFacilityApi = CreditFacilityApi();

  const [allCreditFacilities, setAllCreditFacilities] = React.useState<
    CreditFacility[]
  >([]);

  React.useEffect(() => {
    creditFacilityApi.getAllCreditFacilities().then(function (response) {
      if (response.status === 200 && allCreditFacilities.length === 0) {
        setAllCreditFacilities(response.data);
        console.log(response.data);
      }
    });
  }, [allCreditFacilities]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={allCreditFacilities}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
