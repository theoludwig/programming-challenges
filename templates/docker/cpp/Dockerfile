FROM gcc:11.3.0

WORKDIR /usr/app
COPY ./ /usr/app
RUN g++ ./*.cpp* -o solution.exe -Wall -Wextra -Wfloat-equal -Wundef -Werror -std=c++17 -pedantic -pedantic-errors

CMD ["./solution.exe"]
