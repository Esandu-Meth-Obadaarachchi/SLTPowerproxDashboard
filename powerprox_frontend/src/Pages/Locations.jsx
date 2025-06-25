import NavigationTabs from "@/components/Navtabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

const Locations = () => {
  return (
    <div className="space-y-6">
      <NavigationTabs />

      {/* Location Section */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <MapPin className="h-6 w-6 text-blue-400" />

          <h2  className="text-3xl font-bold text-white">Location</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Location Selector */}
          <div className="lg:col-span-1">
            <Select defaultValue="slt-hq">
              <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="slt-hq" className="text-white">
                  SLT HQ
                </SelectItem>
                <SelectItem value="colombo-01" className="text-white">
                  Colombo 01
                </SelectItem>
                <SelectItem value="kandy" className="text-white">
                  Kandy
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-4 text-slate-400">
              <p>Loading...</p>
            </div>
          </div>

          {/* Address Card */}
          <Card className="bg-slate-800 border-slate-700 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-blue-400 text-sm">Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white">
                Sri Lanka Telecom Head Office, Lotus Road, Colombo 01
              </p>
            </CardContent>
          </Card>

          {/* Generators Count */}
          <Card className="bg-slate-800 border-slate-700 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-slate-400">Number of Generators</span>
                </div>
                <span className="text-blue-400 font-bold text-2xl">15</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Locations;
