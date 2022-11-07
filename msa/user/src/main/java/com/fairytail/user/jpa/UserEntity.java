package com.fairytail.user.jpa;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor
public class UserEntity {

    @Builder
    public UserEntity(String email,
                      String username, Integer block_cnt,
                      Integer status, Integer write_cnt) {
        this.email = email;
        this.username = username;
        this.block_cnt = block_cnt == null ? 0 : block_cnt;
        this.status = status == null ? 0 : status;
        this.write_cnt = write_cnt == null ? 0 : write_cnt;
    }


    @Id
    @Column(name = "userid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 계정
    @Column(nullable = false, unique = true)
    private String email;

    // 이름
    @Column(nullable = false, unique = false)
    private String username;

    // 신고횟수
    @Column(nullable = true, unique = false)
    private Integer block_cnt;

    // 활성화여부
    // 0: 활성화 / 1: 비활성화 / 2: 신고로 비활성화
    @Column(nullable = true, unique = false)
    private Integer status;

    // 글 작성 횟수
    @Column(nullable = true, unique = false)
    private Integer write_cnt;
}
