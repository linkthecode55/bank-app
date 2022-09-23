package com.example.bankappbackend.model;

import com.example.bankappbackend.enums.LoanType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Loan {

    @Id
    private Integer id;
    private final Integer creditFacilityId;
    private final LoanType loanType;
    private final Integer amount;
    private final String fullName;

    public Loan(Integer id, Integer creditFacilityId, LoanType loanType, Integer amount, String fullName) {
        super();
        this.id = id;
        this.creditFacilityId = creditFacilityId;
        this.loanType = loanType;
        this.amount = amount;
        this.fullName = fullName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCreditFacilityId() {
        return creditFacilityId;
    }

    public LoanType getLoanType() {
        return loanType;
    }

    public Integer getAmount() {
        return amount;
    }

    public String getFullName() {
        return fullName;
    }
}
