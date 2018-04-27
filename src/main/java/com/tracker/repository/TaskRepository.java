package com.tracker.repository;

import com.tracker.model.Employee;
import com.tracker.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @RestResource(exported = false)
    @Override
    <S extends Task> S save(S s);

    @RestResource(exported = false)
    @Query("select t.employee from Task t where t.id=:id")
    Employee findEmployeeByTaskId(@Param("id") Long id);
}
