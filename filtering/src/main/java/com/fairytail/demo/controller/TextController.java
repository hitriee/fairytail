package com.fairytail.demo.controller;

import com.fairytail.demo.util.BadWordsUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/text")
public class TextController {

    private BadWordsUtils badWordsUtils = new BadWordsUtils();

    @GetMapping
    public ResponseEntity<Integer> detectBadWord(@RequestBody HashMap<String, String> map) throws IOException {
        List<String> badWordsList = badWordsUtils.getBadWordsList();
        String content = map.get("content");
        for (String word : badWordsList) {
            if (badWordsUtils.findBadWord(content, word))
                return new ResponseEntity<Integer>(1, HttpStatus.OK);
        }

        return new ResponseEntity<Integer>(0, HttpStatus.OK);
    }

}
