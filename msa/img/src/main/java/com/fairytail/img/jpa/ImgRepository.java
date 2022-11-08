package com.fairytail.img.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.Optional;

public interface ImgRepository extends JpaRepository<ImgEntity, Long> {
    @Query(value = "select max(i.postId) from ImgEntity i")
    Long getMaxId();

    Optional<ImgEntity> findByPostId(Long postId);

    @Transactional
    Long deleteByPostId(Long postId);
}
