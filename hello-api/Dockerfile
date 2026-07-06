FROM golang:1.25-alpine AS builder

WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY . .

RUN go build -o server ./...

FROM alpine:3.21

WORKDIR /app

COPY --from=builder /app/server .

EXPOSE 9090

ENTRYPOINT ["./server"]
