package com.fairytail.video.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {
    @Query(value = "select max(i.postId) from PostEntity i")
    Long getMaxId();

    Optional<PostEntity> findByPostId(Long postId);

    @Transactional
    Long deleteByPostId(Long postId);

    @Query(value = "select * from PostEntity p where lat=:lat and lng=:lng order by date desc limit 25", nativeQuery = true)
    List<PostEntity> findListLatest(Double lat, Double lng);

    List<PostEntity> findTop25ByLatAndLngAndStatusOrderByDateDesc(Double lat, Double lng, Integer status);
    List<PostEntity> findByUserIdOrderByDateDesc(Long userId);

    List<PostEntity> findTop25ByLatAndLngAndStatusOrderByLikeCntDesc(Double lat, Double lng, Integer status);
}
