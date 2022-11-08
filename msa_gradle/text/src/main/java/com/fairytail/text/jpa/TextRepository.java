package com.fairytail.text.jpa;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TextRepository extends JpaRepository<TextEntity, Long> {

    List<TextEntity> findAllByUserId(Long userId);

}
