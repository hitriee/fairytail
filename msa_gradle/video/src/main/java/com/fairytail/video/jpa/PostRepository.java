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
    Long getMaxId(); //S3에 저장할 파일에 포스트 번호를 붙여주기 위해 현재까지의 최대 아이디 값을 가져오기

    Optional<PostEntity> findByPostId(Long postId); 

    @Transactional
    Long deleteByPostId(Long postId);

    @Query(value = "select * from PostEntity p where lat=:lat and lng=:lng order by date desc limit 25", nativeQuery = true)
    List<PostEntity> findListLatest(Double lat, Double lng);

    @Query(
            value = "SELECT * FROM post p WHERE p.lat BETWEEN :lat - 0.01 AND :lat + 0.01 " +
                    "AND p.lng BETWEEN :lng - 0.01 AND :lng + 0.01 AND (p.status = 0 OR p.user_id = :userId) ORDER BY p.date DESC LIMIT 25", nativeQuery = true
    )
    List<PostEntity> findTop25ByLatAndLngAndStatusOrderByDateDesc(Double lat, Double lng, Long userId); //상위 25개를 lat, lng와 0.01 차이나고 status가 0인 것들로 날짜 순으로 조회
    List<PostEntity> findByUserIdOrderByDateDesc(Long userId); //유저 아이디로 유저의 게시글 조회

    @Query(
            value = "SELECT * FROM post p WHERE p.lat BETWEEN :lat - 0.01 AND :lat + 0.01 " +
                    "AND p.lng BETWEEN :lng - 0.01 AND :lng + 0.01 AND (p.status = 0 OR p.user_id = :userId) ORDER BY p.like_cnt DESC LIMIT 25", nativeQuery = true
    )
    List<PostEntity> findTop25ByLatAndLngAndStatusOrderByLikeCntDesc(Double lat, Double lng, Long userId); //상위 25개를 lat, lng와 0.01 차이나고 status가 0인 것들로 좋아요 순으로 조회

    List<PostEntity> findAllByUserIdOrStatus(Long userId, Integer status); //공개된 모든 게시물을 리스트로 조회
}
