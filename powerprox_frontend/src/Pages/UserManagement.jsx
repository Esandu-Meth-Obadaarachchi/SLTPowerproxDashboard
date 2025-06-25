import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, ChevronLeft, ChevronRight, Users } from "lucide-react";
import NavigationTabs from "@/components/Navtabs";

const roleData = [
  { name: "Administrator", value: 2, color: "#8b5cf6" },
  { name: "Staff", value: 2, color: "#10b981" },
  { name: "Technician", value: 1, color: "#f59e0b" },
  { name: "Viewer", value: 1, color: "#ef4444" },
];

const regionData = [
  { name: "HQ", value: 2, color: "#8b5cf6" },
  { name: "East", value: 1, color: "#10b981" },
  { name: "West", value: 2, color: "#f59e0b" },
  { name: "North", value: 1, color: "#ef4444" },
];

const statusData = [
  { name: "Active", value: 85, color: "#10b981" },
  { name: "Inactive", value: 15, color: "#6b7280" },
];

const activityData = [
  { day: "Wed", count: 18 },
  { day: "Thu", count: 22 },
  { day: "Fri", count: 25 },
  { day: "Sat", count: 8 },
  { day: "Sun", count: 12 },
];

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "J",
    role: "Administrator",
    region: "All Regions",
    status: "Active",
    lastLogin: "19/05/2025, 08:45:22",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "S",
    role: "HQ Staff",
    region: "HQ",
    status: "Active",
    lastLogin: "19/05/2025, 09:12:45",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@example.com",
    avatar: "M",
    role: "Technician",
    region: "East Region",
    status: "Active",
    lastLogin: "19/05/2025, 07:30:18",
  },
  {
    id: 4,
    name: "Lisa Wong",
    email: "lisa.wong@example.com",
    avatar: "L",
    role: "Regional Staff",
    region: "West Region",
    status: "Active",
    lastLogin: "19/05/2025, 10:05:33",
  },
  {
    id: 5,
    name: "David Rodriguez",
    email: "david.rodriguez@example.com",
    avatar: "D",
    role: "Viewer",
    region: "North Region",
    status: "Inactive",
    lastLogin: "15/05/2025, 14:22:51",
  },
];

const activityLog = [
  {
    timestamp: "19/05/2025, 08:45:22",
    user: "John Smith",
    avatar: "J",
    action: "Login",
    details: "Successful login from 192.168.1.105",
  },
  {
    timestamp: "19/05/2025, 09:12:33",
    user: "John Smith",
    avatar: "J",
    action: "User Management",
    details: "Modified permissions for user USR-004",
  },
  {
    timestamp: "19/05/2025, 09:12:45",
    user: "Sarah Johnson",
    avatar: "S",
    action: "Login",
    details: "Successful login from 192.168.1.110",
  },
  {
    timestamp: "19/05/2025, 09:30:18",
    user: "Sarah Johnson",
    avatar: "S",
    action: "Alarm Management",
    details: "Acknowledged alarm ALM-2025-0042",
  },
  {
    timestamp: "19/05/2025, 07:30:18",
    user: "Mike Chen",
    avatar: "M",
    action: "Login",
    details: "Successful login from 192.168.1.115",
  },
];

const chartConfig = {
  users: { color: "#3b82f6" },
  activity: { color: "#8b5cf6" },
};

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <NavigationTabs />

      <div className="flex items-center gap-3 mb-4">
        <Users size={28} className="text-white" />
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            User Management
          </h1>
          <p className="text-slate-400">Manage users, roles, and permissions</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger
            value="users"
            className="cursor-pointer text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            USERS
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="cursor-pointer text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            ACTIVITY LOG
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="cursor-pointer text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white "
          >
            ANALYTICS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  className="pl-10 bg-slate-800 border-slate-700 text-white w-64"
                />
              </div>
              <Select defaultValue="all-roles">
                <SelectTrigger className="w-32 bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem
                    value="all-roles"
                    className="cursor-pointer text-white"
                  >
                    All Roles
                  </SelectItem>
                  <SelectItem
                    value="admin"
                    className="cursor-pointer text-white"
                  >
                    Admin
                  </SelectItem>
                  <SelectItem
                    value="staff"
                    className="cursor-pointer text-white"
                  >
                    Staff
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-regions">
                <SelectTrigger className="w-36 bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem
                    value="all-regions"
                    className="cursor-pointer text-white"
                  >
                    All Regions
                  </SelectItem>
                  <SelectItem value="hq" className="cursor-pointer text-white">
                    HQ
                  </SelectItem>
                  <SelectItem
                    value="east"
                    className="cursor-pointer text-white"
                  >
                    East
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-statuses">
                <SelectTrigger className="w-36 bg-slate-800 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem
                    value="all-statuses"
                    className="cursor-pointer text-white"
                  >
                    All Statuses
                  </SelectItem>
                  <SelectItem
                    value="active"
                    className="cursor-pointer text-white"
                  >
                    Active
                  </SelectItem>
                  <SelectItem
                    value="inactive"
                    className="cursor-pointer text-white"
                  >
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">
              <Plus className=" w-4 h-4 mr-2" />
              ADD USER
            </Button>
          </div>

          {/* Users Table */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">User</TableHead>
                    <TableHead className="text-slate-400">Role</TableHead>
                    <TableHead className="text-slate-400">Regions</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400">Last Login</TableHead>
                    <TableHead className="text-slate-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-slate-700">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {user.name}
                            </div>
                            <div className="text-slate-400 text-sm">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {user.role}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {user.region}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "Active" ? "default" : "secondary"
                          }
                          className={
                            user.status === "Active"
                              ? "bg-green-600"
                              : "bg-slate-600"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-slate-400 hover:text-white"
                        >
                          •••
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-slate-400 text-sm">Rows per page: 5</div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-sm">1–5 of 8</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="text-slate-400">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">User Activity Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-400">Timestamp</TableHead>
                    <TableHead className="text-slate-400">User</TableHead>
                    <TableHead className="text-slate-400">Action</TableHead>
                    <TableHead className="text-slate-400">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLog.map((log, index) => (
                    <TableRow key={index} className="border-slate-700">
                      <TableCell className="text-slate-300">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                            {log.avatar}
                          </div>
                          <span className="text-white">{log.user}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {log.action}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {log.details}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Users by Role */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  Users by Role
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roleData}
                        cx="50%"
                        cy="50%"
                        innerRadius={15}
                        outerRadius={35}
                        dataKey="value"
                      >
                        {roleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Users by Region */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  Users by Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={15}
                        outerRadius={35}
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Users by Status */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  Users by Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={15}
                        outerRadius={35}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* User Activity by Day */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">
                  User Activity by Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
