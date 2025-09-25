package services

import (
	"ReviewService/db/repositories"
	"ReviewService/dto"
	"ReviewService/models"
	"fmt"
	"strconv"
)

type ReviewService interface {
	GetReviewById(id string) (*models.Review, error)
	CreateReview(payload *dto.CreateReviewRequest) (*models.Review, error)
	UpdateReview(id string, payload *dto.UpdateReviewRequest) (*models.Review, error)
	DeleteReview(id string) error
	GetAllReviews() ([]*models.Review, error)
	GetReviewsByUserId(userId string) ([]*models.Review, error)
	GetReviewsByHotelId(hotelId string) ([]*models.Review, error)
	GetReviewsByBookingId(bookingId string) (*models.Review, error)
}

type ReviewServiceImpl struct {
	reviewRepo repositories.ReviewRepository
}

func NewReviewService(_reviewRepo repositories.ReviewRepository) ReviewService {
	return &ReviewServiceImpl{
		reviewRepo: _reviewRepo,
	}
}

func (s *ReviewServiceImpl) GetReviewById(id string) (*models.Review, error) {
	idInt, err := strconv.ParseInt(id, 10, 64)

	if err != nil {
		fmt.Println("Error parsing ID:", err)
		return nil, err
	}

	return s.reviewRepo.GetById(idInt)
}

func (s *ReviewServiceImpl) CreateReview(payload *dto.CreateReviewRequest) (*models.Review, error) {

	userId := payload.UserId
	bookingId := payload.BookingId
	hotelId := payload.HotelId
	comment := payload.Comment
	rating := payload.Rating

	return s.reviewRepo.Create(userId, bookingId, hotelId, comment, rating)
}

func (s *ReviewServiceImpl) UpdateReview(id string, payload *dto.UpdateReviewRequest) (*models.Review, error) {
	idInt, err := strconv.ParseInt(id, 10, 64)

	if err != nil {
		fmt.Println("Error parsing ID:", err)
		return nil, err
	}

	comment := payload.Comment
	rating := payload.Rating

	return s.reviewRepo.Update(idInt, comment, rating)
}

func (s *ReviewServiceImpl) DeleteReview(id string) error {
	idInt, err := strconv.ParseInt(id, 10, 64)

	if err != nil {
		fmt.Println("Error parsing ID:", err)
		return err
	}

	return s.reviewRepo.Delete(idInt)
}

func (s *ReviewServiceImpl) GetAllReviews() ([]*models.Review, error) {
	return s.reviewRepo.GetAll()
}

func (s *ReviewServiceImpl) GetReviewsByUserId(userId string) ([]*models.Review, error) {
	userIdInt, err := strconv.ParseInt(userId, 10, 64)

	if err != nil {
		fmt.Println("Error parsing User ID:", err)
		return nil, err
	}

	return s.reviewRepo.GetByUserId(userIdInt)
}

func (s *ReviewServiceImpl) GetReviewsByHotelId(hotelId string) ([]*models.Review, error) {
	hotelIdInt, err := strconv.ParseInt(hotelId, 10, 64)

	if err != nil {
		fmt.Println("Error parsing Hotel ID:", err)
		return nil, err
	}

	return s.reviewRepo.GetByHotelId(hotelIdInt)
}

func (s *ReviewServiceImpl) GetReviewsByBookingId(bookingId string) (*models.Review, error) {
	bookingIdInt, err := strconv.ParseInt(bookingId, 10, 64)

	if err != nil {
		fmt.Println("Error parsing Booking ID:", err)
		return nil, err
	}
	return s.reviewRepo.GetByBookingId(bookingIdInt)
}
