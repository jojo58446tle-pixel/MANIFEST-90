import crypto from 'node:crypto';
import { getStore } from '@netlify/blobs';

export const STORE_NAME='manifest-90-data';
export const STATE_KEY='primary-state';
export const store=()=>getStore({name:STORE_NAME,consistency:'strong'});
export const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers}});
export function cookieMap(req){return Object.fromEntries((req.headers.get('cookie')||'').split(';').map(v=>v.trim().split('=').map(decodeURIComponent)).filter(x=>x.length===2))}
function secret(){return process.env.MANIFEST_PASSWORD||''}
export function token(){let exp=Date.now()+7*864e5,payload=Buffer.from(JSON.stringify({exp})).toString('base64url'),sig=crypto.createHmac('sha256',secret()).update(payload).digest('base64url');return `${payload}.${sig}`}
export function authorized(req){let t=cookieMap(req).m90_session;if(!t||!secret())return false;let [p,s]=t.split('.');if(!p||!s)return false;let expected=crypto.createHmac('sha256',secret()).update(p).digest('base64url');try{if(!crypto.timingSafeEqual(Buffer.from(s),Buffer.from(expected)))return false;return JSON.parse(Buffer.from(p,'base64url')).exp>Date.now()}catch{return false}}
export async function getState(){let raw=await store().get(STATE_KEY,{consistency:'strong'});return raw?JSON.parse(raw):null}
export async function setState(value){await store().setJSON(STATE_KEY,value)}
export function bangkokDate(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
export function programDay(state,date=bangkokDate()){if(!state?.startDate)return 1;let a=new Date(state.startDate+'T00:00:00+07:00'),b=new Date(date+'T00:00:00+07:00');return Math.min(90,Math.max(1,Math.floor((b-a)/864e5)+1))}
export function safeEqual(a,b){let x=Buffer.from(String(a)),y=Buffer.from(String(b));return x.length===y.length&&crypto.timingSafeEqual(x,y)}
