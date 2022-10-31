package com.example.testcloud.Service;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;


@Service
@RequiredArgsConstructor
public class S3Uploader {
    @Value("${cloud.front.name}")
    private String cloudFrontName;
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(File file, String dirName){
        String fileName = dirName+"/"+file.getName();
        String uploadUrl = putS3(file, fileName);
        return uploadUrl;
    }
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.Private));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

}
