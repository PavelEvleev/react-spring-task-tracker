package com.tracker.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Entity
@Data
@Table(name = "tasks")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(length = 500)
    private String name;

    @NotEmpty
    @Column(length = 1000)
    private String description;

    @JsonIgnore
    @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Comment> comments;

    @JsonIgnore
    @ManyToOne
    @JoinTable(name = "employee_task",
            joinColumns = @JoinColumn(name = "task_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"))
    private Employee employee;

    private Status status = Status.WAITING;

    @Enumerated(EnumType.STRING)
    public Status getStatus() {
        return status;
    }
}
