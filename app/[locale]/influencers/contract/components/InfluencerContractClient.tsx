"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

interface InfluencerContractClientProps {
  locale: string
  influencer: {
    id: string
    name: string
    email: string
  }
}

export default function InfluencerContractClient({
  locale,
  influencer,
}: InfluencerContractClientProps) {
  const isArabic = locale === "ar"

  const contractContent = isArabic ? (
    <div className="space-y-6 text-right" dir="rtl">
      <div>
        <h3 className="text-xl font-bold mb-4">اتفاقية تعاون رقمية مع المؤثر</h3>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
        <p className="font-bold">الطرف الأول (الوكالة):</p>
        <ul className="space-y-1 text-sm">
          <li>• الاسم: <strong>Dream to App</strong></li>
          <li>• المالك: <strong>Khalid Ali</strong></li>
          <li>• البريد الإلكتروني: <strong>dreamtoapp@gmail.com</strong></li>
          <li>• الجوال / واتساب: <strong>+966554113107</strong></li>
        </ul>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
        <p className="font-bold">الطرف الثاني (المؤثر):</p>
        <ul className="space-y-1 text-sm">
          <li>• الاسم: <strong>{influencer.name}</strong></li>
          <li>• البريد الإلكتروني: <strong>{influencer.email}</strong></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-2">1. مقدمة</h4>
        <p className="text-sm leading-relaxed">
          عند موافقة المؤثر على هذه الاتفاقية، فإنه يصبح عضوًا في منصة <strong>Dream to App</strong> مقابل نشر محتوى ترويجي للوكالة بدلًا من دفع رسوم اشتراك نقدية.
        </p>
      </div>

      <div>
        <h4 className="font-bold mb-2">2. التزامات المؤثر</h4>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold mb-1">رسوم الاشتراك (فيديو الوكالة):</p>
            <ul className="space-y-1 mr-4">
              <li>• يلتزم المؤثر بنشر <strong>فيديو ترويجي عن وكالة Dream to App</strong> عند انضمامه للمنصة.</li>
              <li>• يعتبر هذا الفيديو بمثابة <strong>رسوم الاشتراك</strong> في المنصة.</li>
              <li>• مع كل حملة جديدة، يلتزم بنشر <strong>فيديو جديد عن الوكالة</strong> بجانب فيديو العميل.</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-1">فيديو العميل لكل حملة:</p>
            <ul className="space-y-1 mr-4">
              <li>• يلتزم المؤثر بنشر فيديو خاص بالعميل وفق متطلبات الحملة.</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-1">المراجعة والموافقة:</p>
            <ul className="space-y-1 mr-4">
              <li>• يحق للوكالة مراجعة الفيديوهات قبل النشر للتأكد من التوافق مع معايير الجودة.</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-2">3. الحقوق والالتزامات المالية</h4>
        <ul className="space-y-1 text-sm mr-4">
          <li>• يعتبر نشر فيديو الوكالة هو <strong>رسوم الاشتراك المعتمدة</strong> ولا يطالب برسوم مالية إضافية.</li>
          <li>• بالنسبة لفيديوهات العملاء، يتم تحديد مبلغ التعاون وطريقة الدفع لكل حملة عبر المنصة.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-2">4. حقوق الملكية</h4>
        <ul className="space-y-1 text-sm mr-4">
          <li>• الفيديو الترويجي للوكالة يعتبر حقًا حصريًا لـ <strong>Dream to App</strong>.</li>
          <li>• الفيديوهات الخاصة بالعملاء تبقى ملكًا للعميل/الوكالة.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-2">5. السرية</h4>
        <p className="text-sm">
          يلتزم المؤثر بالحفاظ على سرية تفاصيل الحملات وعدم مشاركتها مع أي طرف ثالث.
        </p>
      </div>

      <div>
        <h4 className="font-bold mb-2">6. القانون المطبق</h4>
        <p className="text-sm">
          تخضع هذه الاتفاقية لأنظمة المملكة العربية السعودية، وأي نزاع يتم حله أمام محاكم المملكة.
        </p>
      </div>

      <div className="bg-primary/10 p-4 rounded-lg border-r-4 border-primary">
        <p className="font-bold mb-2">تأكيد المؤثر:</p>
        <p className="text-sm">
          ✅ أوافق على أن يكون نشر فيديو الوكالة هو رسوم اشتراكي في منصة Dream to App، وألتزم بنشر فيديو جديد عن الوكالة مع كل حملة جديدة بالإضافة إلى فيديو العميل.
        </p>
      </div>
    </div>
  ) : (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Digital Collaboration Agreement with Influencer</h3>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
        <p className="font-bold">First Party (Agency):</p>
        <ul className="space-y-1 text-sm">
          <li>• Name: <strong>Dream to App</strong></li>
          <li>• Owner: <strong>Khalid Ali</strong></li>
          <li>• Email: <strong>dreamtoapp@gmail.com</strong></li>
          <li>• Mobile / WhatsApp: <strong>+966554113107</strong></li>
        </ul>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
        <p className="font-bold">Second Party (Influencer):</p>
        <ul className="space-y-1 text-sm">
          <li>• Name: <strong>{influencer.name}</strong></li>
          <li>• Email: <strong>{influencer.email}</strong></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-2">1. Introduction</h4>
        <p className="text-sm leading-relaxed">
          Upon accepting this agreement, the influencer becomes a member of the <strong>Dream to App</strong> platform in exchange for posting promotional content for the agency instead of paying cash subscription fees.
        </p>
      </div>

      <div>
        <h4 className="font-bold mb-2">2. Influencer Obligations</h4>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold mb-1">Subscription Fee (Agency Video):</p>
            <ul className="space-y-1 ml-4">
              <li>• The influencer commits to posting a <strong>promotional video about Dream to App</strong> upon joining.</li>
              <li>• This video is considered the <strong>subscription fee</strong> to the platform.</li>
              <li>• With each new campaign, the influencer also commits to posting a <strong>new agency video</strong> alongside the client video.</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-1">Client Video for Each Campaign:</p>
            <ul className="space-y-1 ml-4">
              <li>• The influencer commits to posting a client-specific video according to campaign requirements.</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-1">Review and Approval:</p>
            <ul className="space-y-1 ml-4">
              <li>• The agency has the right to review videos before posting to ensure quality standards compliance.</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-2">3. Financial Rights and Obligations</h4>
        <ul className="space-y-1 text-sm ml-4">
          <li>• Posting the agency video is considered the <strong>official subscription fee</strong> with no additional charges.</li>
          <li>• For client videos, collaboration amount and payment method are determined per campaign via the platform.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-2">4. Intellectual Property Rights</h4>
        <ul className="space-y-1 text-sm ml-4">
          <li>• The agency promotional video is exclusive property of <strong>Dream to App</strong>.</li>
          <li>• Client-specific videos remain property of the client/agency.</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-2">5. Confidentiality</h4>
        <p className="text-sm">
          The influencer commits to maintaining confidentiality of campaign details and not sharing them with third parties.
        </p>
      </div>

      <div>
        <h4 className="font-bold mb-2">6. Applicable Law</h4>
        <p className="text-sm">
          This agreement is subject to the laws of the Kingdom of Saudi Arabia, and any dispute shall be resolved before Saudi courts.
        </p>
      </div>

      <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
        <p className="font-bold mb-2">Influencer Confirmation:</p>
        <p className="text-sm">
          ✅ I agree that posting the agency video is my subscription fee to the Dream to App platform, and I commit to posting a new agency video with each new campaign in addition to the client video.
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/${locale}/influencers/register`}>
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              {isArabic ? "العودة إلى التسجيل" : "Back to Registration"}
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">
              {isArabic ? "اتفاقية التعاون" : "Collaboration Agreement"}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {isArabic
              ? `مرحباً ${influencer.name}، هذه هي اتفاقية التعاون الخاصة بك مع Dream to App`
              : `Hello ${influencer.name}, this is your collaboration agreement with Dream to App`}
          </p>
        </div>

        {/* Contract Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isArabic ? "تفاصيل الاتفاقية" : "Agreement Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            {contractContent}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            {isArabic
              ? "هذه الاتفاقية سارية من تاريخ قبولك عند التسجيل في المنصة"
              : "This agreement is effective from your acceptance date upon platform registration"}
          </p>
        </div>
      </div>
    </div>
  )
}










