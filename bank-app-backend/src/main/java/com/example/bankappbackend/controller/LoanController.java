package com.example.bankappbackend.controller;

import java.util.List;

import com.example.bankappbackend.model.Loan;
import com.example.bankappbackend.repository.LoanRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin()
@RestController
@RequestMapping(value = "/loan")
public class LoanController {
    private final Logger LOG = LoggerFactory.getLogger(getClass());
    private final LoanRepository loanRepository;

    public LoanController(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public Loan createLoan(@RequestBody Loan loan) {
        LOG.info("Creating loan");
        int generatedId = (int) loanRepository.count() + 1;
        loan.setId(generatedId);
        return loanRepository.save(loan);
    }

    @RequestMapping(value = "/get-all", method = RequestMethod.GET)
    public List<Loan> getAllLoans() {
        LOG.info("Getting all loans");
        return loanRepository.findAll();
    }

}
