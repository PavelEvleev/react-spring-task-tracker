package com.tracker.model;

import lombok.Data;

@Data
public class CommentCommand {

    private Long authorId;

    private Long taskId;

    private String text;
}
