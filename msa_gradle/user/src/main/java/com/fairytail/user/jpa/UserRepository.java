package com.fairytail.user.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET firebase_token = :firebase WHERE userid = :userId", nativeQuery = true)
    int updateFirebaseToken(String firebase, Long userId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET block_cnt = block_cnt + 1 WHERE userid = :userId", nativeQuery = true)
    int updateBlockCnt(Long userId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET status = 1 WHERE userid = :userId", nativeQuery = true)
    int updateUserStatus(Long userId);

}
