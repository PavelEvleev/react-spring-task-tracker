package com.tracker.component;

import com.tracker.model.CustomUserDetails;
import com.tracker.model.Employee;
import com.tracker.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final EmployeeRepository repository;

    @Autowired
    public CustomUserDetailsService(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String s){

        Employee employee = repository.findByEmail(s);
        if (employee == null)
            throw new UsernameNotFoundException("User not existed");
        if (!employee.isConfirmed())
            throw new UsernameNotFoundException("Please, confirm you email");
        return new CustomUserDetails(employee);
    }
}
