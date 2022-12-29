FROM dart:2.18.6 AS builder
WORKDIR /usr/src/application
COPY ./ ./
RUN dart compile exe solution.dart -o solution

FROM scratch AS runner
WORKDIR /usr/src/application
COPY --from=builder /runtime/ /
COPY --from=builder /usr/src/application/solution ./
CMD ["./solution"]
