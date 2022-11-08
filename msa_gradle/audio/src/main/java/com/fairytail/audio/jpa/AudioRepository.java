package com.fairytail.audio.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AudioRepository extends JpaRepository<AudioEntity, Long> {
}
