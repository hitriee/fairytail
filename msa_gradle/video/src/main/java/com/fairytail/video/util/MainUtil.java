package com.fairytail.video.util;

import org.springframework.stereotype.Component;

/**
 * 서버 로컬 경로체크, url에서 s3경로 체크, 작성 시간 day_type 뽑는 유틸
 */
@Component
public class MainUtil {
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

    public String urlToFilePath(String url){
        if(url != null && url != ""){
            String[] sp = url.split("/");
            if(sp.length >= 2){
                return sp[sp.length -2] + "/" + sp[sp.length -1];
            }
        }
        return null;
    }

    public Integer checkTime(Integer hour){
        if(hour >= 1 && hour <=5){
            return 0;
        } else if(hour >= 6 && hour <= 10){
            return 1;
        } else if(hour >= 11 && hour <= 16){
            return 2;
        } else if (hour >= 17 && hour <= 20){
            return 3;
        } else if ((hour >= 21 && hour <= 24) || hour == 0 ){
            return 4;
        } else {
            return null;
        }
    }
}
