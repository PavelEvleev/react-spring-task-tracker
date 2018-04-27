package com.tracker.repository;

import com.tracker.model.Employee;
import com.tracker.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Page<Employee> findByProjectsContains(Project project, Pageable request);

    @RestResource(exported = false)
    Employee findByEmail(String email);

    @RestResource(exported = false)
    @Query(value = "SELECT * FROM employee " +
            "INNER JOIN user_role ON employee.id = user_role.user_id" +
            " INNER JOIN role ON user_role.role_id = role.id " +
            "WHERE role.role= :role AND employee.name LIKE %:name% AND employee.surname LIKE %:surname%", nativeQuery = true)
    List<Employee> findByNameContainsAndSurnameContainsAndRole(@Param("name") String name,
                                                               @Param("surname") String surname, @Param("role") String role);

    @RestResource(exported = false)
    Optional<Employee> findByUuid(String uuid);


}
