package com.tracker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Entity
@Data
@ToString(exclude = {"password", "projects"})
@Table(name = "employee")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Employee {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uuid;

    @NotEmpty
    private String name;

    @NotEmpty
    private String surname;

    @NotEmpty
    @Column(unique = true)
    private String email;

    @NotEmpty
    @JsonIgnore
    private String password;

    @JsonIgnore
    private boolean confirmed;

    @ManyToOne
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Role role;

    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "employee_project",
            joinColumns = {@JoinColumn(name = "employee_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "project_id", referencedColumnName = "id")}
    )
    private List<Project> projects = new ArrayList<>();

    public Employee() {

    }

    public Employee(String name, String surname, String password, String email, Role role) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.setPassword(password);
        this.setRole(role);
    }

    public Employee(RegistrationForm user) {
        this.name = user.getName();
        this.surname = user.getSurname();
        this.password = user.getPassword();
        this.email = user.getEmail();
        this.uuid = UUID.randomUUID().toString();
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void removeProject(Project project) {
        this.projects.remove(project);
        project.getEmployees().remove(this);
    }

    public void addProject(Project project) {
        this.projects.add(project);
        project.getEmployees().add(this);
    }

}
