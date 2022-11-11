package com.fairytail.audio.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLikeEntity, Long> {
    Long countByPostId(Long postId);

    Long deleteByPostIdAndUserId(Long postId, Long userId);

    Optional<PostLikeEntity> findByPostIdAndUserId(Long postId, Long userId);
}
