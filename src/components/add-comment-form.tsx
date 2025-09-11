'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type StakeholderComment } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  author: z.string().min(2, { message: 'Author must be at least 2 characters.' }),
  provision: z.string().min(2, { message: 'Provision must be at least 2 characters.' }),
  comment: z.string().min(10, { message: 'Comment must be at least 10 characters.' }),
});

type AddCommentFormValues = z.infer<typeof formSchema>;

interface AddCommentFormProps {
  onSubmit: (data: Omit<StakeholderComment, 'id' | 'timestamp'>) => void;
  isSubmitting: boolean;
}

export default function AddCommentForm({ onSubmit, isSubmitting }: AddCommentFormProps) {
  const form = useForm<AddCommentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: '',
      provision: '',
      comment: '',
    },
  });

  const handleFormSubmit = (values: AddCommentFormValues) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Add New Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Tech Innovators Inc." {...field} />
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
                    <FormLabel>Provision / Section</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Section 5.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the stakeholder's full comment here..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Analyzing...' : 'Submit Comment'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
