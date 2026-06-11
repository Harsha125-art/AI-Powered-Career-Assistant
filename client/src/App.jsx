import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DashBoard from "./pages/Dashboard";
import Analysis from "./pages/Analytics";
import UploadResume from "./pages/ResumeUpload";
import MatchJob from "./pages/JobMatch";
import JobRecommendations from "./pages/JobRecommendations";
import SavedJobs from "./pages/SavedJobs";
import Questions from "./pages/InterviewQuestions";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const isLoggedIn = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-resume"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume/:id"
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-match/:resumeId"
          element={
            <ProtectedRoute>
              <MatchJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:resumeId"
          element={
            <ProtectedRoute>
              <JobRecommendations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview-questions/:resumeId"
          element={
            <ProtectedRoute>
              <Questions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
