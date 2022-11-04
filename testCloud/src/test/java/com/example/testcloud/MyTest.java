package com.example.testcloud;

import com.example.testcloud.Repository.PostRepository;
import com.example.testcloud.Util.OsCheckUtil;
import com.example.testcloud.Util.S3Util;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;

@SpringBootTest
@ActiveProfiles("Local")
@Transactional
public class MyTest {
    private S3Util s3Util;
    private PostRepository postRepository;

    private OsCheckUtil osCheckUtil;


    @Autowired
    public MyTest(S3Util s3Util, PostRepository postRepository, OsCheckUtil osCheckUtil) {
        this.s3Util = s3Util;
        this.postRepository = postRepository;
        this.osCheckUtil = osCheckUtil;
    }

    @Test
    public void 업로드(){
        String rootPath = osCheckUtil.osCheck();
        File file = new File(rootPath + "output.mp4");
        s3Util.upload(file, "video");
    }

    @Test
    public void 문자열테스트(){
        String url = "https://dh8s0t53692ft.cloudfront.net/video/test_output7.mp4";
        String[] sp = url.split("/");
        String file = sp[sp.length -1];
        System.out.println(file);
    }

    @Test
    public void 삭제리턴값체크(){
        Integer id = 1;
        Long i = postRepository.deleteByPostId(id);
        System.out.println(i);
    }

    @Test
    public void url체크(){
        String res = s3Util.getCloudFrontName();
        System.out.println(res);
    }

    @Test
    public void max체크(){
        Long res = postRepository.getMaxId();
        System.out.println(res);
    }

    @Test
    public void os체크(){
        String rootPath = osCheckUtil.osCheck();
        System.out.println(rootPath);
    }
}
