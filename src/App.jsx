import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./Landing page/Landingpage";
import Dashboard from "/src/Dashboard/Layout/Main_Layout.jsx";
// Pixora-s-Frontend/src/Dashboard/Layout/Main_Layout.jsx
import Designs from "./Dashboard/_Components/Designs";
import Viewcode from "./Mainpage/Viewcode";
import PixoraPlus from "./Dashboard/_Components/PixoraPlus";
import About from "./Dashboard/_Components/About";
import SignInSignUp from "/Authentication/SignInSignUp.jsx";
import ProtectedRoute from "/Authentication/ProtectedRoute.jsx";
import { Toaster } from "sonner";
import AuthNotifier from "/Authentication/AuthNotifier.jsx";
import Profile from "/src/Dashboard/_Components/Profile.jsx"
import Pricing from "/src/Landing page/Pricing.jsx"
import GetInTouch from "./GetInTouch";
import GitHubOAuthCallback from "./GitHubOAuthCallback";
import Chat from "./Dashboard/_Components/Chat";
import Workspace from "./Workspace/MainWorkspace.jsx";
import Policy from "/src/Privacy.jsx"
import Chatcreator from "./Dashboard/_Components/Chat/Chat.jsx";
function App() {
  return (
   <>
  
    <Router>
       <Toaster position="top-right" richColors />
       <AuthNotifier />
      <Routes>
        <Route path="/signin" element={<SignInSignUp />} />
        <Route path="/signup" element={<SignInSignUp isSignUp />} />
        <Route path="/" element={<Landingpage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/*  index route to show home by default */}
          <Route index element={<Chat />} />
          <Route path="dashboard" element={<Chat />} />
          <Route path="designs" element={<Designs />} />
          <Route path="subscription" element={<PixoraPlus />} />
          <Route path="about" element={<About />} />
          <Route path="Profile" element={<Profile />} />
         
        </Route>
        {/* <Route path="/generated-code/:id" element={<Generatedcode />} /> */}
        <Route
          path="/generated-code/:id"
          element={
            <ProtectedRoute>
              <Viewcode />
            </ProtectedRoute>
          }
        />

{/* main workspace component rendering as per their id */}
 <Route path="/workspace/:workspaceId" element={
  <ProtectedRoute>
    <Workspace />
  </ProtectedRoute>} />

         <Route path="contact" element={<GetInTouch />} />
         <Route path="pricing" element={<Pricing />} />
         <Route path="/auth/github/callback" element={<GitHubOAuthCallback />} />

         <Route path="/privacypolicy" element={<Policy/>} />
         <Route path="/chat" element={<Chatcreator/>} />

      </Routes>
    </Router>
    </>
  );
}

export default App;