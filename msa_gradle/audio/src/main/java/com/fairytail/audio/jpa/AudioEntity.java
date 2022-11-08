package com.fairytail.audio.jpa;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "audio")
public class AudioEntity {

    @Id
    @Column(name = "audioid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
