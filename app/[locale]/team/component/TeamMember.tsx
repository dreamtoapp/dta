import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useTranslations } from 'next-intl';

interface TeamMemberProps {
  name: string;
  image: string;
  expertise: string;
  yearsOfExperience: number;
}

export default function TeamMember({
  name,
  image,
  expertise,
  yearsOfExperience,
}: TeamMemberProps) {
  const t = useTranslations('team');
  return (
    <article
      className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card border border-border flex flex-col h-full"
      aria-label={`Team member card: ${name}`}
    >
      <CardHeader className="p-0 bg-gradient-to-b from-muted/50 to-muted/0 relative" style={{ height: '180px' }}>
        <div className="relative w-full h-[180px] aspect-[4/5] flex items-center justify-center overflow-hidden rounded-b-xl shadow-md image-container">
          <Image
            src={image || "/placeholder.svg"}
            alt={`Portrait of team member ${name}`}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 500px) 100vw, 400px"
            priority
            style={{ aspectRatio: '4/5' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 p-6 gap-2">
        <CardTitle className="text-2xl font-semibold text-foreground mb-1 tracking-tight">{name}</CardTitle>
        <p className="text-lg text-primary font-medium mb-1">{t(expertise)}</p>
        <p className="text-sm text-muted-foreground mb-4">{t('yearsOfExperience', { years: yearsOfExperience })}</p>
        <div className="mt-auto flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="w-full rounded-full font-semibold text-base flex items-center gap-2 py-2 px-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            aria-label={t('viewProfile', { name })}
          >
            <Eye className="text-xl" aria-hidden="true" />
            {t('viewProfileBtn')}
          </Button>
        </div>
      </CardContent>
    </article>
  );
}
