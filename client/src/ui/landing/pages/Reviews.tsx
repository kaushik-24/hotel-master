import axiosInstance from "@services/instance";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

interface ReviewsResponse {
  reviews: Review[];
  rating: number;
  totalReviews: number;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const maxStars = 5;
  const filledStars = Math.round(rating); // Round rating to nearest integer
  return (
    <span className="flex items-center text-sm sm:text-base">
      {[...Array(maxStars)].map((_, index) => (
        <span
          key={index}
          className={index < filledStars ? "text-yellow-200" : "text-black"}
        >
          {index < filledStars ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
};

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/reviews");
        console.log("Reviews API response:", response.data);
        const { reviews, rating, totalReviews } = response.data.data;
        if (Array.isArray(reviews)) {
          setReviews(reviews.slice(0, 5)); // Limit to 5 reviews
          setRating(rating);
          setTotalReviews(totalReviews);
          setError(null);
        } else {
          throw new Error("Unexpected reviews data format");
        }
      } catch (error: any) {
        console.error("Error fetching reviews:", error);
        setError(error.message || "Failed to load reviews");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // react-slick settings
  const sliderSettings = {
    dots: true,
    infinite: reviews.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Auto-scroll every 5 seconds
    arrows: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#5b3423] to-[#ffeedc] py-8 sm:py-12 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-poppins text-[12px] sm:text-[14px] md:text-[16px] text-[#ffeedc] uppercase tracking-widest mb-4">
            Guest Reviews
          </h1>
          <p className="font-nanum text-[28px] sm:text-[36px] md:text-[48px] lg:text-[55px] text-[#5b3423] leading-tight">
            Hear What Our Guests Say About Us
          </p>
        </div>

        {error && (
          <div className="text-center mb-8 text-red-600 font-semibold text-sm sm:text-base">
            {error}
          </div>
        )}
        {loading ? (
          <div className="text-center mb-8 text-[#5b3423] font-semibold text-sm sm:text-base animate-pulse">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center mb-8 text-[#5b3423] font-semibold text-sm sm:text-base">
            No reviews available yet. Be the first to share your experience!
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {reviews.map((review, index) => (
              <div key={index} className="px-2">
                <div className="p-4 mb-5 mt-4 sm:p-6 rounded-xl shadow-sm shadow-black border-l-4 border-b-8 border-[#5b3423] min-h-[200px] sm:min-h-[240px] flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base sm:text-lg font-semibold text-[#5b3423] truncate">
                      {review.author_name}
                    </h2>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base mb-2 line-clamp-4 flex-grow">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Reviews;
