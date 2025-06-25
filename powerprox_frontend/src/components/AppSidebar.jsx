
import { Grid3X3, Zap, MapPin, AlertTriangle, Users, AlarmClock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,  
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Overview",
    url: "/overview",
    icon: Grid3X3,
  },
  {
    title: "Generators", 
    url: "/generators",
    icon: Zap,
  },
  {
    title: "Locations",
    url: "/locations", 
    icon: MapPin,
  },
  {
    title: "Alarms",
    url: "/alarms",
    icon: AlarmClock,
  },
  {
    title: "User Management",
    url: "/user-management",
    icon: Users,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="bg-slate-800 border-slate-700">
      <SidebarContent className="bg-slate-700">
        <SidebarGroup >
          <SidebarGroupContent >
            <SidebarMenu >
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                    className="text-slate-300 hover:text-white hover:bg-slate-800 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
