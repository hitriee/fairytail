package com.fairytail.text.jpa;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TextRepository extends JpaRepository<TextEntity, Long> {

    List<TextEntity> findAllByUserId(Long userId);

    List<TextEntity> findAllByUserIdOrStatus(Long userId, Integer status);

    @Query(
            value = "SELECT * FROM post p WHERE p.lat BETWEEN :curLat - 0.01 AND :curLat + 0.01 " +
            "AND p.lng BETWEEN :curLng - 0.01 AND :curLng + 0.01 AND (p.status = 0 OR p.user_id = :userId) ORDER BY p.date DESC LIMIT 25", nativeQuery = true
    )
    List<TextEntity> findAllVrMessageLatest(Double curLat, Double curLng, Long userId);

    @Query(
            value = "SELECT * FROM post p WHERE p.lat BETWEEN :curLat - 0.01 AND :curLat + 0.01 " +
                    "AND p.lng BETWEEN :curLng - 0.01 AND :curLng + 0.01 AND (p.status = 0 OR p.user_id = :userId) ORDER BY p.like_cnt DESC LIMIT 25", nativeQuery = true
    )
    List<TextEntity> findAllVrMessageLike(Double curLat, Double curLng, Long userId);

    List<TextEntity> findAllByOrderByDateDesc();

}
