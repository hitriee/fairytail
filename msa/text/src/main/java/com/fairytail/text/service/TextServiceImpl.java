package com.fairytail.text.service;

import com.fairytail.text.dto.TextDto;
import com.fairytail.text.jpa.TextEntity;
import com.fairytail.text.jpa.TextRepository;
import com.fairytail.text.mapper.TextMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TextServiceImpl implements TextService {

    private final TextMapper textMapper;

    private final TextRepository textRepository;

    @Override
    public TextDto saveText(TextDto textDto) {
        TextEntity textEntity = textMapper.DtoToEntity(textDto);

        textEntity.setUserId(0L);

        TextEntity resultEntity = textRepository.save(textEntity);



        return textMapper.EntityToDto(resultEntity);
    }
}
