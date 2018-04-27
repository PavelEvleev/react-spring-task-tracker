package com.tracker.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.LinkedList;
import java.util.List;


@Entity
@Data
@Table(name = "projects")
@ToString(exclude = "employees")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;

    @JsonIgnore
    @ManyToMany(mappedBy = "projects")
    private List<Employee> employees = new LinkedList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<Task> tasks = new LinkedList<>();

    public Project(){}

    public Project(ProjectCommand newProject) {
        name = newProject.getName();
        description = newProject.getDescription();
    }


    public void addEmployee(Employee employee){
        employees.add(employee);
    }


    public void addTask(Task task) {
        this.tasks.add(task);
    }
}
