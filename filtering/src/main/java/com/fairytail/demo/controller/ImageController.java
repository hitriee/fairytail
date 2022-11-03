package com.fairytail.demo.controller;

import com.google.cloud.speech.v1.*;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import org.json.HTTP;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/image")
public class ImageController {

    @PostMapping
    public ResponseEntity<String> detectSafeSearch(@RequestParam("file") MultipartFile file) throws IOException {
        String responseAnnotation = null;
        List<AnnotateImageRequest> requests = new ArrayList<>();

        ByteString imgBytes = ByteString.readFrom(file.getInputStream());

        Image img = Image.newBuilder().setContent(imgBytes).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.SAFE_SEARCH_DETECTION).build();
        AnnotateImageRequest request =
                AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        requests.add(request);

        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    System.out.format("Error: %s%n", res.getError().getMessage());
                    return new ResponseEntity<String>("FAIL", HttpStatus.NO_CONTENT);
                }

                // For full list of available annotations, see http://g.co/cloud/vision/docs
                SafeSearchAnnotation annotation = res.getSafeSearchAnnotation();
                responseAnnotation = String.format("adult: %s%nmedical: %s%nspoofed: %s%nviolence: %s%nracy: %s%n",
                        annotation.getAdult(),
                        annotation.getMedical(),
                        annotation.getSpoof(),
                        annotation.getViolence(),
                        annotation.getRacy());
                System.out.println(responseAnnotation);
            }
        }

        return new ResponseEntity<String>(responseAnnotation, HttpStatus.OK);
    }

}
