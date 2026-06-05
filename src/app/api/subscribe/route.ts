import { NextResponse } from 'next/server';
import axios from 'axios';

function toE164(phone: string): string {
    if (phone.startsWith('0')) return '+359' + phone.slice(1);
    if (phone.startsWith('+')) return phone;
    return '+359' + phone;
}

export async function POST(request: Request) {
    const { name, phone, city, message, email, source } = await request.json();

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

    // Каналите за хващане на лида вървят ПАРАЛЕЛНО.
    // Заявката е успешна, ако поне един от тях мине.
    const captures: Promise<unknown>[] = [];

    // 1) Google Sheets (Apps Script webhook)
    if (process.env.SHEETS_WEBHOOK_URL) {
        captures.push(
            axios.post(
                process.env.SHEETS_WEBHOOK_URL,
                {
                    source: source || 'сайт',
                    name,
                    // водещият апостроф кара Sheets да пази номера като текст (иначе „+" изпада)
                    phone: "'" + formattedPhone,
                    email: email || '',
                    message: message || '',
                    room: city || '',
                },
                { timeout: 10000 },
            ),
        );
    }

    // 2) Имейл известие до собственика (Brevo)
    if (process.env.BREVO_API_KEY && process.env.BREVO_ADMIN_EMAIL) {
        captures.push(
            axios.post(
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
                { headers: brevoHeaders, timeout: 10000 },
            ),
        );
    }

    if (captures.length === 0) {
        return NextResponse.json(
            { error: 'Формата не е конфигурирана. Моля, обадете се на телефона.' },
            { status: 500 },
        );
    }

    const settled = await Promise.allSettled(captures);
    const captured = settled.some((s) => s.status === 'fulfilled');

    if (!captured) {
        return NextResponse.json(
            { error: 'Грешка при изпращане. Моля, опитайте пак или ни се обадете.' },
            { status: 500 },
        );
    }

    // 3) По желание (само ако има имейл): Brevo контакт + потвърждение до клиента.
    //    Грешки тук НЕ провалят заявката — лидът вече е хванат.
    if (hasEmail && process.env.BREVO_API_KEY) {
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
                { headers: brevoHeaders, timeout: 10000 },
            );
        } catch {
            // не е критично
        }

        try {
            await axios.post(
                'https://api.brevo.com/v3/smtp/email',
                {
                    sender: { name: process.env.BREVO_SENDER_NAME, email: process.env.BREVO_SENDER_EMAIL },
                    to: [{ email }],
                    templateId: CLIENT_TEMPLATE_ID,
                },
                { headers: brevoHeaders, timeout: 10000 },
            );
        } catch {
            // не е критично
        }
    }

    return NextResponse.json({ success: true, message: 'Успешно изпратено!' });
}
