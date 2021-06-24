FROM mcr.microsoft.com/dotnet/sdk:5.0
WORKDIR /usr/src/app
COPY ./ ./
RUN dotnet restore
ENTRYPOINT ["dotnet", "run"]
