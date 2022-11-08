package com.fairytail.text.service;

import com.fairytail.text.dto.TextDetailDto;
import com.fairytail.text.dto.TextDto;
import com.fairytail.text.jpa.LikeRepository;
import com.fairytail.text.jpa.TextEntity;
import com.fairytail.text.jpa.TextRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TextServiceImpl implements TextService {

    private final ModelMapper modelMapper;
    private final TextRepository textRepository;

    private final LikeRepository likeRepository;

    @Override
    public TextDto saveText(TextDto textDto) {
        TextEntity requestEntity = modelMapper.map(textDto, TextEntity.class);

        // 나머지 필요한 값들 지정해주기 (userId와 dayType은 임시로!!)
        requestEntity.setUserId(0L);
        requestEntity.setDate(LocalDateTime.now());
        requestEntity.setDayType(0);

        TextEntity responseEntity = textRepository.save(requestEntity);

        return modelMapper.map(responseEntity, TextDto.class);
    }

    @Override
    public TextDetailDto getTextDetail(Long postId) {
        Optional<TextEntity> selectedTextEntity = textRepository.findById(postId);
        TextDetailDto responseDto = null;

        if (selectedTextEntity.isPresent()) {
            responseDto = modelMapper.map(selectedTextEntity.get(), TextDetailDto.class);
            Integer likeCnt = likeRepository.countAllByPost(selectedTextEntity.get());
            // userId 임의로 넣음!! -> 나중에 꼭 User 객체로 바꿔주기
            Boolean isLike = likeRepository.existsByPostAndUserId(selectedTextEntity.get(), 2L);

            responseDto.setLikeCnt(likeCnt);
            responseDto.setIsLike(isLike);
        }
        else {
            // textEntity 없을 경우 에러처리
        }

        return responseDto;
    }

    
}
