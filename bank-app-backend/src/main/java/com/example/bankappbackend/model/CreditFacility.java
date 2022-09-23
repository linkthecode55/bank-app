package com.example.bankappbackend.model;

import com.example.bankappbackend.enums.Gender;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class CreditFacility {

    @Id
    private Integer id;
    private final String firstName;
    private final String lastName;
    private final String birthday;
    private final Gender gender;

    public CreditFacility(Integer id, String firstName, String lastName, String birthday, Gender gender) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getBirthday() {
        return birthday;
    }

    public Gender getGender() {
        return gender;
    }
}
