'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function OtpPage() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Basic OTP validation for demonstration
    if (otp === '123456') {
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
    <div className="flex font-body min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">OTP Verification</CardTitle>
          <CardDescription>
            Please enter the 6-digit code sent to your device.
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
