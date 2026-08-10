import {json,authorized} from './_lib.mjs';
import {runAccountability} from './accountability-reminder.mjs';

export default async req=>{
  if(!authorized(req))return json({error:'unauthorized'},401);
  try{return json(await runAccountability(true))}
  catch(error){console.error('DingTalk test failed:',error);return json({sent:false,error:'send_failed',detail:String(error.message||error).slice(0,180)},502)}
};
