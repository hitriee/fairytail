package com.fairytail.text.util;

import org.springframework.stereotype.Component;

@Component
public class MainUtils {

    /** 시(hour)를 입력하면 시간대(0~4)를 출력 */
    public Integer checkTime(Integer hour){
        if(hour >= 1 && hour <=5){
            return 0;
        } else if(hour >= 6 && hour <= 10){
            return 1;
        } else if(hour >= 11 && hour <= 16){
            return 2;
        } else if (hour >= 17 && hour <= 20){
            return 3;
        } else if ((hour >= 21 && hour <= 24) || hour == 0 ){
            return 4;
        } else {
            return null;
        }
    }

}
