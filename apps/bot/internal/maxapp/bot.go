package maxapp

import (
	"context"
	"errors"
	"fmt"
	"log/slog"

	maxbot "github.com/max-messenger/max-bot-api-client-go"
	"github.com/max-messenger/max-bot-api-client-go/schemes"
	"backmaxbot/internal/config"
)

type Bot struct {
	api *maxbot.Api
	cfg config.Config
}

func New(cfg config.Config) (*Bot, error) {
	api, err := maxbot.New(cfg.Token)
	if err != nil {
		return nil, fmt.Errorf("init max bot client: %w", err)
	}

	return &Bot{
		api: api,
		cfg: cfg,
	}, nil
}

func (b *Bot) Run(ctx context.Context) error {
	updates := b.api.GetUpdates(ctx)

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case upd, ok := <-updates:
			if !ok {
				return errors.New("updates channel closed")
			}
			b.handleUpdate(ctx, upd)
		}
	}
}

func (b *Bot) handleUpdate(ctx context.Context, raw schemes.UpdateInterface) {
	slog.Info(
		"received update",
		"type", raw.GetUpdateType(),
		"chat_id", raw.GetChatID(),
		"user_id", raw.GetUserID(),
	)
	switch raw.(type) {
	case *schemes.BotStartedUpdate, *schemes.MessageCreatedUpdate:
		b.sendGreeting(ctx, raw.GetChatID(), raw.GetUserID())
	default:
		slog.Debug("skip update", "type", raw.GetUpdateType())
	}
}

func (b *Bot) sendGreeting(ctx context.Context, chatID, userID int64) {
	msg := maxbot.NewMessage().SetText(b.cfg.GreetingText)

	switch {
	case chatID != 0:
		msg.SetChat(chatID)
	case userID != 0:
		msg.SetUser(userID)
	default:
		return
	}

	if _, err := b.api.Messages.Send(ctx, msg); err != nil {
		b.logSendError(err, chatID, userID)
	}
}

func (b *Bot) logSendError(err error, chatID, userID int64) {
	fields := []any{
		"error", err,
		"error_type", fmt.Sprintf("%T", err),
		"chat_id", chatID,
		"user_id", userID,
	}

	var apiErr *schemes.Error
	if errors.As(err, &apiErr) && apiErr != nil {
		fields = append(fields,
			"code", apiErr.Code,
			"server_text", apiErr.ErrorText,
		)
		if apiErr.Message.Body.Text != "" {
			fields = append(fields, "server_message", apiErr.Message.Body.Text)
		}
	}

	slog.Error("failed to send greeting", fields...)
}
