package com.fairytail.img.util;

import org.springframework.stereotype.Component;

@Component
public class MainUtil {
    private String serverPath = System.getProperty("user.dir")+"/media/image" ;
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
}
