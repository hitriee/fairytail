package com.fairytail.text.jpa;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TextRepository extends JpaRepository<TextEntity, Long> {

    List<TextEntity> findAllByUserId(Long userId);

    List<TextEntity> findAllByStatus(Integer status);

    @Query(
            value = "SELECT * FROM post p WHERE p.lat BETWEEN :curLat - 0.01 AND :curLat + 0.01 " +
            "AND p.lng BETWEEN :curLng - 0.01 AND :curLng + 0.01 AND p.status = 0 ORDER BY p.date DESC LIMIT 25", nativeQuery = true
    )
    List<TextEntity> findAllVrMessage(Float curLat, Float curLng);

}
