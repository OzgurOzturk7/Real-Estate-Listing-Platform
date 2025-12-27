import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, CheckCircle, XCircle, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: string;
  property_type: string;
  status: 'active' | 'pending' | 'rejected';
  owner_name: string;
  created_at: string;
}

export default function AdminProperties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    // Mock data - will be replaced with real Supabase queries
    const mockProperties: Property[] = [
      {
        id: '1',
        title: 'Luxury Sea View Villa - Bodrum',
        location: 'Bodrum, Mugla',
        price: 1250000,
        type: 'sale',
        property_type: 'villa',
        status: 'active',
        owner_name: 'John Smith',
        created_at: '2024-01-15'
      },
      {
        id: '2',
        title: 'Modern 3 Bedroom Apartment - City Center',
        location: 'Istanbul, Sisli',
        price: 450000,
        type: 'sale',
        property_type: 'apartment',
        status: 'active',
        owner_name: 'Jane Doe',
        created_at: '2024-02-10'
      },
      {
        id: '21',
        title: 'New Listing - Pending Approval',
        location: 'Ankara, Cankaya',
        price: 250000,
        type: 'sale',
        property_type: 'apartment',
        status: 'pending',
        owner_name: 'Test User',
        created_at: '2024-05-10'
      }
    ];
    setProperties(mockProperties);
  };

  const handleApprove = async (propertyId: string) => {
    setLoading(true);
    try {
      // Mock action - will be replaced with real Supabase update
      setProperties(properties.map(p => 
        p.id === propertyId ? { ...p, status: 'active' as const } : p
      ));
      toast.success('Property approved');
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (propertyId: string) => {
    setLoading(true);
    try {
      // Mock action - will be replaced with real Supabase update
      setProperties(properties.map(p => 
        p.id === propertyId ? { ...p, status: 'rejected' as const } : p
      ));
      toast.success('Property rejected');
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProperty) return;

    setLoading(true);
    try {
      // Mock action - will be replaced with real Supabase delete
      setProperties(properties.filter(p => p.id !== selectedProperty.id));
      toast.success('Property deleted');
      setShowDeleteDialog(false);
      setSelectedProperty(null);
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.owner_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Management</CardTitle>
        <CardDescription>View and manage all properties</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties (title, location, or owner)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Properties Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <p className="font-medium max-w-[200px] truncate">{property.title}</p>
                  </TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>€{property.price.toLocaleString('en-US')}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(property.status)}</TableCell>
                  <TableCell>{property.owner_name}</TableCell>
                  <TableCell>{new Date(property.created_at).toLocaleDateString('en-US')}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/property/${property.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {property.status === 'pending' && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApprove(property.id)}
                            disabled={loading}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleReject(property.id)}
                            disabled={loading}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedProperty(property);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No properties found
          </div>
        )}
      </CardContent>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedProperty?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}