import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import HealthLog from "./pages/HealthLog";
import MoodTracker from "./pages/MoodTracker";
import MyProfile from "./pages/MyProfile";
import RiskAssessment from "./pages/RiskAssessment";
import VisualDashboard from "./pages/VisualDashboard";
import PlaceholderPage from "./components/PlaceholderPage";
import NotFound from "./pages/NotFound";
import { HealthDataProvider } from "./hooks/useHealthData";
import "./global.css";

function App() {
  return (
    <HealthDataProvider>
      <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Routes - Dashboard (role-specific) */}
        <Route path="/dashboard" element={<Dashboard userRole="soldier" />} />
        <Route path="/dashboard/officer" element={<Dashboard userRole="officer" />} />
        <Route path="/dashboard/admin" element={<Dashboard userRole="admin" />} />
        
        {/* Soldier Routes */}
        <Route path="/health" element={<HealthLog />} />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/risk" element={<RiskAssessment />} />
        <Route path="/visual-dashboard" element={<VisualDashboard />} />
        
        {/* Officer Routes */}
        <Route 
          path="/team" 
          element={
            <PlaceholderPage 
              title="Team Overview" 
              description="Monitor health status and risk levels across your assigned personnel."
            />
          } 
        />
        <Route 
          path="/alerts" 
          element={
            <PlaceholderPage 
              title="Alert Management" 
              description="Real-time notifications and alert management for high-risk situations."
            />
          } 
        />
        <Route 
          path="/risk-analysis" 
          element={
            <PlaceholderPage 
              title="Risk Analysis" 
              description="Advanced analytics and ML-driven predictions for team health monitoring."
            />
          } 
        />
        <Route 
          path="/reports" 
          element={
            <PlaceholderPage 
              title="Reports & Analytics" 
              description="Generate comprehensive reports and export data for analysis."
            />
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/users" 
          element={
            <PlaceholderPage 
              title="User Management" 
              description="Add, modify, and manage system users with role-based access controls."
            />
          } 
        />
        <Route 
          path="/settings" 
          element={
            <PlaceholderPage 
              title="System Settings" 
              description="Configure system parameters, alert thresholds, and security settings."
            />
          } 
        />
        <Route 
          path="/security" 
          element={
            <PlaceholderPage 
              title="Security & Audit Logs" 
              description="Review system access logs, security events, and audit trails."
            />
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <PlaceholderPage 
              title="System Analytics" 
              description="Advanced system performance metrics and usage analytics."
            />
          } 
        />
        
        {/* Legal/Info Pages */}
        <Route 
          path="/terms" 
          element={
            <PlaceholderPage 
              title="Terms of Service" 
              description="Legal terms and conditions for using the SSMS platform."
            />
          } 
        />
        <Route 
          path="/privacy" 
          element={
            <PlaceholderPage 
              title="Privacy Policy" 
              description="Information about data handling, encryption, and privacy protection."
            />
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            <PlaceholderPage 
              title="Password Recovery" 
              description="Secure password reset functionality with multi-factor verification."
            />
          } 
        />
        
        {/* Default redirect is now handled by the home route */}
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </HealthDataProvider>
  );
}

export default App;
