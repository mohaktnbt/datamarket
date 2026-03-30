FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod go.sum* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /transcoding .

FROM alpine:3.21
RUN apk --no-cache add ca-certificates ffmpeg
COPY --from=builder /transcoding /transcoding
EXPOSE 8081
CMD ["/transcoding"]
