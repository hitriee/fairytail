package com.fairytail.audio.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostReportRepository extends JpaRepository<PostReportEntity, Long> {
    Optional<PostReportEntity> findByPostIdAndUserId(Long postId, Long userId);//신고 여부 체크
}
