package com.ssafy.inflearnthejavatest;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.extension.ParameterContext;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.aggregator.AggregateWith;
import org.junit.jupiter.params.aggregator.ArgumentsAccessor;
import org.junit.jupiter.params.aggregator.ArgumentsAggregationException;
import org.junit.jupiter.params.aggregator.ArgumentsAggregator;
import org.junit.jupiter.params.converter.ArgumentConversionException;
import org.junit.jupiter.params.converter.ConvertWith;
import org.junit.jupiter.params.converter.SimpleArgumentConverter;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import java.time.Duration;
import java.util.function.Supplier;

import static org.junit.jupiter.api.Assertions.*;

// 테스트 이름의 언더바를 공백으로 치환
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
/*
테스트 인스턴스를 하나만 생성 -> beforeAll, afterAll 메서드 static으로 선언할 필요가 없음
(default: 테스트마다 각각 다른 인스턴스 -> 테스트 간의 의존성을 낮추기 위해)
*/
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class) // Test에 Order 어노테이션으로 실행 순서 지정
//@ExtendWith(FindSlowTestExtension.class) // 선언적으로 Extension 등록
class StudyTest {

    @RegisterExtension // 프로그래밍적으로 Extension 등록
    FindSlowTestExtension findSlowTestExtension = new FindSlowTestExtension(1000L);

    @Test
    //    @Disabled // 테스트 비활성화
    @DisplayName("스터디 만들기 \uD83D\uDE31")
    void create_new_study() {
        Study study = new Study(-10);

        assertAll(
                () -> assertNotNull(study),
                () -> assertEquals(StudyStatus.DRAFT, study.getStatus(), () -> "스터디를 처음 만들면 DRAFT 상태다."),
                // 람다식을 사용하는 이유 : 문자열 연산을 필요할 때(테스트 실패했을 때)만 한다. 문자열 연산 비용이 적어져 성능이 최적화
                () -> assertTrue(study.getLimit() > 0, "스터디 최대 참석 가능 인원은 0보다 커야 한다.")
        );
    }

    @Test
    @DisplayName("에러 발생 확인")
    void check_exception() {
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> new Study(-10));
        assertEquals("limit은 0보다 커야 한다.", exception.getMessage());
    }

    @Test
    @DisplayName("지정 시간 안에 실행되는지 확인")
    void check_time() {
        assertTimeout(Duration.ofMillis(100), () -> {
            new Study(10);
            Thread.sleep(50);
        });

        // 100ms 안에 실행 안되면 100ms에 바로 실행 종료
        assertTimeoutPreemptively(Duration.ofMillis(100), () -> {
            new Study(10);
            Thread.sleep(300);
        });
    }

//    @Test
//    @Tag("fast")
    @FastTest
    @DisplayName("스터디 만들기 fast")
    @Order(3)
    void create_new_study_again() {
        System.out.println(this);
        System.out.println("create1");
        System.out.println("value: " + value++);
    }

    int value = 0;

    @Test
//    @Tag("slow")
//    @SlowTest
    @DisplayName("스터디 만들기 slow")
    @Order(2)
    void create_new_study_again_again() throws InterruptedException {
        Thread.sleep(1005L);
        System.out.println(this); // 테스트마다 각각 다른 인스턴스 -> 테스트 간의 의존성을 낮추기 위해
        System.out.println("create2");
        System.out.println("value: " + value++);
    }

    @DisplayName("스터디 만들기")
    @RepeatedTest(value = 10, name = "{displayName}, {currentRepetition}/{totalRepetitions}")
    @Order(1)
    void repeatTest(RepetitionInfo repetitionInfo) {
        System.out.println("test " + repetitionInfo.getCurrentRepetition() + "/" + repetitionInfo.getTotalRepetitions());
    }

    @DisplayName("스터디 만들기")
    @ParameterizedTest(name = "{index} {displayName} message={0}")
    @ValueSource(ints = {10, 20, 40})
//    @NullAndEmptySource
    void parameterizedTest1(@ConvertWith(StudyConverter.class) Study study) {
        System.out.println(study.getLimit());
    }

    static class StudyConverter extends SimpleArgumentConverter {

        protected Object convert(Object source, Class<?> targetType) throws ArgumentConversionException {
            assertEquals(Study.class, targetType, "Can only convert to Study");
            return new Study(Integer.parseInt(source.toString()));
        }
    }

    @DisplayName("스터디 만들기")
    @ParameterizedTest(name = "{index} {displayName} message={0}")
    @CsvSource({"10, '자바 스터디'", "20, 스프링"})
    void parameterizedTest2(@AggregateWith(StudyAggregator.class) Study study) {
//        Study study = new Study(limit, name); // 파라미터가 (Integer limit, String name) 일 때
//        Study study = new Study(argumentsAccessor.getInteger(0), argumentsAccessor.getString(1)); // 파라미터가 (ArgumentsAccessor argumentsAccessor) 일 때
        System.out.println(study.toString());
    }

    // 반드시 static inner class 이거나 public class 이어야 함
    static class StudyAggregator implements ArgumentsAggregator {

        @Override
        public Object aggregateArguments(ArgumentsAccessor accessor, ParameterContext context) throws ArgumentsAggregationException {
            return new Study(accessor.getInteger(0), accessor.getString(1));
        }
    }



    @BeforeAll
    static void beforeAll() {
        System.out.println("before all");
    }

    @AfterAll
    static void afterAll() {
        System.out.println("after all");
    }

    @BeforeEach
    void beforeEach() {
        System.out.println("before each");
    }

    @AfterEach
    void afterEach() {
        System.out.println("after each");
    }

}