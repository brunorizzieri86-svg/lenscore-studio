const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname;
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
let pass=0,fail=0;
const check=(name,value)=>{if(value){pass++;console.log('✓',name)}else{fail++;console.error('✗',name)}};
function compileHtml(name,source){
 const scripts=[...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).filter(s=>s.trim());
 scripts.forEach((s,i)=>{try{new vm.Script(s,{filename:name+'#'+(i+1)});check(name+' script '+(i+1)+' compila',true)}catch(e){check(name+' script '+(i+1)+' compila',false);console.error(e.message)}})
}
compileHtml('index',html);
try{new vm.Script(sw);check('service worker compila',true)}catch(e){check('service worker compila',false);console.error(e.message)}

const metaStart=html.indexOf('function lens75ButtonMeta');
const metaEnd=html.indexOf('const lens75Btn',metaStart);
const metaCtx={};vm.createContext(metaCtx);vm.runInContext(html.slice(metaStart,metaEnd)+';this.meta=lens75ButtonMeta;',metaCtx);
const cases=[
 ['WhatsApp','event-whatsapp:e1','phone','action-whatsapp','message'],
 ['Google Maps','route-maps:e1','folder','action-map','map'],
 ['Waze','route-waze:e1','arrow','action-route','navigation'],
 ['Excluir','delete:event:e1','folder','action-danger','trash'],
 ['Concluir compromisso','complete-event:e1','check','action-success','check'],
 ['Exportar PDF','finance-pdf','file','action-document','pdf'],
 ['Novo cliente','new:client','users','action-create','users'],
 ['Editar','event:e1','edit','action-edit','edit']
];
for(const [label,action,ico,tone,wantIcon] of cases){const r=metaCtx.meta(label,action,ico,'');check('botão '+label+' usa cor semântica',r.tone===tone);check('botão '+label+' usa ícone correto',r.ico===wantIcon)}

const helperStart=html.indexOf('function lens75Phone');
const helperEnd=html.indexOf('function lens75OpenWhatsapp',helperStart);
const helperCtx={state:{profile:{name:'Estúdio Aurora'}},money:n=>'R$ '+(n/100).toFixed(2).replace('.',','),fmt:d=>d.split('-').reverse().join('/')};
vm.createContext(helperCtx);vm.runInContext(html.slice(helperStart,helperEnd)+';this.api={lens75Phone,lens75DateLabel,lens75EventMessage,lens75ProjectMessage,lens75QuoteMessage};',helperCtx);
check('telefone brasileiro recebe DDI',helperCtx.api.lens75Phone({phone:'(11) 99999-9999'})==='5511999999999');
check('telefone inválido é bloqueado',helperCtx.api.lens75Phone({phone:'123'})==='');
check('13/10/2026 é terça-feira',/^Terça-feira/.test(helperCtx.api.lens75DateLabel('2026-10-13T16:00')));
check('17/10/2026 é sábado',/^Sábado/.test(helperCtx.api.lens75DateLabel('2026-10-17T16:00')));
const customer={name:'Marina Alves'},job={name:'Ensaio de Família',due:'2026-10-20'},event={title:'Sessão externa',type:'Fotografia',start:'2026-10-13T16:00',location:'Parque Central'};
const eventMessage=helperCtx.api.lens75EventMessage(event,customer,job);
check('mensagem de fotografia é contextual',eventMessage.includes('sessão fotográfica'));
check('mensagem informa dia da semana',eventMessage.includes('Terça-feira'));
check('mensagem informa horário',eventMessage.includes('16:00'));
check('mensagem informa local',eventMessage.includes('Parque Central'));
check('mensagem pede confirmação',eventMessage.includes('Podemos confirmar?'));
check('mensagem leva assinatura do estúdio',eventMessage.endsWith('Estúdio Aurora'));
check('modelo de reunião existe',helperCtx.api.lens75EventMessage({...event,type:'Reunião',title:'Briefing'},customer,job).includes('reunião de briefing'));
check('modelo de vídeo existe',helperCtx.api.lens75EventMessage({...event,type:'Vídeo',title:'Captação'},customer,job).includes('captação de vídeo'));
check('modelo de maquiagem existe',helperCtx.api.lens75EventMessage({...event,type:'Maquiagem',title:'Maquiagem'},customer,job).includes('horário de maquiagem'));
check('modelo de entrega existe',helperCtx.api.lens75EventMessage({...event,type:'Entrega',title:'Entrega da galeria'},customer,job).includes('confirmar nossa entrega'));
check('modelo de proposta existe',helperCtx.api.lens75QuoteMessage({title:'Casamento',amount:300000,validUntil:'2026-10-20'},customer).includes('conseguiu analisar a proposta'));
check('modelo financeiro existe',helperCtx.api.lens75ProjectMessage(job,customer,'finance').includes('lembrete gentil sobre o pagamento'));

[
 ['versão 0.7.5',html.includes("VERSION='0.7.5'")],
 ['cache 0.7.5',sw.includes('lenscore-studio-v0.7.5')],
 ['manifesto PWA',manifest.display==='standalone'&&/Lens Core Studio/i.test(manifest.name)],
 ['painel semanal na tela inicial',html.includes('Compromissos dos próximos 7 dias')&&html.includes('lens75WeekEvents')],
 ['somente compromissos futuros no painel',html.includes("e.start.slice(0,10)>=today()")],
 ['WhatsApp aparece apenas com telefone válido',html.includes('lens75Phone(c)?btn(\'WhatsApp\'')],
 ['aviso explica WhatsApp ausente',html.includes('Cadastre o WhatsApp do cliente')],
 ['notificações têm mensagem contextual',html.includes('notice-whatsapp:event:')&&html.includes('notice-whatsapp:quote:')&&html.includes('notice-whatsapp:finance:')],
 ['ícones semânticos adicionados',html.includes("message:'M21")&&html.includes("navigation:'M4")&&html.includes("receipt:'M5")],
 ['cores suaves por função',html.includes('.btn.action-whatsapp')&&html.includes('.btn.action-map')&&html.includes('.btn.action-danger')],
 ['alvos móveis de 44 px',html.includes('.btn.smart-btn{min-height:44px}')],
 ['layout semanal responsivo',html.includes('.weekly-actions{width:100%')],
 ['correção iPhone preservada',html.includes('safe-area-inset-top')&&html.includes('safe-area-inset-bottom')&&html.includes('maximum-scale=1')],
 ['código PRO curto preservado',html.includes('LCS-XXXXXXXX-1A123')&&html.includes('lensShortCheck')],
 ['GPS preservado',html.includes('google.com/maps/dir/?api=1')&&html.includes('waze.com/ul?q=')],
 ['tutorial preservado',html.includes('Praticar esta etapa')&&html.includes('Retomar tutorial')],
 ['PDF e backup preservados',html.includes('lensPremiumSelectablePdf')&&html.includes('lensProtectionPage')]
].forEach(([name,value])=>check(name,value));

console.log('\nResultado: '+pass+' aprovadas, '+fail+' falhas');
process.exitCode=fail?1:0;
