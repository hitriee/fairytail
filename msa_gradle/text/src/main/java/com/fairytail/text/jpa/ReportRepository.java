package com.fairytail.text.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {

    Optional<ReportEntity> findByPostAndUserId(TextEntity textEntity, Long userId);

}
