package com.example.testcloud.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private Integer emojiNo;
    private String title;
    private String type;
    private MultipartFile file;
    private String url;
    private Integer lat;
    private Integer lng;
    private Integer status;
}
