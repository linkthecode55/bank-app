import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SignUpForm from './SignUpForm/signUpForm';
import ButtonAppBar from './Layout/AppBar';
import CreditFacilityTable from './CreditFacility/CreditFacilityTable';
import LoanTable from './LoansTable/LoansTable';
import { Routes, Route } from 'react-router-dom';
import Footer from './Layout/Footer';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Routes>
          <Route path="/" element={<ButtonAppBar />}>
            <Route index element={<SignUpForm />} />
            <Route path="credit-facilities" element={<CreditFacilityTable />} />
            <Route path="loans" element={<LoanTable />} />
          </Route>
        </Routes>
        <Footer />
      </Box>
    </Container>
  );
}
