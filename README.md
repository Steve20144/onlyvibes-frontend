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

## 📋 Assignment 1 Requirements Compliance Matrix

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
* **Build Tool:** Vite (Replaced React Scripts/Webpack)
* **HTTP Client:** Axios (Interceptors used for Auth Headers)
* **Styling:** CSS Modules / Inline Styles (Dark Theme)
* **Icons:** Lucide React

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Steve20144/onlyvibes-frontend.git](https://github.com/Steve20144/onlyvibes-frontend.git)
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
    The app will run at `http://localhost:5173`.

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

```
---


## 🧪 Testing Strategy & Quality Assurance (Deliverable 2)

To ensure system reliability and maintainability, we have implemented a robust End-to-End (E2E) testing strategy using **Cypress**. This setup simulates real user behavior to validate critical workflows before any code reaches production.

### 1. E2E Test Coverage (Frontend)
We have developed automated tests covering **3 distinct User Flows** that span across all core application screens (Login, Home, Event Details, Profile).

| Flow Category | Test Suite | Scenarios Covered (Happy & Unhappy Paths) |
| :--- | :--- | :--- |
| **Authentication** | `login.cy.js` | • **Happy:** Successful Login, Sign Up, and Account Deletion.<br>• **Unhappy:** Empty credentials submission, Duplicate email registration handling.<br>• **UI:** Modal validation errors and redirection logic. |
| **Event Lifecycle** | `events.cy.js` | • **Happy:** Create Event (with form fill), View Event Details, Delete Event.<br>• **Unhappy:** Creation attempts with missing Title or Description.<br>• **Guest:** Verification that unauthenticated users cannot access "Create" features. |
| **Review Lifecycle** | `review.cy.js` | • **Happy:** Posting a review with a star rating, canceling deletion, successful deletion.<br>• **Unhappy:** Attempting to submit a review without a star rating (Validation check). |

### 2. CI/CD Pipeline
We have established a Continuous Integration and Continuous Deployment pipeline using **GitHub Actions** to automate quality checks and deployment.

* **Continuous Integration (CI):** On every push to the `main` branch, the pipeline spins up a virtual Ubuntu environment, installs dependencies, starts the local server (`npm start`), and executes the full Cypress test suite.
* **Continuous Deployment (CD):** The deployment to **Render** is strictly conditional. The deploy hook is only triggered if **all** Cypress tests pass successfully, ensuring that broken code never reaches the live production environment.

---

## 📋 Assignment 2 Compliance Matrix

This section tracks adherence to the specific requirements set for the **"Software Engineering 2 - Deliverable 2"** assignment.

| Requirement ID | Description | Status | Implementation Details |
| :--- | :--- | :--- | :--- |
| **Testing-01** | **E2E Acceptance Tests** | ✅ **Done** | Implemented E2E tests for **3 User Flows** (Auth, Events, Reviews) covering both Happy and Unhappy paths. |
| **Testing-02** | **Screen Coverage** | ✅ **Done** | Tests cover interactions on all primary screens: Login, Profile, Home Feed, and Event Details. |
| **DevOps-01** | **CI/CD Pipeline** | ✅ **Done** | Configured GitHub Actions to run tests automatically on push. Deployment to production is blocked if tests fail. |
| **DevOps-02** | **Deployment** | ✅ **Done** | Both Frontend and Backend are successfully deployed to **Render** and communicate correctly. |

---

## 📋 Assignment 3 Compliance Matrix

This section tracks adherence to the specific requirements set for the **"Software Engineering 2 - Deliverable 3"** assignment.

| Requirement Category | Specific Requirement | Status | Implementation Details / Evidence |
| :--- | :--- | :--- | :--- |
| **1. Code Quality Assessment** | Assess code quality using the **Cyclopt** platform. | **Completed** | The frontend repository has been fully integrated with Cyclopt for static analysis on all active branches. |
| **2. Metric Improvement** | Set improvement goals and proceed with corrections/changes to code. | **Completed** | We have achieved **0 violations** across all severity levels. As shown in the dashboard history, we successfully removed **5 Major Violations**, fulfilling the requirement to improve metrics based on platform feedback. |
| **3. Clean Code Standards** | Ensure optimal metrics for Duplicates, Violations, and Vulnerabilities. | **Completed** | Current Cyclopt analysis reports: <br>• **0%** Duplicate Code <br>• **0** Vulnerabilities <br>• **0** Violations (Critical/Major/Minor) <br> This meets the goal of optimizing metrics to the best extent possible. |

---

### 📊 Cyclopt Quality Report Summary

The following metrics demonstrate the current state of the `onlyvibes-frontend` repository following the refactoring process required for Deliverable 3.

#### **A. Violations**
* **Critical:** 0
* **Major:** 0 
* **Minor:** 0
* **Total:** 0
> *The code is free of Cyclopt-detected violations.*

#### **B. Duplicates**
* **Duplicate Code:** 0%
* **Duplicate Lines:** 0
> *The codebase maintains high modularity with no repetition.*

#### **C. Security**
* **Vulnerabilities:** 0
* **Security Hotspots:** 0
> *No security risks were detected by the static analysis tool.*

---