package com.fairytail.img.mapper;

import com.fairytail.img.dto.ImgDto;
import com.fairytail.img.jpa.ImgEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImgMapper extends GenericMapper<ImgDto, ImgEntity> {
}
