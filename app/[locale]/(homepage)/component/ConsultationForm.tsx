"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useTranslations } from 'next-intl';
import { submitConsultationRequest } from "../actions/consultationActions";

interface Props {
  onSubmit?: (data: any) => void;
}

export default function ConsultationForm({ onSubmit }: Props) {
  const t = useTranslations('consultationCTA');
  const tHomepage = useTranslations('homepage');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  // Client-side validation schema with translations
  const ClientValidationSchema = z.object({
    name: z.string().min(2, t('validationName')),
    email: z.string().email(t('validationEmail')),
    phone: z.string().min(10, t('validationPhone')),
    service: z.string().min(1, t('validationService')),
    message: z.string().min(10, t('validationMessage')),
  });

  type FormData = z.infer<typeof ClientValidationSchema>;

  const services = [
    t('serviceNewProjects'),
    t('serviceCurrentProjects'),
    t('serviceDigitalMarketing'),
    t('serviceCompetitorAnalysis'),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors({});

    const formData = { name, email, phone, service, message };

    try {
      // Client-side validation with Zod
      const validatedData = ClientValidationSchema.parse(formData);

      const result = await submitConsultationRequest(validatedData);

      if (result.success) {
        setSent(true);
        onSubmit?.(validatedData);
        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setService("تقييم المشروع الحالي");
        setMessage("");
      } else {
        if (result.errors) {
          setValidationErrors(result.errors as Record<string, string[]>);
        } else {
          setError(result.message || "حدث خطأ أثناء إرسال الطلب");
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setValidationErrors(err.flatten().fieldErrors as Record<string, string[]>);
      } else {
        console.error(err);
        setError("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg ring-1 ring-gray-100 dark:ring-gray-800" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* LEFT: Illustration & value props */}
        <div className="md:col-span-1 flex flex-col gap-4 items-start">
          <div className="w-full">
            <div className="rounded-xl overflow-hidden bg-gradient-to-tr from-indigo-600 to-purple-500 p-4 text-white">
              <h3 className="text-xl font-semibold">{t('title')}</h3>
              <p className="mt-2 text-sm opacity-90">{t('description')}</p>
            </div>
          </div>

          <ul className="mt-3 space-y-3 w-full">
            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12l4 4L19 6" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div className="font-medium">{tHomepage('freeServicesTitle')}</div>
                <div className="text-sm opacity-80">{tHomepage('freeServicesDescription')}</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="#10B981" strokeWidth="2" />
                <path d="M9 12l2 2 4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <div className="font-medium">{tHomepage('professionalApproachTitle')}</div>
                <div className="text-sm opacity-80">{tHomepage('professionalApproachDescription')}</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#F59E0B" strokeWidth="2" />
                <path d="M8 12h8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div>
                <div className="font-medium">{tHomepage('compatibleWithBusinessTitle')}</div>
                <div className="text-sm opacity-80">{tHomepage('compatibleWithBusinessDescription')}</div>
              </div>
            </li>
          </ul>

          <div className="mt-4 text-xs text-gray-500">✨ {tHomepage('detailedPlanCta')}</div>
        </div>

        {/* RIGHT: Form */}
        <div className="md:col-span-2 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          {sent ? (
            <div className="flex flex-col items-center justify-center gap-4 p-6">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 13l4 4L19 7" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h4 className="text-lg font-semibold">تم استلام طلب الاستشارة بنجاح!</h4>
              <p className="text-sm opacity-80 text-center">شكرًا لثقتك بنا 🙏، سيقوم فريقنا بمراجعة طلبك والتواصل معك خلال 48 ساعة عمل.</p>
              <p className="text-sm opacity-80 text-center mt-2">في حال وجود ضغط على الطلبات وتأخرنا بالرد، يمكنك التواصل مباشرة عبر واتساب:</p>
              <p className="text-sm font-medium text-center mt-1 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+966554113107'}
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setError(null);
                  setValidationErrors({});
                }}
                className="mt-3 px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
              >
                أرسل طلب آخر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium">{t('name')}</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('name')}
                    className={`mt-1 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validationErrors.name ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                  />
                  {validationErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.name[0]}</p>
                  )}
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium">{t('email')}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('email')}
                    className={`mt-1 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validationErrors.email ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.email[0]}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">{t('phone')}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('phone')}
                  className={`mt-1 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validationErrors.phone ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                />
                {validationErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.phone[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">{t('service')}</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className={`mt-1 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validationErrors.service ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                >
                  <option value="" disabled>{t('selectService')}</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {validationErrors.service && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.service[0]}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium">{t('message')}</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('message')}
                  className={`mt-1 w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px] ${validationErrors.message ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                />
                {validationErrors.message && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.message[0]}</p>
                )}
                <div className="mt-2 text-xs text-gray-500">{t('privacy')}</div>
              </div>

              {error && (
                <div className="md:col-span-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <div className="md:col-span-2 flex items-center justify-between gap-4">
                <div className="text-sm text-gray-600">{t('responseTime')}</div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 font-medium shadow hover:brightness-105 disabled:opacity-60"
                >
                  {loading ? (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" strokeOpacity="0.2" />
                      <path d="M22 12a10 10 0 00-10-10" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  ) : null}
                  {loading ? t('sending') : t('submit')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
