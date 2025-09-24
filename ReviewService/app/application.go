package app

import (
	"ReviewService/router"
	"fmt"
	"net/http"
	"time"
)

type Config struct {
	Addr string
}

type Application struct {
	Config Config
}

func NewConfig() Config {
	return Config{
		Addr: ":8080",
	}
}

func NewApplication(config Config) *Application {
	return &Application{
		Config: config,
	}
}

func (a *Application) Run() error {
	server := &http.Server{
		Addr:         a.Config.Addr,
		Handler:      router.SetupRouter(), // TODO add handler
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Println("app is running on port", a.Config.Addr)

	return server.ListenAndServe()
}
