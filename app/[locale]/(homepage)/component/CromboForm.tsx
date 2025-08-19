"use client";

import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { saveCromboData } from "../actions/cromboActions";

interface FormData {
  company: string;
  name: string;
  mobile: string;
  email: string;
  note: string;
}

interface CromboFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function CromboForm({ onSuccess, onError }: CromboFormProps) {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    name: "",
    mobile: "",
    email: "",
    note: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const t = useTranslations("LaunchPage");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (formData.company.length < 2) newErrors.company = t("companyError");
    if (formData.name.length < 2) newErrors.name = t("nameError");
    if (formData.mobile.length < 10) newErrors.mobile = t("mobileError");
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = t("emailError");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await saveCromboData(formData);
      if (result.success) {
        onSuccess();
        setFormData({ company: "", name: "", mobile: "", email: "", note: "" });
      } else {
        if (result.error === "Validation failed") {
          const errorMessages = result.details
            ?.map((err) => err.message)
            .join(", ");
          onError(t("validationErrorMessage", { errors: errorMessages }));
        } else {
          onError(t("errorMessage"));
        }
      }
    } catch (error) {
      console.error(error);
      onError(t("submitErrorMessage"));
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <FormField
          id="company"
          name="company"
          label={t("companyLabel")}
          placeholder={t("companyPlaceholder")}
          value={formData.company}
          onChange={handleChange}
          error={errors.company}
        />
        <FormField
          id="name"
          name="name"
          label={t("nameLabel")}
          placeholder={t("namePlaceholder")}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormField
          id="mobile"
          name="mobile"
          label={t("mobileLabel")}
          placeholder={t("mobilePlaceholder")}
          value={formData.mobile}
          onChange={handleChange}
          error={errors.mobile}
        />
        <FormField
          id="email"
          name="email"
          type="email"
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>
      <div className="space-y-2 flex items-start flex-col">
        <Label className="text-primary" htmlFor="note">
          {t("noteLabel")}
        </Label>
        <Textarea
          id="note"
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder={t("notePlaceholder")}
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground py-4 px-6 sm:px-10 text-base sm:text-lg font-bold rounded-xl shadow-lg transform transition duration-200 ease-in-out hover:scale-105"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          t("submitButton")
        )}
      </Button>
    </form>
  );
}

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}

function FormField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}: FormFieldProps) {
  return (
    <div className="space-y-2 flex items-start flex-col">
      <Label className="text-primary" htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={
          error ? "border-destructive focus:border-destructive ring-destructive" : ""
        }
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
} 