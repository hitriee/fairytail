package com.fairytail.video.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostReportRepository extends JpaRepository<PostReportEntity, Long> {
    Optional<PostReportEntity> findByPostIdAndUserId(Long postId, Long userId); //포스트 아이디와 유저 아이디로 신고 내역이 있는 지 체크
}
