import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlarmClock, Grid3X3, MapPin, Users, Zap } from "lucide-react";

const tabs = [
  { label: "Overview", value: "overview", icon: Grid3X3 },
  { label: "Generators", value: "generators" },
  { label: "Locations", value: "locations" },
  { label: "Alarms", value: "alarms" },
  { label: "User Management", value: "user-management" },
];

const NavigationTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.pathname.replace("/", "") || "overview";

  const handleChange = (value) => {
    navigate(`/${value}`);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleChange} className="w-auto">
      <TabsList className="bg-slate-800 border-slate-700">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`text-slate-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white cursor-pointer ${
              activeTab === tab.value ? "text-blue-400" : ""
            }`}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default NavigationTabs;
