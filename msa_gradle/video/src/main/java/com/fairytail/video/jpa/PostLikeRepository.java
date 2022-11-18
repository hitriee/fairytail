package com.fairytail.video.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLikeEntity, Long> {
    Long countByPostId(Long postId); //좋아요 수 카운트

    Long deleteByPostIdAndUserId(Long postId, Long userId); //포스트 아이디와 유저 아이디로 좋아요 삭제 

    Optional<PostLikeEntity> findByPostIdAndUserId(Long postId, Long userId); //포스트 아이디와 유저 아이디로 좋아요를 눌렀는지 체크
}
