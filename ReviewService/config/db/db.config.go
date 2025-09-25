package db

import (
	"ReviewService/config/env"
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

func SetupDB() (*sql.DB, error) {
	cfg := mysql.NewConfig()

	cfg.User = env.GetString("DB_USER", "root")
	cfg.Passwd = env.GetString("DB_PASSWORD", "")
	cfg.DBName = env.GetString("DB_NAME", "reviews")
	cfg.Addr = env.GetString("DB_ADDR", "localhost:3306")
	cfg.Net = env.GetString("DB_NET", "tcp")

	fmt.Println("connecting to db with config: ", cfg.FormatDSN())

	db, err := sql.Open("mysql", cfg.FormatDSN())

	if err != nil {
		fmt.Println("error connecting to db: ", err)
		return nil, err
	}
	defer db.Close()

	pingErr := db.Ping()

	if pingErr != nil {
		fmt.Println("error pinging db: ", pingErr)
		return nil, pingErr
	}

	fmt.Println("connected to db with db name: ", cfg.DBName)
	return db, nil
}
