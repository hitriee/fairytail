package com.fairytail.text.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

public interface GenericMapper<D, E, V1, V2>{
    D EntityToDto(E e);
    E DtoToEntity(D d);
    D RequestVoToDto(V1 v);
    V1 DtoToRequestVo(D d);
    D ResponseVoToDto(V2 v);
    V2 DtoToResponseVo(D d);

    List<D> EntityToDtoList(List<E> e);
    List<E> DtoToEntityList(List<D> d);
    List<D> RequestVoToDtoList(List<V1> v);
    List<V1> DtoToRequestVoList(List<D> d);
    List<D> ResponseVoToDtoList(List<V2> v);
    List<V2> DtoToResponseVoList(List<D> d);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDto(D dto, @MappingTarget E entity);
}

