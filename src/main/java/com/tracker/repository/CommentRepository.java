package com.tracker.repository;

import com.tracker.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @RestResource(exported = false)
    @Override
    <S extends Comment> S save(S s);

    Page<Comment> findAllByTask_Id(Long id, Pageable pageable);
}
