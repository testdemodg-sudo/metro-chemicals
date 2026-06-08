import ChatBot from "@/components/ChatBot";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useCallback, useState } from "react";

import Footer from "@/components/Footer";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminRoute from "@/components/admin/AdminRoute";
import AboutSection from "@/pages/AboutSection";
import CategoryPage from "@/pages/CategoryPage";
import CertificationSection from "@/pages/CertificationSection";
import ContactSection from "@/pages/ContactSection";
import ExportSection from "@/pages/ExportSection";
import GlobalPresenceSection from "@/pages/GlobalPresenceSection";
import HeroSection from "@/pages/HeroSection";
import InfrastructureSection from "@/pages/InfrastructureSection";
import ProductsSection from "@/pages/ProductsSection";
import TestimonialsSection from "@/pages/TestimonialsSection";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLogin from "@/pages/admin/AdminLogin";

// ─── Homepage ───────────────────────────────────────────────────────────────

function HomeSite() {
  const [loading, setLoading] = useState(true);
  const handleLoadingComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div
        className={`min-h-screen bg-background text-foreground transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProductsSection />
          <InfrastructureSection />
          <CertificationSection />
          <ExportSection />
          <GlobalPresenceSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </>
  );
}

// ─── Category page wrapper ────────────────────────────────────────────────────

function CategoryPageWrapper() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <CategoryPage />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

// ─── Admin panel ─────────────────────────────────────────────────────────────

function AdminPanel() {
  return (
    <AdminRoute>
      <AdminLayout>
        {(activeTab, setTab) => (
          <AdminDashboard activeTab={activeTab} setTab={setTab} />
        )}
      </AdminLayout>
    </AdminRoute>
  );
}

// ─── Router ──────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({ component: Outlet });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeSite,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$categoryId",
  component: CategoryPageWrapper,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLogin,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPanel,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  categoryRoute,
  adminLoginRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App root ────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <AdminAuthProvider>
          <RouterProvider router={router} />
        </AdminAuthProvider>
      </LanguageProvider>
    </DarkModeProvider>
  );
}
