import { NextResponse } from 'next/server';
import axios from 'axios';

function toE164(phone: string): string {
    if (phone.startsWith('0')) return '+359' + phone.slice(1);
    if (phone.startsWith('+')) return phone;
    return '+359' + phone;
}

export async function POST(request: Request) {
    const { name, phone, city, message, email } = await request.json();

    // Минимум триене: задължителни са само име и телефон.
    if (!name || !phone) {
        return NextResponse.json({ error: 'Моля, попълнете име и телефон.' }, { status: 400 });
    }

    const formattedPhone = toE164(phone);
    const hasEmail = typeof email === 'string' && email.includes('@');

    const ADMIN_TEMPLATE_ID = 6;   // шаблон за известие до собственика
    const CLIENT_TEMPLATE_ID = 7;  // шаблон за потвърждение до клиента

    const brevoHeaders = {
        'api-key': process.env.BREVO_API_KEY!,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    try {
        // 1. Известие до собственика (КРИТИЧНО — така се хваща лидът, винаги).
        const adminRes = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: { name: process.env.BREVO_SENDER_NAME, email: process.env.BREVO_SENDER_EMAIL },
                to: [{ email: process.env.BREVO_ADMIN_EMAIL!, name: 'Admin' }],
                templateId: ADMIN_TEMPLATE_ID,
                params: {
                    NAME: name,
                    PHONE: formattedPhone,
                    CITY: city || '',
                    MESSAGE: message || '',
                    EMAIL: email || '',
                },
            },
            { headers: brevoHeaders },
        );

        if (adminRes.status !== 201) {
            return NextResponse.json({ error: 'Неуспешно изпращане на запитването.' }, { status: 500 });
        }

        // 2. По желание (само ако има имейл): добавяне в Brevo + потвърждение към клиента.
        //    Грешки тук НЕ провалят заявката — лидът вече е получен от собственика.
        if (hasEmail) {
            try {
                await axios.post(
                    'https://api.brevo.com/v3/contacts',
                    {
                        updateEnabled: true,
                        attributes: {
                            FIRSTNAME: name,
                            PHONE: formattedPhone,
                            CITY: city || '',
                            MESSAGE: message || '',
                        },
                        listIds: [2],
                        email,
                    },
                    { headers: brevoHeaders },
                );
            } catch {
                // игнорирай — не е критично
            }

            try {
                await axios.post(
                    'https://api.brevo.com/v3/smtp/email',
                    {
                        sender: { name: process.env.BREVO_SENDER_NAME, email: process.env.BREVO_SENDER_EMAIL },
                        to: [{ email }],
                        templateId: CLIENT_TEMPLATE_ID,
                    },
                    { headers: brevoHeaders },
                );
            } catch {
                // игнорирай — не е критично
            }
        }

        return NextResponse.json({ success: true, message: 'Успешно изпратено!' });
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response && error.response.data) {
            const msg = error.response.data.message || error.response.data.error || 'Възникна грешка при изпращане.';
            return NextResponse.json({ error: msg }, { status: error.response.status });
        }
        return NextResponse.json({ error: (error as Error).message || 'Сървърна грешка' }, { status: 500 });
    }
}
