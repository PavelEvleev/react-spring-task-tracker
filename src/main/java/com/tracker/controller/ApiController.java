package com.tracker.controller;


import com.tracker.model.*;
import com.tracker.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {

    private ApplicationService applicationService;

    private String redirectUrl;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    public ApiController(ApplicationService service, Environment environment) {
        this.applicationService = service;
        redirectUrl = environment.getProperty("frontend.external.url");
    }

    @GetMapping("/auth/{uuid}")
    public ResponseEntity<Employee> getAuthEmployee(@PathVariable String uuid) {
        return ResponseEntity.ok(applicationService.getAuthEmployee(uuid));
    }

    @PostMapping(value = "/registration")
    public void registration(@RequestBody RegistrationForm user) {
        user.setPassword(encoder.encode(user.getPassword()));
        applicationService.registration(user);
        return;
    }

    @RequestMapping("/verify/email/{uuid}")
    public void confirmEmail(@PathVariable String uuid, HttpServletResponse response) {
        try {
            if (applicationService.confirmEmail(uuid))
                response.sendRedirect(redirectUrl);
            else
                response.sendRedirect(redirectUrl);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    @PostMapping(value = "/employee/create/project")
    public ResponseEntity<Project> createProject(@RequestBody ProjectCommand project) {
        Project result = applicationService.createNewProject(project);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasAnyRole('ROLE_DEVELOPER','ROLE_MANAGER')")
    @PostMapping(value = "/projects/create/task")
    public ResponseEntity<Task> createTaskInProject(@RequestBody TaskCommand task) {
        Task result = applicationService.createNewTask(task);
        return ResponseEntity.ok(result);
    }

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    @PostMapping(value = "/add/developer/project")
    public ResponseEntity addDeveloperToProject(@RequestParam Long devId, @RequestParam Long projectId) {
        return applicationService.addDeveloperToProject(devId, projectId)
                ? ResponseEntity.ok().build()
                : new ResponseEntity(
                new ResultInfo("Developer has already participated in this project"),
                HttpStatus.CONFLICT);
    }

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    @GetMapping("/employees/developer/search")
    public ResponseEntity<List<Employee>> searchDeveloper(@RequestParam String name, @RequestParam String surname) {
        if (name.isEmpty() && surname.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(applicationService.searchDeveloper(name, surname));
    }

    @PreAuthorize("hasAnyRole('ROLE_DEVELOPER','ROLE_MANAGER')")
    @PatchMapping(value = "/task")
    public ResponseEntity patchTask(@RequestBody UpdateStatus updates) {
        applicationService.patchTask(updates);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/projects/{id}/participants")
    public ResponseEntity<Page<Employee>> getParticipants(@PathVariable("id") Long id, Pageable pageRequest) {
        return ResponseEntity.ok(applicationService.getParticipants(id, pageRequest));
    }

    @PreAuthorize("hasAnyRole('ROLE_DEVELOPER','ROLE_MANAGER')")
    @PostMapping(value = "/comments/update")
    public ResponseEntity<Comment> updateComment(@RequestBody Comment comment) {
        return ResponseEntity.ok(applicationService.updateComment(comment));
    }

    @GetMapping("/tasks/{id}/comments")
    public ResponseEntity<Page<Comment>> getCommentsInTask(@PathVariable Long id, Pageable pageable) {
        return ResponseEntity.ok(applicationService.getCommentsInTask(id, pageable));
    }

    @GetMapping("/tasks/{id}/employee")
    public ResponseEntity<Employee> getResposibleDevForTask(@PathVariable Long id){
        return ResponseEntity.ok(applicationService.getResposibleDevForTask(id));
    }

    @PreAuthorize("hasAnyRole('ROLE_DEVELOPER','ROLE_MANAGER')")
    @PostMapping(value = "/tasks/employee/comment")
    public ResponseEntity<Comment> addComment(@RequestBody CommentCommand comment) {
        return ResponseEntity.ok(applicationService.addComment(comment));
    }

    @PreAuthorize("hasAnyRole('ROLE_DEVELOPER','ROLE_MANAGER')")
    @DeleteMapping("/api/comments/{id}")
    public ResponseEntity deleteComment(@PathVariable Long id) {
        applicationService.deleteComment(id);
        return ResponseEntity.ok().build();
    }

}
