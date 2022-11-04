package com.example.testcloud.Repository;

import com.example.testcloud.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Integer> {
    Optional<Post> findByPostId(Integer postId);

    Long deleteByPostId(Integer postId);

    @Query(value = "select max(p.postId) from Post p")
    Long getMaxId();
}
