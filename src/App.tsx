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
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import { canAccessRoute, defaultPathFor } from "@/lib/permissions";
import type { UserRole } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

function ProtectedRoute({
  children,
  allowedRoles,
  path,
}: {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  path?: string;
}) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const role = user?.role;
  const allowed = allowedRoles
    ? !!role && allowedRoles.includes(role)
    : path
      ? canAccessRoute(path, role)
      : true;
  if (!allowed) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to={defaultPathFor(user?.role)} replace />
            : <Login />
        }
      />
      <Route path="/unauthorized" element={<ProtectedRoute><Unauthorized /></ProtectedRoute>} />

      {/* Shared routes (all authenticated roles) */}
      <Route path="/welcome" element={<ProtectedRoute path="/welcome"><Welcome /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute path="/notifications"><Notifications /></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute path="/events"><Events /></ProtectedRoute>} />
      <Route path="/finance" element={<ProtectedRoute path="/finance"><Finance /></ProtectedRoute>} />
      <Route path="/transcript" element={<ProtectedRoute path="/transcript"><Transcript /></ProtectedRoute>} />
      <Route path="/trips" element={<ProtectedRoute path="/trips"><Trips /></ProtectedRoute>} />
      <Route path="/cocurricular" element={<ProtectedRoute path="/cocurricular"><Cocurricular /></ProtectedRoute>} />
      <Route path="/suggestions" element={<ProtectedRoute path="/suggestions"><Suggestions /></ProtectedRoute>} />
      <Route path="/learning" element={<ProtectedRoute path="/learning"><Learning /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute path="/attendance"><Attendance /></ProtectedRoute>} />
      <Route path="/assignments" element={<ProtectedRoute path="/assignments"><Assignments /></ProtectedRoute>} />
      <Route path="/timetable" element={<ProtectedRoute path="/timetable"><Timetable /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute path="/chat"><Chat /></ProtectedRoute>} />
      <Route path="/exams" element={<ProtectedRoute path="/exams"><Exams /></ProtectedRoute>} />
      <Route path="/library" element={<ProtectedRoute path="/library"><Library /></ProtectedRoute>} />
      <Route path="/behavior" element={<ProtectedRoute path="/behavior"><Behavior /></ProtectedRoute>} />
      <Route path="/health" element={<ProtectedRoute path="/health"><Health /></ProtectedRoute>} />

      {/* Teacher-only */}
      <Route path="/" element={<ProtectedRoute path="/"><Index /></ProtectedRoute>} />
      <Route path="/teacher" element={<ProtectedRoute path="/teacher"><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute path="/students"><StudentsDashboard /></ProtectedRoute>} />
      <Route path="/compose" element={<ProtectedRoute path="/compose"><Compose /></ProtectedRoute>} />
      <Route path="/groups" element={<ProtectedRoute path="/groups"><Groups /></ProtectedRoute>} />
      <Route path="/templates" element={<ProtectedRoute path="/templates"><Templates /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute path="/history"><History /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute path="/settings"><Settings /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute path="/analytics"><Analytics /></ProtectedRoute>} />

      {/* Teacher + Parent */}
      <Route path="/teacher-directory" element={<ProtectedRoute path="/teacher-directory"><TeacherDirectory /></ProtectedRoute>} />

      {/* Parent-only */}
      <Route path="/parent" element={<ProtectedRoute path="/parent"><ParentDashboard /></ProtectedRoute>} />

      {/* Student-only */}
      <Route path="/student-portal" element={<ProtectedRoute path="/student-portal"><StudentPortal /></ProtectedRoute>} />

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
