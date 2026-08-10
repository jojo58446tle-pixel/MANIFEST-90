import {json,safeEqual,token,authorized} from './_lib.mjs';
export default async req=>{
  if(req.method==='GET')return json({authenticated:authorized(req)});
  if(req.method!=='POST')return json({error:'method_not_allowed'},405);
  let body=await req.json().catch(()=>({})),password=process.env.MANIFEST_PASSWORD;
  if(!password)return json({error:'MANIFEST_PASSWORD_not_configured'},500);
  if(!safeEqual(body.password,password))return json({error:'invalid_password'},401);
  return json({ok:true},200,{'set-cookie':`m90_session=${token()}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`});
};
