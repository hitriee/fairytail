package com.fairytail.img.jpa;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "img")
public class ImgEntity {

    @Id
    @Column(name = "imgid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


}
