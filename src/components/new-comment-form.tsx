
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { Icons } from './icons';

const formSchema = z.object({
  author: z.string().min(2, { message: 'Author must be at least 2 characters.' }),
  provision: z.string().min(2, { message: 'Provision must be at least 2 characters.' }),
  comment: z.string().min(10, { message: 'Comment must be at least 10 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

interface NewCommentFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

export default function NewCommentForm({ onSubmit }: NewCommentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: '',
      provision: '',
      comment: '',
    },
  });

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    await onSubmit(data);
    form.reset();
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Icons.Comment className="h-6 w-6" />
            Submit a New Comment
        </CardTitle>
        <CardDescription>
          Add a new stakeholder comment for analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Tech Innovators Inc." {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="provision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provision</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Section 5.1" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the stakeholder comment here..."
                      className="resize-none"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Submit and Analyze'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
