const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname,html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8'),genPath=path.join(root,'LensCoreStudio-GERADOR-PRO-V3.0','gerador-lenscore-pro.html'),gen=fs.readFileSync(genPath,'utf8'),manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
let pass=0,fail=0;const check=(name,value)=>{if(value){pass++;console.log('✓',name)}else{fail++;console.error('✗',name)}};
function compileHtml(name,source){const scripts=[...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).filter(s=>s.trim());scripts.forEach((s,i)=>{try{new vm.Script(s,{filename:name+'#'+(i+1)});check(name+' script '+(i+1)+' compila',true)}catch(e){check(name+' script '+(i+1)+' compila',false);console.error(e.message)}})}
compileHtml('index',html);compileHtml('gerador',gen);try{new vm.Script(sw);check('service worker compila',true)}catch{check('service worker compila',false)}
const genScript=[...gen.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)][0][1],genStart=genScript.indexOf('const PLAN_BY_IDX'),genEnd=genScript.indexOf('function copyCode');
const genCtx={};vm.createContext(genCtx);vm.runInContext(genScript.slice(genStart,genEnd)+';this.api={codeFor,checksum};',genCtx);
const appStart=html.indexOf("const LENS_SHORT_SECRET='LENSCOREPRO2026'"),appEnd=html.indexOf('const lens74LegacyVerify',appStart),appCtx={};vm.createContext(appCtx);vm.runInContext(html.slice(appStart,appEnd)+';this.api={lensShortCheck,lensShortChecksum};',appCtx);
const deviceRaw='UQ4GEVQM',device='LC-UQ4G-EVQM',vectors=[[1,'A'],[6,'B'],[12,'9']];
for(const [months,serial] of vectors){const code=genCtx.api.codeFor(deviceRaw,months,serial),result=appCtx.api.lensShortCheck(code,device);check('gerador e app compatíveis · '+months+' mês(es)',result.months===months&&result.serial===serial&&result.code===code)}
const valid=genCtx.api.codeFor(deviceRaw,1,'C');
try{appCtx.api.lensShortCheck(valid,'LC-AAAA-BBBB');check('rejeita código de outro aparelho',false)}catch(e){check('rejeita código de outro aparelho',/outro aparelho/.test(e.message))}
try{appCtx.api.lensShortCheck(valid.slice(0,-1)+(valid.endsWith('9')?'8':'9'),device);check('rejeita código alterado',false)}catch(e){check('rejeita código alterado',/inválido/.test(e.message))}
[
 ['versão 0.7.4',html.includes("VERSION='0.7.4'")],
 ['cache 0.7.4',sw.includes('lenscore-studio-v0.7.4')],
 ['manifesto PWA',manifest.display==='standalone'&&/Lens Core Studio/i.test(manifest.name)],
 ['formato curto no aplicativo',html.includes('LCS-XXXXXXXX-1A123')&&html.includes('maxlength="19"')],
 ['formato curto no gerador',gen.includes('LCS-ABCDEFGH-1A123')&&gen.includes('Gerar um código PRO')],
 ['planos 1, 6 e 12',gen.includes('value="1"')&&gen.includes('value="6"')&&gen.includes('value="12"')],
 ['sequências independentes',gen.includes("SERIALS='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'")],
 ['uso único',html.includes('Este código já foi utilizado neste aparelho.')&&html.includes('shortLicenses')],
 ['renovação preserva dias',html.includes("base=st.kind==='pro'&&st.end>Date.now()?st.end:Date.now()")],
 ['licença antiga compatível',html.includes('lens74LegacyVerify(code,device)')],
 ['texto antigo removido da tela final',html.includes("replace('O código pode ser longo.")&&html.includes("replace('Validação criptografada neste aparelho'")],
 ['correção iPhone preservada',html.includes('safe-area-inset-top')&&html.includes('safe-area-inset-bottom')&&html.includes('maximum-scale=1')],
 ['tutorial preservado',html.includes('Praticar esta etapa')&&html.includes('Retomar tutorial')],
 ['GPS preservado',html.includes('google.com/maps/dir/?api=1')&&html.includes('waze.com/ul?q=')],
 ['maquiador preservado',html.includes('makeupArtistId')&&html.includes('MAQUIAGEM OPCIONAL')],
 ['PDF e backup preservados',html.includes('lensPremiumSelectablePdf')&&html.includes('lensProtectionPage')],
 ['gerador separado do pacote público',!fs.existsSync(path.join(root,'LensCoreStudio-V0.7.4-TESTE-PWA','gerador-lenscore-pro.html'))]
].forEach(([name,value])=>check(name,value));
console.log('\nResultado: '+pass+' aprovadas, '+fail+' falhas');process.exitCode=fail?1:0;
