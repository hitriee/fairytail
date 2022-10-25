package com.example.testcloud.Util;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFprobe;
import org.springframework.core.io.ClassPathResource;

public class FfmpegUtil {
    private String rootPath = System.getProperty("user.dir");
    public boolean makeThumbNail() throws Exception{
        FFmpeg ffmpeg = new FFmpeg(rootPath+ "ffmpeg");
        FFprobe ffprobe = new FFprobe(rootPath + "ffprobe");
        return false;
    }
}
