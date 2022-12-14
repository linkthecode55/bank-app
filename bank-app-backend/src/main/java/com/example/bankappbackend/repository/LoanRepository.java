package com.example.bankappbackend.repository;

import com.example.bankappbackend.model.Loan;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanRepository extends MongoRepository<Loan, String> {
}
