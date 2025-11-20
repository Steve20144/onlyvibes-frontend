// src/api/mappers.js

/**
 * Maps raw API event data to the clean Frontend Event object.
 * This is crucial for fixing snake_case, missing fields, and ID consistency.
 */
export const mapEvent = (apiData) => {
  // Check what data the mapper receives for a single item
  console.log("⚙️  MAPPER: Processing item:", apiData._id, apiData.title); 

  if (!apiData) return null;
  
  const mappedItem = {
    // FIX: Use the MongoDB _id as the reliable routing key ('id')
    id: apiData.id || apiData._id, // <--- THIS IS THE PRIMARY KEY FOR ROUTING
    
    // Legacy/Numeric ID (Optional, if needed for filtering/display)
    eventId: apiData.eventId, // The numeric ID (4, 5, 6...)
    
    title: apiData.title,
    description: apiData.description,
    imageUrl: apiData.imageUrl,
    location: apiData.location,
    dateTime: apiData.dateTime,
    // ...
  };
  
  return mappedItem;
};


/**
 * Maps raw API review data to the clean Frontend Review object.
 */
export const mapReview = (apiData) => {
  if (!apiData) return null;
  return {
    reviewId: apiData.id || apiData.review_id,
    rating: apiData.rating,
    comment: apiData.comment || apiData.text,
    userId: apiData.user_id,
    timestamp: apiData.created_at || apiData.createdAt // Use consistent field name
  };
};


/**
 * Maps raw API account data to the clean Frontend User object.
 */
export const mapUser = (apiData) => {
  if (!apiData) return null;
  return {
    // Primary ID
    userId: apiData.id || apiData._id,
    
    // Profile Fields
    username: apiData.username,
    email: apiData.email,
    role: apiData.role,
    isVerified: apiData.isVerified || apiData.is_verified || false,
    id: 'user-3'
    
    
    // Venue Details (Optional fields from your schema)
  };
};

