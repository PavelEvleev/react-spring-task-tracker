package com.tracker.component.init;

import com.tracker.model.Employee;
import com.tracker.model.Project;
import com.tracker.model.Role;
import com.tracker.repository.EmployeeRepository;
import com.tracker.repository.ProjectRepository;
import com.tracker.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private EmployeeRepository repository;
    private RoleRepository roleRepository;
    private ProjectRepository projectRepository;
    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    public DatabaseLoader(EmployeeRepository repository, RoleRepository roleRepository, ProjectRepository projectRepository) {
        this.repository = repository;
        this.roleRepository = roleRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Role manager = roleRepository.save(new Role("MANAGER"));
        Role developer = roleRepository.save(new Role("DEVELOPER"));

        Project project = new Project();
        project.setName("Super interested project");
        project.setDescription("This is test project to improve you ability");

        Employee employee = new Employee("pasha", "evleev", encoder.encode("password"), "mw@gmail.com", manager);
        employee.setConfirmed(true);
        employee.setUuid(UUID.randomUUID().toString());
        employee.addProject(project);
        repository.save(employee);

        Employee employee2 = new Employee("pasok", "evlompeq", encoder.encode("password"), "mr.maascassv@gmail.com", developer);
        employee2.setUuid(UUID.randomUUID().toString());
        employee2.setConfirmed(true);
        repository.save(employee2);



    }
}
