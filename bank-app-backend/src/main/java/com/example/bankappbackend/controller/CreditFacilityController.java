package com.example.bankappbackend.controller;

import java.util.List;

import com.example.bankappbackend.model.CreditFacility;
import com.example.bankappbackend.repository.CreditFacilityRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin()
@RestController
@RequestMapping(value = "/credit-facility")
public class CreditFacilityController {
    private final Logger LOG = LoggerFactory.getLogger(getClass());
    private final CreditFacilityRepository creditFacilityRepository;

    public CreditFacilityController(CreditFacilityRepository creditFacilityRepository) {
        this.creditFacilityRepository = creditFacilityRepository;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public CreditFacility createCreditFacility(@RequestBody CreditFacility creditFacility) {
        LOG.info("Creating credit facility");
        int generatedId = (int) creditFacilityRepository.count() + 1;
        creditFacility.setId(generatedId);
        return creditFacilityRepository.save(creditFacility);
    }

    @RequestMapping(value = "/get-all", method = RequestMethod.GET)
    public List<CreditFacility> getAllCreditFacilities() {
        LOG.info("Getting all credit facilities");
        return creditFacilityRepository.findAll();
    }

}
