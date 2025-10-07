import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, CreditCard, TrendingUp, FileText, Settings, BarChart3, CheckCircle, XCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for demonstration
  const stats = [
    {
      title: "Total Applications",
      value: "1,247",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Approved Loans",
      value: "892",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Pending Review",
      value: "156",
      change: "-3%",
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Total Disbursed",
      value: "₹2.4Cr",
      change: "+15%",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const recentApplications = [
    { id: "#APP-001", name: "Rahul Sharma", type: "Education Loan", amount: "₹5,00,000", status: "approved", date: "2024-01-15" },
    { id: "#APP-002", name: "Priya Patel", type: "Personal Loan", amount: "₹2,00,000", status: "pending", date: "2024-01-14" },
    { id: "#APP-003", name: "Amit Kumar", type: "Business Loan", amount: "₹10,00,000", status: "review", date: "2024-01-14" },
    { id: "#APP-004", name: "Sneha Singh", type: "Student Loan", amount: "₹3,50,000", status: "approved", date: "2024-01-13" },
    { id: "#APP-005", name: "Vikram Rao", type: "Education Loan", amount: "₹8,00,000", status: "rejected", date: "2024-01-13" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "review": return "bg-blue-100 text-blue-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary">{stat.title}</p>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Recent Applications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((app, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-semibold text-text-primary">{app.name}</p>
                    <p className="text-sm text-text-secondary">{app.id} • {app.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{app.type}</p>
                    <p className="text-sm text-text-secondary">{app.amount}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(app.status)}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              View All Applications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderApplications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-text-primary">Loan Applications</h2>
        <div className="flex space-x-2">
          <Button variant="outline">Export</Button>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold">Application ID</th>
                  <th className="text-left p-4 font-semibold">Applicant</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Amount</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">{app.id}</td>
                    <td className="p-4 font-medium">{app.name}</td>
                    <td className="p-4">{app.type}</td>
                    <td className="p-4">{app.amount}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </td>
                    <td className="p-4">{app.date}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Review</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-text-primary">User Management</h2>
        <Button>Add User</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">12,456</h3>
            <p className="text-text-secondary">Total Users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">8,932</h3>
            <p className="text-text-secondary">Active Users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">156</h3>
            <p className="text-text-secondary">Inactive Users</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">Reports & Analytics</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Loan Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Approval Rate</span>
                <span className="font-semibold text-green-600">72%</span>
              </div>
              <div className="flex justify-between">
                <span>Average Processing Time</span>
                <span className="font-semibold">24 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Default Rate</span>
                <span className="font-semibold text-red-600">2.1%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>This Month Applications</span>
                <span className="font-semibold">342</span>
              </div>
              <div className="flex justify-between">
                <span>Disbursed Amount</span>
                <span className="font-semibold">₹28.5L</span>
              </div>
              <div className="flex justify-between">
                <span>Growth Rate</span>
                <span className="font-semibold text-green-600">+15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">System Settings</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Loan Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Auto-approval limit</span>
              <span className="font-semibold">₹2,00,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Interest rate range</span>
              <span className="font-semibold">8.33% - 24%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Processing fee</span>
              <span className="font-semibold">₹500</span>
            </div>
            <Button variant="outline" className="w-full">Edit Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Two-factor auth</span>
              <Badge className="bg-green-100 text-green-800">Enabled</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Session timeout</span>
              <span className="font-semibold">30 minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span>IP restrictions</span>
              <Badge className="bg-yellow-100 text-yellow-800">Disabled</Badge>
            </div>
            <Button variant="outline" className="w-full">Edit Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return renderDashboard();
      case "applications": return renderApplications();
      case "users": return renderUsers();
      case "reports": return renderReports();
      case "settings": return renderSettings();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UC</span>
            </div>
            <span className="text-xl font-bold text-text-primary">UniCreds Admin</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "dashboard"
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5" />
                      <span>Dashboard</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("applications")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "applications"
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5" />
                      <span>Applications</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("users")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "users"
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5" />
                      <span>Users</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("reports")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "reports"
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5" />
                      <span>Reports</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "settings"
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </div>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;