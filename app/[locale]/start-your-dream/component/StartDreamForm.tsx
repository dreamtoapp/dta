"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { submitStartDream } from "../actions/submitStartDream";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaArrowRight,
  FaGlobe,
  FaMobile,
  FaShoppingCart,
  FaPalette,
  FaChartLine,
  FaEye,
  FaRocket,
  FaCog
} from "react-icons/fa";
import { useTranslations } from "next-intl";

// Enhanced service options with better icons and descriptions
const serviceOptions = [
  {
    value: "web-development",
    icon: FaGlobe,
    key: "serviceWebDevelopment",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20"
  },
  {
    value: "mobile-app",
    icon: FaMobile,
    key: "serviceMobileApp",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20"
  },
  {
    value: "ecommerce",
    icon: FaShoppingCart,
    key: "serviceEcommerce",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20"
  },
  {
    value: "ui-ux",
    icon: FaPalette,
    key: "serviceUIUX",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/20"
  },
  {
    value: "digital-marketing",
    icon: FaChartLine,
    key: "serviceDigitalMarketing",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20"
  },
  {
    value: "visual-identity",
    icon: FaEye,
    key: "serviceVisualIdentity",
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/20"
  },
  {
    value: "other",
    icon: FaCog,
    key: "serviceOther",
    color: "text-gray-500",
    bgColor: "bg-gray-50 dark:bg-gray-950/20"
  }
];

// Updated Zod schema to support multiple service selection
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[0-9]{10,15}$/, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  serviceType: z.array(z.string()).min(1, "Please select at least one service"),
  projectDescription: z.string().min(10, "Project description must be at least 10 characters"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function StartDreamForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const t = useTranslations("startDream");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      serviceType: [],
      projectDescription: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            // Handle array values (serviceType)
            value.forEach(item => formData.append(key, item));
          } else {
            formData.append(key, value);
          }
        }
      });

      const result = await submitStartDream(null, formData);

      if (result.success) {
        setSuccess(true);
        toast.success(result.message || t("successMessage"));
        setTimeout(() => router.push(`/${locale}/thank-you`), 2000);
      } else if (result.errors && Object.keys(result.errors).length > 0) {
        Object.entries(result.errors).forEach(([field, errors]) => {
          if (errors[0]) {
            form.setError(field as keyof FormData, { message: errors[0] });
          }
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Success State */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex flex-col items-center justify-center p-8 mb-8 bg-card border border-border rounded-xl"
            role="status"
            aria-live="polite"
          >
            <div className="relative">
              <FaCheckCircle className="w-16 h-16 text-primary mb-4" aria-hidden="true" />
              <div className="absolute inset-0 w-16 h-16 bg-primary/20 rounded-full animate-ping" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t("successTitle")}</h3>
            <p className="text-muted-foreground text-center">{t("successMessage")}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              {t("redirectingMessage")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" role="form" aria-labelledby="start-dream-form-title">
          {/* Service Selection - Enhanced Multi-Select Checklist */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground mb-4 block">
                    {t("serviceType")} <span className="text-destructive">*</span>
                    <span className="text-xs text-muted-foreground ml-2">({t("selectMultipleServices")})</span>
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {serviceOptions.map((service) => {
                        const Icon = service.icon;
                        const isSelected = field.value.includes(service.value);
                        return (
                          <div
                            key={service.value}
                            className={`relative cursor-pointer group transition-all duration-300 ${isSelected
                              ? 'bg-primary/5'
                              : 'hover:bg-muted/50'
                              }`}
                            onClick={() => {
                              const currentValue = field.value;
                              if (isSelected) {
                                // Remove from selection
                                field.onChange(currentValue.filter(item => item !== service.value));
                              } else {
                                // Add to selection
                                field.onChange([...currentValue, service.value]);
                              }
                            }}
                          >
                            <div className={`
                              p-4 rounded-xl border transition-all duration-300
                              ${isSelected
                                ? 'border-primary/30 bg-primary/5 shadow-sm'
                                : 'border-border hover:border-primary/30 hover:shadow-sm'
                              }
                            `}>
                              <div className="flex flex-col items-center text-center space-y-3">
                                <div className={`
                                  w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300
                                  ${isSelected ? 'bg-primary text-primary-foreground' : service.bgColor}
                                `}>
                                  <Icon className={`w-6 h-6 ${isSelected ? 'text-primary-foreground' : service.color}`} />
                                </div>
                                <span className={`text-sm font-medium transition-colors duration-300 ${isSelected ? 'text-primary' : 'text-foreground'
                                  }`}>
                                  {t(service.key)}
                                </span>
                              </div>

                              {/* Selection indicator */}
                              {isSelected && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                  <FaCheckCircle className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                  {field.value.length > 0 && (
                    <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">
                        {t("selectedServices")} ({field.value.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((selectedService) => {
                          const service = serviceOptions.find(s => s.value === selectedService);
                          if (!service) return null;
                          const Icon = service.icon;
                          return (
                            <div
                              key={selectedService}
                              className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                            >
                              <Icon className="w-3 h-3" />
                              <span>{t(service.key)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </FormItem>
              )}
            />
          </motion.div>

          {/* Personal Information */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      {t("name")} <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="text"
                          autoComplete="name"
                          className="h-12 border-border focus:border-primary focus:ring-primary bg-background transition-colors pl-10"
                          placeholder=" "
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
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
                    <FormLabel className="text-sm font-medium text-foreground">
                      {t("mobile")} <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="tel"
                          autoComplete="tel"
                          className="h-12 border-border focus:border-primary focus:ring-primary bg-background transition-colors pl-10"
                          placeholder=" "
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
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
                  <FormLabel className="text-sm font-medium text-foreground">
                    {t("email")} <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        className="h-12 border-border focus:border-primary focus:ring-primary bg-background transition-colors pl-10"
                        placeholder=" "
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Project Description */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    {t("projectDescription")} <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder={t("projectDescriptionPlaceholder")}
                      className="border-border focus:border-primary focus:ring-primary bg-background resize-none transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Additional Message */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    {t("additionalMessage")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder={t("additionalMessagePlaceholder")}
                      className="border-border focus:border-primary focus:ring-primary bg-background resize-none transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 group"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>{t("sending")}</span>
                </>
              ) : (
                <>
                  <FaRocket className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>{t("startMyDream")}</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              {t("privacyNotice")}
            </p>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}
