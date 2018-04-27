package com.tracker.model;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Data
public class RegistrationForm {
    private String name;

    private String surname;

    private String email;

    private String password;

    private String role;

    @Autowired
    public void setPassword(String password, BCryptPasswordEncoder encoder) {
        this.password = encoder.encode(password);
    }
}
