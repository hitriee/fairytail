package com.fairytail.text.service;

import com.fairytail.text.dto.TextDetailDto;
import com.fairytail.text.dto.TextDto;

import java.util.List;

public interface TextService {

    TextDto saveText(TextDto textDto);

    TextDetailDto getTextDetail(Long postId, Long userId);

    List<TextDetailDto> getMyTextList(Long userId);

    List<TextDetailDto> getVrTextList(Float curLat, Float curLng);

    List<TextDto> getAllTextList();

    Integer deleteText(Long postId);

}
