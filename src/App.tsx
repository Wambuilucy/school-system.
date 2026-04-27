import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { I18nProvider } from "@/contexts/I18nContext";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Notifications from "./pages/Notifications";
import Index from "./pages/Index";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import StudentsDashboard from "./pages/StudentsDashboard";
import StudentPortal from "./pages/StudentPortal";
import Transcript from "./pages/Transcript";
import Finance from "./pages/Finance";
import Events from "./pages/Events";
import Trips from "./pages/Trips";
import TeacherDirectory from "./pages/TeacherDirectory";
import Cocurricular from "./pages/Cocurricular";
import Compose from "./pages/Compose";
import Groups from "./pages/Groups";
import Templates from "./pages/Templates";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Suggestions from "./pages/Suggestions";
import Learning from "./pages/Learning";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";
import Timetable from "./pages/Timetable";
import Chat from "./pages/Chat";
import Exams from "./pages/Exams";
import Library from "./pages/Library";
import Behavior from "./pages/Behavior";
import Health from "./pages/Health";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) return <Navigate to="/welcome" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/welcome" replace /> : <Login />} />
      
      {/* Shared routes */}
      <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
      <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
      <Route path="/transcript" element={<ProtectedRoute><Transcript /></ProtectedRoute>} />
      <Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
      <Route path="/cocurricular" element={<ProtectedRoute><Cocurricular /></ProtectedRoute>} />
      <Route path="/suggestions" element={<ProtectedRoute><Suggestions /></ProtectedRoute>} />
      <Route path="/learning" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
      <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
      <Route path="/timetable" element={<ProtectedRoute><Timetable /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/exams" element={<ProtectedRoute><Exams /></ProtectedRoute>} />
      <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
      <Route path="/behavior" element={<ProtectedRoute><Behavior /></ProtectedRoute>} />
      <Route path="/health" element={<ProtectedRoute><Health /></ProtectedRoute>} />
      
      {/* Teacher-only */}
      <Route path="/" element={<ProtectedRoute allowedRoles={['teacher']}><Index /></ProtectedRoute>} />
      <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute allowedRoles={['teacher']}><StudentsDashboard /></ProtectedRoute>} />
      <Route path="/compose" element={<ProtectedRoute allowedRoles={['teacher']}><Compose /></ProtectedRoute>} />
      <Route path="/groups" element={<ProtectedRoute allowedRoles={['teacher']}><Groups /></ProtectedRoute>} />
      <Route path="/templates" element={<ProtectedRoute allowedRoles={['teacher']}><Templates /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute allowedRoles={['teacher']}><History /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute allowedRoles={['teacher']}><Settings /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute allowedRoles={['teacher']}><Analytics /></ProtectedRoute>} />
      <Route path="/teacher-directory" element={<ProtectedRoute allowedRoles={['teacher', 'parent']}><TeacherDirectory /></ProtectedRoute>} />
      
      {/* Parent-only */}
      <Route path="/parent" element={<ProtectedRoute allowedRoles={['parent']}><ParentDashboard /></ProtectedRoute>} />
      
      {/* Student-only */}
      <Route path="/student-portal" element={<ProtectedRoute allowedRoles={['student']}><StudentPortal /></ProtectedRoute>} />

      {/* Fallbacks */}
      <Route path="*" element={isAuthenticated ? <NotFound /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <I18nProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </I18nProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
