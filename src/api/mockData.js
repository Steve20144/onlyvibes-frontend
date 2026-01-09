// Dummy/Static Data for OnlyVibes Frontend

// --- 1. Constants ---
export const MOCK_USER_ID = "user123";
export const MOCK_REVIEW_ID = "review99";
export const MOCK_EVENT_ID_EDITABLE_1 = 404;
export const MOCK_EVENT_ID_EDITABLE_2 = 201;
export const MOCK_EVENT_ID_EDITABLE_3 = 202;

const DESC = "Suspense condimentum eget mi non dapibus. In hac habitasse platea dictumst. Aenean convallis odio massa, pellentesque posuere turpis pulvinar in.";
const IMG_BASE = "https://picsum.photos/400/200?random=";

// --- 2. Account Entity ---
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

// --- 3. Events (Data-Driven to Maximize Maintainability Score) ---
// Format: [id, creatorId, title, location, dateTime, category, likes, dist, imgId, extra]
const RAW_EVENTS = [
  [101, 1, "Sunset Session", "Beach Bar A", "2025-11-20T19:00:00Z", "Music", 125, "0.1 km", 1],
  [102, 2, "Jazz Night", "Chandeliers Venue", "2025-11-22T21:00:00Z", "Music", 543, "0.4 km", 2],
  [MOCK_EVENT_ID_EDITABLE_1, 3, "Cool Party Title #1", "Casper", "2025-03-29T23:00:00Z", "Party", 342, "0.3 km", 3],
  [MOCK_EVENT_ID_EDITABLE_2, 3, "Tech House Rave", "Warehouse Z", "2026-01-15T01:00:00Z", "Dance", 980, "5.5 km", 4],
  [MOCK_EVENT_ID_EDITABLE_3, 3, "Acoustic Sunset", "The Rooftop", "2025-12-05T18:00:00Z", "Chill", 12, "1.2 km", 5, { isCancelled: true }],
];

export const MOCK_EVENTS = RAW_EVENTS.map((row) => ({
  id: row[0], creatorId: row[1], title: row[2], location: row[3], dateTime: row[4],
  category: row[5], likecounter: row[6], distance: row[7],
  imageUrl: IMG_BASE + row[8],
  ...(row[9] || {})
}));

// --- 4. Review Entity ---
export const MOCK_REVIEW = {
  reviewId: MOCK_REVIEW_ID,
  id: MOCK_EVENT_ID_EDITABLE_1.toString(),
  userId: MOCK_USER_ID,
  rating: 4,
  comment: "Lorem ipsum dolor sit amet...",
  timestamp: "2025-03-30T10:00:00Z"
};

// --- 5. Event Details States ---
const base = MOCK_EVENTS.find(e => e.id === MOCK_EVENT_ID_EDITABLE_1);

const createDetails = (hasReview) => ({
    ...base,
    reviewSummary: 4.0,
    reviewCount: hasReview ? 264 : 263,
    userReview: hasReview ? MOCK_REVIEW : null,
    reviews: hasReview ? [MOCK_REVIEW] : [],
    description: DESC,
    photos: Array.from({ length: 6 }, (_, i) => `p${i + 1}.jpg`)
});

export const MOCK_EVENT_DETAILS_WITH_REVIEW = createDetails(true);
export const MOCK_EVENT_DETAILS_WITHOUT_REVIEW = createDetails(false);