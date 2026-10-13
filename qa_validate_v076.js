const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname,html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8'),manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8')),gen=fs.readFileSync(path.join(root,'LensCoreStudio-GERADOR-PRO-V3.0','gerador-lenscore-pro.html'),'utf8');
let pass=0,fail=0;const check=(name,value)=>{if(value){pass++;console.log('✓',name)}else{fail++;console.error('✗',name)}};
function compileHtml(name,source){const scripts=[...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).filter(s=>s.trim());scripts.forEach((s,i)=>{try{new vm.Script(s,{filename:name+'#'+(i+1)});check(name+' script '+(i+1)+' compila',true)}catch(e){check(name+' script '+(i+1)+' compila',false);console.error(e.message)}})}
compileHtml('index',html);compileHtml('gerador',gen);try{new vm.Script(sw);check('service worker compila',true)}catch(e){check('service worker compila',false)}

const genScript=[...gen.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)][0][1],genStart=genScript.indexOf('const PLAN_BY_IDX'),genEnd=genScript.indexOf('function copyCode'),genCtx={};vm.createContext(genCtx);vm.runInContext(genScript.slice(genStart,genEnd)+';this.api={codeFor};',genCtx);
const appStart=html.indexOf("const LENS_SHORT_SECRET='LENSCOREPRO2026'"),appEnd=html.indexOf('const lens74LegacyVerify',appStart),appCtx={};vm.createContext(appCtx);vm.runInContext(html.slice(appStart,appEnd)+';this.check=lensShortCheck;',appCtx);
for(const [months,serial] of [[1,'A'],[6,'B'],[12,'9']]){const code=genCtx.api.codeFor('UQ4GEVQM',months,serial),result=appCtx.check(code,'LC-UQ4G-EVQM');check('gerador PRO compatível · '+months+' mês(es)',result.months===months&&result.serial===serial)}

const paymentStart=html.indexOf('function lens76Percent');
const paymentEnd=html.indexOf('function lens76PaymentFields',paymentStart);
const paymentCtx={money:n=>(n/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})};vm.createContext(paymentCtx);vm.runInContext(html.slice(paymentStart,paymentEnd)+';this.api={lens76Percent,lens76PaymentCalc,lens76PaymentSummary};',paymentCtx);
let calc=paymentCtx.api.lens76PaymentCalc(100000,10,12,12);
check('desconto de 10% calculado',calc.cashTotal===90000);
check('juros de 12% calculados',calc.creditTotal===112000);
check('parcelamento limitado a 12x',calc.installments===12);
check('parcela cobre total com arredondamento',calc.installmentValue===9334);
check('resumo informa desconto',paymentCtx.api.lens76PaymentSummary(calc).includes('10% de desconto'));
check('resumo informa 12 parcelas',paymentCtx.api.lens76PaymentSummary(calc).includes('12x'));
check('resumo informa juros',paymentCtx.api.lens76PaymentSummary(calc).includes('12% de juros'));
calc=paymentCtx.api.lens76PaymentCalc(99000,0,3,0);
check('parcelamento sem juros preserva total',calc.creditTotal===99000);
check('parcela sem juros correta',calc.installmentValue===33000);
check('percentual negativo bloqueado',paymentCtx.api.lens76Percent(-5)===0);
check('percentual acima de 100 limitado',paymentCtx.api.lens76Percent(120)===100);

const buttonStart=html.indexOf('function lens75ButtonMeta');
const buttonEnd=html.indexOf('const lens75Btn',buttonStart);
const buttonCtx={};vm.createContext(buttonCtx);vm.runInContext(html.slice(buttonStart,buttonEnd)+';this.meta=lens75ButtonMeta;',buttonCtx);
for(const [label,action,tone,icon] of [['WhatsApp','event-whatsapp:e1','action-whatsapp','message'],['Google Maps','route-maps:e1','action-map','map'],['Excluir','delete:event:e1','action-danger','trash'],['Novo cliente','new:client','action-create','users']]){const r=buttonCtx.meta(label,action,icon==='users'?'users':'', '');check(label+' manté cor semântica',r.tone===tone);check(label+' manté ícone semântico',r.ico===icon)}

[
 ['versão 0.7.6',html.includes("VERSION='0.7.6'")],
 ['cache 0.7.6',sw.includes('lenscore-studio-v0.7.6')],
 ['manifesto PWA',manifest.display==='standalone'&&/Lens Core Studio/i.test(manifest.name)],
 ['nova aba Relatórios',html.includes("['reports','Relatórios']")],
 ['painel de despesas por categoria',html.includes('Despesas por categoria')&&html.includes('lens76Group')],
 ['painel de formas de recebimento',html.includes('Recebimentos por forma')],
 ['rentabilidade por trabalho',html.includes('Rentabilidade por trabalho')&&html.includes('lens76ProjectProfit')],
 ['evolução mensal',html.includes('Evolução mensal')&&html.includes('lens76MonthlyRows')],
 ['margem realizada',html.includes('Margem realizada')],
 ['ticket médio',html.includes('Ticket médio')],
 ['pendências de conferência',html.includes('Aguardando conferência')],
 ['filtro de categoria nas movimentações',html.includes('finance-category-filter')],
 ['filtro de pagamento nas movimentações',html.includes('finance-payment-filter')],
 ['categorias separadas no lançamento',html.includes('lens76SyncFinanceCategory')&&html.includes("type.value==='Despesa'")],
 ['novas categorias fotográficas',html.includes('Locação de equipamentos')&&html.includes('Licenciamento de imagem')],
 ['PDF financeiro detalhado',html.includes('Relatório financeiro detalhado')&&html.includes('DESPESAS POR CATEGORIA')],
 ['PDF filtra conta',html.includes("v.account==='all'")],
 ['PDF filtra conferência',html.includes("v.reconciled==='all'")],
 ['PDF filtra trabalho',html.includes("v.projectId==='all'")],
 ['CSV por período',html.includes('finance-detail-csv')],
 ['Plano PRO direto em Mais',html.includes('Escolha e acesse seu plano diretamente')],
 ['atalho PRO de 1 mês',html.includes('pro-plan:${months}')&&html.includes('const st=lensStatus()')],
 ['planos 1, 6 e 12 em Mais',html.includes('const st=lensStatus(),installed=lensIsInstalled(),plans=[1,6,12]')],
 ['Parceiros em destaque no Mais',html.includes("['partners','Fornecedores e parceiros'")],
 ['Relatórios diretos no Mais',html.includes('data-action="finance-reports"')],
 ['Backup direto no Mais',html.includes("['protection','Backup e proteção'")],
 ['Tutorial direto no Mais',html.includes('data-action="lens-tutorial:0"')],
 ['Instalação direta no Mais',html.includes('data-action="lens-install"')],
 ['Parceiros na Inicial',html.includes("['partners','Fornecedores e parceiros','Equipe e custos'")],
 ['Despesa rápida na Inicial',html.includes("['new-expense','Registrar despesa'")],
 ['Relatórios na Inicial',html.includes("['finance-reports','Relatórios financeiros'")],
 ['Equipamentos na Inicial',html.includes("['gear','Equipamentos','Kit e manutenção'")],
 ['Pacotes na Inicial',html.includes("['packages','Pacotes e serviços'")],
 ['proposta aceita desconto à vista',html.includes('name="cashDiscountPercent"')],
 ['proposta aceita 1 a 12 parcelas',html.includes('Array.from({length:12}')&&html.includes('name="creditInstallments"')],
 ['proposta aceita juros por parcelamento',html.includes('name="creditInterestPercent"')],
 ['contrato possui valor',html.includes('name="contractAmount"')],
 ['contrato salva condições',html.includes('Condições do contrato atualizadas')],
 ['proposta salva condições',html.includes('Condições de pagamento atualizadas')],
 ['PDF de proposta leva condições',html.includes("paymentTerms:[item.paymentTerms,item.paymentSummary]")],
 ['PDF de contrato leva condições',html.includes("'CONDIÇÕES DE PAGAMENTO',item.paymentSummary")],
 ['preview de pagamento responsivo',html.includes('.payment-live-preview')&&html.includes('@media(max-width:600px)')],
 ['compromissos semanais preservados',html.includes('Compromissos dos próximos 7 dias')],
 ['WhatsApp contextual preservado',html.includes('lens75EventMessage')&&html.includes('notice-whatsapp:quote:')],
 ['correção iPhone preservada',html.includes('safe-area-inset-top')&&html.includes('safe-area-inset-bottom')],
 ['código PRO curto preservado',html.includes('LCS-XXXXXXXX-1A123')&&html.includes('lensShortCheck')],
 ['GPS preservado',html.includes('google.com/maps/dir/?api=1')&&html.includes('waze.com/ul?q=')],
 ['PDF e backup preservados',html.includes('lensPremiumSelectablePdf')&&html.includes('lensProtectionPage')],
 ['alvos móveis preservados',html.includes('.btn.smart-btn{min-height:44px}')]
].forEach(([name,value])=>check(name,value));

console.log('\nResultado: '+pass+' aprovadas, '+fail+' falhas');process.exitCode=fail?1:0;
