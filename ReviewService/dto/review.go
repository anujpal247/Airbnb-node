package dto

type CreateReviewRequest struct {
	UserId    int64  `json:"user_id" validate:"required"`
	BookingId int64  `json:"booking_id" validate:"required"`
	HotelId   int64  `json:"hotel_id" validate:"required"`
	Comment   string `json:"comment" validate:"required"`
	Rating    int    `json:"rating" validate:"required,min=1,max=5"`
}

type UpdateReviewRequest struct {
	Comment string `json:"comment" validate:"required"`
	Rating  int    `json:"rating" validate:"required,min=1,max=5"`
}

type ReviewResponse struct {
	ID        int64   `json:"id"`
	UserId    int64   `json:"user_id"`
	BookingId int64   `json:"booking_id"`
	HotelId   int64   `json:"hotel_id"`
	Comment   string  `json:"comment"`
	Rating    int     `json:"rating"`
	CreatedAt string  `json:"created_at"`
	UpdatedAt string  `json:"updated_at"`
	DeletedAt *string `json:"deleted_at,omitempty"`
	IsSynced  bool    `json:"is_synced"`
}
