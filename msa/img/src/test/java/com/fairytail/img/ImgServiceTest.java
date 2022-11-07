package com.fairytail.img;

import com.fairytail.img.dto.ImgDto;
import com.fairytail.img.jpa.ImgEntity;
import com.fairytail.img.jpa.ImgRepository;
import com.fairytail.img.mapper.ImgMapper;
import com.fairytail.img.util.MainUtil;
import com.fairytail.img.util.S3Util;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import javax.transaction.Transactional;
import java.io.File;
import java.util.Optional;

@SpringBootTest
@Transactional
@ActiveProfiles("Local") //applcation-Local.yml 작성 후 로컬에서 테스트시 적용 필요 없으면 삭제
public class ImgServiceTest {

    private ImgRepository imgRepository;

    private ImgMapper imgMapper;

    private S3Util s3Util;

    private MainUtil mainUtil;




    @Autowired
    public ImgServiceTest(ImgRepository imgRepository, ImgMapper imgMapper, S3Util s3Util, MainUtil mainUtil) {
        this.imgRepository = imgRepository;
        this.imgMapper = imgMapper;
        this.s3Util = s3Util;
        this.mainUtil = mainUtil;
    }

    @Test
    public void 문자열테스트(){
        String url = "https://dh8s0t53692ft.cloudfront.net/video/test_output7.mp4";
        String res = mainUtil.urlToFilePath(url);
        System.out.println(res);
    }

    @Test
    public void 최댓값출력테스트(){
        Long res = imgRepository.getMaxId();
        System.out.println(res);
    }

    @Test
    public void create테스트(){
        ImgDto data = new ImgDto().builder()
                .emojiNo(1)
                .title("test")
                .type(1)
                .emojiNo(1)
                .status(1)
                .lat(0.0)
                .lng(0.0)
                .build();
        File file = new File(mainUtil.osCheck() +"/" + "test.jpg");
        String url = s3Util.upload(file, "image");
        data.setUrl(url);
        ImgEntity input = imgMapper.toEntity(data);
        imgRepository.save(input);
        data = imgMapper.toDto(input);
        System.out.println(url);
        System.out.println(data);
    }

    @Test
    public void read테스트(){
        Long postId = Long.valueOf(7);
        ImgDto data = null;
        Optional<ImgEntity> optionalImg =  imgRepository.findByPostId(postId);
        if(optionalImg.isPresent()){
            ImgEntity img = optionalImg.get();
            data = imgMapper.toDto(img);
            if(data != null){
                System.out.println("OK");
                System.out.println(data);
            } else{
                System.out.println("FALSE");
            }
        } else{
            System.out.println("FALSE");
        }
    }

    @Test
    public void put테스트(){
        ImgDto input = new ImgDto().builder()
                .emojiNo(1)
                .title("test")
                .type(1)
                .emojiNo(1)
                .status(1)
                .lat(0.0)
                .lng(0.0)
                .build();
        ImgDto data = null;
        Long postId = Long.valueOf(6);
        Optional<ImgEntity> optionalImg = imgRepository.findByPostId(postId);
        if(optionalImg.isPresent()){
            ImgEntity img = optionalImg.get();
            imgMapper.updateFromDto(input, img);
            imgRepository.save(img);
            data = imgMapper.toDto(img);
            if(data != null){
                System.out.println("OK");
                System.out.println(data);
            } else{
                System.out.println("FALSE");
            }
        } else{
            System.out.println("FALSE");
        }
    }
    @Test
    public void delete테스트(){
        Long postId = Long.valueOf(6);
        Optional<ImgEntity> optionalImg = imgRepository.findByPostId(postId);
        if(optionalImg.isPresent()){
            ImgEntity img = optionalImg.get();
            Long res = imgRepository.deleteByPostId(img.getPostId());
            if(res != 0){
                System.out.println("OK");
            } else{
                System.out.println("FAISE");
            }
        } else{
            System.out.println("FALSE");
        }
    }
}
