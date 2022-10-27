package com.example.testcloud.Util;

import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import net.bramp.ffmpeg.probe.FFmpegFormat;
import net.bramp.ffmpeg.probe.FFmpegProbeResult;

public class FfmpegUtil{
    private String osPath = System.getProperty("user.dir")+"/ffmpeg/";
    public boolean makeThumbNail(String path) throws Exception{
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

    public String checkTime(String path) throws Exception{
        FFprobe ffprobe = new FFprobe(osPath + "ffprobe");
        FFmpegProbeResult probeResult = ffprobe.probe(path);
        FFmpegFormat format = probeResult.getFormat();
        double second = format.duration;
        String result = second + "";
        return result;
    }
}
