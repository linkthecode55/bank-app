import axios from 'axios';

export enum Gender {
  Female = 'Female',
  Male = 'Male',
}

export interface CreditFacility {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: Gender;
}

export interface CreditFacilityDTO {
  firstName: string;
  lastName: string;
  birthday: string;
  gender: Gender;
}

export enum LoanType {
  Car = 'Car',
  Education = 'Education',
  House = 'House',
}

export interface LoanDTO {
  creditFacilityId: number;
  loanType: LoanType;
  amount: number;
  fullName: string;
}

export interface Loan {
  id: number;
  creditFacilityId: number;
  loanType: LoanType;
  amount: number;
  fullName: string;
}

const axiosClient = axios.create({
  baseURL: `http://localhost:3001`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export function CreditFacilityApi() {
  return {
    getAllCreditFacilities() {
      return axiosClient.get<CreditFacility[]>('credit-facility/get-all');
    },
    createCreditFacility(creditFacilityDTO: CreditFacilityDTO) {
      return axiosClient.post<CreditFacility>(
        'credit-facility/create',
        creditFacilityDTO
      );
    },
  };
}

export function LoanApi() {
  return {
    getAllLoans() {
      return axiosClient.get<Loan[]>('loan/get-all');
    },
    createLoan(loanDTO: LoanDTO) {
      return axiosClient.post<Loan>('loan/create', loanDTO);
    },
  };
}
