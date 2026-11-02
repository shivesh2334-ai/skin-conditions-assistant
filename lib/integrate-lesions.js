// Keep original condition order: medicine mappings and browser records depend on it.
var lesionMap={hpv:[18],cand:[17],tin:[15],imp:[12],ps:[9],ad:[0],cd:[2,3],pr:[11]};
KB.forEach(function(c){
 var targets=lesionMap[c.id];
 if(targets)targets.forEach(function(i){C[i].lesion=c;C[i].k+=' '+c.kw;});
 else C.push({n:c.n,k:c.kw,loc:c.kw,ft:c.find,d:c.find,dx:c.dd,t:'Select investigations based on clinical findings; see follow-up below.',tx:c.tx,f:'',lesion:c});
});
var beforeLesionDetail=detail;
detail=function(i){var html=beforeLesionDetail(i),c=all()[i].lesion;if(!c)return html;
 return html+'<section class="card"><h3>Imported skin-lesion reference</h3><p class="sub">From uploaded skin-lesion-rag.zip; source labels supplied by the file, not independently verified.</p>'+[['Typical features',c.find],['Differential diagnosis',c.dd],['Management reference',c.tx],['Red flags',c.rf],['Follow-up',c.fu],['Source label',c.src]].map(function(v){return '<h3>'+v[0]+'</h3><p>'+esc(v[1])+'</p>'}).join('')+'</section>';
};
// Existing medicine groups cover original entries only.
var beforeMedLink=medLink;
medLink=function(i){return i<21?beforeMedLink(i):'<p class="sub">Indian brand mapping has not yet been verified for this added condition.</p>';};
draw();
