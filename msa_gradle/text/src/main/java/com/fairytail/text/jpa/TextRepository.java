package com.fairytail.text.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TextRepository extends JpaRepository<TextEntity, Long> {
}
