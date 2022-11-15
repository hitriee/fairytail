package com.fairytail.text.service;

import com.fairytail.text.dto.TextDetailDto;
import com.fairytail.text.dto.TextDto;
import com.fairytail.text.jpa.LikeRepository;
import com.fairytail.text.jpa.TextEntity;
import com.fairytail.text.jpa.TextRepository;
import com.fairytail.text.util.MainUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TextServiceImpl implements TextService {

    private final ModelMapper modelMapper;

    private final MainUtils mainUtils;

    private final TextRepository textRepository;

    private final LikeRepository likeRepository;

    @Override
    public TextDto saveText(TextDto requestDto) {
        /** 나머지 필요한 값들 지정해주기 (userId는 임시로!!) */
        LocalDateTime now = LocalDateTime.now();

        requestDto.setUserId(1L);
        requestDto.setDate(now);
        requestDto.setDayType(mainUtils.checkTime(now.getHour()));

        TextEntity requestEntity = modelMapper.map(requestDto, TextEntity.class);
        TextEntity responseEntity = textRepository.save(requestEntity);

        return modelMapper.map(responseEntity, TextDto.class);
    }

    @Override
    public TextDetailDto getTextDetail(Long postId, Long userId) {
        Optional<TextEntity> selectedTextEntity = textRepository.findById(postId);
        TextDetailDto responseDto = null;

        if (selectedTextEntity.isPresent()) {
            responseDto = modelMapper.map(selectedTextEntity.get(), TextDetailDto.class);
            // userId 임의로 넣음!! -> 나중에 꼭 User 객체로 바꿔주기
            Boolean isLike = likeRepository.existsByPostAndUserId(selectedTextEntity.get(), userId);

            responseDto.setIsLike(isLike);
        }
        else {
            /** textEntity 없을 경우 예외처리 */
        }

        return responseDto;
    }

    @Override
    public List<TextDetailDto> getMyTextList(Long userId) {
        // userId 임의로 넣음!! -> 나중에 꼭 User 객체로 바꿔주기
        List<TextEntity> textEntityList = textRepository.findAllByUserId(userId);
        List<TextDetailDto> responseDtoList = new ArrayList<>();

        textEntityList.forEach(v -> {
            responseDtoList.add(modelMapper.map(v, TextDetailDto.class));
        });

        return responseDtoList;
    }

    @Override
    public List<TextDetailDto> getVrTextList(Double curLat, Double curLng, String orderBy) {
        List<TextEntity> textEntityList = null;

        if (orderBy.equals("latest")) { // 최신순으로 정렬
            textEntityList = textRepository.findAllVrMessageLatest(curLat, curLng);
        }
        else if (orderBy.equals("like")) { // 좋아요순으로 정렬
            textEntityList = textRepository.findAllVrMessageLike(curLat, curLng);
        }

        List<TextDetailDto> responseDtoList = new ArrayList<>();

        textEntityList.forEach(v -> {
            responseDtoList.add(modelMapper.map(v, TextDetailDto.class));
        });

        return responseDtoList;
    }

    @Override
    public List<TextDto> getAllTextList() {
        List<TextEntity> textEntityList = textRepository.findAllByStatus(0); // 공개인 글(status: 0)만 조회
        List<TextDto> responseDtoList = new ArrayList<>();

        textEntityList.forEach(v -> {
            responseDtoList.add(modelMapper.map(v, TextDto.class));
        });

        return responseDtoList;
    }

    @Override
    public Integer deleteText(Long postId) {
        Optional<TextEntity> selectedTextEntity = textRepository.findById(postId);

        if (selectedTextEntity.isPresent()) {
            textRepository.delete(selectedTextEntity.get());
            return 1; // 삭제 성공 시 1 반환
        }

        return 0; // 삭제 실패 시 0 반환
    }

    @Override
    public TextDetailDto updateTextStatus(TextDetailDto requestDto) {
        Optional<TextEntity> selectedTextEntity = textRepository.findById(requestDto.getPostId());
        TextEntity requestEntity = null;
        TextEntity responseEntity = null;

        if (selectedTextEntity.isPresent()) {
            requestEntity = selectedTextEntity.get();
            requestEntity.setStatus(requestDto.getStatus());
            responseEntity = textRepository.save(requestEntity);
        }
        else {
            /** textEntity 없을 경우 예외처리 */
        }

        TextDetailDto responseDto = modelMapper.map(responseEntity, TextDetailDto.class);

        return responseDto;
    }


}
