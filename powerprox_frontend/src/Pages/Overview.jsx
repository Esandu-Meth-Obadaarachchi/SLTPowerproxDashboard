import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Zap,
  Activity,
  Leaf,
  DollarSign,
  Download,
  BarChart2,
  CloudLightning,
  ActivityIcon,
  BarChart2Icon,
} from "lucide-react";
import { useState } from "react";
import NavigationTabs from "@/components/Navtabs";
import { cn } from "@/lib/utils";

const pueData = [
  { time: "16:11", value: 2.05 },
  { time: "16:16", value: 2.02 },
  { time: "16:21", value: 1.98 },
  { time: "16:26", value: 2.01 },
  { time: "16:31", value: 1.95 },
  { time: "16:36", value: 1.92 },
  { time: "16:41", value: 1.88 },
  { time: "16:46", value: 1.91 },
  { time: "16:51", value: 1.94 },
  { time: "16:56", value: 1.89 },
];

const loadData = [
  { time: "16:11", load: 5.2 },
  { time: "16:16", load: 4.8 },
  { time: "16:21", load: 6.1 },
  { time: "16:26", load: 5.5 },
  { time: "16:31", load: 7.2 },
  { time: "16:36", load: 9.8 },
  { time: "16:41", load: 8.4 },
  { time: "16:46", load: 11.2 },
  { time: "16:51", load: 10.8 },
  { time: "16:56", load: 9.2 },
];

const carbonData = [
  { time: "15:56", value: 4.1 },
  { time: "16:01", value: 4.2 },
  { time: "16:06", value: 4.0 },
  { time: "16:11", value: 3.9 },
  { time: "16:16", value: 4.1 },
  { time: "16:21", value: 3.8 },
  { time: "16:26", value: 3.7 },
  { time: "16:31", value: 3.9 },
  { time: "16:36", value: 4.0 },
  { time: "16:41", value: 3.8 },
];

const tariffData = [
  { time: "11:58 AM", value: 4200 },
  { time: "11:59 AM", value: 4100 },
  { time: "12:00 PM", value: 8500 },
  { time: "12:01 PM", value: 8200 },
  { time: "12:02 PM", value: 8800 },
  { time: "12:03 PM", value: 8400 },
];

const energyData = [
  { time: "57:56", value: 18 },
  { time: "57:58", value: 12 },
  { time: "58:00", value: 15 },
  { time: "58:02", value: 16 },
  { time: "58:04", value: 22 },
];

const distributionData = [
  { name: "IT Load", value: 56, color: "#3b82f6" },
  { name: "AC Load", value: 29, color: "#10b981" },
  { name: "Other Systems", value: 15, color: "#f59e0b" },
];

const chartConfig = {
  pue: { color: "#06b6d4" },
  load: { color: "#10b981" },
  carbon: { color: "#06b6d4" },
  tariff: { color: "#ef4444" },
  energy: { color: "#10b981" },
};
const Overview = () => {
  const [tab, setTab] = useState("overview");
  const [subTab, setSubTab] = useState("operational");
  const [timeRange, setTimeRange] = useState("live");
  const [date, setDate] = useState(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <NavigationTabs />

        <div className="flex items-center gap-4 text-slate-400">
          <span>{date.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs
          value={subTab}
          onValueChange={setSubTab}
          defaultValue="operational"
          className="w-auto"
        >
          <TabsList className=" border-slate-700">
            <TabsTrigger
              value="live"
              className="cursor-pointer data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400"
            >
              <ActivityIcon size={26} className="text-white animate-pulse" />
              Live Data
            </TabsTrigger>
            <TabsTrigger
              value="tariff"
              className="cursor-pointer data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400"
            >
              <CloudLightning size={26} className="text-white" />
              Tariff & Emissions
            </TabsTrigger>
            <TabsTrigger
              value="operational"
              className="cursor-pointer data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400"
            >
              <BarChart2 size={28} className="text-white" />
              Operational Metrics
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs
          defaultValue="live"
          className="w-auto"
          onValueChange={setTimeRange}
          value={timeRange}
        >
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger
              value="live"
              className="cursor-pointer data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400"
            >
              Live
            </TabsTrigger>
            <TabsTrigger
              value="hourly"
              className="cursor-pointer data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400"
            >
              Hourly
            </TabsTrigger>
            <TabsTrigger
              value="daily"
              className="cursor-pointer data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400"
            >
              Daily
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              className="cursor-pointer data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400"
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="cursor-pointer data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="cursor-pointer data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-400"
            >
              Yearly
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Operational Metrics Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart2 size={26} className="text-white" />
          Operational Metrics
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* PUE Performance */}
          <Card className="bg-slate-800 border-slate-700 col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-white text-sm font-medium">
                  PUE Performance
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pueData}>
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis domain={[1.7, 2.1]} className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      dot={{ fill: "#06b6d4", r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Total Load */}
          <Card className="bg-slate-800 border-slate-700 col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-400" />
                <CardTitle className="text-white text-sm font-medium">
                  Total Load
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={loadData}>
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="load" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Metrics Cards */}
          <div className="space-y-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-cyan-400" />
                    <span className="text-slate-400 text-sm">PUE</span>
                  </div>
                  <span className="text-white font-bold text-lg">1.37</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-400" />
                    <span className="text-slate-400 text-sm">
                      Carbon Emission
                    </span>
                  </div>
                  <span className="text-white font-bold text-sm">
                    276269 MT/Year
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-yellow-400" />
                    <span className="text-slate-400 text-sm">
                      Electrical Cost
                    </span>
                  </div>
                  <span className="text-white font-bold text-sm">
                    33,152,220 LKR/Year
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Carbon Emission */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-white text-sm font-medium">
                  Carbon Emission
                </CardTitle>
              </div>
              <Download className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={carbonData}>
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Electricity Tariff */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-red-400" />
                <CardTitle className="text-white text-sm font-medium">
                  Electricity Tariff
                </CardTitle>
              </div>
              <Download className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tariffData}>
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Energy Consumption */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-400" />
                <CardTitle className="text-white text-sm font-medium">
                  Energy Consumption
                </CardTitle>
              </div>
              <Download className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={energyData}>
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Energy Distribution */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-white text-sm font-medium">
                Energy Distribution
              </CardTitle>
              <Download className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={40}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-2 space-y-1">
                {distributionData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-slate-400">{item.name}</span>
                    </div>
                    <span className="text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
