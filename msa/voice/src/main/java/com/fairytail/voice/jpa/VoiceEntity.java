package com.fairytail.voice.jpa;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "text")
public class VoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 컬럼 추가할 때, 삭제 후 알맞게 변경해주세요. 설정 필요 */
    @Column(nullable = false, unique = true)
    private Integer temp;

    @Column(nullable = false, length = 50, unique = true)
    private String temp2;


}