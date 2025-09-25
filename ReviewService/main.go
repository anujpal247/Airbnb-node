package main

import (
	"ReviewService/app"
	"ReviewService/config/env"
)

func main() {

	env.Load()

	cfg := app.NewConfig()
	app := app.NewApplication(cfg)

	app.Run()
}
