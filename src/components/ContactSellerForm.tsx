import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Mail, Phone, User } from 'lucide-react';

interface ContactSellerFormProps {
  propertyId: string;
  propertyTitle: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone?: string;
}

export default function ContactSellerForm({
  propertyId,
  propertyTitle,
  sellerId,
  sellerName,
  sellerEmail,
  sellerPhone,
}: ContactSellerFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.firstName || '',
    email: user?.email || '',
    phone: '',
    message: `I'm interested in the property: ${propertyTitle}`,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to contact the seller');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('app_2ea33eecc0_messages').insert({
        property_id: propertyId,
        sender_id: user.id,
        recipient_id: sellerId,
        subject: `Inquiry about: ${propertyTitle}`,
        message: `${formData.message}\n\nContact Info:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}`,
      });

      if (error) throw error;

      toast.success('Message sent successfully!');
      setFormData({
        ...formData,
        message: `I'm interested in the property: ${propertyTitle}`,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Seller</CardTitle>
        <CardDescription>Send a message to the property owner</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Seller Info */}
        <div className="mb-6 space-y-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{sellerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{sellerEmail}</span>
          </div>
          {sellerPhone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{sellerPhone}</span>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Your Phone (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading || !user}>
            {loading ? 'Sending...' : user ? 'Send Message' : 'Sign in to Contact'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}