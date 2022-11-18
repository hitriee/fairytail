package com.fairytail.text.mapper;

import com.fairytail.text.dto.TextDto;
import com.fairytail.text.jpa.TextEntity;
import com.fairytail.text.vo.TextRequest;
import com.fairytail.text.vo.TextResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TextMapper extends GenericMapper<TextDto, TextEntity, TextRequest, TextResponse> {
}