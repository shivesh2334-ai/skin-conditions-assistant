const KB = require('./lesion-kb');
const tok = s => s.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>2);
const docs=KB.map(c=>tok(`${c.n} ${c.kw} ${c.find} ${c.dd}`));
const N=docs.length,avg=docs.reduce((a,d)=>a+d.length,0)/N,df={};
docs.forEach(d=>new Set(d).forEach(w=>df[w]=(df[w]||0)+1));
module.exports=function retrieve(q,k=4){return KB.map((c,i)=>{const d=docs[i],tf={};d.forEach(w=>tf[w]=(tf[w]||0)+1);let s=0;for(const w of tok(q))if(tf[w])s+=Math.log(1+(N-df[w]+0.5)/(df[w]+0.5))*(tf[w]*2.2)/(tf[w]+1.2*(0.25+0.75*d.length/avg));return{c,s}}).filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,k)};
