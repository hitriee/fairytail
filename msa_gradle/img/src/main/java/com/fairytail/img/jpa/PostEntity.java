package com.fairytail.img.jpa;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "img")
@DynamicInsert
@DynamicUpdate
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    /** 컬럼 추가할 때, 삭제 후 알맞게 변경해주세요. 설정 필요 */
    @Column(name = "user_id")
    private Long userId;
    private Integer type;
    private String url;
    private String title;
    @Column(name = "emoji_no")
    private Integer emojiNo;
    private String content;
    private Integer status;
    private Double lat;
    private Double lng;
    @Column(name = "report_cnt")
    private Integer reportCnt;
    private LocalDateTime date;

    @Column(name = "like_cnt")
    private Long likeCnt;
}
