import {json,authorized,getState,setState} from './_lib.mjs';
export default async req=>{
  if(!authorized(req))return json({error:'unauthorized'},401);
  if(req.method==='GET')return json({state:await getState()});
  if(req.method==='PUT'){
    let value=await req.json().catch(()=>null);
    if(!value||value.version!==1||!Array.isArray(value.missions))return json({error:'invalid_state'},400);
    await setState({...value,serverUpdatedAt:new Date().toISOString()});return json({ok:true});
  }
  return json({error:'method_not_allowed'},405);
};
