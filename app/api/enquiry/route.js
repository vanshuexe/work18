import nodemailer from 'nodemailer';
export async function POST(request){
  let data;try{data=await request.json();}catch{return Response.json({message:'Invalid request.'},{status:400});}
  const string=(key,max=250)=>typeof data[key]==='string'?data[key].trim().slice(0,max):'';
  const name=string('name'),email=string('email'),tel=string('tel'),message=string('query',5000);
  if(string('website'))return Response.json({message:'Thank you for your enquiry.'});
  if(!name||!tel||!message||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return Response.json({message:'Please enter your name, valid email, telephone and message.'},{status:400});
  if(!process.env.SMTP_HOST||!process.env.SMTP_FROM)return Response.json({message:'Email delivery is not configured yet. Please send your enquiry to dsm@harison.in or call +91 161 5071011.'},{status:503});
  try{
    const transport=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:process.env.SMTP_PORT==='465',auth:process.env.SMTP_USER?{user:process.env.SMTP_USER,pass:process.env.SMTP_PASSWORD}:undefined});
    await transport.sendMail({from:process.env.SMTP_FROM,to:process.env.ENQUIRY_TO||'dsm@harison.in',replyTo:email,subject:'Website enquiry',text:`Name: ${name}\nEmail: ${email}\nTelephone: ${tel}\nCompany: ${string('company-name')}\nAddress: ${string('address')}\n\n${message}`});
    return Response.json({message:'Thank you. Your enquiry has been sent.'});
  }catch{return Response.json({message:'Email could not be sent. Please contact dsm@harison.in directly.'},{status:502});}
}
