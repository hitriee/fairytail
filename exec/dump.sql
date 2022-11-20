-- --------------------------------------------------------
-- 호스트:                          k7c209.p.ssafy.io
-- 서버 버전:                        10.3.34-MariaDB-0ubuntu0.20.04.1 - Ubuntu 20.04
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.2.0.6576
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- audio 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `audio` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `audio`;

-- 테이블 audio.likes 구조 내보내기
CREATE TABLE IF NOT EXISTS `likes` (
  `like_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `writer_id` bigint(20) DEFAULT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`like_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- 테이블 데이터 audio.likes:~8 rows (대략적) 내보내기
DELETE FROM `likes`;
INSERT INTO `likes` (`like_id`, `user_id`, `writer_id`, `post_id`) VALUES
	(61, 43, 42, 81),
	(62, 42, 42, 81),
	(65, 50, 42, 81),
	(66, 48, 42, 81),
	(67, 45, 45, 83),
	(68, 45, 45, 84),
	(69, 45, 45, 85),
	(70, 45, 45, 86);

-- 테이블 audio.post 구조 내보내기
CREATE TABLE IF NOT EXISTS `post` (
  `post_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(400) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `emoji_no` int(11) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `report_cnt` int(11) DEFAULT 0,
  `status` int(11) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `like_cnt` int(11) NOT NULL DEFAULT 0,
  `day_type` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`post_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- 테이블 데이터 audio.post:~6 rows (대략적) 내보내기
DELETE FROM `post`;
INSERT INTO `post` (`post_id`, `content`, `date`, `emoji_no`, `lat`, `lng`, `report_cnt`, `status`, `title`, `type`, `url`, `user_id`, `like_cnt`, `day_type`) VALUES
	(81, NULL, '2022-11-20 10:45:03', 22, 35.13513513513514, 126.79638000857786, 2, 0, '스타벅스에서...', 3, 'dh8s0t53692ft.cloudfront.net/audio/audio_1_음성 007.m4a', 42, 4, 1),
	(82, NULL, '2022-11-20 21:18:05', 5, 35.1633408, 126.877696, 0, 0, '다들 고생하셨습니다', 3, 'dh8s0t53692ft.cloudfront.net/audio/audio_82_test.m4a', 45, 0, 4),
	(83, NULL, '2022-11-20 22:16:07', 36, 35.1633408, 126.877696, 0, 0, '조코 잠꼬대♥', 3, 'dh8s0t53692ft.cloudfront.net/audio/audio_83_test.m4a', 45, 1, 4),
	(84, '모두들 1년 동안 고생 많으셨습니다', '2022-11-20 22:58:35', 29, 35.1633408, 126.877696, 0, 0, '안녕하세요', 3, 'dh8s0t53692ft.cloudfront.net/audio/audio_84_음성 파일.m4a', 45, 1, 4),
	(85, '모두들 1년 동안 고생 많으셨습니다', '2022-11-20 23:34:19', 66, 35.1633408, 126.877696, 0, 0, '자율 프로젝트 끝!', 3, 'dh8s0t53692ft.cloudfront.net/audio/audio_85_음성 파일.m4a', 45, 1, 4),
	(86, '모두들 1년 동안 고생 많으셨습니다', '2022-11-21 00:12:03', 26, 35.1633408, 126.877696, 0, 0, '사랑해요', 3, 'dh8s0t53692ft.cloudfront.net/audio/audio_86_음성 파일.m4a', 45, 1, 4);

-- 테이블 audio.report 구조 내보내기
CREATE TABLE IF NOT EXISTS `report` (
  `report_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`report_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- 테이블 데이터 audio.report:~1 rows (대략적) 내보내기
DELETE FROM `report`;
INSERT INTO `report` (`report_id`, `post_id`, `user_id`, `type`, `content`) VALUES
	(12, 81, 48, 1, '신고입니다.');


-- img 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `img` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `img`;

-- 테이블 img.likes 구조 내보내기
CREATE TABLE IF NOT EXISTS `likes` (
  `like_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `writer_id` bigint(20) DEFAULT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`like_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 img.likes:~9 rows (대략적) 내보내기
DELETE FROM `likes`;
INSERT INTO `likes` (`like_id`, `user_id`, `writer_id`, `post_id`) VALUES
	(123, 42, 44, 99),
	(126, 43, 42, 100),
	(132, 45, 44, 99),
	(133, 47, 47, 101),
	(134, 47, 47, 102),
	(135, 47, 47, 106),
	(136, 50, 47, 104),
	(137, 50, 47, 106),
	(138, 50, 47, 109);

-- 테이블 img.post 구조 내보내기
CREATE TABLE IF NOT EXISTS `post` (
  `post_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(400) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `emoji_no` int(11) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `report_cnt` int(11) DEFAULT 0,
  `status` int(11) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `like_cnt` int(11) NOT NULL DEFAULT 0,
  `day_type` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 img.post:~16 rows (대략적) 내보내기
DELETE FROM `post`;
INSERT INTO `post` (`post_id`, `content`, `date`, `emoji_no`, `lat`, `lng`, `report_cnt`, `status`, `title`, `type`, `url`, `user_id`, `like_cnt`, `day_type`) VALUES
	(99, 'blob:https://k7c2091.p.ssafy.io/86d59692-1036-4b58-9981-138a8a91bc02', '2022-11-20 10:01:55', 7, 35.1837755, 126.9252539, 0, 0, '맛있겠다', 1, 'dh8s0t53692ft.cloudfront.net/image/image_1_blob', 44, 2, 1),
	(101, 'blob:https://k7c2091.p.ssafy.io/84b89744-33c7-4ad1-93f8-5e9c140e4740', '2022-11-20 13:46:28', 72, 37.52968399709722, 126.96449558712654, 0, 0, '슝 건담 날아간다~', 1, 'dh8s0t53692ft.cloudfront.net/image/image_101_blob', 47, 1, 2),
	(102, 'blob:https://k7c2091.p.ssafy.io/3fb301a4-1cc3-49e0-806d-c75300dd8720', '2022-11-20 13:48:04', 9, 37.52954753725753, 126.96467691352261, 0, 0, '1120 기억해오늘', 1, 'dh8s0t53692ft.cloudfront.net/image/image_102_blob', 47, 1, 2),
	(103, 'blob:https://k7c2091.p.ssafy.io/62bd09aa-efea-46e6-9b87-1e6ea3591be7', '2022-11-20 13:57:32', 24, 37.52966024472091, 126.9646042928953, 0, 0, '미술관 구경! ', 1, 'dh8s0t53692ft.cloudfront.net/image/image_103_blob', 47, 0, 2),
	(104, 'blob:https://k7c2091.p.ssafy.io/af81ad66-4f73-4a74-946b-9aceede1a0b6', '2022-11-20 13:58:13', 2, 37.52987691727234, 126.96447224672053, 0, 0, '엄마보고싶어요', 1, 'dh8s0t53692ft.cloudfront.net/image/image_104_blob', 47, 1, 2),
	(105, 'blob:https://k7c2091.p.ssafy.io/1ce9fd71-c3d6-483a-8748-add7bedf2763', '2022-11-20 14:00:06', 23, 37.52960021148377, 126.9647263348455, 0, 0, '자유를 위해 치얼스', 1, 'dh8s0t53692ft.cloudfront.net/image/image_105_blob', 47, 0, 2),
	(106, 'blob:https://k7c2091.p.ssafy.io/77f8cc55-cba4-4ea9-a281-21372e842521', '2022-11-20 14:02:19', 56, 37.529473027056824, 126.96481154676746, 0, 0, '용산역에서 한컷', 1, 'dh8s0t53692ft.cloudfront.net/image/image_106_blob', 47, 2, 2),
	(107, 'blob:https://k7c2091.p.ssafy.io/94dad354-865e-49a0-bf85-a8b66c4e995e', '2022-11-20 14:04:18', 71, 37.52992257646992, 126.96449252371764, 0, 0, '건담이라니!!', 1, 'dh8s0t53692ft.cloudfront.net/image/image_107_blob', 47, 0, 2),
	(108, 'blob:https://k7c2091.p.ssafy.io/dfaa0f6b-63f0-427a-80db-59d2a1064f3c', '2022-11-20 14:06:13', 27, 37.52949845769727, 126.96476360130428, 0, 1, '해피버쓰데이', 1, 'dh8s0t53692ft.cloudfront.net/image/image_108_blob', 47, 0, 2),
	(109, 'blob:https://k7c2091.p.ssafy.io/7c72f09d-a2c9-4234-9080-8af75fd7cdaa', '2022-11-20 14:07:15', 68, 37.52957490973394, 126.96468432772691, 0, 0, '하늘움직임', 1, 'dh8s0t53692ft.cloudfront.net/image/image_109_blob', 47, 1, 2),
	(110, 'blob:https://k7c2091.p.ssafy.io/89a24ce6-aef2-4f76-a109-d85e37cf71e9', '2022-11-20 16:07:52', 22, 36.00185050716192, 126.95823188815177, 0, 0, '하트표빨대긔여워', 1, 'dh8s0t53692ft.cloudfront.net/image/image_110_blob', 51, 0, 2),
	(111, 'blob:https://k7c2091.p.ssafy.io/703e89b5-3c37-4cce-9b3b-280dd8c322e4', '2022-11-20 16:08:26', 50, 35.985613270879426, 126.95207726080109, 0, 0, '이구역의왕-둘기', 1, 'dh8s0t53692ft.cloudfront.net/image/image_111_blob', 51, 0, 2),
	(112, 'blob:https://k7c2091.p.ssafy.io/a464548d-4e94-47b8-856e-40119ba4cf70', '2022-11-20 16:10:56', 65, 35.951562013592714, 126.94864591306323, 0, 0, '무지개빛미래', 1, 'dh8s0t53692ft.cloudfront.net/image/image_112_blob', 51, 0, 2),
	(113, 'blob:https://k7c2091.p.ssafy.io/9ee2aaf6-d1ae-4ea3-838d-06149f1c6d6c', '2022-11-20 16:14:18', 29, 35.951562013592714, 126.94864591306323, 0, 0, '취뽀하자!', 1, 'dh8s0t53692ft.cloudfront.net/image/image_113_blob', 51, 0, 2),
	(114, 'blob:https://k7c2091.p.ssafy.io/af43a44d-84bd-4f81-ac21-9fcecab6689f', '2022-11-20 16:30:53', 7, 35.951562013592714, 126.94864591306323, 0, 0, '널향해달려가고있어', 1, 'dh8s0t53692ft.cloudfront.net/image/image_114_blob', 1, 0, 2),
	(115, 'blob:https://k7c2091.p.ssafy.io/76091301-3862-49a6-817c-f120853a3c9d', '2022-11-20 16:35:59', 22, 35.56503101327727, 126.83417412563429, 0, 0, '행복은곁에있어', 1, 'dh8s0t53692ft.cloudfront.net/image/image_115_blob', 1, 0, 2);

-- 테이블 img.report 구조 내보내기
CREATE TABLE IF NOT EXISTS `report` (
  `report_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 img.report:~0 rows (대략적) 내보내기
DELETE FROM `report`;


-- text 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `text` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `text`;

-- 테이블 text.like 구조 내보내기
CREATE TABLE IF NOT EXISTS `like` (
  `like_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `writer_id` bigint(20) NOT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  KEY `FKqd13xefuiasesq2vosipiosnt` (`post_id`),
  CONSTRAINT `FKqd13xefuiasesq2vosipiosnt` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 text.like:~16 rows (대략적) 내보내기
DELETE FROM `like`;
INSERT INTO `like` (`like_id`, `user_id`, `writer_id`, `post_id`) VALUES
	(139, 45, 45, 104),
	(148, 43, 45, 104),
	(152, 46, 45, 104),
	(158, 49, 49, 112),
	(162, 46, 50, 115),
	(165, 50, 43, 103),
	(166, 50, 48, 113),
	(167, 50, 48, 111),
	(168, 50, 45, 104),
	(169, 50, 48, 108),
	(170, 50, 50, 116),
	(171, 50, 50, 115),
	(172, 48, 48, 117),
	(175, 48, 48, 111),
	(176, 48, 48, 108),
	(177, 48, 48, 107);

-- 테이블 text.post 구조 내보내기
CREATE TABLE IF NOT EXISTS `post` (
  `post_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(400) NOT NULL,
  `date` datetime NOT NULL,
  `day_type` int(11) NOT NULL,
  `emoji_no` int(11) NOT NULL,
  `lat` double NOT NULL,
  `like_cnt` int(11) DEFAULT 0,
  `lng` double NOT NULL,
  `report_cnt` int(11) DEFAULT 0,
  `status` int(11) NOT NULL,
  `title` varchar(40) NOT NULL,
  `type` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 text.post:~25 rows (대략적) 내보내기
DELETE FROM `post`;
INSERT INTO `post` (`post_id`, `content`, `date`, `day_type`, `emoji_no`, `lat`, `like_cnt`, `lng`, `report_cnt`, `status`, `title`, `type`, `url`, `user_id`) VALUES
	(103, '진짜 진짜 예쁘다', '2022-11-20 09:48:11', 1, 60, 35.187389, 1, 126.9218479, 0, 0, '이모지 움직이는 거', 0, NULL, 43),
	(104, '여기는 반짝반짝 빛나는 스타벅스입니다ㅎㅎㅎ', '2022-11-20 11:07:08', 2, 66, 35.1567872, 4, 126.8678656, 0, 0, '반짝반짝', 0, NULL, 45),
	(106, '잠시 구름에 가려진 것일 뿐\n너의 하늘에서 별은 사라진 적 없어\n넌 언제나 내게 반짝 반짝 빛나는 별이야', '2022-11-20 13:56:47', 2, 67, 37.52967009259552, 0, 126.9648028733564, 0, 0, '별은 빛나고 있어', 0, NULL, 47),
	(107, '나는 곰이다', '2022-11-20 13:57:50', 2, 54, 35.1402567, 1, 126.8037342, 0, 0, '크아앙 ', 0, NULL, 48),
	(108, '100점 맞고 싶어용', '2022-11-20 13:58:14', 2, 32, 35.1402567, 2, 126.8037342, 0, 0, '100점 맞고 싶어', 0, NULL, 48),
	(109, '끝까지 노력한 너 \n너무 너무 대견하다! \n앞으로도 잘해보자! \n22.11.20 ', '2022-11-20 14:00:56', 2, 32, 37.529919868915336, 0, 126.96449867156183, 0, 0, '끝까지 노력한 너', 0, NULL, 47),
	(111, '찍찍찍', '2022-11-20 14:09:20', 2, 47, 35.1302226, 2, 126.81425, 0, 0, '찍찍찍', 0, NULL, 48),
	(112, '취 뽀 화 이 팅!', '2022-11-20 14:11:50', 2, 51, 35.1961088, 1, 126.9006336, 0, 1, '취 뽀 화 이 팅', 0, NULL, 49),
	(113, '날씨가 좋아요', '2022-11-20 14:20:25', 2, 57, 35.1302226, 1, 126.81425, 0, 0, '오늘 날씨가 좋아요', 0, NULL, 48),
	(115, '싸피타운 사람들 안뇽~~', '2022-11-20 14:38:35', 2, 37, 35.2032211, 2, 126.8011971, 0, 0, '싸피 타운~~', 0, NULL, 50),
	(116, '내년에 싸피타운 입주할 9기 미리 환영!', '2022-11-20 14:50:52', 2, 27, 35.2032218, 1, 126.8011947, 0, 0, '싸피 9기 환영!', 0, NULL, 50),
	(117, '오키', '2022-11-20 15:03:31', 2, 14, 35.1302226, 1, 126.81425, 0, 0, '오키', 0, NULL, 48),
	(119, '아아 여기는 광주캠퍼스~~\n서울캠퍼스 환영합니다~~', '2022-11-20 15:20:41', 2, 26, 37.5014173, 0, 127.0396546, 0, 0, '서울캠퍼스 하이~~', 0, NULL, 50),
	(120, '아아 여기는 광주캠퍼스~~\n구미캠퍼스 환영합니다!\n동하책 많이 이용해주세요~~', '2022-11-20 15:24:08', 2, 26, 36.1072183, 0, 128.4151037, 0, 0, '구미캠퍼스 하이!', 0, NULL, 50),
	(121, '부울경 캠퍼스~~', '2022-11-20 15:24:32', 2, 17, 35.0953265, 0, 128.855668, 0, 0, '여기는', 0, NULL, 43),
	(122, '아아 여기는 광주캠퍼스~~\n대전캠퍼스 하이요!\n동하책 많이 이용해주세요~~!', '2022-11-20 15:27:59', 2, 26, 36.3549777, 0, 127.2983403, 0, 0, '대전캠퍼스 하이요!', 0, NULL, 50),
	(123, '언제나 너의 곁에서 응원하고 있어요! \n럭키 7기 화이팅! ', '2022-11-20 16:31:43', 2, 44, 35.951562013592714, 0, 126.94864591306323, 0, 0, '럭키7! 할수있다!', 0, NULL, 1),
	(124, '오늘 이 메시지를 연 당신! \n행운이 가득할거에요!\n우리 잘 해왔잖아요~ 좀만 더 힘내요💕', '2022-11-20 16:32:46', 2, 43, 35.569789051771586, 0, 126.83785018812057, 0, 0, '열정', 0, NULL, 1),
	(125, '엄마 사랑해', '2022-11-20 16:34:31', 2, 25, 35.56503101327727, 0, 126.83417412563429, 0, 0, '엄마 사랑해', 0, NULL, 1),
	(126, '지금은 잠시 넘어졌지만\n곧 다시 일어날거야\n영서야 난 널 믿어💕', '2022-11-20 16:39:05', 2, 35, 35.56503101327727, 0, 126.83417412563429, 0, 0, '다시일어날거야', 0, NULL, 47),
	(127, '은영아 화이팅!\n너의 곁에 언제나 내가 있어 \n잊지마 \np.s. 누구게', '2022-11-20 16:39:47', 2, 53, 35.56503101327727, 0, 126.83417412563429, 0, 0, '은영아화이팅', 0, NULL, 47),
	(128, '우리예지최고\n넌 너무 눈부신 사람이야 \n☀️', '2022-11-20 16:40:33', 2, 57, 35.56503101327727, 0, 126.83417412563429, 0, 0, '우리예지최고', 0, NULL, 47),
	(129, '행운은 나의편! \n오늘 기차타고 가면서 기억하고 싶어\n남기는 메시지! ', '2022-11-20 16:41:09', 2, 46, 35.56503101327727, 0, 126.83417412563429, 0, 0, '행운은 나의편! ', 0, NULL, 47),
	(130, '제발 이번 클스마스엔\n찐 행운이 찾아오게해주세요 🎶', '2022-11-20 16:42:11', 2, 31, 35.56503101327727, 0, 126.83417412563429, 0, 0, '소원이뤄져라얍', 0, NULL, 47),
	(131, '이 메시지를 읽고 있는 누군가에게\n올해도 너무너무 고생했어요\n잘 버텨줘서 고마워요💕\n', '2022-11-20 16:43:49', 2, 3, 35.56503101327727, 0, 126.83417412563429, 0, 0, '올해정말수고했어', 0, NULL, 47);

-- 테이블 text.report 구조 내보내기
CREATE TABLE IF NOT EXISTS `report` (
  `report_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(800) NOT NULL,
  `type` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `FKnuqod1y014fp5bmqjeoffcgqy` (`post_id`),
  CONSTRAINT `FKnuqod1y014fp5bmqjeoffcgqy` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 text.report:~0 rows (대략적) 내보내기
DELETE FROM `report`;


-- user 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `user` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `user`;

-- 테이블 user.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `userid` bigint(20) NOT NULL AUTO_INCREMENT,
  `block_cnt` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `firebase_token` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_7t1gtdow7n015rtpeib8f2k55` (`firebase_token`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 user.user:~11 rows (대략적) 내보내기
DELETE FROM `user`;
INSERT INTO `user` (`userid`, `block_cnt`, `email`, `firebase_token`, `status`, `username`) VALUES
	(43, 0, 'ilwoldeveloper@gmail.com', 'dC-GBaSq8m7QEQQjadDCJU:APA91bEPVkbqBEEeX_cdpkJ3fOqUvEfg7rr4OmBwB1Q0Y6BpEMNwDXxTTyaChPLZV_rhVxKcM0hDh9xEeB4tiUwqRy2jnIP-CZkFzP0AYv_mk2TD3rC_Yg_jQpKledmu7JdNIRcKMccx', 0, '나원경'),
	(44, 0, 'pubhan35@gmail.com', 'cT1_qK_5jD0aSCVRSSjKoC:APA91bH2IqB_f-5mBtSpcgdq53sJO6ivjvw-3QEd6GZHx3_teaLgGRgWqg4Wq3LI2T5SbA5XwJbdjGVo2081gJ0VW41GeS2s3EcXecvuI7prROu-Xk01l0jwaClwndHze7PMBKZrcNcW', 0, '나원경원경'),
	(45, 0, 'celpegor216@gmail.com', 'd6vmQwU5cLhmLdw2HAEJFx:APA91bG936_vhx6Q4VdolVMsnaBmwV2Oht6Xo3c_lVGOI_AzmfmE4JSOH5OKigYC7HLVBPchIR4w04zRTOLyKP8vGlhHImoKOZv5A3r_GT5KqOsZv156AsVOhOrxR6iAZjdH05V5glmv', 0, '조예지'),
	(46, 0, '20182177@knue.ac.kr', 'er9bxfCGiB9L-Rvevge3F_:APA91bH9PZJ6Q6fD3YdpghKUZHngEsctFFEfMy3VG8ADE0WfCTBKjTmdPPZANILG4bITav4TFNRbh0soZL4gb0A1JMzfn8s9tCSFW0N0NvrqO5NkOCmHVzQzW_jACCOqJijm1tuNX9Kh', 0, '조예지학부/중국어교육과'),
	(47, 0, 'hojinnyworld@gmail.com', '', 0, 'Hojin Jung'),
	(48, 0, 'stopone2639@gmail.com', 'dY5WC-Da94s1Ozdpet74wy:APA91bEpErnWVQhbHQNMECH7pU5ESVn95oMcCyvLZesN2yH9htTyKR0PQlsiMR8zKSi-6BtNTgzPsNTFy6UJQb2KKwICZSSk2liyXj0nEF0H7ZfBQ9L_-XtydczVpj31iY25Mmncjb-L', 0, '[7기_광주_2반_정지원]'),
	(49, 0, 'oesiu24@gmail.com', 'egDVIqk2Q6dn1pUMzDgXbA:APA91bFReozKUSQBJZ2754HWAz4_NWV5bSk6qFkBoTwH6TTsJxGFv97HBhLxvE-tmSpiRgTH9GvKNlCHbo7f4-0G3ouu0aKqiIKDogm3V4MA8gWgykR7PP5JxRjjYRaP0Yb3flXym486', 0, 'iseo yu'),
	(50, 0, 'lsj28377@gmail.com', 'cfTRXWhPv_UGTRDFR_RSS7:APA91bGQelNzUxR7UtAd-lwCT5IqYFEM54NcnV8dKbZ-7YDw531KPPN-4Oz1ZNNMz5DdWRL7f4PZRLwkLCL0Wwx_3juaf3e81eLugyQ794SVknKEk-Z3IM8bD9cso-OpERZL3O1Ehw97', 0, '이성조'),
	(51, 0, 'hojin.jung@yonsei.ac.kr', NULL, 0, '정호진(일반대학원 글로벌융합공학)'),
	(52, 0, 'jungedlin@gmail.com', 'fvMRY7UiU0alxNnsg6GltS:APA91bGrviLT3_mtIbaPnpkwmJAnm4ZIDqUvtrZCFUlivW1KbGIJXlTtbPGWvuWkivi1gSJpLEVYqo9-n4K3-toubfBL5LucQt2kAx1Jfj86IyLrSm9V0gilAPegMSrb2m3PfSgBRh-U', 0, 'Edlin Jung'),
	(53, 0, 'gj30347896@gmail.com', 'fYGx_uSt9hGvBGwIcQudZ5:APA91bGX8kuAorEhbdpenSlFYqWvfkFm9vLB6iWLnNCN6DoqOP8dEqHcNoozGarUWPjR6OxatlWzeLZJuYL4nTcxtnC4gUOvlxtqG_iVmoBgRFObUdLtiNeIHp8Z1fqDOZ6-tosrJWPO', 0, 'Tarra');


-- video 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `video` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `video`;

-- 테이블 video.likes 구조 내보내기
CREATE TABLE IF NOT EXISTS `likes` (
  `like_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `writer_id` bigint(20) DEFAULT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`like_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- 테이블 데이터 video.likes:~3 rows (대략적) 내보내기
DELETE FROM `likes`;
INSERT INTO `likes` (`like_id`, `user_id`, `writer_id`, `post_id`) VALUES
	(33, 42, 43, 63),
	(34, 45, 18, 65),
	(35, 50, 18, 65);

-- 테이블 video.post 구조 내보내기
CREATE TABLE IF NOT EXISTS `post` (
  `post_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(400) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `emoji_no` int(11) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `report_cnt` int(11) DEFAULT 0,
  `status` int(11) DEFAULT NULL,
  `title` varchar(40) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `like_cnt` int(11) NOT NULL DEFAULT 0,
  `day_type` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`post_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- 테이블 데이터 video.post:~5 rows (대략적) 내보내기
DELETE FROM `post`;
INSERT INTO `post` (`post_id`, `content`, `date`, `emoji_no`, `lat`, `lng`, `report_cnt`, `status`, `title`, `type`, `url`, `user_id`, `like_cnt`, `day_type`) VALUES
	(63, 'blob:https://k7c2091.p.ssafy.io/0ddbc5a2-2859-4eba-af74-bc62f1d96c63', '2022-11-20 10:45:25', 23, 35.1837579, 126.9251597, 0, 0, '가끔씩 하늘 보기', 2, 'dh8s0t53692ft.cloudfront.net/video/video_1_sky.mp4', 43, 1, 1),
	(65, 'blob:https://k7c2091.p.ssafy.io/c510ed4a-b4de-42d3-ad40-0d5f47fd0a69', '2022-11-20 12:05:32', 57, 37.58307418872528, 126.8818038945169, 0, 0, '내 미래도 맑음!', 2, 'dh8s0t53692ft.cloudfront.net/video/video_64_trim.F4E14CA2-4401-4A9C-B68F-9FD6FAA7CE27.MOV', 18, 2, 2),
	(66, 'blob:https://k7c2091.p.ssafy.io/d7f02de4-88a0-437a-90cb-009a816b75c0', '2022-11-20 13:58:59', 28, 37.52989953956517, 126.96462003118633, 0, 0, '노을지는 서울', 2, 'dh8s0t53692ft.cloudfront.net/video/video_66_trim.E55E4F26-EDA0-48DE-947A-C288A14E7638.MOV', 47, 0, 2),
	(67, 'blob:https://k7c2091.p.ssafy.io/8c8d3dc8-ca5a-4fd6-bcf9-96d1f0b94910', '2022-11-20 16:09:02', 57, 35.97324167585928, 126.9471569456646, 0, 0, '언제나맑음', 2, 'dh8s0t53692ft.cloudfront.net/video/video_67_trim.05CDCF81-8AD0-4EE9-A6C6-961B9BEAA6B0.MOV', 51, 0, 2),
	(68, 'blob:https://k7c2091.p.ssafy.io/78b2e083-53ec-48d1-b9ec-2d85e140627e', '2022-11-20 16:12:17', 34, 35.951562013592714, 126.94864591306323, 0, 0, '익산에 지니다녀감', 2, 'dh8s0t53692ft.cloudfront.net/video/video_68_69062109865__4659907C-9504-4FE5-AE98-F4E85E549251.MOV', 51, 0, 2);

-- 테이블 video.report 구조 내보내기
CREATE TABLE IF NOT EXISTS `report` (
  `report_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `type` tinyint(4) DEFAULT NULL,
  `content` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`report_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- 테이블 데이터 video.report:~0 rows (대략적) 내보내기
DELETE FROM `report`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
