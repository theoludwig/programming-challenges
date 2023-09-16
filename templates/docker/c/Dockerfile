FROM gcc:13.2.0-bookworm AS builder
WORKDIR /usr/src/application
COPY ./ ./
RUN gcc ./*.c* -o solution -Wall -Wextra -Wfloat-equal -Wundef -Werror -std=c17 -pedantic -pedantic-errors -O3

FROM gcr.io/distroless/cc-debian12:latest AS runner
WORKDIR /usr/src/application
COPY --from=builder /usr/src/application/solution ./
CMD ["./solution"]
