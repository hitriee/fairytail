package com.fairytail.user.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    @Query(value = "UPDATE user SET firebase_token = :firebase WHERE userid = :userId", nativeQuery = true)
    Integer updateFirebaseToken(String firebase, Long userId);

}
