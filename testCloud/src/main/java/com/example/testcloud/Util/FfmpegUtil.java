package com.example.testcloud.Util;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;

public class FfmpegUtil {
    private String winPath = "C:/Users/multicampus/Downloads/ffmpeg/bin/";
    public boolean makeThumbNail(String path) throws Exception{
        FFmpeg ffmpeg = new FFmpeg(winPath+ "ffmpeg");
        FFprobe ffprobe = new FFprobe(winPath + "ffprobe");

        FFmpegBuilder builder = new FFmpegBuilder()
                .overrideOutputFiles(true)
                .setInput(path)
                .addExtraArgs("-ss", "00:00:01")
                .addOutput(path+"_thumbnail.png")
                .setFrames(1)
                .done();

        FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);
        executor.createJob(builder).run();
        return true;
    }
}
