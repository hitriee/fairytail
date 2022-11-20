package com.fairytail.text.service;

import com.fairytail.text.dto.ReportDto;

public interface ReportService {

    Integer createTextReport(ReportDto requestDto);

    Integer updateReportCnt(Long postId);

}
