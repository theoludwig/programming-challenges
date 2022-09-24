FROM rust:1.64.0

WORKDIR /usr/app
COPY ./ /usr/app
RUN rustc -C debuginfo=0 -C opt-level=3 -C target-cpu=native solution.rs

CMD ["./solution"]
