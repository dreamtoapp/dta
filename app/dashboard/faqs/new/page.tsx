import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FAQForm } from '../components/FAQForm';

export default function NewFAQPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New FAQ</h1>
        <p className="text-muted-foreground">
          Add a new frequently asked question to your website
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>FAQ Details</CardTitle>
          <CardDescription>
            Enter the question and answer in both English and Arabic
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FAQForm />
        </CardContent>
      </Card>
    </div>
  );
}
