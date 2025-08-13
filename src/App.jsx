import "./App.css";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const NoticesPage = lazy(() => import("./pages/NoticesPage"));
const OurFriendsPage = lazy(() => import("./pages/OurFriendsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/findPet" />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/friends" element={<OurFriendsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="registration" element={<RegistrationPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
