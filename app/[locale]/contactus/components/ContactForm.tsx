"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { submitContact } from "../actions/submitContact";
import { motion } from "framer-motion";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaRegComments,
  FaCheckCircle,
  FaRocket
} from "react-icons/fa";
import { useTranslations } from "next-intl";

// Zod schema for form validation
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[0-9]{10,15}$/, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm({ locale }: { locale: string }) {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const t = useTranslations("contact");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("mobile", data.mobile);
      formData.append("email", data.email);
      formData.append("message", data.message);

      const result = await submitContact(null, formData);

      if (result.success) {
        setSuccess(true);
        toast.success(t("formSuccess"));
        form.reset();
      } else {
        toast.error(result.message || t("formError"));
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, errors]) => {
            form.setError(field as keyof FormData, {
              type: "server",
              message: errors[0],
            });
          });
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(t("formError"));
    } finally {
      setIsPending(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="bg-card border border-border rounded-lg p-8">
          <FaCheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {t("successTitle")}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t("successMessage")}
          </p>
          <Button
            onClick={() => setSuccess(false)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {t("sendAnotherMessage")}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FaUser className="w-4 h-4 text-primary" />
                    {t("name")} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("namePlaceholder")}
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FaPhone className="w-4 h-4 text-primary" />
                    {t("mobile")} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("mobilePlaceholder")}
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FaEnvelope className="w-4 h-4 text-primary" />
                  {t("email")} *
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FaRegComments className="w-4 h-4 text-primary" />
                  {t("message")} *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("messagePlaceholder")}
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                {t("sending")}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <FaRocket className="w-4 h-4" />
                {t("sendMessage")}
              </div>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
} 