package com.tracker.services;

import com.tracker.model.Employee;
import com.tracker.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VerifyEmailService {

    @Autowired
    public Environment environment;
    @Autowired
    public JavaMailSender emailSender;
    @Autowired
    private EmployeeRepository repository;

    public void sendSimpleMessage(Employee employee) {
        String host = environment.getProperty("verify.email.url") + employee.getUuid();
        String innerText = "<a href=" + host + ">Confirm<a/>";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(employee.getEmail());
        message.setSubject("Confirm your email for task-tracker");
        message.setText("Thank you for registration, we hope the service will be useful for you." +
                "Confirm please your email " + innerText +
                "Email will be used to contact you and other users if you want.");
        emailSender.send(message);
    }

    public boolean confirmEmail(String uuid) {
        Optional<Employee> optionalUser = repository.findByUuid(uuid);
        optionalUser.orElseThrow(() -> new UsernameNotFoundException("Username not found", null));
        Employee user = optionalUser.get();
        user.setConfirmed(true);
        repository.saveAndFlush(user);
        return true;
    }
}
