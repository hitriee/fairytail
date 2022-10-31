package com.example.testcloud.Controller;

import com.example.testcloud.DTO.FileDto;
import com.example.testcloud.Service.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class S3Controller {
    private String serverPath = System.getProperty("user.dir")+"/media/video" ;
    private String localPath = System.getProperty("user.dir");
    private String user = "test";

    @Value("${cloud.front.name}")
    private String CLOUD_FRONT_NAME;

    private final S3Uploader s3Uploader;

    public String osCheck(){
        String osName = System.getProperty("os.name").toLowerCase();
        if(osName.contains("win")){
            return localPath;
        } else{
            return serverPath;
        }
    }

    @PostMapping("/s3")
    public String s3Upload(@RequestParam MultipartFile[] files) throws Exception{
        if(files.length != 0){
            for (MultipartFile file : files){
                if(!file.isEmpty()){
                    String rootPath = osCheck();
                    FileDto dto = new FileDto(UUID.randomUUID().toString(), file.getOriginalFilename(), file.getContentType());
                    String newFileName = user+"_"+dto.getFileName();
                    File filePath = new File(rootPath +"/"+newFileName);
                    file.transferTo(filePath);
                    s3Uploader.upload(filePath, "image");
                    String url = CLOUD_FRONT_NAME + "/image" + "/" + filePath.getName();
                    filePath.delete();
//                    Map map = cloudinary.uploader().upload(newFileName, ObjectUtils.asMap("resource_type", "image", "public_id", "image/" + newFileName));
//                    filePath.delete();
                    return url;
                }
            }
        }
        return null;
    }
}
