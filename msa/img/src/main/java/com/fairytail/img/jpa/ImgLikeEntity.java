package com.fairytail.img.jpa;


import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@Table(name = "\"like\"")
@DynamicInsert
@DynamicUpdate
public class ImgLikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long likeId;

    @ManyToOne
    private ImgEntity img;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "writer_id")
    private Long writerId;
}
