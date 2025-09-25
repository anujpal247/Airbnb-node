package repositories

import (
	"ReviewService/models"
	"database/sql"
	"fmt"
)

type ReviewRepository interface {
	GetById(id int64) (*models.Review, error)
	Create(userId int64, bookingId int64, hotelId int64, comment string, rating int) (*models.Review, error)
	Update(id int64, comment string, rating int) (*models.Review, error)
	Delete(id int64) error
	GetAll() ([]*models.Review, error)
	GetByUserId(userId int64) ([]*models.Review, error)
	GetByHotelId(hotelId int64) ([]*models.Review, error)
	GetByBookingId(bookingId int64) (*models.Review, error)
}

type ReviewRepositoryImpl struct {
	db *sql.DB
}

func NewReviewRepository(_db *sql.DB) ReviewRepository {
	return &ReviewRepositoryImpl{
		db: _db,
	}
}

// Implement the methods of ReviewRepository interface here

func (r *ReviewRepositoryImpl) GetById(id int64) (*models.Review, error) {
	// Implementation here
	query := "SELECT id, user_id, booking_id, hotel_id, comment, rating, created_at, updated_at, deleted_at, is_synced FROM reviews WHERE id = ?"
	row := r.db.QueryRow(query, id)

	review := &models.Review{}

	err := row.Scan(&review.Id, &review.UserId, &review.BookingId, &review.HotelId, &review.Comment, &review.Rating, &review.CreatedAt, &review.UpdatedAt, &review.DeletedAt, &review.IsSynced)

	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No review found with the given ID")
			return nil, err // No review found
		}
		fmt.Println("Error scanning review:", err)
		return nil, err
	}

	return review, nil
}

func (r *ReviewRepositoryImpl) Create(userId int64, bookingId int64, hotelId int64, comment string, rating int) (*models.Review, error) {

	query := "INSERT INTO reviews (user_id, booking_id, hotel_id, comment, rating is_synced) VALUES (?, ?, ?, ?, ?, ?)"

	result, err := r.db.Exec(query, userId, bookingId, hotelId, comment, rating, false)

	if err != nil {
		fmt.Println("Error inserting review:", err)
		return nil, err
	}

	insertedId, err := result.LastInsertId()
	if err != nil {
		fmt.Println("Error getting last insert ID:", err)
		return nil, err
	}

	review := &models.Review{
		Id:        insertedId,
		UserId:    userId,
		BookingId: bookingId,
		HotelId:   hotelId,
		Comment:   comment,
		Rating:    rating,
		IsSynced:  false,
	}

	fmt.Println("Review created successfully with ID:", insertedId)
	return review, nil
}

func (r *ReviewRepositoryImpl) Update(id int64, comment string, rating int) (*models.Review, error) {

	query := "UPDATE reviews SET comment = ?, rating = ?, is_synced = ? WHERE id = ?"

	_, err := r.db.Exec(query, comment, rating, false, id)

	if err != nil {
		fmt.Println("Error updating review:", err)
		return nil, err
	}

	// Fetch the updated review to return
	review, err := r.GetById(id)
	if err != nil {
		fmt.Println("Error fetching updated review:", err)
		return nil, err
	}

	review.IsSynced = false // Mark as not synced after update

	fmt.Println("Review updated successfully with ID:", id)
	return review, nil
}

func (r *ReviewRepositoryImpl) Delete(id int64) error {
	query := "DELETE FROM reviews WHERE id = ?"

	_, err := r.db.Exec(query, id)

	if err != nil {
		fmt.Println("Error deleting review:", err)
		return err
	}
	fmt.Println("Review deleted successfully with ID:", id)
	return nil
}

func (r *ReviewRepositoryImpl) GetAll() ([]*models.Review, error) {
	query := "SELECT id, user_id, booking_id, hotel_id, comment, rating, created_at, updated_at, deleted_at, is_synced FROM reviews"

	rows, err := r.db.Query(query)

	if err != nil {
		fmt.Println("Error querying reviews:", err)
		return nil, err
	}
	defer rows.Close()

	var reviews []*models.Review

	for rows.Next() {
		review := &models.Review{}
		err := rows.Scan(&review.Id, &review.UserId, &review.BookingId, &review.HotelId, &review.Comment, &review.Rating, &review.CreatedAt, &review.UpdatedAt, &review.DeletedAt, &review.IsSynced)

		if err != nil {
			fmt.Println("Error scanning review:", err)
			return nil, err
		}
		reviews = append(reviews, review)

	}
	if err = rows.Err(); err != nil {
		fmt.Println("Error iterating over reviews:", err)
		return nil, err
	}
	fmt.Println("Fetched all reviews successfully")
	return reviews, nil
}

func (r *ReviewRepositoryImpl) GetByUserId(userId int64) ([]*models.Review, error) {
	query := "SELECT id, user_id, booking_id, hotel_id, comment, rating, created_at, updated_at, deleted_at, is_synced FROM reviews WHERE user_id = ?"

	rows, err := r.db.Query(query, userId)

	if err != nil {
		fmt.Println("Error querying reviews by user ID:", err)
		return nil, err
	}
	defer rows.Close()

	var reviews []*models.Review

	for rows.Next() {
		review := &models.Review{}
		err := rows.Scan(&review.Id, &review.UserId, &review.BookingId, &review.HotelId, &review.Comment, &review.Rating, &review.CreatedAt, &review.UpdatedAt, &review.DeletedAt, &review.IsSynced)
		if err != nil {
			fmt.Println("Error scanning review:", err)
			return nil, err
		}
		reviews = append(reviews, review)

	}
	if err = rows.Err(); err != nil {
		fmt.Println("Error iterating over reviews:", err)
		return nil, err
	}
	fmt.Println("Fetched reviews by user ID successfully")
	return reviews, nil
}

func (r *ReviewRepositoryImpl) GetByHotelId(hotelId int64) ([]*models.Review, error) {
	query := "SELECT id, user_id, booking_id, hotel_id, comment, rating, created_at, updated_at, deleted_at, is_synced FROM reviews WHERE hotel_id = ?"

	rows, err := r.db.Query(query, hotelId)

	if err != nil {
		fmt.Println("Error querying reviews by hotel ID:", err)
		return nil, err
	}
	defer rows.Close()

	var reviews []*models.Review

	for rows.Next() {
		review := &models.Review{}
		err := rows.Scan(&review.Id, &review.UserId, &review.BookingId, &review.HotelId, &review.Comment, &review.Rating, &review.CreatedAt, &review.UpdatedAt, &review.DeletedAt, &review.IsSynced)
		if err != nil {
			fmt.Println("Error scanning review:", err)
			return nil, err
		}
		reviews = append(reviews, review)

	}
	if err = rows.Err(); err != nil {
		fmt.Println("Error iterating over reviews:", err)
		return nil, err
	}
	fmt.Println("Fetched reviews by hotel ID successfully")
	return reviews, nil
}

func (r *ReviewRepositoryImpl) GetByBookingId(bookingId int64) (*models.Review, error) {
	query := "SELECT id, user_id, booking_id, hotel_id, comment, rating, created_at, updated_at, deleted_at, is_synced FROM reviews WHERE booking_id = ?"

	row := r.db.QueryRow(query, bookingId)
	review := &models.Review{}

	err := row.Scan(&review.Id, &review.UserId, &review.BookingId, &review.HotelId, &review.Comment, &review.Rating, &review.CreatedAt, &review.UpdatedAt, &review.DeletedAt, &review.IsSynced)

	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("No review found with the given booking ID")
			return nil, err // No review found
		}
		fmt.Println("Error scanning review:", err)
		return nil, err
	}
	fmt.Println("Fetched review by booking ID successfully")
	return review, nil
}
