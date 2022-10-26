package com.example.testcloud.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.testcloud.DTO.FileDto;
import com.example.testcloud.Util.FfmpegUtil;
import org.jcodec.api.FrameGrab;
import org.jcodec.common.model.Picture;
import org.jcodec.scale.AWTUtil;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Map;
import java.util.UUID;
@RestController
public class FileController {

    private String cloudName = "ddej9pc8r";

    private String apiKey = "841597953323693";

    private String apiSecret = "E9SOKeID4Qdh858OYrbNx6ApsXk";

    private FfmpegUtil ffmpegUtil = new FfmpegUtil();

    private String serverPath = "/media/video";
    private String localPath = System.getProperty("user.dir");

    public String osCheck(){
        String osName = System.getProperty("os.name").toLowerCase();
        if(osName.contains("win")){
            return localPath;
        } else{
            return serverPath;
        }
    }

    Map config = ObjectUtils.asMap("cloud_name", cloudName , "api_key", apiKey , "api_secret", apiSecret, "secure", true);
    Cloudinary cloudinary = new Cloudinary(config);
    @GetMapping("/test")
    public String getTest() throws Exception{
        return null;
    }

    @PostMapping("/upload")
    public String upload(@RequestParam MultipartFile[] uploadfile) throws Exception{
        if (uploadfile.length != 0){
            for (MultipartFile file : uploadfile){
                if(!file.isEmpty()){
                    String rootPath = osCheck();
                    FileDto dto = new FileDto(UUID.randomUUID().toString(), file.getOriginalFilename(), file.getContentType());
                    String newFileName = dto.getUuid()+"_"+dto.getFileName();
                    File filePath = new File(rootPath +"/" + dto.getUuid()+"_"+dto.getFileName());
                    file.transferTo(filePath);
//                    cloudinary.uploader().upload(newFileName, ObjectUtils.emptyMap());
                }
                return file.getContentType();
            }
        }
        return null;
    }

    /**
     * 이미지 파일 저장 후 클라우드에 저장
     * @param files
     * @return
     * @throws Exception
     */
    @PostMapping("/image")
    public Map imageUpload(@RequestParam MultipartFile[] files) throws Exception{
        if(files.length != 0){
            for (MultipartFile file : files){
                if(!file.isEmpty()){
                    String rootPath = osCheck();
                    FileDto dto = new FileDto(UUID.randomUUID().toString(), file.getOriginalFilename(), file.getContentType());
                    String newFileName = dto.getUuid()+"_"+dto.getFileName()+"_";
                    File filePath = new File(rootPath +"/"+newFileName);
                    file.transferTo(filePath);
//                    Map map = cloudinary.uploader().upload(newFileName, ObjectUtils.asMap("resource_type", "image", "public_id", "image/" + newFileName));
//                    filePath.delete();
                }

            }
        }
        return null;
    }

    /**
     * 동영상 파일 저장 후 클라우드에 저장
     * @param files
     * @return
     * @throws Exception
     */
    @PostMapping("/video")
    public String videoUpload(@RequestParam MultipartFile[] files) throws Exception{
        if(files.length != 0){
            for (MultipartFile file : files){
                if(!file.isEmpty()){
                    FileDto dto = new FileDto(UUID.randomUUID().toString(), file.getOriginalFilename(), file.getContentType());
                    String newFileName = dto.getUuid()+"_"+dto.getFileName();
                    String rootPath = osCheck();
                    File filePath = new File(rootPath +"/"+newFileName);
                    file.transferTo(filePath);
                    boolean check = ffmpegUtil.makeThumbNail(rootPath +"/"+newFileName);
                    if(check){
                        return "성공";
                    } else{
                        return "썸네일 실패";
                    }
//                  makeThumbNail(filePath, new File(filePath.getPath()+"_thumbnail.png"));
//                    Map map = cloudinary.uploader().upload(newFileName, ObjectUtils.asMap("resource_type", "video", "public_id", "image/" + newFileName));
//                    filePath.delete();
                }

            }
        }
        return "파일 업로드 실패";
    }

    public void makeThumbNail(File source, File thumbnail) throws Exception{
        int frameNumber = 0;
        Picture picture = FrameGrab.getFrameFromFile(source, frameNumber);
        BufferedImage bufferedImage = AWTUtil.toBufferedImage(picture);
        ImageIO.write(bufferedImage, "png", thumbnail);
    }


}
