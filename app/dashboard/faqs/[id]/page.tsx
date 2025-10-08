import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FAQForm } from '../components/FAQForm';
import { getFAQById } from '../actions/getFAQById';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditFAQPage({ params }: Props) {
  const { id } = await params;
  const result = await getFAQById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit FAQ</h1>
        <p className="text-muted-foreground">
          Update the question and answer in both languages
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>FAQ Details</CardTitle>
          <CardDescription>
            Modify the question and answer in both English and Arabic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FAQForm initialData={result.data} isEditing />
        </CardContent>
      </Card>
    </div>
  );
}
