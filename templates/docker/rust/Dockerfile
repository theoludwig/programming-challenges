FROM rust:1.86.0 AS builder
WORKDIR /usr/src/rust_application

# Cache dependencies
RUN cargo init --bin ./
COPY ./Cargo.* ./
RUN cargo build --release && rm --recursive --force ./src ./target/release/deps/rust_application*

# Build application
COPY ./ ./
RUN cargo build --release

FROM gcr.io/distroless/cc-debian12:latest AS runner
WORKDIR /usr/src/rust_application
COPY --from=builder /usr/src/rust_application/target/release/rust_application ./
CMD ["./rust_application"]
