package com.tracker.model;

import lombok.Data;

@Data
public class ProjectCommand {

    private String name;

    private String description;

    private Long managerId;

}
