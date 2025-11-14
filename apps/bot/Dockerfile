FROM golang:1.23-alpine AS builder
WORKDIR /src

COPY apps/bot/go.mod apps/bot/go.sum ./
RUN go env -w GO111MODULE=on && go mod download

COPY apps/bot/ ./
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /bin/maxbot ./cmd/maxbot

FROM alpine:3.20
RUN adduser -D maxbot
USER maxbot
WORKDIR /home/maxbot
COPY --from=builder /bin/maxbot /usr/local/bin/maxbot

CMD ["maxbot"]
