# OnlyVibes Frontend 🪩

OnlyVibes is a social event discovery platform designed to help users find, create, and review local events. This repository contains the **React Frontend** application, serving as the client-side interface for the OnlyVibes ecosystem.

## 🚀 Features & Capabilities

### 1. User Authentication & Profile Management
* **Secure Auth Flow:** Complete Sign-up and Login implementation using JWT tokens stored in LocalStorage.
* **Guest Mode:** Non-authenticated users can browse events but are prompted to sign in for interactive features (reviews, creating events).
* **Profile Dashboard:** Users can view their stats (followers/following), access organized events, and manage preferences.

### 2. Event Management (CRUD)
* **Browse:** Scrollable feed of events with "Optimistic UI" updates for liking/unliking to ensure responsiveness.
* **Create:** Comprehensive form for creating new events (Title, Description, Category, Date/Time).
* **Edit:** functionality to update event details for event organizers.
* **Delete:** Ownership verification ensures only the event creator can delete an event.

### 3. Social & Review System
* **Interactive Reviews:** Users can leave star ratings and comments on events.
* **Review Management:** Users can edit or delete their own reviews directly from the event details page.
* **Likes:** Heart system to save events to a "Liked" list.

### 4. Advanced UI/UX
* **Mobile-First Design:** Implements a bottom navigation bar and touch-friendly cards tailored for mobile viewports.
* **Feedback Systems:** Custom `PopupDialog` components replace standard browser alerts for a cohesive design language (Confirmations, Success, Errors).
* **Visual Polish:** Dark mode aesthetic using Lucide React icons and glassmorphism effects.

---

## 📋 Assignment Requirements Compliance Matrix

This project was built to strictly adhere to the **"Software Engineering 2 - Deliverable 1"** specifications.

| Requirement ID | Description | Status | Implementation Details |
| :--- | :--- | :--- | :--- |
| **Frontend-01** | **Minimum 4 Screens** | ✅ **Exceeded** | Implemented 9+ screens: Home, Login, Profile, Create Event, Event Details, Edit Event, Search, Liked Events, Organized Events. |
| **Frontend-02** | **Connect to 5+ Endpoints** | ✅ **Exceeded** | The API Layer connects to 5+ endpoints including: `GET /events`, `POST /events`, `DELETE /events/:id`, `POST /auth/login`, `POST /auth/signup`, `POST /reviews`, `DELETE /reviews`, `GET /accounts/:id`. |
| **Frontend-03** | **Mockup Fidelity** | ✅ **High** | UI matches provided wireframes (Dark theme, Card layout, Profile structure). |
| **General-01** | **3+ Entities Interaction** | ✅ **Done** | The frontend orchestrates interactions between **Users** (Auth/Profile), **Events** (CRUD), and **Reviews** (Rating/Comments). |
| **General-02** | **Mock Data Handling** | ✅ **Done** | The system handles real API data but includes robust fallbacks and mock placeholders (e.g., `mockData.js`) where backend data might be sparse during dev. |
| **General-03** | **Separation of Concerns** | ✅ **Done** | Strict separation between `api/` services, `pages/` logic, and reusable `components/`. |

---

## 🛠️ Tech Stack

* **Core:** React.js (v18), React Router v6
* **HTTP Client:** Axios (Interceptors used for Auth Headers)
* **Styling:** CSS Modules / Inline Styles (Dark Theme)
* **Icons:** Lucide React

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Steve20144/onlyvibes-frontend.git](https://github.com/YOUR_USERNAME/onlyvibes-frontend.git)
    cd onlyvibes-frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Application:**
    ```bash
    npm start
    ```
    The app will run at `http://localhost:3000`.

---

## 📂 Project Structure

```text
src/
├── api/            # Centralized API logic (Events, Auth, Reviews)
├── components/     # Reusable UI (EventCard, Popups, Nav)
├── layouts/        # Layout wrappers (MainLayout with BottomNav)
├── pages/          # Full screen components
├── router/         # Protected routes and navigation paths
└── styles/         # Global styles
