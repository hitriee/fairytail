package com.fairytail.text.service;

import com.fairytail.text.dto.ReportDto;
import com.fairytail.text.jpa.ReportEntity;
import com.fairytail.text.jpa.ReportRepository;
import com.fairytail.text.jpa.TextEntity;
import com.fairytail.text.jpa.TextRepository;
import com.fairytail.text.client.UserReportFeignClient;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ModelMapper modelMapper;

    private final ReportRepository reportRepository;

    private final TextRepository textRepository;

    private final UserReportFeignClient userReportFeignClient;

    @Override
    public Integer createTextReport(ReportDto requestDto) {
        Optional<TextEntity> selectedTextEntity = textRepository.findById(requestDto.getPostId());
        TextEntity textEntity = null;
        Integer response = null;

        if (selectedTextEntity.isPresent()) {
            textEntity = selectedTextEntity.get();
            /** userId 나중에 User 객체로 바꿔주기!! */
            Optional<ReportEntity> selectedReportEntity = reportRepository.findByPostAndUserId(textEntity, requestDto.getUserId());

            if (selectedReportEntity.isEmpty()) { // report 데이터가 없을 경우 -> 신고 가능
                ReportEntity reportEntity = modelMapper.map(requestDto, ReportEntity.class);
                reportEntity.setPost(textEntity);
                reportRepository.save(reportEntity);

                response = 1;
            }
            else { // report 데이터가 있을 경우 -> 이미 신고를 했으므로 신고 불가능
                response = 0;
            }
        }
        else {
            /** reportEntity 없을 경우 예외처리 */
        }

        return response;
    }

    @Override
    public Integer updateReportCnt(Long postId) {
        Optional<TextEntity> selectedTextEntity = textRepository.findById(postId);
        TextEntity textEntity = null;
        Integer response = null;

        if (selectedTextEntity.isPresent()) {
            textEntity = selectedTextEntity.get();
            textEntity.setReportCnt(textEntity.getReportCnt() + 1); // 신고 횟수 1 늘려주기

            if (textEntity.getReportCnt() == 3) { // 신고 횟수가 3번이 됐을 경우
                textEntity.setStatus(2); // 메시지 상태를 차단(2)으로 바꾸기
                userReportFeignClient.userReport(textEntity.getUserId());
            }
            textRepository.save(textEntity);
            response = textEntity.getReportCnt();
        }
        else {
            /** reportEntity 없을 경우 예외처리 */
        }

        return response; // 해당 메시지의 총 신고횟수 반환
    }
}
