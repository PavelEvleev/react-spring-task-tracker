package com.tracker.services;

import com.tracker.model.*;
import com.tracker.repository.*;
import jdk.management.resource.ResourceRequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    private ProjectRepository projectRepository;
    private EmployeeRepository employeeRepository;
    private TaskRepository taskRepository;
    private RoleRepository roleRepository;
    private CommentRepository commentRepository;
    private VerifyEmailService emailService;

    @Autowired
    public ApplicationService(ProjectRepository projectRepository,
                              EmployeeRepository employeeRepository,
                              TaskRepository taskRepository,
                              CommentRepository commentRepository,
                              RoleRepository roleRepository,
                              VerifyEmailService emailService) {
        this.projectRepository = projectRepository;
        this.employeeRepository = employeeRepository;
        this.taskRepository = taskRepository;
        this.roleRepository = roleRepository;
        this.emailService=emailService;
        this.commentRepository = commentRepository;
    }


    public Project createNewProject(ProjectCommand newProject) {
        Optional<Employee> optional = employeeRepository.findById(newProject.getManagerId());
        Employee employee;
        if (optional.isPresent()) {
            employee = optional.get();
            Project createProject = new Project(newProject);
            Project result = projectRepository.saveAndFlush(createProject);
            employee.addProject(result);
            employeeRepository.saveAndFlush(employee);
            return result;
        }
        throw new EntityNotFoundException("User not found by this id");
    }


    public Task createNewTask(TaskCommand task) {
        Optional<Project> optional = projectRepository.findById(task.getProjectId());
        if (optional.isPresent()) {
            Project project = optional.get();
            if (task.getDevId() != null) {
                Optional<Employee> employeeOptional = employeeRepository.findById(task.getDevId());
                if (employeeOptional.isPresent()) {
                    task.getTask().setEmployee(employeeOptional.get());
                }
            }
            Task result = taskRepository.saveAndFlush(task.getTask());
            project.addTask(result);
            projectRepository.saveAndFlush(project);
            return result;
        }
        throw new EntityNotFoundException("Project not found by this id");
    }

    public boolean addDeveloperToProject(Long devId, Long projectId) {
        Optional<Employee> employeeOptional = employeeRepository.findById(devId);
        Optional<Project> projectOptional = projectRepository.findById(projectId);

        if (employeeOptional.isPresent() && projectOptional.isPresent()) {
            Employee employee = employeeOptional.get();
            if (projectOptional.get().getEmployees().contains(employee)) {
                return false;
            }
            employee.addProject(projectOptional.get());
            employeeRepository.saveAndFlush(employee);
            return true;
        }
        throw new EntityNotFoundException("Some entity not found by id");

    }

    public boolean patchTask(UpdateStatus updates) {
        Optional<Task> optional = taskRepository.findById(updates.getTaskId());
        if (optional.isPresent()) {
            Task task = optional.get();
            task.setStatus(updates.getStatus());
            taskRepository.save(task);
            return true;
        }
        throw new EntityNotFoundException("Task not existed by this id");
    }

    public List<Employee> searchDeveloper(String name, String surname) {
        return employeeRepository.findByNameContainsAndSurnameContainsAndRole(name, surname, "DEVELOPER");
    }

    public Page<Employee> getParticipants(Long id, Pageable pageRequest) {
        Project p = projectRepository.findById(id).get();
        return employeeRepository.findByProjectsContains(p, pageRequest);
    }

    public boolean registration(RegistrationForm user) {
        Employee newEmployee = new Employee(user);
        Role role = roleRepository.findByRole(user.getRole());
        newEmployee.setRole(role);
        emailService.sendSimpleMessage(employeeRepository.saveAndFlush(newEmployee));
        return true;
    }

    public boolean confirmEmail(String uuid) {
        Optional<Employee> optional = employeeRepository.findByUuid(uuid);
        optional.orElseThrow(() -> new EntityNotFoundException("Employee not found with this Uuid"));
        Employee employee = optional.get();
        employee.setConfirmed(true);
        employeeRepository.saveAndFlush(employee);
        return true;
    }

    public Comment updateComment(Comment comment) {
        Optional<Comment> optional = commentRepository.findById(comment.getId());
        if (optional.isPresent()) {
            Comment update = optional.get();
            if (update.getAuthor().getId() != comment.getAuthor().getId())
                throw new ResourceRequestDeniedException("You not the author of this comment");
            update.setText(comment.getText());
            update.setDate(Date.valueOf(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE)));
            return commentRepository.saveAndFlush(update);
        } else throw new EntityNotFoundException("Comment not found for update");
    }

    public Page<Comment> getCommentsInTask(Long id, Pageable pageable) {
        return commentRepository.findAllByTask_Id(id, pageable);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    public Comment addComment(CommentCommand comment) {
        Comment newComment = new Comment();
        newComment.setText(comment.getText());
        newComment.setDate(Date.valueOf(LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE)));
        newComment.setAuthor(employeeRepository.getOne(comment.getAuthorId()));
        newComment.setTask(taskRepository.getOne(comment.getTaskId()));
        Comment result = commentRepository.saveAndFlush(newComment);
        return result;
    }

    public Employee getAuthEmployee(String uuid) {
        Optional<Employee> optional = employeeRepository.findByUuid(uuid);
        optional.orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return optional.get();
    }

    public Employee getResposibleDevForTask(Long id){
        return taskRepository.findEmployeeByTaskId(id);
    }
}
