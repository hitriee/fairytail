package com.example.testcloud.Util;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;


@Service
@RequiredArgsConstructor
public class S3Util {
    @Value("${cloud.front.name}")
    private String cloudFrontName;
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public void upload(File file, String dirName){
        String fileName = dirName+"/"+file.getName();
        boolean isExistObject = amazonS3Client.doesObjectExist(bucket, fileName);
        if(isExistObject == true){
            amazonS3Client.deleteObject(bucket, fileName);
        }
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, file).withCannedAcl(CannedAccessControlList.Private));
    }

    public void delete(File file, String dirName){
        String fileName = dirName+"/" + file.getName();
        boolean isExistObject = amazonS3Client.doesObjectExist(bucket, fileName);
        if(isExistObject == true){
            amazonS3Client.deleteObject(bucket, fileName);
        }
    }
}
