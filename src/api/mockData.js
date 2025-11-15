// src/api/mockData.js
// Dummy/Static Data for OnlyVibes Frontend

export const MOCK_USER_ID = "user123";
export const MOCK_REVIEW_ID = "review99";
export const MOCK_EVENT_ID = 404; 

export const MOCK_ACCOUNT = {
  id: MOCK_USER_ID,
  email: "john.doe@example.com",
  name: "John Doe",
  profilePictureUrl: "https://i.pravatar.cc/150?img=1",
  bio: "Looking for the best vibes in town!",
  preferences: ["Music", "Party", "Culture"],
  isVerified: true,
  role: "user",
  likedEventsIds: [101, 102, MOCK_EVENT_ID],
  followedAccountsIds: ["venue456"],
};

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
    eventId: MOCK_EVENT_ID,
    creatorId: 3,
    title: "Cool Party Title #1",
    location: "Casper",
    dateTime: "2025-03-29T23:00:00Z",
    category: "Party",
    likecounter: 342,
    distance: "0.3 km",
    imageUrl: "https://picsum.photos/400/200?random=3"
  },
];

export const MOCK_REVIEW = {
  reviewId: MOCK_REVIEW_ID,
  eventId: MOCK_EVENT_ID.toString(),
  userId: MOCK_USER_ID,
  rating: 4,
  comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc purus nulla, malesuada a porta ac.",
  timestamp: "2025-03-30T10:00:00Z"
};

export const MOCK_EVENT_DETAILS_WITH_REVIEW = {
    ...MOCK_EVENTS.find(e => e.eventId === MOCK_EVENT_ID),
    reviewSummary: 4.0,
    reviewCount: 264, 
    userReview: MOCK_REVIEW, 
    reviews: [MOCK_REVIEW]
};

export const MOCK_EVENT_DETAILS_WITHOUT_REVIEW = {
    ...MOCK_EVENTS.find(e => e.eventId === MOCK_EVENT_ID),
    reviewSummary: 4.0,
    reviewCount: 263, 
    userReview: null, 
    reviews: []
};