package com.example.testcloud.Mapper;

import com.example.testcloud.DTO.UserDto;
import com.example.testcloud.Entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends GenericMapper<UserDto, User>{

}
