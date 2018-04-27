package com.tracker.repository;

import com.tracker.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    @RestResource(exported = false)
    @Override
    <S extends Project> S save(S s);


}
