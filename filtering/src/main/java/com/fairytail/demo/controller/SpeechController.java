package com.fairytail.demo.controller;

import com.google.protobuf.ByteString;
import org.apache.tomcat.util.codec.binary.Base64;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognitionConfig.AudioEncoding;
import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.google.cloud.speech.v1.SpeechRecognitionAlternative;

import java.io.IOException;
import java.sql.SQLOutput;
import java.util.List;

@RestController
@RequestMapping("/speech")
public class SpeechController {

    @PostMapping
    public ResponseEntity<String> speechToText(@RequestParam("file") MultipartFile file) throws IOException {
        String responseTranscription = null;

        try (SpeechClient speech = SpeechClient.create()) {
//            byte[] encodedAudio = Base64.encodeBase64(file.getBytes());
//            ByteString audioBytes = ByteString.copyFrom(encodedAudio);
            ByteString audioBytes = ByteString.copyFrom(file.getBytes());
            RecognitionConfig config = RecognitionConfig.newBuilder()
                    .setEncoding(AudioEncoding.ENCODING_UNSPECIFIED)
                    .setLanguageCode("ko-KR")
                    .setSampleRateHertz(16000)
                    .build();
            RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(audioBytes).build();

            RecognizeResponse response = speech.recognize(config, audio);
            List<SpeechRecognitionResult> results = response.getResultsList();

            for (SpeechRecognitionResult result : results) {
                SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                responseTranscription = alternative.getTranscript();
                System.out.printf("Transcription: %s%n", responseTranscription);
            }
        }

        return new ResponseEntity<String>(responseTranscription, HttpStatus.OK);
    }
}
