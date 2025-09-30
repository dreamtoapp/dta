"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { getTeamMemberById } from '../actions/getTeamMemberById';
import { updateTeamMember } from '../actions/updateTeamMember';
import { uploadTeamMemberImageAction } from '../actions/uploadTeamMemberImage';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import AddImage from '../../component/AddImage';

const UpdateTeamMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['DEVELOPER', 'DESIGNER', 'MARKETING', 'MANAGER']),
  experience: z.string().optional(),
  displayOrder: z.number(),
  isActive: z.boolean(),
  employeeImage: z.string().optional(),
});

const ROLES = [
  { value: 'DEVELOPER', label: 'Developer' },
  { value: 'DESIGNER', label: 'Designer' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'MANAGER', label: 'Manager' },
];

export default function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [teamMember, setTeamMember] = useState<any>(null);
  const [employeeImageFile, setEmployeeImageFile] = useState<File | null | undefined>(undefined);
  const [imageRemoved, setImageRemoved] = useState(false);

  const form = useForm({
    resolver: zodResolver(UpdateTeamMemberSchema),
    defaultValues: {
      id: '',
      name: '',
      role: 'DEVELOPER' as const,
      experience: '',
      displayOrder: 0,
      isActive: true,
      employeeImage: '',
    }
  });

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      loadTeamMemberData(resolvedParams.id);
    };
    loadData();
  }, [params]);

  const loadTeamMemberData = async (id: string) => {
    try {
      const result = await getTeamMemberById(id);
      if (result.success && result.data) {
        setTeamMember(result.data);
        form.reset({
          id: result.data.id,
          name: result.data.name,
          role: result.data.role,
          experience: result.data.experience || '',
          displayOrder: result.data.displayOrder,
          isActive: result.data.isActive,
          employeeImage: result.data.employeeImage || '',
        });
      } else {
        toast.error(result.error);
        router.push('/dashboard/team');
      }
    } catch (error) {
      toast.error('Failed to load team member data');
      router.push('/dashboard/team');
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      // Handle image upload or removal
      let employeeImageUrl = teamMember.employeeImage || '';

      if (employeeImageFile && employeeImageFile instanceof File) {
        // Upload new image
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
      } else if (employeeImageFile === null || imageRemoved) {
        // Image was removed (null means user clicked remove button)
        employeeImageUrl = '';
      }

      // Update team member with image URL
      const updatedData = {
        ...data,
        employeeImage: employeeImageUrl
      };

      const result = await updateTeamMember(updatedData);

      if (result.success) {
        toast.success('Team member updated successfully');
        setEmployeeImageFile(undefined); // Clear the file state
        setImageRemoved(false); // Reset image removed state
        router.push('/dashboard/team');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to update team member');
    } finally {
      setLoading(false);
    }
  };

  if (!teamMember) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Team Member</h1>
        <p className="text-muted-foreground mt-1">Update team member information</p>
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={form.watch('isActive')}
                  onCheckedChange={(checked) => form.setValue('isActive', checked)}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <AddImage
                onImageChange={(file) => {
                  setEmployeeImageFile(file);
                  if (file === null) {
                    setImageRemoved(true);
                  } else {
                    setImageRemoved(false);
                  }
                }}
                selectedImage={employeeImageFile === undefined ? null : employeeImageFile}
                currentImageUrl={imageRemoved ? null : teamMember.employeeImage}
                label="Employee Image"
                placeholder="Click to upload employee image"
              />
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Team Member'}
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
