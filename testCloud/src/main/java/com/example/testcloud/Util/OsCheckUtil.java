package com.example.testcloud.Util;

import org.springframework.stereotype.Component;

@Component
public class OsCheckUtil {
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
}
