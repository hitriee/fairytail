package com.example.testcloud.Util;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;


@Component
@RequiredArgsConstructor
public class S3Util {
    @Value("${cloud.front.name}")
    private String cloudFrontName;
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String getCloudFrontName() {
        return cloudFrontName;
    }

    public void upload(File file, String dirName){
        String fileName = dirName+"/"+file.getName();
        boolean exist = amazonS3Client.doesObjectExist(bucket, fileName);
        if(exist == true){
            amazonS3Client.deleteObject(bucket, fileName);
        }
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, file).withCannedAcl(CannedAccessControlList.Private));
    }

    public void delete(File file, String dirName){
        String fileName = dirName+"/" + file.getName();
        boolean exist = amazonS3Client.doesObjectExist(bucket, fileName);
        if(exist == true){
            amazonS3Client.deleteObject(bucket, fileName);
        }
    }

    public void update(String oldFilePath, File file, String dirName){
        boolean exist = amazonS3Client.doesObjectExist(bucket, oldFilePath);
        if(exist == true){
            amazonS3Client.deleteObject(bucket, oldFilePath);
        }
        upload(file, dirName);
    }
}
