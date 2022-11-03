package com.example.testcloud;

import com.example.testcloud.Service.S3Uploader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.io.File;

@SpringBootTest
@ActiveProfiles("Local")
public class S3Test {
    private S3Uploader s3Uploader;
    private String serverPath = System.getProperty("user.dir")+"/media/video" ;
    private String localPath = System.getProperty("user.dir")+"/";

    public String osCheck(){
        String osName = System.getProperty("os.name").toLowerCase();
        if(osName.contains("win")){
            return localPath;
        } else{
            return serverPath;
        }
    }

    @Autowired
    public S3Test(S3Uploader s3Uploader) {
        this.s3Uploader = s3Uploader;
    }

    @Test
    public void 업로드(){
        String rootPath = osCheck();
        File file = new File(rootPath + "output.mp4");
        s3Uploader.upload(file, "video");
    }
}
