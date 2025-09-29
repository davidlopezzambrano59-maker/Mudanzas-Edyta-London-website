"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GoogleReviewsWidgetProps {
  placeId?: string;
  businessName?: string;
  googleMapsUrl?: string;
}

export function GoogleReviewsWidget({ 
  placeId, 
  businessName = "Mudanzas Edyta London",
  googleMapsUrl = "https://www.google.com/maps/place/your-business-url"
}: GoogleReviewsWidgetProps) {
  const [averageRating, setAverageRating] = useState(5.0);
  const [totalReviews, setTotalReviews] = useState(25); // Update with your actual count

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-brand-primary max-w-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-600 rounded-lg p-2">
          <svg className="h-6 w-6 text-white" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.405.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.358-.719-.358-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.99 3.992-.281 1.188.596 2.16 1.769 2.16 2.125 0 3.757-2.24 3.757-5.478 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 01.083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Google Reviews</h3>
          <p className="text-sm text-gray-600">{businessName}</p>
        </div>
      </div>

      {/* Rating Display */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl font-bold text-gray-900">{averageRating}</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`h-5 w-5 ${
                  star <= averageRating 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Based on {totalReviews} reviews
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        asChild
        variant="outline"
        className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
      >
        <a 
          href={googleMapsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <span>Read Reviews</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </Button>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Reviews powered by Google
        </p>
      </div>
    </motion.div>
  );
}

// Quick reviews summary component for anywhere on your site
export function QuickReviewsBadge({ 
  rating = 5.0, 
  count = 25,
  googleMapsUrl = "https://www.google.com/maps/place/your-business-url"
}: { 
  rating?: number; 
  count?: number; 
  googleMapsUrl?: string; 
}) {
  return (
    <motion.a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            className={`h-4 w-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`} 
          />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700">
        {rating} • {count} Google Reviews
      </span>
    </motion.a>
  );
}
