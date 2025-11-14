package config

import (
	"fmt"
	"os"
	"strings"
)

const (
	tokenEnv       = "MAX_BOT_TOKEN"
	greetingEnv    = "MAX_BOT_GREETING"
	defaultMessage = "Привет, запускай скорее мини приложение ниже"
)

type Config struct {
	Token        string
	GreetingText string
}

func Load() (Config, error) {
	token := strings.TrimSpace(os.Getenv(tokenEnv))
	if token == "" {
		return Config{}, fmt.Errorf("%s is not set", tokenEnv)
	}

	return Config{
		Token:        token,
		GreetingText: getOrDefault(greetingEnv, defaultMessage),
	}, nil
}

func getOrDefault(key, fallback string) string {
	if value := strings.TrimSpace(os.Getenv(key)); value != "" {
		return value
	}
	return fallback
}
