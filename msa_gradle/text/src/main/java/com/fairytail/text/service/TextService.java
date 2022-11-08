package com.fairytail.text.service;

import com.fairytail.text.dto.TextDetailDto;
import com.fairytail.text.dto.TextDto;

import java.util.List;

public interface TextService {

    TextDto saveText(TextDto textDto);

    TextDetailDto getTextDetail(Long postId, Long userId);

    List<TextDetailDto> getMyTextList(Long userId);

}
