FROM gcc:12.2.0

WORKDIR /usr/app
COPY ./ /usr/app
RUN g++ ./*.cpp* -o solution.exe -Wall -Wextra -Wfloat-equal -Wundef -Werror -std=c++17 -pedantic -pedantic-errors -O3

CMD ["./solution.exe"]
