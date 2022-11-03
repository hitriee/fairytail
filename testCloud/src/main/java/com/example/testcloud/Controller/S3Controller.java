package com.example.testcloud.Controller;


import com.example.testcloud.Service.S3Uploader;
import com.example.testcloud.Util.FfmpegUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class S3Controller {
    private String serverPath = System.getProperty("user.dir")+"/media/video" ;
    private String localPath = System.getProperty("user.dir");
    private String user = "test";
    private final FfmpegUtil ffmpegUtil;
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

    @PostMapping("/video")
    public ResponseEntity<?> createVideo(@RequestParam MultipartFile file) throws Exception {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        String rootPath = osCheck();
        String fileName = user + "_" + file.getOriginalFilename();
        File filePath = new File(rootPath + "/" + fileName);
        file.transferTo(filePath);
        ffmpegUtil.zip(filePath.getPath());
        ffmpegUtil.makeThumbNail(filePath.getPath());
        File zipFile = new File(rootPath + "/" + fileName + "_zip.mp4");
        File tumbFile = new File(rootPath + "/" + fileName +"_thumbnail.png");
        s3Uploader.upload(zipFile, "image");
        s3Uploader.upload(tumbFile, "image");
        String url = CLOUD_FRONT_NAME + "/video" + "/" + filePath.getName();
        filePath.delete();
        resultMap.put("url", url);
        status = HttpStatus.OK;
//        Map map = cloudinary.uploader().upload(newFileName, ObjectUtils.asMap("resource_type", "image", "public_id", "image/" + newFileName));
//        filePath.delete();
        return new ResponseEntity<>(resultMap, status);
    }

    @PostMapping("audio")
    public ResponseEntity<?> createAudio(@RequestParam MultipartFile file) throws Exception{
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        return new ResponseEntity<>(resultMap, status);
    }

    @PostMapping("image")
    public ResponseEntity<?> createImage(@RequestParam MultipartFile file) throws Exception{
        Map<String, Object> resultMap = new HashMap<>();
        String rootPath = osCheck();
        String fileName = user + "_" + file.getOriginalFilename();
        File filePath = new File(rootPath + "/" + fileName);
        HttpStatus status = null;
        return new ResponseEntity<>(resultMap, status);
    }

    }
