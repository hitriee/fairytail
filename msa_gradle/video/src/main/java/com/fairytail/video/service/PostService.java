package com.fairytail.video.service;
import com.fairytail.video.dto.PostDto;
import com.fairytail.video.dto.PostLikeDto;
import com.fairytail.video.dto.PostReportDto;
import com.fairytail.video.jpa.PostEntity;

import java.util.List;


public interface PostService {
    PostDto createPost(PostDto postDto) throws Exception; //게시글 생성
    PostDto readPost(Long postId, Long userId) throws Exception; //게시글 상세 조회
    PostDto putPost(PostDto postDto) throws Exception; //게시글 공개, 비공개 수정 
    Boolean deletePost(Long postId) throws Exception; //게시글 삭제

    List<PostDto> readPostListLatest(Double lat, Double lng) throws Exception; //주변 최신순 리스트 조회
    List<PostDto> readPostListLike(Double lat, Double lng) throws Exception; //주변 좋아요순 리스트 조회
    List<PostDto> readMyPostList(Long userId) throws Exception; //내가 작성한 리스트 조회 

    Boolean createLike(PostLikeDto postLikeDto) throws Exception; //좋아요 누르기, 취소

    Boolean createReport(PostReportDto postReportDto) throws Exception; //신고하기 

    Boolean changeStatus(PostEntity post)throws Exception; //게시글이 5회 이상 신고 받으면 게시글을 잠금 상태로 변경

    List<PostDto> readAllPost() throws Exception; //전체 지역의 모든 리스트 조회
}
