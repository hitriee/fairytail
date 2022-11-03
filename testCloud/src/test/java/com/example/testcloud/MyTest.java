package com.example.testcloud;

import com.example.testcloud.Repository.PostRepository;
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
    private String serverPath = System.getProperty("user.dir")+"/media/video" ;
    private String localPath = System.getProperty("user.dir")+"/";

    private PostRepository postRepository;

    public String osCheck(){
        String osName = System.getProperty("os.name").toLowerCase();
        if(osName.contains("win")){
            return localPath;
        } else{
            return serverPath;
        }
    }

    @Autowired
    public MyTest(S3Util s3Util, PostRepository postRepository) {
        this.s3Util = s3Util;
        this.postRepository = postRepository;
    }

    @Test
    public void 업로드(){
        String rootPath = osCheck();
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
        Integer i = postRepository.deleteByPostId(id);
        System.out.println(i);
    }
}
