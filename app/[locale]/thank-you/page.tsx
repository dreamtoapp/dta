"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaCheckCircle } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";

export default function ThankYouPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("thankyou");
  const gohome = () => {
    router.push(`/${locale}`);
    router.refresh();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-background p-6"
    >
      <Card className="max-w-xl w-full shadow-2xl p-10 rounded-3xl border bg-card text-center">
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            <FaCheckCircle className="w-20 h-20 text-success mb-2" />
            <h1 className="text-3xl font-extrabold text-foreground mb-2">{t("title")}</h1>
            <h2 className="text-lg font-medium text-primary mb-2">{t("subtitle")}</h2>
            <p className="text-muted-foreground text-base mb-4">
              {t("messageMain")}
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              {t("messageSecondary")}
            </p>
            <div>
              <Button
                onClick={gohome}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-lg transition shadow-lg text-lg"
              >
                {t("returnHome")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
