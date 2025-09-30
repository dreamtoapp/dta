"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { registerInfluencer } from "../actions/registerInfluencer"

// ============================================================================
// ZOD VALIDATION SCHEMA
// ============================================================================

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  category: z.enum([
    "LIFESTYLE", "FASHION", "BEAUTY", "TECH", "GAMING",
    "FOOD", "TRAVEL", "FITNESS", "BUSINESS", "EDUCATION",
    "ENTERTAINMENT", "SPORTS", "ART", "MUSIC", "PHOTOGRAPHY"
  ], { required_error: "Please select a category" }),
  location: z.enum([
    "Riyadh, Saudi Arabia",
    "Dubai, UAE",
    "Jeddah, Saudi Arabia",
    "Cairo, Egypt",
    "Alexandria, Egypt"
  ], { required_error: "Please select a location" }),
  totalFollowers: z.coerce.number().min(1000, "Minimum 1000 followers required"),
})

type FormData = z.infer<typeof schema>

// ============================================================================
// COMPONENT
// ============================================================================

interface InfluencerRegistrationFormProps {
  locale: string
}

const InfluencerRegistrationForm: React.FC<InfluencerRegistrationFormProps> = ({ locale }) => {
  const isArabic = locale === 'ar'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [referenceId, setReferenceId] = useState<string>("")
  const [error, setError] = useState<string>("")

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      totalFollowers: 0,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError("")

    try {
      // Call server action
      const result = await registerInfluencer({
        ...data,
        locale
      })

      if (result.success) {
        setIsSuccess(true)
        setReferenceId(result.referenceId || "")
        form.reset()
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError(isArabic
        ? 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.'
        : 'An error occurred during registration. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Category options with bilingual labels
  const categories = {
    LIFESTYLE: isArabic ? "نمط الحياة" : "Lifestyle",
    FASHION: isArabic ? "أزياء" : "Fashion",
    BEAUTY: isArabic ? "جمال" : "Beauty",
    TECH: isArabic ? "تقنية" : "Tech",
    GAMING: isArabic ? "ألعاب" : "Gaming",
    FOOD: isArabic ? "طعام" : "Food",
    TRAVEL: isArabic ? "سفر" : "Travel",
    FITNESS: isArabic ? "لياقة بدنية" : "Fitness",
    BUSINESS: isArabic ? "أعمال" : "Business",
    EDUCATION: isArabic ? "تعليم" : "Education",
    ENTERTAINMENT: isArabic ? "ترفيه" : "Entertainment",
    SPORTS: isArabic ? "رياضة" : "Sports",
    ART: isArabic ? "فن" : "Art",
    MUSIC: isArabic ? "موسيقى" : "Music",
    PHOTOGRAPHY: isArabic ? "تصوير" : "Photography",
  }

  // Location options (predefined cities)
  const locations = [
    'Riyadh, Saudi Arabia',
    'Dubai, UAE',
    'Jeddah, Saudi Arabia',
    'Cairo, Egypt',
    'Alexandria, Egypt',
  ]

  if (isSuccess) {
    return (
      <Card className="border-border/50 shadow-lg">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h3 className="text-2xl font-bold mb-2">
            {isArabic ? 'تم التسجيل بنجاح!' : 'Registration Successful!'}
          </h3>
          {referenceId && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
              <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                {isArabic ? 'رقم المرجع: ' : 'Reference ID: '}{referenceId}
              </p>
            </div>
          )}
          <p className="text-muted-foreground mb-2">
            {isArabic
              ? 'شكراً لتسجيلك! سيتواصل معك فريقنا خلال 48 ساعة للتحقق من حسابك.'
              : 'Thank you for registering! Our team will contact you within 48 hours to verify your account.'}
          </p>
          <p className="text-sm text-muted-foreground">
            {isArabic
              ? 'تم إرسال بريد إلكتروني للتأكيد.'
              : 'A confirmation email has been sent.'}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isArabic ? 'نموذج التسجيل' : 'Registration Form'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isArabic ? 'الاسم الكامل' : 'Full Name'}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      {...field}
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
                  <FormLabel>{isArabic ? 'البريد الإلكتروني' : 'Email Address'}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={isArabic ? 'example@example.com' : 'your@email.com'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field (Optional) */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isArabic ? 'رقم الهاتف (اختياري)' : 'Phone Number (Optional)'}</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder={isArabic ? '+966XXXXXXXXX' : '+1234567890'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio Field */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isArabic ? 'نبذة عنك' : 'Bio'}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={isArabic ? 'أخبرنا عن نفسك وعن محتواك...' : 'Tell us about yourself and your content...'}
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isArabic ? 'المجال' : 'Category'}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isArabic ? 'اختر المجال' : 'Select category'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(categories).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isArabic ? 'الموقع' : 'Location'}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={isArabic ? 'اختر الموقع' : 'Select location'} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Followers Field */}
            <FormField
              control={form.control}
              name="totalFollowers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{isArabic ? 'إجمالي المتابعين' : 'Total Followers'}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={isArabic ? 'مثال: 50000' : 'e.g., 50000'}
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
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isArabic ? 'جاري الإرسال...' : 'Submitting...'}
                </>
              ) : (
                isArabic ? 'إرسال الطلب' : 'Submit Application'
              )}
            </Button>

            {/* Error Display */}
            {form.formState.errors && Object.keys(form.formState.errors).length > 0 && (
              <div className="text-sm text-red-600 text-center">
                {isArabic ? 'يرجى تصحيح الأخطاء أعلاه' : 'Please correct the errors above'}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default InfluencerRegistrationForm
