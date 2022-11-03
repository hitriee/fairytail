package com.example.testcloud;

import com.example.testcloud.Util.S3Util;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.io.File;

@SpringBootTest
@ActiveProfiles("Local")
public class S3Test {
    private S3Util s3Util;
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
    public S3Test(S3Util s3Util) {
        this.s3Util = s3Util;
    }

    @Test
    public void 업로드(){
        String rootPath = osCheck();
        File file = new File(rootPath + "output.mp4");
        s3Util.upload(file, "video");
    }
}
