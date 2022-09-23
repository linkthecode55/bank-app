import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { LoanApi, LoanType } from '../api';
import TopAlert from '../TopAlert/TopAlert';

interface CreditFacilityFormProps {
  id: number;
  fullName: string;
}

export default function CreditFacilityForm({
  id: id,
  fullName: fullName,
}: CreditFacilityFormProps) {
  const [loanType, setLoanType] = React.useState('');

  const { TopAlertComponent, setAlertMessageAndOpen } = TopAlert();

  const handleChange = (event: SelectChangeEvent) => {
    setLoanType(event.target.value as string);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loanApi = LoanApi();

    const formLoanType = data.get('loan-type') as string;
    const formAmount = parseInt(data.get('amount') as string);
    if (formLoanType.length > 0 && !isNaN(formAmount)) {
      await loanApi
        .createLoan({
          creditFacilityId: id,
          loanType: formLoanType as LoanType,
          amount: formAmount,
          fullName: fullName,
        })
        .then(function (response) {
          if (response.status === 200) {
            setAlertMessageAndOpen('Successfully created loan', 'success');
          } else {
            setAlertMessageAndOpen('Failed to create loan', 'warning');
          }
        })
        .catch(function (error) {
          console.log(error);
          setAlertMessageAndOpen('Encountered error', 'error');
        });
    } else {
      setAlertMessageAndOpen(
        'Failed to create loan, check form inputs',
        'warning'
      );
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="filled-read-only-input-id"
            label="ID"
            defaultValue={id}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="filled-read-only-input-fullName"
            label="Full Name"
            defaultValue={fullName}
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: 150 }}>
            <InputLabel id="demo-simple-select-label">Loan Type</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="loan-type"
              value={loanType}
              label="LoanType"
              onChange={handleChange}
              name="loan-type"
            >
              <MenuItem value={LoanType.Car}>{LoanType.Car}</MenuItem>
              <MenuItem value={LoanType.Education}>
                {LoanType.Education}
              </MenuItem>
              <MenuItem value={LoanType.House}>{LoanType.House}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: 150 }}>
            <TextField
              required
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              type="number"
              id="amount"
              label="Amount in SGD"
              name="amount"
              autoComplete="amount"
            />
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add loan for client
      </Button>
      {TopAlertComponent}
    </Box>
  );
}
