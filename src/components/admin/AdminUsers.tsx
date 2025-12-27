import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Ban, CheckCircle, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
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

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  status: 'active' | 'blocked';
  created_at: string;
  properties_count: number;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    // Mock data - will be replaced with real Supabase queries
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'ahmet@bestate.com',
        name: 'Ahmet Yılmaz',
        phone: '+90 532 123 4567',
        role: 'user',
        status: 'active',
        created_at: '2024-01-15',
        properties_count: 5
      },
      {
        id: '2',
        email: 'ayse@bestate.com',
        name: 'Ayşe Demir',
        phone: '+90 533 234 5678',
        role: 'user',
        status: 'active',
        created_at: '2024-02-10',
        properties_count: 7
      },
      {
        id: '3',
        email: 'mehmet@bestate.com',
        name: 'Mehmet Kaya',
        phone: '+90 534 345 6789',
        role: 'user',
        status: 'active',
        created_at: '2024-03-05',
        properties_count: 8
      },
      {
        id: '4',
        email: 'test@example.com',
        name: 'Test User',
        phone: '+90 535 456 7890',
        role: 'user',
        status: 'blocked',
        created_at: '2024-04-01',
        properties_count: 0
      }
    ];
    setUsers(mockUsers);
  };

  const handleBlockUser = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      // Mock action - will be replaced with real Supabase update
      const newStatus = selectedUser.status === 'active' ? 'blocked' : 'active';
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { ...u, status: newStatus } : u
      ));
      
      toast.success(
        newStatus === 'blocked' 
          ? 'Kullanıcı başarıyla engellendi' 
          : 'Kullanıcı engeli kaldırıldı'
      );
      setShowBlockDialog(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error('İşlem başarısız oldu');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kullanıcı Yönetimi</CardTitle>
        <CardDescription>Tüm kullanıcıları görüntüleyin ve yönetin</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Kullanıcı ara (isim veya email)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kullanıcı</TableHead>
                <TableHead>İletişim</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>İlan Sayısı</TableHead>
                <TableHead>Kayıt Tarihi</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3" />
                      {user.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'Admin' : 'Kullanıcı'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                      {user.status === 'active' ? 'Aktif' : 'Engelli'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.properties_count}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString('tr-TR')}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={user.status === 'active' ? 'destructive' : 'default'}
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowBlockDialog(true);
                      }}
                    >
                      {user.status === 'active' ? (
                        <>
                          <Ban className="h-4 w-4 mr-1" />
                          Engelle
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Aktifleştir
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Kullanıcı bulunamadı
          </div>
        )}
      </CardContent>

      {/* Block/Unblock Dialog */}
      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedUser?.status === 'active' ? 'Kullanıcıyı Engelle' : 'Engeli Kaldır'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser?.status === 'active'
                ? `${selectedUser?.name} adlı kullanıcıyı engellemek istediğinizden emin misiniz? Kullanıcı platforma giriş yapamayacak.`
                : `${selectedUser?.name} adlı kullanıcının engelini kaldırmak istediğinizden emin misiniz?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={handleBlockUser} disabled={loading}>
              {loading ? 'İşleniyor...' : 'Onayla'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}