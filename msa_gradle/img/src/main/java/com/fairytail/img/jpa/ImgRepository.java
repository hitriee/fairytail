package com.fairytail.img.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ImgRepository extends JpaRepository<ImgEntity, Long> {
    @Query(value = "select max(i.postId) from ImgEntity i")
    Long getMaxId();

    Optional<ImgEntity> findByPostId(Long postId);

    @Transactional
    Long deleteByPostId(Long postId);

    @Query(value = "select * from ImgEntity i where i.lat=:lat and i.lng=:lng order by i.date desc limit 25", nativeQuery = true)
    List<ImgEntity> findListLatest(Double lat, Double lng);

    List<ImgEntity> findTop25ByLatAndLngOrderByDateDesc(Double lat, Double lng);
    List<ImgEntity> findByUserIdOrderByDateDesc(Long userId);
}
