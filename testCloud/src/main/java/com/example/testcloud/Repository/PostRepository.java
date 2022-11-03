package com.example.testcloud.Repository;

import com.example.testcloud.Entity.Post;
import com.example.testcloud.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Integer> {
    Optional<Post> findByPostId(Integer postId);

    Integer deleteByPostId(Integer postId);
}
