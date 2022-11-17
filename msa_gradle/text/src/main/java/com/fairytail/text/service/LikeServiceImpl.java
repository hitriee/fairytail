package com.fairytail.text.service;

import com.fairytail.text.client.NotiFeignClient;
import com.fairytail.text.dto.LikeDto;
import com.fairytail.text.dto.NotiLikeRequestDto;
import com.fairytail.text.dto.NotiRequestDto;
import com.fairytail.text.jpa.LikeEntity;
import com.fairytail.text.jpa.LikeRepository;
import com.fairytail.text.jpa.TextEntity;
import com.fairytail.text.jpa.TextRepository;
import com.fairytail.text.client.UserReportFeignClient;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final ModelMapper modelMapper;

    private final TextRepository textRepository;

    private final LikeRepository likeRepository;

    private final UserReportFeignClient userReportFeignClient;

    private final NotiFeignClient notiFeignClient;

    @Override
    @Transactional
    public Integer updateTextLike(LikeDto requestDto) {
        Optional<TextEntity> selectedTextEntity = textRepository.findById(requestDto.getPostId());
        TextEntity textEntity = null;
        Integer response = null;

        if (selectedTextEntity.isPresent()) {
            textEntity = selectedTextEntity.get();

            Optional<LikeEntity> selectedLikeEntity
                    = likeRepository.findByPostAndUserIdAndWriterId(textEntity, requestDto.getUserId(), requestDto.getWriterId());

            if (selectedLikeEntity.isPresent()) { // like 테이블이 있을 경우 -> 좋아요 취소
                // like 테이블의 데이터 삭제
                likeRepository.delete(selectedLikeEntity.get());

                // post 테이블의 like_cnt 1 감소
                textEntity.setLikeCnt(textEntity.getLikeCnt() - 1);
                textRepository.save(textEntity);

                response = 0;
            }
            else { // like 테이블이 없을 경우 -> 좋아요 등록
                // like 테이블에 데이터 추가
                LikeEntity likeEntity = modelMapper.map(requestDto, LikeEntity.class);
                likeEntity.setPost(textEntity);
                likeRepository.save(likeEntity);

                // post 테이블의 like_cnt 1 증가
                textEntity.setLikeCnt(textEntity.getLikeCnt() + 1);
                textRepository.save(textEntity);

                /** 좋아요 알림 요청 보내기 */
                // 요청 데이터 세팅
                NotiRequestDto requsetDto = new NotiRequestDto();
                requsetDto.setToken(userReportFeignClient.getUserToken(requestDto.getWriterId()));
                requsetDto.setTitle(textEntity.getTitle());
                requsetDto.setData(modelMapper.map(textEntity, NotiLikeRequestDto.class));
                // 요청 보내기
                notiFeignClient.createNotiLike(requsetDto);

                response = 1;
            }
        }
        else {
            /** textEntity 없을 경우 예외처리 */
        }

        return response; // 1이면 좋아요 생성, 0이면 좋아요 해제 응답을 했다는 의미
    }
}
