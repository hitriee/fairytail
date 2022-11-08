package com.fairytail.img.service;


import com.fairytail.img.dto.ImgDto;
import com.fairytail.img.jpa.ImgEntity;
import com.fairytail.img.jpa.ImgRepository;
import com.fairytail.img.mapper.ImgMapper;
import com.fairytail.img.util.MainUtil;
import com.fairytail.img.util.S3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImgServiceImpl implements ImgService {

    private final ImgMapper imgMapper;

    private final ImgRepository imgRepository;

    private final S3Util s3Util;

    private final MainUtil mainUtil;

    private String dirName = "image";
    @Override
    public ImgDto createImg(ImgDto imgDto) throws IOException {
        ImgDto data = null;
        ImgEntity img = imgMapper.toEntity(imgDto);
        Long maxIdx = imgRepository.getMaxId() + 1;
        MultipartFile file = imgDto.getFile();
        File filePath = new File(mainUtil.osCheck() + "/" + dirName + "_" + maxIdx + "_" + file.getOriginalFilename());
        file.transferTo(filePath);
        String url = s3Util.upload(filePath, dirName);
        img.setUrl(url);
        imgRepository.save(img);
        data = imgMapper.toDto(img);
        filePath.delete();
        return data;
    }

    @Override
    public ImgDto readImg(Long postId) {
        ImgDto data = null;
        Optional<ImgEntity> optionalImg = imgRepository.findByPostId(postId);
        if(optionalImg.isPresent()){
            ImgEntity img = optionalImg.get();
            data = imgMapper.toDto(img);
        }
        return data;
    }

    @Override
    public ImgDto putImg(ImgDto imgDto) throws IOException{
        ImgDto data = null;
        Optional<ImgEntity> optionalImg = imgRepository.findByPostId(imgDto.getPostId());
        if(optionalImg.isPresent()){
            ImgEntity img = optionalImg.get();
            imgMapper.updateFromDto(imgDto, img);
            imgRepository.save(img);
            data = imgMapper.toDto(img);
        }
        return data;
    }

    @Override
    public Boolean deleteImg(Long postId) {
        Boolean data = false;
        Optional<ImgEntity> optionalImg = imgRepository.findByPostId(postId);
        if(optionalImg.isPresent()){
            ImgEntity img = optionalImg.get();
            String url = img.getUrl();
            String oldPath = mainUtil.urlToFilePath(url);
            s3Util.delete(oldPath);
            Long res = imgRepository.deleteByPostId(img.getPostId());
            if(res != 0){
                data = true;
            }
        }
        return data;
    }
}
