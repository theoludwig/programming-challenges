FROM gcc:12.4.0-bookworm AS builder
WORKDIR /usr/src/application
COPY ./ ./
RUN g++ ./*.cpp* -o solution -Wall -Wextra -Wfloat-equal -Wundef -Werror -std=c++17 -pedantic -pedantic-errors -O3

FROM gcr.io/distroless/cc-debian12:latest AS runner
WORKDIR /usr/src/application
COPY --from=builder /usr/src/application/solution ./
CMD ["./solution"]
