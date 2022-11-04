package com.fairytail.demo.util;

import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class BadWordsUtils {

    public List<String> getBadWordsList() throws IOException {
        ClassPathResource resource = new ClassPathResource("static/bad_words.txt");
        BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()));

        String line;
        List<String> badWordsList = new ArrayList<>();

        while ((line = br.readLine()) != null) {
            badWordsList.add(line);
        }
        System.out.println("금지어 리스트 로드 완료");
        return badWordsList;
    }

    /**
     * @param parent : 전체 문자열
     * @param pattern : 전체 문자열에 찾을 패턴 문자열 (찾을 금지어)
     * @return 전체 문자열에 패턴이 있는지 여부 반환
     */
    public boolean findBadWord(String parent, String pattern) {
        int parentSize = parent.length();
        int patternSize = pattern.length();
        char[] parentArray = parent.toCharArray();
        char[] patternArray = pattern.toCharArray();
        int parentHash = 0, patternHash = 0;
        int power = 1;
        boolean flag = false;

        for (int i = 0; i <= parentSize-patternSize; i++) {
            if (i == 0) {
                for (int j = 0; j < patternSize; j++) {
                    parentHash = parentHash + (int)parentArray[patternSize-1-j] * power;
                    patternHash = patternHash + (int)patternArray[patternSize-1-j] * power;
                    if (j < patternSize - 1) power *= 2;
                }
            }
            else {
                parentHash = 2 * (parentHash - parentArray[i-1] * power) + parentArray[patternSize-1+i];
            }

            if (parentHash == patternHash) {
                flag = true;
                for (int j = 0; j < patternSize; j++) {
                    if (parentArray[i+j] != patternArray[j]) {
                        flag = false;
                        break;
                    }
                }
                if (flag) break;
            }
        }

        return flag;
    }


}
