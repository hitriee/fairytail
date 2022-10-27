package com.example.testcloud.Util;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;

public class FfmpegUtil {
    private String winPath = System.getProperty("user.dir");
    private String linuxPath = "/usr/bin/";

    public String checkOs(){
        String osName = System.getProperty("os.name").toLowerCase();
        if(osName.contains("win")){
            return winPath;
        } else{
            return winPath;
        }
    }
    public boolean makeThumbNail(String path) throws Exception{
        String osPath = checkOs();
        FFmpeg ffmpeg = new FFmpeg(osPath+ "ffmpeg");
        FFprobe ffprobe = new FFprobe(osPath + "ffprobe");

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
