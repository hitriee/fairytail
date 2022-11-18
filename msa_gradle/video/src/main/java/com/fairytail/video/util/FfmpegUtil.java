package com.fairytail.video.util;


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
public class FfmpegUtil{
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
    public boolean zip(String path) throws Exception{
        String osPath = checkOs();
        FFmpeg ffmpeg = new FFmpeg(osPath +"ffmpeg");
        FFprobe ffprobe = new FFprobe(osPath + " ffprobe");
        FFmpegBuilder builder = new FFmpegBuilder()
                .overrideOutputFiles(true)
                .setInput(path)
                .addOutput(path+"_zip.mp4")
                .setVideoResolution(900, 900)
                .done();
        FFmpegExecutor executor = new FFmpegExecutor(ffmpeg, ffprobe);
        executor.createJob(builder).run();
        return true;
    }
    public double checkTime(String path) throws Exception{
        String osPath = checkOs();
        FFprobe ffprobe = new FFprobe(osPath + "ffprobe");
        FFmpegProbeResult probeResult = ffprobe.probe(path);
        FFmpegFormat format = probeResult.getFormat();
        double second = format.duration;
        return second;
    }
}
