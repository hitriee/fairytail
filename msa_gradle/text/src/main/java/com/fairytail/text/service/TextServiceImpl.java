package com.fairytail.text.service;

import com.fairytail.text.dto.TextDto;
import com.fairytail.text.jpa.TextEntity;
import com.fairytail.text.jpa.TextRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TextServiceImpl implements TextService {

    private final ModelMapper modelMapper;
    private final TextRepository textRepository;

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
}
