package com.fairytail.text.jpa;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "\"like\"")
public class LikeEntity {

    @Id
    @Column(name = "like_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postId")
    @JsonBackReference
    private TextEntity post;

    // 현재 매핑 안된 상태!! 임시로 user_id 넣어서 테스트할 것
    @Column(name = "user_id", nullable = false, unique = false)
    private Long userId;

    // 현재 매핑 안된 상태!! 임시로 user_id 넣어서 테스트할 것
    @Column(name = "writer_id", nullable = false, unique = false)
    private Long writerId;

}
