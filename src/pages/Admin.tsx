import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Users, CreditCard, TrendingUp, FileText, Settings, BarChart3, CheckCircle, XCircle, Clock, LogOut, User, Search, Filter, Download, Plus, Edit, Trash2, RefreshCw, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useAuthStore } from "@/lib/auth";
import { useDataStore, type Application } from "@/lib/dataService";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuthStore();
  const { 
    applications, 
    users, 
    analytics, 
    fetchApplications, 
    fetchUsers, 
    updateApplication,
    deleteApplication,
    updateAnalytics,
    isLoading 
  } = useDataStore();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Application>>({});
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    registeredDate: new Date().toISOString().slice(0,10),
    status: "active" as const,
    totalApplications: 0,
    approvedLoans: 0,
    kycStatus: "pending" as const,
    lastActive: new Date().toISOString(),
  });

  // Load data on mount
  useEffect(() => {
    fetchApplications();
    fetchUsers();
    updateAnalytics();
  }, []);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchApplications();
      fetchUsers();
      updateAnalytics();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };

  const handleStatusUpdate = async (appId: string, newStatus: Application['status']) => {
    await updateApplication(appId, { status: newStatus });
    toast({
      title: "Status Updated",
      description: `Application ${appId} status changed to ${newStatus}`,
    });
    fetchApplications();
  };

  const handleDeleteApplication = async (appId: string) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      await deleteApplication(appId);
      toast({
        title: "Application Deleted",
        description: "The application has been removed successfully.",
        variant: "destructive",
      });
      fetchApplications();
    }
  };

  const handleEditApplication = (app: Application) => {
    setEditingApp(app);
    setEditFormData(app);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (editingApp && editFormData) {
      await updateApplication(editingApp.id, editFormData);
      toast({
        title: "Application Updated",
        description: "The application has been updated successfully.",
      });
      setIsEditDialogOpen(false);
      setEditingApp(null);
      setEditFormData({});
      fetchApplications();
    }
  };

  const filteredApplications = useMemo(() => {
    let filtered = [...applications];
    
    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterStatus !== "all") {
      filtered = filtered.filter(app => app.status === filterStatus);
    }
    
    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [applications, searchQuery, filterStatus]);


  // CSV Export
  const exportCsv = () => {
    const rows = [
      ["ID","Name","Email","Phone","Type","Amount","Status","Date"],
      ...filteredApplications.map(a => [a.id, a.name, a.email, a.phone, a.type, a.amount, a.status, a.date])
    ];
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `applications_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const stats = [
    {
      title: "Total Applications",
      value: analytics.totalApplications.toLocaleString(),
      change: `+${Math.round(analytics.monthlyGrowth)}%`,
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Approved Loans",
      value: analytics.approvedLoans.toLocaleString(),
      change: `+${Math.round(analytics.approvalRate)}%`,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Pending Review",
      value: analytics.pendingReview.toLocaleString(),
      change: `${analytics.pendingReview > 0 ? '-' : ''}${Math.round((analytics.pendingReview / Math.max(analytics.totalApplications, 1)) * 100)}%`,
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Total Disbursed",
      value: `₹${(analytics.totalDisbursed / 10000000).toFixed(1)}Cr`,
      change: `+${Math.round(analytics.monthlyGrowth)}%`,
      icon: TrendingUp,
      color: "text-purple-600"
    }
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
            {filteredApplications.slice(0, 5).map((app: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-semibold text-text-primary">{app.name}</p>
                    <p className="text-sm text-text-secondary">{app.id} • {app.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{app.type}</p>
                    <p className="text-sm text-text-secondary">₹{app.amount.toLocaleString()}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(app.status)}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button variant="outline" className="w-full" onClick={() => setActiveTab("applications") }>
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <Input
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="review">Review</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportCsv}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={() => fetchApplications()}
            variant="outline"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-text-primary">Application ID</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Applicant</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Type</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Amount</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Status</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Date</th>
                  <th className="text-left p-4 font-semibold text-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app: any, index: number) => (
                  <tr key={index} className="border-b hover:bg-muted">
                    <td className="p-4 text-text-primary">{app.id}</td>
                    <td className="p-4 font-medium text-text-primary">
                      <div className="flex items-center space-x-2">
                        <span>{app.name}</span>
                        {app.documents && app.documents.length > 0 && (
                          <div className="w-2 h-2 bg-success rounded-full" title={`${app.documents.length} documents uploaded`}></div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary">{app.type}</td>
                    <td className="p-4 text-text-primary">₹{app.amount?.toLocaleString() || 'N/A'}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-text-secondary">{app.date}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditApplication(app)}
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteApplication(app.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
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
        <Button onClick={() => setIsAddUserOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">{users.length.toLocaleString()}</h3>
            <p className="text-text-secondary">Total Users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">{users.filter(u => u.status === 'active').length.toLocaleString()}</h3>
            <p className="text-text-secondary">Active Users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">{users.filter(u => u.status === 'inactive' || u.status === 'suspended').length.toLocaleString()}</h3>
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
                <span className="font-semibold text-green-600">
                  {Math.round(analytics.approvalRate)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Average Processing Time</span>
                <span className="font-semibold">
                  {analytics.processingTime} hours
                </span>
              </div>
              <div className="flex justify-between">
                <span>Conversion Rate</span>
                <span className="font-semibold text-blue-600">{analytics.conversionRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Default Rate</span>
                <span className="font-semibold text-red-600">
                  {Math.round((analytics.rejectedLoans / Math.max(analytics.totalApplications, 1)) * 100)}%
                </span>
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
                <span className="font-semibold">{analytics.totalApplications}</span>
              </div>
              <div className="flex justify-between">
                <span>Disbursed Amount</span>
                <span className="font-semibold">₹{(analytics.totalDisbursed / 100000).toFixed(1)}L</span>
              </div>
              <div className="flex justify-between">
                <span>Page Views</span>
                <span className="font-semibold">{Math.round(Math.random() * 5000 + 1000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Growth Rate</span>
                <span className="font-semibold text-green-600">+{Math.round(analytics.monthlyGrowth)}%</span>
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
            <Button variant="outline" className="w-full" onClick={() => toast({ title: "Edit Loan Settings", description: "This is a placeholder. Hook into backend to save settings." })}>Edit Settings</Button>
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
            <Button
              variant="outline"
              className="w-full"
              onClick={() => toast({ title: "Edit Security Settings", description: "This is a placeholder. Hook into backend to save settings." })}
            >
              Edit Settings
            </Button>
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
      {/* Edit Application Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              View and update the application details and uploaded documents
            </DialogDescription>
          </DialogHeader>
          {editingApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={editFormData.name || ''}
                    onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    value={editFormData.email || ''}
                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={editFormData.phone || ''}
                    onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    value={editFormData.amount || ''}
                    onChange={(e) => setEditFormData({...editFormData, amount: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={editFormData.status}
                    onValueChange={(value: Application['status']) => 
                      setEditFormData({...editFormData, status: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Type</Label>
                  <Select
                    value={editFormData.type}
                    onValueChange={(value: Application['type']) => 
                      setEditFormData({...editFormData, type: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Education Loan">Education Loan</SelectItem>
                      <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                      <SelectItem value="Business Loan">Business Loan</SelectItem>
                      <SelectItem value="Student Loan">Student Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={editFormData.notes || ''}
                  onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
                  rows={3}
                />
              </div>
              
              {/* Documents Section */}
              {editingApp && editingApp.documents && editingApp.documents.length > 0 && (
                <div className="mt-6">
                  <Label className="text-base font-semibold">Uploaded Documents</Label>
                  <div className="mt-3 space-y-3">
                    {editingApp.documents.map((doc: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-text-primary">{doc.name}</p>
                            <p className="text-xs text-text-secondary">
                              {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)} • {(doc.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-text-secondary">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-text-secondary hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </Link>
            <div className="flex items-center">
              <span className="text-2xl font-normal text-transparent bg-gradient-primary bg-clip-text tracking-wide font-logo">
                Fundineed
              </span>
              <span className="text-xl font-bold text-text-primary ml-2">Admin</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-text-secondary hover:text-primary">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">{user?.name || 'Admin'}</p>
                <p className="text-xs text-text-secondary">{user?.role || 'Administrator'}</p>
              </div>
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-text-secondary" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
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
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-text-primary"
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
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-text-primary"
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
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-text-primary"
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
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-text-primary"
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
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-text-primary"
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

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a user record for tracking.</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={newUser.status} onValueChange={(v: any) => setNewUser({ ...newUser, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
            <Button onClick={async () => {
              // @ts-ignore addUser exists in store
              const created = await (useDataStore.getState() as any).addUser(newUser);
              toast({ title: "User Added", description: created.email });
              setIsAddUserOpen(false);
            }}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;