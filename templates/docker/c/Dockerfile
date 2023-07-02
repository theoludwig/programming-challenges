FROM gcc:12.3.0-bullseye AS builder
WORKDIR /usr/src/application
COPY ./ ./
RUN gcc ./*.c* -o solution -Wall -Wextra -Wfloat-equal -Wundef -Werror -std=c17 -pedantic -pedantic-errors -O3

FROM gcr.io/distroless/cc-debian11:latest AS runner
WORKDIR /usr/src/application
COPY --from=builder /usr/src/application/solution ./
CMD ["./solution"]
