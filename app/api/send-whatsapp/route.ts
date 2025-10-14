import { NextRequest, NextResponse } from 'next/server';

// WhatsApp API Configuration
const WHATSAPP_CONFIG = {
  phone: '966554113107',
  apiKey: '3675221',
  apiUrl: 'https://api.callmebot.com/whatsapp.php'
};

interface ConsultationData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ConsultationData = await request.json();

    // Format the WhatsApp message
    const whatsappMessage = `
🔔 استشارة جديدة من DreamToApp

الاسم: ${data.name}
الجوال: ${data.phone}
البريد: ${data.email}
الخدمة: ${data.service}
الرسالة: ${data.message}

التاريخ: ${new Date().toLocaleString('ar-SA', { timeZone: 'Asia/Riyadh' })}
    `.trim();

    // Send to WhatsApp API
    const whatsappUrl = `${WHATSAPP_CONFIG.apiUrl}?phone=${WHATSAPP_CONFIG.phone}&text=${encodeURIComponent(whatsappMessage)}&apikey=${WHATSAPP_CONFIG.apiKey}`;

    const response = await fetch(whatsappUrl);
    const result = await response.text();

    // Check if message was queued successfully
    if (result.includes('Message queued') || result.includes('queued')) {
      return NextResponse.json({
        success: true,
        message: 'WhatsApp notification sent successfully'
      });
    } else {
      console.error('WhatsApp API response:', result);
      return NextResponse.json({
        success: false,
        message: 'WhatsApp notification failed',
        details: result
      }, { status: 500 });
    }
  } catch (error) {
    console.error('WhatsApp API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error sending WhatsApp notification',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

