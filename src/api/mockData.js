// src/api/mockData.js
// Dummy/Static Data for OnlyVibes Frontend

// --- 1. Constants ---
export const MOCK_USER_ID = "user123";
export const MOCK_REVIEW_ID = "review99";
export const MOCK_EVENT_ID_EDITABLE_1 = 404; // Κεντρικό event για reviews/edit
export const MOCK_EVENT_ID_EDITABLE_2 = 201; 
export const MOCK_EVENT_ID_EDITABLE_3 = 202; 

// --- 2. Account Entity (John Doe is the user) ---
export const MOCK_ACCOUNT = {
  id: MOCK_USER_ID,
  email: "john.doe@example.com",
  name: "John Doe",
  profilePictureUrl: "https://i.pravatar.cc/150?img=1",
  bio: "Looking for the best vibes in town!",
  preferences: ["Music", "Party", "Culture"],
  isVerified: true,
  role: "user",
  likedEventsIds: [101, 102, MOCK_EVENT_ID_EDITABLE_1],
  followedAccountsIds: ["venue456"],
};

// --- 3. Event Entities (3+ Editable Events Added) ---
export const MOCK_EVENTS = [
  {
    eventId: 101,
    creatorId: 1, 
    title: "Sunset Session",
    location: "Beach Bar A",
    dateTime: "2025-11-20T19:00:00Z",
    category: "Music",
    likecounter: 125,
    distance: "0.1 km",
    imageUrl: "https://picsum.photos/400/200?random=1"
  },
  {
    eventId: 102,
    creatorId: 2, 
    title: "Jazz Night",
    location: "Chandeliers Venue",
    dateTime: "2025-11-22T21:00:00Z",
    category: "Music",
    likecounter: 543,
    distance: "0.4 km",
    imageUrl: "https://picsum.photos/400/200?random=2"
  },
  {
    // Editable Event 1 (The main test event)
    eventId: MOCK_EVENT_ID_EDITABLE_1, 
    creatorId: 3, // Έχουμε ορίσει αυτό το ID ως "Editable" στη λογική μας
    title: "Cool Party Title #1",
    location: "Casper",
    dateTime: "2025-03-29T23:00:00Z",
    category: "Party",
    likecounter: 342,
    distance: "0.3 km",
    imageUrl: "https://picsum.photos/400/200?random=3"
  },
  {
    // Editable Event 2 (Upcoming Dance Event)
    eventId: MOCK_EVENT_ID_EDITABLE_2, 
    creatorId: 3, 
    title: "Tech House Rave",
    location: "Warehouse Z",
    dateTime: "2026-01-15T01:00:00Z",
    category: "Dance",
    likecounter: 980,
    distance: "5.5 km",
    imageUrl: "https://picsum.photos/400/200?random=4"
  },
  {
    // Editable Event 3 (Cancelled Status Mock)
    eventId: MOCK_EVENT_ID_EDITABLE_3, 
    creatorId: 3, 
    title: "Acoustic Sunset",
    location: "The Rooftop",
    dateTime: "2025-12-05T18:00:00Z",
    category: "Chill",
    likecounter: 12,
    distance: "1.2 km",
    isCancelled: true, // Προσθήκη status για οπτική δοκιμή
    imageUrl: "https://picsum.photos/400/200?random=5"
  },
];

// --- 4. Review Entity ---
export const MOCK_REVIEW = {
  reviewId: MOCK_REVIEW_ID,
  eventId: MOCK_EVENT_ID_EDITABLE_1.toString(),
  userId: MOCK_USER_ID,
  rating: 4,
  comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc purus nulla, malesuada a porta ac.",
  timestamp: "2025-03-30T10:00:00Z"
};

// --- 5. Event Details States (Added necessary fields for EditPage) ---
const baseEvent = MOCK_EVENTS.find(e => e.eventId === MOCK_EVENT_ID_EDITABLE_1);

export const MOCK_EVENT_DETAILS_WITH_REVIEW = {
    ...baseEvent,
    reviewSummary: 4.0,
    reviewCount: 264, 
    userReview: MOCK_REVIEW, 
    reviews: [MOCK_REVIEW],
    // *** ΠΡΟΣΘΗΚΗ: Χαρακτηριστικά απαραίτητα για την EditPage ***
    description: "Suspense condimentum eget mi non dapibus. In hac habitasse platea dictumst. Aenean convallis odio massa, pellentesque posuere turpis pulvinar in.",
    photos: ["p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg", "p6.jpg"]
};

export const MOCK_EVENT_DETAILS_WITHOUT_REVIEW = {
    ...baseEvent,
    reviewSummary: 4.0,
    reviewCount: 263, 
    userReview: null, 
    reviews: []
};