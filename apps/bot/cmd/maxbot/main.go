package main

import (
	"context"
	"errors"
	"log"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/joho/godotenv"

	"backmaxbot/internal/config"
	"backmaxbot/internal/maxapp"
)

func main() {
	loadEnv()

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("config error: %v", err)
	}

	if masked := maskToken(cfg.Token); masked != "" {
		slog.Info("bot token loaded", "token_masked", masked)
	}
	slog.Info("bot greeting loaded", "greeting", cfg.GreetingText)

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	bot, err := maxapp.New(cfg)
	if err != nil {
		log.Fatalf("cannot start bot: %v", err)
	}

	slog.Info("MAX bot is running")

	if err := bot.Run(ctx); err != nil && !errors.Is(err, context.Canceled) {
		log.Fatalf("bot stopped with error: %v", err)
	}

	slog.Info("MAX bot stopped")
}

func maskToken(token string) string {
	if token == "" {
		return ""
	}
	if len(token) <= 8 {
		return token[:1] + "..." + token[len(token)-1:]
	}
	return token[:4] + "..." + token[len(token)-4:]
}

func loadEnv() {
	paths := []string{"../../.env", "../.env", ".env"}
	for _, path := range paths {
		if _, err := os.Stat(path); err == nil {
			if err := godotenv.Overload(path); err == nil {
				slog.Info("env loaded", "path", path)
				return
			}
		}
	}
	slog.Warn("env file not found, relying on process environment")
}
