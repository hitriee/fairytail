FROM adoptopenjdk/openjdk11
CMD ["./mvnw", "clean", "package"]
ARG JAR_FILE_PATH=target/img-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE_PATH} img.jar
ENTRYPOINT ["java", "-jar", "img.jar"]