package com.fairytail.text.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<LikeEntity, Long> {

    Integer countAllByPost(TextEntity textEntity);

    Boolean existsByPostAndUserId(TextEntity textEntity, Long userId);

}
