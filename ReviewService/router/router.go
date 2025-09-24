package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type Router interface {
	Register(r chi.Router)
}

func SetupRouter() *chi.Mux {
	chiRouter := chi.NewRouter()
	// buit-in middleware for logging requests
	chiRouter.Use(middleware.Logger)

	chiRouter.Get("/ping", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("pong"))
	})

	return chiRouter
}
