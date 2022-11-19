package com.fairytail.text.service;

import com.fairytail.text.dto.TextDetailDto;
import com.fairytail.text.dto.TextDto;

import java.util.List;

public interface TextService {

    TextDto saveText(TextDto requestDto);

    TextDto getTextDetail(Long postId, Long userId);

    List<TextDetailDto> getMyTextList(Long userId);

    List<TextDetailDto> getVrTextList(Double curLat, Double curLng, Long userId, String orderBy);

    List<TextDto> getAllTextList(Long userId);

    Integer deleteText(Long postId);

    TextDetailDto updateTextStatus(TextDetailDto requestDto);

}
