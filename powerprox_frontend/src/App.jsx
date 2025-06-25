import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Overview from "./pages/Overview";
import Generators from "./pages/Generators";
import Locations from "./pages/Locations";
import Alarms from "./pages/Alarms";
import UserManagement from "./pages/UserManagement";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Logo from "./assets/logo.png"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />

      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-slate-900">
            <AppSidebar />
            <main className="flex-1 flex flex-col">
              <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-4 bg">
                  <SidebarTrigger className="text-white cursor-pointer" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6  rounded">
                      <img src={Logo} alt="" />
                    </div>
                    <span className="text-white font-semibold">
                      PowerProx Dashboard
                    </span>
                  </div>
                </div>
                <button className="cursor-pointer flex items-center gap-2 text-red-400 hover:text-red-300">
                  <span>Logout</span>
                </button>
              </div>
              <div className="relative w-full h-screen bg-[#0F111A] overflow-hidden">
                <div className="absolute w-[2px] h-[150%] rotate-[35deg] left-1/4 top-[-25%] bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent" />

                  <div className="absolute w-[2px] h-[150%] rotate-[35deg] left-1/2 top-[-25%] bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent" />

                <div className="relative z-10 flex-1 p-6">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/generators" element={<Generators />} />
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/alarms" element={<Alarms />} />
                    <Route
                      path="/user-management"
                      element={<UserManagement />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
