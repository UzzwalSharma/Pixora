import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GitHubOAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGitHubToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        console.error("❌ GitHub OAuth code not found.");
        setTimeout(() => navigate("/dashboard"), 6000);
        return;
      }

      try {
        console.log("🔄 Fetching GitHub token with code:", code);
        const response = await axios.post("https://pixora-s-backend.onrender.com/github-oauth", { code });

        const { access_token } = response.data;

        if (access_token) {
          localStorage.setItem("github_token", access_token);
          console.log("✅ GitHub Token Stored:", access_token);

          // ✅ Redirect to Homepage
          setTimeout(() => navigate("/"), 3000);
        }
      } catch (error) {
        console.error("❌ Error fetching GitHub access token:", error);
        setTimeout(() => navigate("/"), 3000);
      }
    };

    fetchGitHubToken();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm max-w-md text-center space-y-4">
        <div className="w-12 h-12 mx-auto mb-4">
          <svg className="w-full h-full text-gray-600 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        
        <h2 className="text-xl font-medium text-gray-900">
          Connecting GitHub Account
        </h2>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          Please wait while we authenticate your GitHub account with Pixora.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-4">
          <p className="text-blue-800 text-xs">
            Once connected, you'll need to generate and push your code again since your GitHub wasn't previously linked with Pixora.
          </p>
        </div>
        
        <div className="pt-2">
          <p className="text-xs text-gray-400">
            Redirecting automatically...
          </p>
        </div>
      </div>
    </div>
  );
}

export default GitHubOAuthCallback;