package main

import "ReviewService/app"

func main() {
	cfg := app.NewConfig()
	app := app.NewApplication(cfg)

	app.Run()
}
