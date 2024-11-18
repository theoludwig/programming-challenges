FROM openjdk:21 AS builder
WORKDIR /usr/src/application
COPY ./ ./
RUN javac Solution.java
RUN jar cfe solution.jar Solution *.class

FROM gcr.io/distroless/java21-debian12:latest AS runner
WORKDIR /usr/src/application
COPY --from=builder /usr/src/application/solution.jar ./
CMD ["./solution.jar"]
