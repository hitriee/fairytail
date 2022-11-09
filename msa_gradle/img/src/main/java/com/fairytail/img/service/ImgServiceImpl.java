package com.fairytail.img.service;


import com.fairytail.img.dto.ImgDto;
import com.fairytail.img.jpa.ImgEntity;
import com.fairytail.img.jpa.ImgRepository;
import com.fairytail.img.util.MainUtil;
import com.fairytail.img.util.S3Util;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImgServiceImpl implements ImgService {

    private final ModelMapper modelMapper;
    private final ImgRepository imgRepository;

    private final S3Util s3Util;

    private final MainUtil mainUtil;

    private String dirName = "image";
    @Override
    public ImgDto createImg(ImgDto imgDto) throws IOException {
        ImgDto data = null;
        ImgEntity img = modelMapper.map(imgDto, ImgEntity.class);
        Long maxIdx = imgRepository.getMaxId() + 1;
        MultipartFile file = imgDto.getFile();
        File filePath = new File(mainUtil.osCheck() + "/" + dirName + "_" + maxIdx + "_" + file.getOriginalFilename());
        file.transferTo(filePath);
        String url = s3Util.upload(filePath, dirName);
        img.setUrl(url);
        imgRepository.save(img);
        data = modelMapper.map(img, ImgDto.class);
        filePath.delete();
        return data;
    }

    @Override
    public ImgDto readImg(Long postId) {
        ImgDto data = null;
        Optional<ImgEntity> optionalImg = imgRepository.findByPostId(postId);
        if(optionalImg.isPresent()){
            ImgEntity img = optionalImg.get();
            data = modelMapper.map(img, ImgDto.class);
        }
        return data;
    }

    @Override
    public ImgDto putImg(ImgDto imgDto) throws IOException{
        ImgDto data = null;
        Optional<ImgEntity> optionalImg = imgRepository.findByPostId(imgDto.getPostId());
        if(optionalImg.isPresent()){
            ImgEntity img = optionalImg.get();
            img.setStatus(imgDto.getStatus());
            imgRepository.save(img);
            data = modelMapper.map(img, ImgDto.class);
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

    @Override
    public List<ImgDto> readImgListLatest(Double lat, Double lng) throws Exception {
        List<ImgEntity> list = imgRepository.findListLatest(lat, lng);
        List<ImgDto> data = null;
        if(list != null){
            for (ImgEntity l: list) {
                ImgDto insert = modelMapper.map(l, ImgDto.class);
                data.add(insert);
            }
        }
        return data;
    }

    @Override
    public List<ImgDto> readImgListLike(Double lat, Double lng) throws Exception {
        return null;
    }
}
