"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GoogleReviewsLiveProps {
  placeId: string;
  maxReviews?: number;
  className?: string;
}

export function GoogleReviewsLive({ 
  placeId, 
  maxReviews = 5, 
  className = "" 
}: GoogleReviewsLiveProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [placeId]);

  useEffect(() => {
    if (reviews.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [reviews.length]);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/google-reviews?placeId=${placeId}&maxReviews=${maxReviews}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <RefreshCw className="h-8 w-8 text-brand-primary animate-spin" />
        <span className="ml-2 text-gray-600">Loading reviews...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <AlertCircle className="h-8 w-8 text-red-500" />
        <div className="ml-2">
          <p className="text-red-600 font-medium">Failed to load reviews</p>
          <Button 
            onClick={fetchReviews} 
            variant="outline" 
            size="sm" 
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <p className="text-gray-600">No reviews available</p>
      </div>
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Latest Google Reviews</h3>
        <Button
          onClick={fetchReviews}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Current Review */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {/* Review Text */}
        <blockquote className="text-gray-700 leading-relaxed text-lg">
          "{currentReview.text}"
        </blockquote>

        {/* Rating */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star}
              className={`h-5 w-5 ${
                star <= currentReview.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">
            {currentReview.rating}/5
          </span>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          {currentReview.profile_photo_url && (
            <img
              src={currentReview.profile_photo_url}
              alt={currentReview.author_name}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">
              {currentReview.author_name}
            </p>
            <p className="text-sm text-gray-600">
              {currentReview.relative_time_description} • Google Reviews
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation Dots */}
      {reviews.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-brand-primary'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500">
          Showing {reviews.length} of latest reviews from Google
        </p>
      </div>
    </div>
  );
}
