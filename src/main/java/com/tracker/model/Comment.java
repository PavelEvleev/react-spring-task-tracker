package com.tracker.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Data
@Table(name = "comments")
@ToString(exclude = {"author", "task"})
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String text;

    @NotNull
    private Date date;

    @ManyToOne
    @JoinColumn(name = "author_comment_fk")
    private Employee author;

    @ManyToOne
    @JoinTable(name = "tasks_comments",
            joinColumns = @JoinColumn(name = "comments_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "task_id", referencedColumnName = "id"))
    private Task task;

}
