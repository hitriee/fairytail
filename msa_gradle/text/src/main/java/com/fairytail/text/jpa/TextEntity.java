package com.fairytail.text.jpa;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@DynamicInsert
@Table(name = "post")
public class TextEntity {

    @Id
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    // 현재 매핑 안된 상태!! 임시로 user_id 넣어서 테스트할 것
    @Column(name = "user_id", nullable = false, unique = false)
    private Long userId;

    @Column(nullable = true, unique = false)
    private String url;

    @Column(nullable = false, unique = false)
    private Integer type;

    @Column(nullable = false, unique = false, length = 40)
    private String title;

    @Column(name = "emoji_no", nullable = false, unique = false)
    private Integer emojiNo;

    @Column(nullable = false, unique = false, length = 400)
    private String content;

    @Column(nullable = false, unique = false)
    private Integer status;

    @Column(nullable = false, unique = false)
    private Float lat;

    @Column(nullable = false, unique = false)
    private Float lng;

    @Column(name = "report_cnt", unique = false)
    @ColumnDefault("0")
    private Integer reportCnt;

    @Column(nullable = false, unique = false)
    private LocalDateTime date;

    @Column(name = "day_type", nullable = false, unique = false)
    private Integer dayType;

}
