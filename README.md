# Pet Adoption Platform

A modern React-based web application for browsing, favoriting, and managing pets available for adoption. The platform allows users to explore listings, save favorites, manage their profile, and add their own pets.

---

## 🌐 Live Demo

https://petlove-app-brown.vercel.app/

## Features

🔐 Authentication
The application provides full user authentication, including registration and login functionality. It uses token-based authentication, with the token stored in localStorage to maintain a persistent session. When the app loads, user data is automatically refreshed if a valid token is present.

👤 User Profile
Users can view and edit their personal information, upload an avatar, and manage their own pets. The profile section also includes a logout feature with a confirmation modal to prevent accidental sign-outs.

🐶 Pet Listings (Notices)
The platform allows users to browse available pets with a variety of filtering options, including category, gender, species, and location. Users can search by title or description and sort listings by popularity or price (from cheapest to most expensive and vice versa). Pagination is implemented to efficiently handle large datasets.

❤️ Favorites & Viewed
Users can add pets to their favorites or remove them at any time. There is also a section for viewing previously viewed pets. All this data is managed globally using Redux, ensuring a consistent user experience across the app.

📄 News Page
The news section displays the latest pet-related updates. Users can search through news articles and navigate through pages when there is a large amount of content.

➕ Add Pet
Users have the ability to add their own pet listings directly from their profile, making it easy to share pets for adoption.

📱 Responsive Design
The application is fully responsive and optimized for both mobile and desktop devices. It also features adaptive pagination to improve usability on smaller screens.

---

## ⭐ Highlights

- Advanced filtering system
- Optimized rendering with React.memo, useMemo
- Lazy loading with Suspense
- Global state management with Redux Toolkit

---

## Tech Stack

- **Frontend:** React, React Router, Redux Toolkit, React Hook Form, React Toastify, Axios (with auth headers)

## Installation & Setup

1. Clone the repository:
   git clone https://github.com/StanNatalia/petlove-app

2. Navigate to the project folder:
   cd petlove-app

3. Install dependencies:
   npm install

4. Start the development server:
   npm run dev

---

## 📸 Screenshots

### Home Page

### Pet Listings

### Filters

### Profile

### Favorites

### Mobile View
