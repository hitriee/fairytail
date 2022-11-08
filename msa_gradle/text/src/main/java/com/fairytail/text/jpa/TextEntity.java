package com.fairytail.text.jpa;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "text")
public class TextEntity {

    @Id
    @Column(name = "textid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


}
