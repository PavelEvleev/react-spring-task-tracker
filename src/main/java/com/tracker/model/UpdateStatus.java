package com.tracker.model;

import lombok.Data;

@Data
public class UpdateStatus {
    private Long taskId;

    private Status status;
}
