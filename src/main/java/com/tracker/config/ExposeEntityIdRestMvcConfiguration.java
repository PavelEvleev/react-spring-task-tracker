package com.tracker.config;

import com.tracker.model.Comment;
import com.tracker.model.Employee;
import com.tracker.model.Project;
import com.tracker.model.Task;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

@Configuration
public class ExposeEntityIdRestMvcConfiguration extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Employee.class, Task.class, Project.class, Comment.class);
    }
}
