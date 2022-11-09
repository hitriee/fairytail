package com.fairytail.text.service;

import com.fairytail.text.dto.LikeDto;
import com.fairytail.text.jpa.LikeEntity;
import com.fairytail.text.jpa.LikeRepository;
import com.fairytail.text.jpa.TextEntity;
import com.fairytail.text.jpa.TextRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final ModelMapper modelMapper;

    private final TextRepository textRepository;

    private final LikeRepository likeRepository;

    @Override
    public Integer updateTextLike(LikeDto requestDto) {
        /** userId 나중에 User 객체로 바꿔주기!! */
        Optional<TextEntity> selectedTextEntity = textRepository.findById(requestDto.getPostId());
        TextEntity textEntity = null;
        Integer response = null;

        if (selectedTextEntity.isPresent()) {
            textEntity = selectedTextEntity.get();

            if (requestDto.getIsLike()) { // 좋아요 눌렀을 때 요청 처리 -> like 테이블에 데이터 생성
                requestDto.setWriterId(textEntity.getUserId());

                LikeEntity likeEntity = modelMapper.map(requestDto, LikeEntity.class);
                likeEntity.setPost(textEntity);
                likeRepository.save(likeEntity);

                response = 1;
            }
            else { // 좋아요 해제했을 때 요청 처리 -> like 테이블의 데이터 삭제
                Optional<LikeEntity> selectedLikeEntity = likeRepository.findByPostAndUserId(textEntity, requestDto.getUserId());

                if (selectedLikeEntity.isPresent()) {
                    likeRepository.delete(selectedLikeEntity.get());
                    response = 0;
                }
                else {
                    /** likeEntity 없을 경우 예외처리 */
                }
            }
        }
        else {
            /** textEntity 없을 경우 예외처리 */
        }

        return response; // 1이면 좋아요 생성, 0이면 좋아요 해제 응답을 했다는 의미
    }
}
