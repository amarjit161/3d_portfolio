import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactRequestBody = {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
};

const EMAIL_FROM = "Amarjit <info@amarjit.co.in>";
const EMAIL_TO = ["info@amarjit.co.in"];

const escapeHtml = (value: string): string =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\"/g, "&quot;")
		.replace(/'/g, "&#39;");

const isValidEmail = (value: string): boolean =>
	/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as ContactRequestBody;

		const name = body.name?.trim() ?? "";
		const email = body.email?.trim() ?? "";
		const submittedSubject = body.subject?.trim() ?? "";
		const message = body.message?.trim() ?? "";

		if (!name || !email || !message) {
			return NextResponse.json(
				{ success: false, error: "Name, email, and message are required." },
				{ status: 400 }
			);
		}

		if (!isValidEmail(email)) {
			return NextResponse.json(
				{ success: false, error: "Please provide a valid email address." },
				{ status: 400 }
			);
		}

		if (!process.env.RESEND_API_KEY) {
			return NextResponse.json(
				{ success: false, error: "Server email configuration is missing." },
				{ status: 500 }
			);
		}

		const resend = new Resend(process.env.RESEND_API_KEY);

		const html = `
			<div style="font-family: Arial, sans-serif; background-color: #f8fafc; padding: 24px; color: #0f172a;">
				<div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
					<div style="padding: 20px 24px; background: #0f172a; color: #ffffff; font-size: 20px; font-weight: 700;">
						📩 New Portfolio Message
					</div>
					<div style="padding: 24px; line-height: 1.6;">
						<p style="margin: 0 0 12px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
						<p style="margin: 0 0 12px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
						<p style="margin: 0 0 12px;"><strong>Subject:</strong> ${escapeHtml(submittedSubject || "Not provided")}</p>
						<p style="margin: 0 0 8px;"><strong>Message:</strong></p>
						<div style="white-space: pre-wrap; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8fafc;">${escapeHtml(message)}</div>
					</div>
				</div>
			</div>
		`;

		const { error } = await resend.emails.send({
			from: EMAIL_FROM,
			to: EMAIL_TO,
			replyTo: email,
			subject: `[PORTFOLIO] ${submittedSubject || "New Message"}`,
			html,
		});

		if (error) {
			return NextResponse.json(
				{
					success: false,
					error:
						error.message || "Unable to send your message right now.",
				},
				{ status: 502 }
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unexpected server error.";
		return NextResponse.json({ success: false, error: message }, { status: 500 });
	}
}
