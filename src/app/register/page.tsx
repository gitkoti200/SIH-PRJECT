'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to register user and send OTP
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store user info and phone for OTP verification
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('phoneNumber', phoneNumber);

    toast({
      title: 'OTP Sent',
      description: 'A one-time password has been sent to your device.',
    });

    router.push('/otp');
  };

  return (
    <div className="flex font-sans min-h-screen flex-col items-center justify-center p-4 space-y-8">
      <div className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground">
          <div className="rounded-full bg-primary p-2 text-primary-foreground">
            <Icons.Logo className="h-7 w-7" />
          </div>
          <h1 className="text-3d">Sentiment analysis of reviewed comments</h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to register.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
                disabled={isLoading}
              />
            </div>
             <div className="text-center text-sm">
              Already have an account?{' '}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading || !name || !phoneNumber}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register and Send OTP'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
