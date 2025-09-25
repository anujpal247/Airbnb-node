MIGRATIONS_FOLDER=db/migrations 
DB_URL=root@tcp(127.0.0.1:3306)/Airbnb_ReviewService

# Create new migration
migrate-create: # gmake migrate-create name="create_users_table"
	goose -dir $(MIGRATIONS_FOLDER) create $(name) sql

# Apply all up migrations
migrate-up:	# gmake migrate-up
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)" up

# Apply all down migrations
migrate-down: # gmake migrate-down
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)" down

# Rollback all migrations and reset database
migrate-reset: # gmake migrate-reset
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)" reset

# show current migration status
migrate-status: # gmake migrate-status
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)" status

# Redo last migration (down then up)
migrate-redo: # gmake migrate-redo
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)" redo

# Migrate to a specific version
migrate-to: # gmake migrate-to version=2
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)" up-to $(version)

# Migrate down to a specific version
migrate-down-to: # gmake migrate-down-to version=2
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)" down-to $(version)

# Force a specific migration version (useful for fixing issues)
migrate-force: # gmake migrate-force version=2
	goose -dir $(MIGRATIONS_FOLDER) mysql "$(DB_URL)" force $(version)

# Show help for goose commands
migrate-help:	# gmake migrate-help
	goose -h