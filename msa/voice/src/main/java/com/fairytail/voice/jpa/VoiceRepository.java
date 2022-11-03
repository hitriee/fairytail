package com.fairytail.voice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VoiceRepository extends JpaRepository<VoiceEntity, Long> {
}
