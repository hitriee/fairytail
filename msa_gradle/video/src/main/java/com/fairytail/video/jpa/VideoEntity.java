package com.fairytail.video.jpa;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "video")
public class VideoEntity {

    @Id
    @Column(name = "videoid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


}
