"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Loader2 } from "lucide-react"
import { checkInfluencerEmail } from "../actions/checkInfluencerEmail"

interface ViewContractDialogProps {
  locale: string
}

export default function ViewContractDialog({ locale }: ViewContractDialogProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const isArabic = locale === "ar"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(isArabic ? "يرجى إدخال بريد إلكتروني صحيح" : "Please enter a valid email")
      return
    }

    setIsLoading(true)

    try {
      const result = await checkInfluencerEmail(email)

      if (result.exists) {
        // Email exists, route to contract page
        router.push(`/${locale}/influencers/contract?email=${encodeURIComponent(email)}`)
        setIsOpen(false)
      } else {
        // Email doesn't exist
        setError(
          isArabic
            ? "يجب عليك التسجيل أولاً لعرض الاتفاقية"
            : "You must register first to view the agreement"
        )
      }
    } catch (err) {
      console.error("Error checking email:", err)
      setError(
        isArabic
          ? "حدث خطأ. يرجى المحاولة مرة أخرى"
          : "An error occurred. Please try again"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2">
          <FileText className="w-5 h-5" />
          {isArabic ? "عرض الاتفاقية" : "View Agreement"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "عرض الاتفاقية" : "View Agreement"}
          </DialogTitle>
          <DialogDescription>
            {isArabic
              ? "أدخل بريدك الإلكتروني للوصول إلى اتفاقية التعاون"
              : "Enter your email to access the collaboration agreement"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              {isArabic ? "البريد الإلكتروني" : "Email"}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={isArabic ? "your@email.com" : "your@email.com"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              disabled={isLoading}
              required
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isArabic ? "جاري التحقق..." : "Checking..."}
              </>
            ) : (
              <>{isArabic ? "عرض الاتفاقية" : "View Agreement"}</>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
