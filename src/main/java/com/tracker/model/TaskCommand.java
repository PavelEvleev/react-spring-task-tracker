package com.tracker.model;

import lombok.Data;

@Data
public class TaskCommand {

    private Task task;

    private Long projectId;

    private Long devId;
}
