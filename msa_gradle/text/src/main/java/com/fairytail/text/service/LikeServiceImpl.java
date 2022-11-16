package com.fairytail.text.service;

import com.fairytail.text.client.NotiFeignClient;
import com.fairytail.text.dto.LikeDto;
import com.fairytail.text.dto.NotiLikeRequestDto;
import com.fairytail.text.dto.NotiRequestDto;
import com.fairytail.text.jpa.LikeEntity;
import com.fairytail.text.jpa.LikeRepository;
import com.fairytail.text.jpa.TextEntity;
import com.fairytail.text.jpa.TextRepository;
import com.fairytail.text.util.UserReportFeign;
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

    private final UserReportFeign userReportFeign;

    private final NotiFeignClient notiFeignClient;

    @Override
    @Transactional
    public Integer updateTextLike(LikeDto requestDto) {
        Optional<TextEntity> selectedTextEntity = textRepository.findById(requestDto.getPostId());
        TextEntity textEntity = null;
        Integer response = null;

        if (selectedTextEntity.isPresent()) {
            textEntity = selectedTextEntity.get();

            if (requestDto.getIsLike()) { // 좋아요 눌렀을 때 요청 처리 -> like 테이블에 데이터 생성
                requestDto.setWriterId(textEntity.getUserId());

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
                requsetDto.setToken(userReportFeign.getUserToken(requestDto.getWriterId()));
                requsetDto.setTitle(textEntity.getTitle());
                requsetDto.setData(modelMapper.map(textEntity, NotiLikeRequestDto.class));
                // 요청 보내기
                notiFeignClient.createNotiLike(requsetDto);

                response = 1;
            }
            else { // 좋아요 해제했을 때 요청 처리 -> like 테이블의 데이터 삭제
                /** userId 나중에 User 객체로 바꿔주기!! */
                Optional<LikeEntity> selectedLikeEntity = likeRepository.findByPostAndUserId(textEntity, requestDto.getUserId());

                if (selectedLikeEntity.isPresent()) {
                    // like 테이블의 데이터 삭제
                    likeRepository.delete(selectedLikeEntity.get());

                    // post 테이블의 like_cnt 1 감소
                    textEntity.setLikeCnt(textEntity.getLikeCnt() - 1);
                    textRepository.save(textEntity);

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
