import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { CreditFacilityApi, Gender } from '../api';
import TopAlert from '../TopAlert/TopAlert';

export default function SignUpForm() {
  const [gender, setGender] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  const { TopAlertComponent, setAlertMessageAndOpen } = TopAlert();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      birthday: data.get('birthday'),
      gender: gender,
    });
    const creditFacilityApi = CreditFacilityApi();
    const formFirstName = data.get('firstName') as string;
    const formLastName = data.get('lastName') as string;
    const formBirthday = data.get('birthday') as string;
    const formGender = data.get('gender') as string;
    if (
      formFirstName.length > 0 &&
      formLastName.length > 0 &&
      formBirthday.length > 0 &&
      formGender.length > 0
    ) {
      await creditFacilityApi
        .createCreditFacility({
          firstName: formFirstName,
          lastName: formLastName,
          birthday: formBirthday,
          gender: formGender as Gender,
        })
        .then(function (response) {
          if (response.status === 200) {
            setAlertMessageAndOpen(
              'Successfully created credit facility',
              'success'
            );
          } else {
            setAlertMessageAndOpen(
              'Failed to create credit facility',
              'warning'
            );
          }
        })
        .catch(function (error) {
          console.log(error);
          setAlertMessageAndOpen('Encountered error', 'error');
        });
    } else {
      setAlertMessageAndOpen(
        'Failed to create credit facility, check form inputs',
        'warning'
      );
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            name="birthday"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              value={gender}
              onChange={handleChange}
            >
              <FormControlLabel
                value={Gender.Female}
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value={Gender.Male}
                control={<Radio />}
                label="Male"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Client Profile
      </Button>
      {TopAlertComponent}
    </Box>
  );
}
