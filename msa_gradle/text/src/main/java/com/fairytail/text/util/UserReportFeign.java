package com.fairytail.text.util;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@FeignClient(name = "userReport", url="https://k7c209.p.ssafy.io/user/alert")
public interface UserReportFeign {
    @PostMapping("/{userId}")
    void userReport(@PathVariable Long userId);
}
