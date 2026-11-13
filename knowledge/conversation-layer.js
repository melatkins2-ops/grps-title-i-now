/* Title I Now: conversational intent layer for the MDE curated knowledge pilot.
   Works offline in the browser. Never claims to be generative AI or to approve spending.
   No student-identifying data should be entered. */
(function(root){"use strict";
const stop=new Set("a an and are as at be can could do does for from how i in is it me my of on or our please should the this to we what when where which who why with would title one part funds funding grant grants school schools student students".split(" "));
const synonyms={spend:"pay",purchase:"pay",buy:"pay",cover:"pay",allowable:"pay",allow:"pay",cost:"pay",budget:"pay",paying:"pay",snacks:"meals",food:"meals",refreshments:"meals",catering:"meals",lunch:"meals",breakfast:"meals",dinner:"meals",dues:"membership",memberships:"membership",professional:"membership",annual:"meeting",parents:"family",families:"family",caregivers:"family",engagement:"family",involvement:"family",permission:"approval",preauthorization:"approval",preapproval:"approval",nonpublic:"private",equitable:"private",comparison:"comparability",screening:"monitoring",referrals:"monitoring",progress:"monitoring",exit:"monitoring",entry:"monitoring",improvement:"micip",cna:"micip",needs:"micip",assistance:"targeted",targeting:"targeted",schoolwide:"schoolwide"};
const patterns=[
{topic:"meals",re:/\b(meals?|foods?|snacks?|refreshments?|catering|lunch|breakfast|dinner|beverages?)\b/i},
{topic:"membership",re:/\b(memberships?|association dues|professional associations?)\b/i},
{topic:"family",re:/\b(famil(?:y|ies)|parents?|caregivers?|compacts?|annual meeting|engagement|involvement)\b/i},
{topic:"private",re:/\b(private|nonpublic|equitable services)\b/i},
{topic:"comparability",re:/\bcomparab/i},
{topic:"prior",re:/\b(prior|pre.?approval|pre.?authorization|permission)\b/i},
{topic:"micip",re:/\b(micip|comprehensive needs assessment|school improvement|needs assessment|cna)\b/i},
{topic:"schoolwide",re:/\b(schoolwide|school-wide|targeted assistance|targeted program)\b/i},
{topic:"monitoring",re:/\b(monitor|screening|referral|entrance|entry criteria|exit criteria|progress)\b/i},
{topic:"funding",re:/\b(pay|fund|purchase|buy|expense|spend|budget|cost|allowable|reimburse)\b/i}
];
const followup=/^(what about|how about|and|does that|would that|what if|is it|can we|could we|for|at|with|without|same for)\b/i;
const untrusted=/\b(ignore (all |previous |the )?instructions|system prompt|developer message|reveal (your|the) prompt)\b/i;
function tokenize(s){return String(s).toLowerCase().replace(/[^a-z0-9 ]/g," ").split(/\s+/).filter(x=>x&&!stop.has(x)).map(x=>synonyms[x]||x)}
function classify(q,previous){const text=String(q||"").trim().slice(0,900);if(!text)return {kind:"empty"};if(untrusted.test(text))return {kind:"unsupported",reason:"I can help with Title I guidance, but not with requests to change my operating instructions."};let hits=patterns.filter(p=>p.re.test(text));if(!hits.length&&previous&&followup.test(text)){return {kind:"followup",topic:previous.topic,context:previous}}
if(!hits.length)return {kind:"unsupported",reason:"I do not have a verified answer for that specific question yet."};
const topic=hits[0].topic;const ambiguous=hits.length>1&&topic==="funding";return {kind:"matched",topic,ambiguous,keywords:tokenize(text),context:previous};}
function answer(question,previous){const m=classify(question,previous);if(m.kind==="empty")return {kind:"empty",message:"Enter a question to get started."};if(m.kind==="unsupported")return {kind:"unsupported",message:m.reason+" Please include the proposed activity, school model, and purpose, or consult the MDE resource center."};const base=root.TitleINowMDE?.answer(m.topic==="funding"?"What can Title I pay for?":({meals:"Can Title I pay for meals?",membership:"Can Title I pay for membership?",family:"What are the family engagement requirements?",private:"What are private school equitable services?",comparability:"What is Title I comparability?",prior:"Do we need prior approval?",micip:"How does Title I connect to MICIP?",schoolwide:"What is schoolwide versus targeted assistance?",monitoring:"How do we monitor student progress?"})[m.topic]);if(!base)return {kind:"unsupported",message:"The MDE knowledge library is unavailable."};
let extra="";const q=String(question).toLowerCase();
if(m.topic==="funding"){extra="To make this specific, tell me what you want to purchase, the school or program, how it addresses an identified need, and whether it is in the approved plan and budget."}
if(m.topic==="meals"&&/parent|famil|meeting/.test(q))extra="The guidance above distinguishes staff professional learning and travel. A family-engagement event requires a separate, activity-specific allowability review; do not assume the same conclusion applies.";
if(m.topic==="schoolwide"&&/targeted/.test(q))extra="A school's approved program model determines which student-selection requirements apply.";
if(m.kind==="followup")extra="This follows the previous topic. The assistant cannot determine a new expenditure's allowability from a short follow-up alone; include the specific item, purpose, and school model.";
return {kind:"answered",topic:base.topic,title:base.title,message:base.answer+(extra?"\n\n"+extra:""),sources:base.sources,disclaimer:base.disclaimer,followup:m.kind==="followup",context:{topic:base.topic}};}
root.TitleINowConversation={answer,classify,version:"2026-11-13.2"};
})(typeof window!=="undefined"?window:globalThis);
