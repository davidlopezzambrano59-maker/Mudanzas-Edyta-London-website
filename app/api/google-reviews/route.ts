import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('placeId');
    const maxReviews = parseInt(searchParams.get('maxReviews') || '5');

    if (!placeId) {
      return NextResponse.json(
        { error: 'Place ID is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEXT_PUBLIC_GMAPS_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      );
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.result) {
      const reviews = data.result.reviews || [];
      const limitedReviews = reviews.slice(0, maxReviews);
      
      return NextResponse.json({
        reviews: limitedReviews,
        rating: data.result.rating || 0,
        totalReviews: data.result.user_ratings_total || 0,
        status: 'success'
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Failed to fetch reviews from Google Places API',
          details: data.status 
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
