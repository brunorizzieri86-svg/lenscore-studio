const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname,html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8'),manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));
let pass=0,fail=0;const check=(name,value)=>{if(value){pass++;console.log('✓',name)}else{fail++;console.error('✗',name)}};
[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).filter(s=>s.trim()).forEach((s,i)=>{try{new vm.Script(s,{filename:'index#'+(i+1)});check('index script '+(i+1)+' compila',true)}catch(e){check('index script '+(i+1)+' compila',false);console.error(e.message)}});
try{new vm.Script(sw);check('service worker compila',true)}catch{check('service worker compila',false)}
// cálculo de pagamento
const a=html.indexOf('function lens77Pct'),b=html.indexOf('function lens77PayInputs',a),ctx={money:n=>(n/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})};
vm.createContext(ctx);vm.runInContext(html.slice(a,b)+';this.api={lens77PayCalc,lens77MethodLabel,lens77Pct};',ctx);
const C=ctx.api.lens77PayCalc;
let r=C({base:100000,method:'Pix',discount:10,discountUnit:'percent'});check('Pix com 10% de desconto',r.total===90000&&r.discount===10000);
r=C({base:100000,method:'Dinheiro',discount:2500,discountUnit:'money'});check('Dinheiro com desconto em R$',r.total===97500);
r=C({base:100000,method:'Cartão',card:'Débito',discount:5,discountUnit:'percent'});check('Débito aceita desconto',r.total===95000);
r=C({base:99000,method:'Cartão',card:'Crédito',installments:12,withInterest:true,interest:12});check('Crédito 12x com 12% de juros',r.total===110880&&r.installmentValue===9240&&r.discount===0);
r=C({base:99000,method:'Cartão',card:'Crédito',installments:3,withInterest:false,discount:50,discountUnit:'percent'});check('Crédito sem juros ignora desconto',r.total===99000&&r.installmentValue===33000);
r=C({base:50000,method:'Pix',discount:999999,discountUnit:'money'});check('Desconto limitado ao valor',r.total===0);
r=C({base:50000,method:'Pix',discount:10,discountUnit:'percent',refund:true});check('Devolução não recebe desconto',r.total===50000);
check('rótulo de cartão',ctx.api.lens77MethodLabel('Cartão','Crédito')==='Cartão de crédito'&&ctx.api.lens77MethodLabel('Cartão','Débito')==='Cartão de débito');
[
 ['versão 0.7.8',html.includes("VERSION='0.7.8'")],['cache 0.7.8',sw.includes('lenscore-studio-v0.7.8')],['manifesto PWA',manifest.display==='standalone'],
 ['somente Conta principal por padrão',html.includes("accounts:['Conta principal'],incomeCategories")],
 ['cadastrar nova conta no lançamento',html.includes('Cadastrar nova conta…')],
 ['migração da conta Dinheiro',html.includes('lens77LegacyAccounts')],
 ['cartão → débito/crédito',html.includes('name="cardType"')],['parcelas e juros no crédito',html.includes('name="cardInstallments"')&&html.includes('name="interestMode"')],
 ['desconto em pagamentos diretos',html.includes('name="discountValue"')],
 ['despesas pré-cadastradas',html.includes("{name:'Luz'")&&html.includes("{name:'Internet'")&&html.includes("{name:'Locação do espaço'")],
 ['incluir novo item de despesa',html.includes('Incluir novo item…')],['aba Despesas',html.includes("['expenses','Despesas']")],
 ['cadastro direto no Financeiro',html.includes('CADASTRO DIRETO')&&html.includes('bill-new:pay')&&html.includes('bill-new:receive')],
 ['contas agendadas (bills)',html.includes('d.bills.push')],
 ['desconto/juros em baixa de parcela',html.includes('lens77SubmitSettleInstallment')],['desconto/juros em pagamento de parceiro',html.includes('lens77SubmitPayAssignment')],
 ['saldo considera valor original',html.includes('.settled')],
 ['confirmações amigáveis',html.includes('function lensAsk')&&!/(?<![\w.])confirm\(/.test(html.replace(/lensAsk/g,''))],
 ['avisos de erro amigáveis',html.includes('Falta só um ajuste')],
 ['tutorial do Financeiro',html.includes("kind:'fin-payment'")],
 ['catálogo de serviços',html.includes('Chá de bebê / revelação')&&html.includes('Casamento (cobertura completa)')],
 ['cadastro de novo serviço',html.includes('svc-new-save')],['adicionais do serviço',html.includes('lens77Addons')],
 ['entrada do trabalho vai ao Financeiro',html.includes('Entrada agendada')],
 ['propostas com condições preservadas',html.includes('name="cashDiscountPercent"')&&html.includes('name="creditInterestPercent"')],
 ['relatórios preservados',html.includes('Despesas por categoria')&&html.includes('Recebimentos por forma')],
 ['PDF e backup preservados',html.includes('lensPremiumSelectablePdf')&&html.includes('lensProtectionPage')],
 ['correção iPhone preservada',html.includes('safe-area-inset-top')]
].forEach(([n,v])=>check(n,v));
console.log('\nResultado: '+pass+' aprovadas, '+fail+' falhas');process.exitCode=fail?1:0;
