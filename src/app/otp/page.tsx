'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Icons } from '@/components/icons';

export default function OtpPage() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  
  useEffect(() => {
    const storedPhoneNumber = sessionStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    } else {
        // If there's no phone number, we shouldn't be here.
        router.push('/login');
    }
  }, [router]);


  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Basic OTP validation for demonstration
    if (otp === '123456') {
      sessionStorage.setItem('isAuthenticated', 'true');
      toast({
        title: 'Success',
        description: 'Your OTP has been verified successfully.',
      });
      // Redirect to the dashboard on successful verification
      router.push('/');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid OTP. Please try again.',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex font-sans min-h-screen flex-col items-center justify-center p-4 space-y-8">
      <div className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-foreground">
          <div className="rounded-full bg-primary p-2 text-primary-foreground">
            <Icons.Logo className="h-7 w-7" />
          </div>
          <h1 className="text-3d font-logo text-4xl">Sentiment analysis of reviewed comments</h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">OTP Verification</CardTitle>
          <CardDescription>
            Please enter the 6-digit code sent to {phoneNumber}.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleVerify}>
          <CardContent>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              maxLength={6}
              className="text-center text-lg tracking-[0.5em]"
              required
              disabled={isLoading}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
