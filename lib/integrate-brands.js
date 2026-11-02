/* Preserve original catalogue and browser-storage identities. */
MEDICINES=MEDICINES.concat(BRAND_ADDITIONS);
var conditionBrandMap={
 hz:['acyclovir','valacyclovir','famciclovir','gabapentin','pregabalin','tca','lidopatch','paracetamol','systemicsteroid','zostervaccine'],
 vz:['acyclovir','valacyclovir','paracetamol','antihistamine','vzimmune','varicellavaccine'],
 ebv:['paracetamol','nsaid','systemicsteroid'],
 cmv:['cmvantiviral','ganciclovir','foscarnet','sirolimus','art','chemotherapy'],
 mpx:['orthopox','paracetamol','mpoxvaccine'],
 mc:['imiquimod','art'],orf:['imiquimod','cidofovir'],
 b19:['nsaid','paracetamol','ivig'],hpv:['warts','imiquimod','podophyllin','sinecatechins','hpvvaccine'],
 cand:['antifungaltop','fluco','nystatin','echinocandin'],tin:['antifungaltop','terb','itra','griseo','ciclo'],
 imp:['mupirocin','fusidic','penicillin','cefalexin'],scab:['permethrin','ivermectinoral','antihistamine'],
 ps:['steroid','vitd','psorcombo','metho','acit','aprem','cyclosporin','biologic','il17','il1223','il23','tazarotene','tarcombo','anthralin','salicylic'],
 ad:['emollient','steroid','calcineurin','antihistamine','crisaborole','dupilumab','jak','systemicsteroid'],
 cd:['emollient','steroid','systemicsteroid'],pr:['steroid','antihistamine','emollient'],
 uti:['antihistamine','omalizumab','adrenaline'],cel:['penicillin','cefalexin','clinda','cotrim','doxy'],
 hsv:['acyclovir','valacyclovir']
};
// Show imiquimod separately; the old wart group intentionally mixes treatment classes.
var wartGroup=MEDICINES.find(function(g){return g.id==='warts'});
MEDICINES.push({id:'imiquimod',title:'Topical immune response modifiers',generic:'Imiquimod',limited:true,reviewed:'2026-11-02',source:'https://www.1mg.com/generics/imiquimod-210028',note:'Four Indian brand families verified. Condition links reflect medicines named in the imported reference, not an endorsement for every indication; review current evidence and approval, particularly molluscum and orf.',rows:wartGroup.rows.filter(function(r){return ['Imiquad','Qmica','Nilwart','Iminod'].indexOf(r.brand)>=0;})});
C.forEach(function(c,i){var mapped=c.lesion?conditionBrandMap[c.lesion.id]||[]:[];MEDMAP[i]=Array.from(new Set((MEDMAP[i]||[]).concat(mapped)));});
function addMap(i,ids){MEDMAP[i]=Array.from(new Set(MEDMAP[i].concat(ids)));}
addMap(0,['crisaborole','dupilumab','jak','systemicsteroid','penicillin']);
addMap(3,['systemicsteroid']);addMap(7,['diuretic']);
addMap(9,['tazarotene','tarcombo','anthralin','il17','il1223','il23']);
addMap(16,['selenium','sulphur']);addMap(17,['nystatin']);
addMap(18,['imiquimod','podophyllin','sinecatechins','hpvvaccine']);
addMap(19,['hormonal']);addMap(20,['metrogel','sulfacetamide','brimonidine','oxymetazoline']);
medLink=function(i){return '<p><button type="button" class="btn p" data-med-condition="'+i+'">Indian brands, prices & companies</button></p>';};
function brandCoverage(){var full=MEDICINES.filter(function(g){return g.rows.length===5}).length,limited=MEDICINES.filter(function(g){return g.rows.length<5});return '<details class="card"><summary>Brand coverage and verification limits</summary><p>'+full+' groups have five listings. '+limited.length+' groups have fewer than five verified Indian-market options. Zero means not verified in this review, not proof that no product exists in India. Brand variants and pack sizes are not extra brands. Source-listed products may be out of stock.</p><ul>'+limited.map(function(g){return '<li>'+esc(g.title)+': '+g.rows.length+' verified listing(s).</li>';}).join('')+'</ul><p>Links to a condition identify classes mentioned in its reference text; they do not establish that every listed medicine is indicated for that patient. Specialist and off-label options require independent clinical review.</p></details>';}
var beforeBrandMedicines=medicines;
medicines=function(){return beforeBrandMedicines().replace(/<details class="card"><summary>Scope and verification gaps<\/summary>[\s\S]*?<\/details>/,brandCoverage());};
var brandParam=new URLSearchParams(location.search).get('medicine');
if(brandParam){var selectedCondition=C.findIndex(function(c){return(c.lesion&&c.lesion.id===brandParam)||c.n.toLowerCase()===brandParam.toLowerCase()||(c.lesion&&c.lesion.n.toLowerCase()===brandParam.toLowerCase());});st.tab='med';st.sel=null;st.mc=selectedCondition>=0?String(selectedCondition+1):'';}
draw();
