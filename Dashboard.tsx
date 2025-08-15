import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Notifications from '@/components/Notifications';
import LineChart from '@/components/LineChart';
import { useHealthData } from '@/hooks/useHealthData';
import {
  Shield,
  Activity,
  AlertTriangle,
  TrendingUp,
  Users,
  Heart,
  Brain,
  Moon,
  Target,
  Bell,
  BarChart3,
  UserPlus,
  Settings,
  LogOut,
  Menu,
  Search,
  Filter,
  Weight,
  Thermometer
} from 'lucide-react';
import { cn } from '@/lib/utils';

type UserRole = 'soldier' | 'officer' | 'admin';

interface DashboardProps {
  userRole?: UserRole;
}

export default function Dashboard({ userRole = 'soldier' }: DashboardProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { getLatestMetrics, getHealthTrends } = useHealthData();

  const latestMetrics = getLatestMetrics();
  const healthTrends = getHealthTrends();

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'default';
      default: return 'outline';
    }
  };

  const navigation = {
    soldier: [
      { name: 'Dashboard', href: '/dashboard', icon: BarChart3, current: true },
      { name: 'Health Log', href: '/health', icon: Heart },
      { name: 'Mood Tracker', href: '/mood', icon: Brain },
      { name: 'My Profile', href: '/profile', icon: Users },
      { name: 'Risk Assessment', href: '/risk', icon: AlertTriangle },
    ],
    officer: [
      { name: 'Dashboard', href: '/dashboard', icon: BarChart3, current: true },
      { name: 'Team Overview', href: '/team', icon: Users },
      { name: 'Alerts', href: '/alerts', icon: Bell },
      { name: 'Risk Analysis', href: '/risk-analysis', icon: TrendingUp },
      { name: 'Reports', href: '/reports', icon: Target },
    ],
    admin: [
      { name: 'Dashboard', href: '/dashboard', icon: BarChart3, current: true },
      { name: 'User Management', href: '/users', icon: UserPlus },
      { name: 'System Settings', href: '/settings', icon: Settings },
      { name: 'Security Logs', href: '/security', icon: Shield },
      { name: 'Analytics', href: '/analytics', icon: TrendingUp },
    ]
  };

  const renderSoldierDashboard = () => (
    <div className="space-y-6">
      {/* Personal Health Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getRiskColor(latestMetrics.riskLevel)}`}>{latestMetrics.riskLevel}</div>
            <p className="text-xs text-muted-foreground">Based on recent metrics</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/10</div>
            <Progress value={30} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
            <Moon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestMetrics.sleepHours}h</div>
            <p className="text-xs text-muted-foreground">Last night</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestMetrics.heartRate} BPM</div>
            <p className="text-xs text-muted-foreground">Resting rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Check-in</CardTitle>
            <CardDescription>Log your current mood and stress levels</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link to="/mood">
                <Brain className="mr-2 h-4 w-4" />
                Start Mood Tracker
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Metrics</CardTitle>
            <CardDescription>Upload today's health data</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/health">
                <Heart className="mr-2 h-4 w-4" />
                Log Health Data
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Health Trends Charts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Health Trends</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-destructive" />
                <span>Heart Rate Trends</span>
              </CardTitle>
              <CardDescription>Track your heart rate over time</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={healthTrends.heartRate}
                title="Heart Rate (BPM)"
                color="#ef4444"
                height={250}
                width={350}
                yAxisLabel="BPM"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Thermometer className="h-5 w-5 text-warning" />
                <span>Temperature Trends</span>
              </CardTitle>
              <CardDescription>Monitor body temperature patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={healthTrends.temperature}
                title="Temperature (°F)"
                color="#f59e0b"
                height={250}
                width={350}
                yAxisLabel="°F"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Weight className="h-5 w-5 text-primary" />
                <span>Weight Trends</span>
              </CardTitle>
              <CardDescription>Track weight changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={healthTrends.weight}
                title="Weight (lbs)"
                color="#3b82f6"
                height={250}
                width={350}
                yAxisLabel="lbs"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Moon className="h-5 w-5 text-primary" />
                <span>Sleep Trends</span>
              </CardTitle>
              <CardDescription>Monitor sleep quality patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={healthTrends.sleepHours}
                title="Sleep Hours"
                color="#8b5cf6"
                height={250}
                width={350}
                yAxisLabel="Hours"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderOfficerDashboard = () => (
    <div className="space-y-6">
      {/* Team Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Personnel</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Active soldiers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">2</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">5</div>
            <p className="text-xs text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Health</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">87%</div>
            <p className="text-xs text-muted-foreground">Overall wellness</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>High-priority notifications requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert className="border-destructive/50">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>High Stress Alert - Soldier ID: 1247</AlertTitle>
              <AlertDescription>
                Extreme stress levels detected. Last reported: 9/10. Immediate intervention recommended.
              </AlertDescription>
            </Alert>
            <Alert className="border-warning/50">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Sleep Deprivation - Soldier ID: 2891</AlertTitle>
              <AlertDescription>
                Less than 4 hours sleep for 3 consecutive nights. Monitor closely.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Team Status Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Status</CardTitle>
            <CardDescription>Current risk levels and recent activity</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { id: '1247', name: 'Johnson, M.', risk: 'High', lastUpdate: '2 min ago' },
              { id: '2891', name: 'Smith, J.', risk: 'Medium', lastUpdate: '15 min ago' },
              { id: '3456', name: 'Davis, R.', risk: 'Low', lastUpdate: '1 hour ago' },
              { id: '4567', name: 'Wilson, K.', risk: 'Low', lastUpdate: '3 hours ago' },
            ].map((soldier) => (
              <div key={soldier.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-sm font-medium">{soldier.name}</div>
                  <div className="text-xs text-muted-foreground">ID: {soldier.id}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={getRiskBadgeVariant(soldier.risk)}>{soldier.risk}</Badge>
                  <div className="text-xs text-muted-foreground">{soldier.lastUpdate}</div>
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Events</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions for Admin */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Add, modify, or remove system users</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <UserPlus className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>Update system settings and thresholds</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Configure System
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Audit</CardTitle>
            <CardDescription>Review access logs and security events</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Shield className="mr-2 h-4 w-4" />
              View Audit Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center h-16 px-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F60cdc2c3654f4b1da87b8e1f0e135240%2F2e886e3f8ca84ad78c1c5050c85fc3ce?format=webp&width=800"
                alt="VitalOps Logo"
                className="h-8 w-8 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold">VitalOps</h1>
              <p className="text-xs text-muted-foreground">Vital Operations</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation[userRole].map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  item.current
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-3 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            onClick={() => navigate('/')}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold">
                {userRole === 'soldier' ? 'Personal Dashboard' : 
                 userRole === 'officer' ? 'Command Dashboard' : 
                 'Administration Dashboard'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {userRole === 'soldier' ? 'Monitor your health and wellness' :
                 userRole === 'officer' ? 'Oversee team health and alerts' :
                 'Manage system and users'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="capitalize">{userRole}</Badge>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {userRole === 'soldier' && renderSoldierDashboard()}
          {userRole === 'officer' && renderOfficerDashboard()}
          {userRole === 'admin' && renderAdminDashboard()}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
