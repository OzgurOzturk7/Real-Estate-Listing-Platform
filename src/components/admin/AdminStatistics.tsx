import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface MonthlyData {
  month: string;
  users: number;
  properties: number;
}

interface PropertyTypeData {
  month: string;
  sale: number;
  rent: number;
}

interface TypeDistribution {
  name: string;
  value: number;
}

interface LocationData {
  location: string;
  count: number;
}

export default function AdminStatistics() {
  const [userGrowthData, setUserGrowthData] = useState<MonthlyData[]>([]);
  const [propertyData, setPropertyData] = useState<PropertyTypeData[]>([]);
  const [typeDistribution, setTypeDistribution] = useState<TypeDistribution[]>([]);
  const [locationData, setLocationData] = useState<LocationData[]>([]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    // Mock data - will be replaced with real Supabase queries
    
    // User growth over time
    setUserGrowthData([
      { month: 'Jan', users: 45, properties: 89 },
      { month: 'Feb', users: 62, properties: 112 },
      { month: 'Mar', users: 78, properties: 145 },
      { month: 'Apr', users: 95, properties: 198 },
      { month: 'May', users: 120, properties: 256 },
      { month: 'Jun', users: 156, properties: 342 }
    ]);

    // Property listings by month
    setPropertyData([
      { month: 'Jan', sale: 65, rent: 24 },
      { month: 'Feb', sale: 82, rent: 30 },
      { month: 'Mar', sale: 105, rent: 40 },
      { month: 'Apr', sale: 142, rent: 56 },
      { month: 'May', sale: 185, rent: 71 },
      { month: 'Jun', sale: 245, rent: 97 }
    ]);

    // Property type distribution
    setTypeDistribution([
      { name: 'Apartment', value: 145 },
      { name: 'Villa', value: 78 },
      { name: 'House', value: 92 },
      { name: 'Land', value: 27 }
    ]);

    // Top locations
    setLocationData([
      { location: 'Istanbul', count: 128 },
      { location: 'Ankara', count: 65 },
      { location: 'Izmir', count: 52 },
      { location: 'Antalya', count: 48 },
      { location: 'Bodrum', count: 35 },
      { location: 'Other', count: 14 }
    ]);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="growth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>

        {/* Growth Tab */}
        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User and Property Growth</CardTitle>
              <CardDescription>Last 6 months user and property growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} name="Users" />
                  <Line type="monotone" dataKey="properties" stroke="#82ca9d" strokeWidth={2} name="Properties" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Types</CardTitle>
              <CardDescription>For sale and for rent property counts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={propertyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sale" fill="#8884d8" name="For Sale" />
                  <Bar dataKey="rent" fill="#82ca9d" name="For Rent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution Tab */}
        <TabsContent value="distribution" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Property Type Distribution</CardTitle>
                <CardDescription>Distribution by property type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={typeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {typeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Location Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Location Distribution</CardTitle>
                <CardDescription>Cities with most properties</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={locationData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="location" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" name="Property Count" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Property Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€485,000</div>
            <p className="text-xs text-muted-foreground">For sale properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Rent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€1,850</div>
            <p className="text-xs text-muted-foreground">Monthly rent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Most Active City</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Istanbul</div>
            <p className="text-xs text-muted-foreground">128 active properties</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}