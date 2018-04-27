package com.tracker.model;

import lombok.Data;

@Data
public class ResultInfo {
    private String message;

    public ResultInfo() {
    }

    public ResultInfo(String message) {
        this.message = message;
    }
}
