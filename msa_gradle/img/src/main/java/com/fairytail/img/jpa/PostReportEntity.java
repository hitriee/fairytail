package com.fairytail.img.jpa;


import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@Table(name = "report")
@DynamicInsert
@DynamicUpdate
public class PostReportEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;
    @Column(name = "post_id")
    private Long postId;
    @Column(name = "user_id")
    private Long userId;
    private Integer type;
    private String content;
}
