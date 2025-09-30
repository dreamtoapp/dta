"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createTeamMember } from '../actions/createTeamMember';
import { uploadTeamMemberImageAction } from '../actions/uploadTeamMemberImage';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import AddImage from '../../component/AddImage';

const CreateTeamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['DEVELOPER', 'DESIGNER', 'MARKETING', 'MANAGER']),
  experience: z.string().optional(),
  displayOrder: z.number().default(0),
});

const ROLES = [
  { value: 'DEVELOPER', label: 'Developer' },
  { value: 'DESIGNER', label: 'Designer' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'MANAGER', label: 'Manager' },
];

export default function NewTeamMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [employeeImageFile, setEmployeeImageFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(CreateTeamMemberSchema),
    defaultValues: {
      name: '',
      role: 'DEVELOPER' as const,
      experience: '',
      displayOrder: 0,
    }
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      // Upload image if provided
      let employeeImageUrl = '';
      if (employeeImageFile) {
        const formData = new FormData();
        formData.append('file', employeeImageFile);
        formData.append('teamMemberName', data.name);

        const uploadResult = await uploadTeamMemberImageAction(formData);
        if (uploadResult.success && uploadResult.imageUrl) {
          employeeImageUrl = uploadResult.imageUrl;
        } else {
          toast.error(uploadResult.error);
          return;
        }
      }

      // Create team member with image URL
      const teamMemberData = {
        ...data,
        employeeImage: employeeImageUrl || null
      };

      const result = await createTeamMember(teamMemberData);

      if (result.success) {
        toast.success('Team member created successfully');
        router.push('/dashboard/team');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to create team member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add Team Member</h1>
        <p className="text-muted-foreground mt-1">Create a new team member</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Team Member Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  {...form.register('name')}
                  placeholder="Enter full name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={form.watch('role')}
                  onValueChange={(value) => form.setValue('role', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  {...form.register('experience')}
                  placeholder="e.g., 5 years in web development"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  {...form.register('displayOrder', { valueAsNumber: true })}
                  placeholder="Order on website (0 = first)"
                />
              </div>

              <AddImage
                onImageChange={setEmployeeImageFile}
                selectedImage={employeeImageFile}
                label="Employee Image"
                placeholder="Click to upload employee image"
              />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Team Member'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/team')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
