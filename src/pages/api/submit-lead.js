import { Resend } from 'resend';

const resend = new Resend('re_3dG9PdR4_4y624wjpSanNPqqGnVn922gs');

export async function POST({ request }) {
  console.log('=== API endpoint called ===');
  
  try {
    // Check if request has body
    const contentType = request.headers.get('content-type');
console.log('Content-Type:', contentType);
console.log('All headers:', Object.fromEntries(request.headers.entries()));

// Be more lenient - just try to parse

    const text = await request.text();
    console.log('Raw request body:', text);

    if (!text || text.trim() === '') {
      throw new Error('Request body is empty');
    }

    const body = JSON.parse(text);
    console.log('Parsed body:', body);
    
    const { service_type, zip_code, email, phone } = body;

    if (!service_type || !zip_code || !email || !phone) {
      throw new Error('Missing required fields');
    }

    console.log('Attempting to send email to dominicmiles@gmail.com...');
    
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'dominicmiles@gmail.com',
      subject: `🎯 New Lead: ${service_type} in ${zip_code}`,
      html: `
        <h2>New Lead Submission!</h2>
        <p><strong>Service:</strong> ${service_type}</p>
        <p><strong>ZIP Code:</strong> ${zip_code}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    });

    console.log('✅ Email sent successfully!', result);

    return new Response(JSON.stringify({ success: true, emailId: result.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ API ERROR:', error.message);
    console.error('Full error:', error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.toString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}