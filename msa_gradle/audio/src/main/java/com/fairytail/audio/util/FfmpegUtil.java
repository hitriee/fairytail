package com.fairytail.audio.util;


import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import net.bramp.ffmpeg.probe.FFmpegFormat;
import net.bramp.ffmpeg.probe.FFmpegProbeResult;
import org.springframework.stereotype.Component;


/**
 * 영상 썸네일 추출 유틸
 */
@Component
public class FfmpegUtil {
    private String serverPath = System.getProperty("user.dir")+"/ffmpeg/";
    private String winPath = System.getProperty("user.dir")+"/winffmpeg/";

    public String checkOs(){
        String osName = System.getProperty("os.name").toLowerCase();
        if(osName.contains("win")){
            return winPath;
        } else{
            return serverPath;
        }
    }
    public boolean mp3(String path) throws Exception{
        String osPath = checkOs();
        FFmpeg ffmpeg = new FFmpeg(osPath + "ffmpeg");
        FFprobe ffprobe = new FFprobe(osPath+"ffprobe");
        FFmpegBuilder builder = new FFmpegBuilder()
                .overrideOutputFiles(true)
                .setInput(path)
                .addOutput(path+".mp3")
                .done();
        FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);
        executor.createJob(builder).run();
        return true;
    }
}
