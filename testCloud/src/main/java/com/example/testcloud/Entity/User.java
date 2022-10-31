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
@Table(name = "test_user")
@Builder
@DynamicInsert
@DynamicUpdate
public class User{
    @Id
    private Integer id;
    private String email;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "block_cnt")
    private Integer blockCnt;
    private Integer status;
    @Column(name = "write_cnt")
    private Integer writeCnt;
}
