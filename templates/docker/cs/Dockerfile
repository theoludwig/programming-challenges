FROM mono:6.12.0
WORKDIR /usr/src/application
COPY ./ ./
RUN mcs ./Solution.cs -out:Solution.exe
ENTRYPOINT ["mono", "./Solution.exe"]
