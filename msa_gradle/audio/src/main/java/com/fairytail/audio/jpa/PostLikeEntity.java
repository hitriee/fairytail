package com.fairytail.audio.jpa;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@Table(name = "likes")
@DynamicInsert
@DynamicUpdate
public class PostLikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long likeId;

    @Column(name = "user_id")
    private Long userId;
    @Column(name = "writer_id")
    private Long writerId;

    @Column(name = "post_id")
    private Long postId;
}
