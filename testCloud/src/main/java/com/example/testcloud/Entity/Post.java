package com.example.testcloud.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "test_post")
@Builder
@DynamicInsert
@DynamicUpdate
public class Post {
    @Id
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postId;
    @Column(name = "user_id")
    private Integer userId;
    private String type;
    private String url;
    private String title;
    @Column(name = "emoji_no")
    private Integer emojiNo;
    private String content;
    private String status;
    private Double lat;
    private Double lng;
    @Column(name = "report_cnt")
    private Integer reportCnt;

}
