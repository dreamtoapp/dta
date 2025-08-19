"use client";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
// import { useFormPersistence } from '@/hooks/useFormPersistence';

import Link from '@/components/link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Briefcase, Users, Award, Zap, CheckCircle, ArrowRight, Star } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AttachmentInput from './AttachmentInput';
import { submitApplication } from './actions/submitApplication';

const expertiseAreas = [
  "web-development",
  "mobile-development",
  "ui-ux-design",
  "marketing",
  "quality-assurance",
];

// Zod schema for form validation
const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Invalid phone number"),
  age: z.number().min(18).max(65),
  gender: z.enum(['male', 'female']),
  areaOfExpertise: z.enum([
    'web-development', 'mobile-development', 'ui-ux-design', 'marketing',
    'quality-assurance'
  ]),
  yearsOfExperience: z.number().min(0).max(50),
  aboutYou: z.string().min(10, "About you must be at least 10 characters").max(500, "About you must be less than 500 characters"),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to terms"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
};

export default function ApplyJobPage() {
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("teamApply");

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: 18,
      gender: "male",
      areaOfExpertise: "web-development",
      yearsOfExperience: 0,
      aboutYou: "",
      agreeToTerms: false,
    },
  });

  // Disable form persistence for job applications
  // const { clearSavedData } = useFormPersistence(form, {
  //   key: 'job-application-form',
  //   debounceMs: 1000,
  //   enabled: false, // Disabled to prevent data persistence
  // });

  // Temporary replacement for clearSavedData
  const clearSavedData = () => {
    console.log('Form data cleared');
  };

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Form data:", data);

      // Create FormData for server action
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("age", data.age.toString());
      formData.append("gender", data.gender);
      formData.append("areaOfExpertise", data.areaOfExpertise);
      formData.append("yearsOfExperience", data.yearsOfExperience.toString());
      formData.append("aboutYou", data.aboutYou);
      formData.append("agreeToTerms", data.agreeToTerms.toString());
      formData.append("locale", locale);

      // Add attachment if exists
      if (attachment) {
        formData.append("attachmentName", attachment.name);
        formData.append("attachmentFile", attachment);
      }

      const result = await submitApplication(formData);

      if (result.success) {
        console.log("Application submitted successfully:", result.applicationNumber);
        // Clear saved form data on successful submission
        clearSavedData();
        toast.success("Application submitted successfully!", {
          description: `Application #${result.applicationNumber} has been received.`,
        });
        router.push(`/${locale}/thank-you`);
      } else {
        console.error("Submission failed:", result.message);
        toast.error("Submission failed", {
          description: result.message || "Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Award, title: "رواتب تنافسية", description: "مزايا مالية مميزة" },
    { icon: Users, title: "فريق ديناميكي", description: "بيئة عمل إبداعية" },
    { icon: Zap, title: "تطوير مستمر", description: "فرص نمو مهني" },
    { icon: Star, title: "مشاريع مثيرة", description: "تقنيات متطورة" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced Header Section */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={itemVariants}
          >
            {/* Animated Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-2xl mb-8 shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Briefcase className="w-10 h-10 text-white" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text "
              variants={itemVariants}
            >
              {t("title")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              انضم إلى فريقنا الديناميكي وساعدنا في بناء تجارب رقمية مذهلة. نبحث عن محترفين شغوفين لينموا معنا.
            </motion.p>

            {/* Benefits Cards */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
              variants={itemVariants}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <benefit.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm text-foreground text-center">{benefit.title}</h3>
                  <p className="text-xs text-muted-foreground text-center">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Form Card */}
          <motion.div
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
            variants={cardVariants}
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-6 border-b border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">معلومات التقديم</h2>
                  <p className="text-muted-foreground">املأ النموذج بدقة لضمان مراجعة سريعة</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>حفظ تلقائي</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 lg:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                  {/* Personal Information Section */}
                  <motion.div
                    className="space-y-6"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/80 rounded-full"></div>
                      <h3 className="text-xl font-bold text-foreground">المعلومات الشخصية</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-foreground mb-3 block">
                              {t("name")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                autoComplete="name"
                                className="h-14 px-4 border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white/50 dark:bg-slate-800/50 text-foreground rounded-xl transition-all duration-300 hover:border-slate-300"
                                placeholder="أدخل اسمك الكامل"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email Field */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-foreground mb-3 block">
                              {t("email")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                autoComplete="email"
                                className="h-14 px-4 border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white/50 dark:bg-slate-800/50 text-foreground rounded-xl transition-all duration-300 hover:border-slate-300"
                                placeholder="your.email@example.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Phone Field */}
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-foreground mb-3 block">
                              {t("phone")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                autoComplete="tel"
                                className="h-14 px-4 border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white/50 dark:bg-slate-800/50 text-foreground rounded-xl transition-all duration-300 hover:border-slate-300"
                                placeholder="+966 50 123 4567"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>

                  {/* Professional Information Section */}
                  <motion.div
                    className="space-y-6"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/80 rounded-full"></div>
                      <h3 className="text-xl font-bold text-foreground">المعلومات المهنية</h3>
                    </div>

                    {/* Area of Expertise Field */}
                    <FormField
                      control={form.control}
                      name="areaOfExpertise"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-foreground mb-4 block">
                            مجال التخصص
                          </FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {expertiseAreas.map((area) => (
                                <motion.div
                                  key={area}
                                  className="relative"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <input
                                    type="radio"
                                    id={area}
                                    name="areaOfExpertise"
                                    value={area}
                                    checked={field.value === area}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="sr-only"
                                  />
                                  <label
                                    htmlFor={area}
                                    className={`block p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${field.value === area
                                      ? 'border-primary bg-primary/10 shadow-lg ring-2 ring-primary/20'
                                      : 'border-slate-200 hover:border-slate-300 bg-white/50 dark:bg-slate-800/50'
                                      }`}
                                  >
                                    <div className="flex items-center space-x-4">
                                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${field.value === area
                                        ? 'border-primary bg-primary'
                                        : 'border-slate-300'
                                        }`}>
                                        {field.value === area && (
                                          <CheckCircle className="w-4 h-4 text-white" />
                                        )}
                                      </div>
                                      <div className="flex flex-col">
                                        <span className={`font-semibold ${field.value === area
                                          ? 'text-primary'
                                          : 'text-foreground'
                                          }`}>
                                          {area === 'web-development' && 'تطوير الويب'}
                                          {area === 'mobile-development' && 'تطوير الجوال'}
                                          {area === 'ui-ux-design' && 'تصميم واجهات المستخدم'}
                                          {area === 'marketing' && 'التسويق'}
                                          {area === 'quality-assurance' && 'ضمان الجودة'}
                                        </span>
                                        <div className="flex gap-2 mt-2">
                                          {area === 'web-development' && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                              Next.js
                                            </span>
                                          )}
                                          {area === 'mobile-development' && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                              React Native
                                            </span>
                                          )}
                                          {area === 'ui-ux-design' && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                              Figma
                                            </span>
                                          )}
                                          {area === 'marketing' && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                              Digital
                                            </span>
                                          )}
                                          {area === 'quality-assurance' && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                              Testing
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                </motion.div>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Years of Experience Field */}
                      <FormField
                        control={form.control}
                        name="yearsOfExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-foreground mb-3 block">
                              {t("yearsOfExperience")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                min="0"
                                max="50"
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                className="h-14 px-4 border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white/50 dark:bg-slate-800/50 text-foreground rounded-xl transition-all duration-300 hover:border-slate-300"
                                placeholder="0"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Age Field */}
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-foreground mb-3 block">
                              {t("age")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                min="18"
                                max="65"
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 18)}
                                className="h-14 px-4 border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white/50 dark:bg-slate-800/50 text-foreground rounded-xl transition-all duration-300 hover:border-slate-300"
                                placeholder="25"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Gender Field */}
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-foreground mb-4 block">
                            {t("gender")}
                          </FormLabel>
                          <FormControl>
                            <div className="flex gap-4">
                              {['male', 'female'].map((gender) => (
                                <motion.label
                                  key={gender}
                                  className={`flex items-center space-x-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${field.value === gender
                                    ? 'border-primary bg-primary/10 shadow-lg'
                                    : 'border-slate-200 hover:border-slate-300 bg-white/50 dark:bg-slate-800/50'
                                    }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <input
                                    type="radio"
                                    value={gender}
                                    checked={field.value === gender}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="sr-only"
                                  />
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${field.value === gender
                                    ? 'border-primary bg-primary'
                                    : 'border-slate-300'
                                    }`}>
                                    {field.value === gender && (
                                      <div className="w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                  </div>
                                  <span className={`font-semibold ${field.value === gender
                                    ? 'text-primary'
                                    : 'text-foreground'
                                    }`}>
                                    {t(gender)}
                                  </span>
                                </motion.label>
                              ))}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Additional Information Section */}
                  <motion.div
                    className="space-y-6"
                    variants={itemVariants}
                  >
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/80 rounded-full"></div>
                      <h3 className="text-xl font-bold text-foreground">معلومات إضافية</h3>
                    </div>

                    {/* About You Field */}
                    <FormField
                      control={form.control}
                      name="aboutYou"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-foreground mb-3 block">
                            {t("aboutYou")}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Textarea
                                {...field}
                                className="min-h-[140px] p-4 border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white/50 dark:bg-slate-800/50 text-foreground rounded-xl transition-all duration-300 hover:border-slate-300 resize-none"
                                placeholder={t("aboutYouPlaceholder")}
                              />
                              <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-white/80 dark:bg-slate-800/80 px-3 py-1 rounded-full border">
                                {field.value.length}/500
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Attachment Field */}
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-foreground mb-3 block">
                        {t("attachment")}
                      </FormLabel>
                      <AttachmentInput onFileChange={setAttachment} selectedFile={attachment} />
                    </FormItem>
                  </motion.div>

                  {/* Terms Agreement Field */}
                  <motion.div
                    className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20"
                    variants={itemVariants}
                  >
                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="h-5 w-5 mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-foreground">
                              {t("agreeToTerms")}{' '}
                              <Link
                                href={`/${locale}/team/job-roles`}
                                className="text-primary hover:underline font-semibold"
                              >
                                {t("jobRolesAndTerms")}
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-4 pt-8 border-t border-slate-200 dark:border-slate-700"
                    variants={itemVariants}
                  >
                    {/* Clear Form Button */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        form.reset();
                        clearSavedData();
                        setAttachment(null);
                        toast.success("تم مسح النموذج بنجاح");
                      }}
                      className="px-8 py-4 font-semibold text-lg border-2 border-slate-300 hover:border-red-300 hover:text-red-600 transition-all duration-300 min-h-[64px] rounded-2xl"
                    >
                      مسح النموذج
                    </Button>
                    <Button
                      type="submit"
                      disabled={!form.watch("agreeToTerms") || isSubmitting}
                      size="lg"
                      className="group relative w-full sm:w-auto px-12 py-6 font-bold text-lg bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl transition-all duration-300 hover:scale-105 min-h-[64px] rounded-2xl overflow-hidden"
                    >
                      {/* Button Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                      {/* Button Content */}
                      <div className="relative z-10 flex items-center">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                            {t("submitting")}
                          </>
                        ) : (
                          <>
                            <span>{t("submitApplication")}</span>
                            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </div>
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for background pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
