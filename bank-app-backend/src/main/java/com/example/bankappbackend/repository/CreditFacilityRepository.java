package com.example.bankappbackend.repository;

import com.example.bankappbackend.model.CreditFacility;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface CreditFacilityRepository extends MongoRepository<CreditFacility, String> {
}
