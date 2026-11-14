/* Title I Now: conversational intent layer for the MDE curated knowledge pilot.
   Works offline in the browser. Never claims to be generative AI or to approve spending.
   No student-identifying data should be entered. */
(function(root){"use strict";
const stop=new Set("a an and are as at be can could do does for from how i in is it me my of on or our please should the this to we what when where which who why with would title one part funds funding grant grants school schools student students".split(" "));
const synonyms={spend:"pay",purchase:"pay",buy:"pay",cover:"pay",allowable:"pay",allow:"pay",cost:"pay",budget:"pay",paying:"pay",snacks:"meals",food:"meals",refreshments:"meals",catering:"meals",lunch:"meals",breakfast:"meals",dinner:"meals",dues:"membership",memberships:"membership",professional:"membership",annual:"meeting",parents:"family",families:"family",caregivers:"family",engagement:"family",involvement:"family",permission:"approval",preauthorization:"approval",preapproval:"approval",nonpublic:"private",equitable:"private",comparison:"comparability",screening:"monitoring",referrals:"monitoring",progress:"monitoring",exit:"monitoring",entry:"monitoring",improvement:"micip",cna:"micip",needs:"micip",assistance:"targeted",targeting:"targeted",schoolwide:"schoolwide"};
const patterns=[
{topic:"event",re:/\b((parent|family|caregiver)s? (event|night|workshop|activity|activities)|pre.?authori[sz]ation form|event (approval|pre.?authori[sz]ation)|plan(ning)? an? (family|parent) )/i},
{topic:"contact",re:/\b(who (do|should|can) (i|we) (call|ask|email|contact)|how (do|can) (i|we) (reach|contact)|contact (the |a )?(title (i|1)|team|someone|person|office|district)|title (i|1) (team|contacts?|office|staff)|phone numbers?|email address(es)?|who can help|need help from)\b/i},
{topic:"meals",re:/\b(meals?|foods?|snacks?|refreshments?|catering|lunch|breakfast|dinner|beverages?)\b/i},
{topic:"membership",re:/\b(memberships?|association dues|professional associations?)\b/i},
{topic:"family",re:/\b(famil(?:y|ies)|parents?|caregivers?|compacts?|annual (title (i|1) )?meeting|title (i|1) meeting|engagement|involvement|sign.?in sheet)\b/i},
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
/* GRPS-specific answers (carried over from the original Ask Title I page). */
const EVENT_FORM="https://docs.google.com/forms/d/e/1FAIpQLSd83euSM-SbuVTP9zKuza1Zn2eBRhZR3H3uDu05lMbDSXpCOQ/viewform";
const GRPS={
 contact:{topic:"contact",title:"Title I contacts",linksLabel:"Reach the Title I team",
  message:"Mel Atkins II — Executive Director, Community & Student Affairs · 616-819-2125 · atkinsme@grps.org\nLoretta English — Director, Specialty Funded Programs · 616-819-7774 · englishl@grps.org\nMatt Kaindl — Title I Instructional Facilitator · 616-819-4995 · kaindlm@grps.org\n\nWhen you reach out, include the school, the program model, and the specific activity or cost so the team can answer quickly. Do not include confidential scholar information.",
  sources:[{title:"Email Mel Atkins II",url:"mailto:atkinsme@grps.org"},{title:"Email Loretta English",url:"mailto:englishl@grps.org"},{title:"Email Matt Kaindl",url:"mailto:kaindlm@grps.org"}],
  disclaimer:"GRPS Title I, Part A contacts for 2026–27."},
 event:{topic:"event",title:"Planning a Title I parent or family event",linksLabel:"Use these",
  message:"Start with the event's learning purpose and its connection to an identified need—not with the food or the giveaway.\n\n1. Describe what families will learn and how it connects to school needs and scholar learning.\n2. List the proposed costs and check each one; pre-authorization of the event is not blanket approval of every expense.\n3. Submit the GRPS Title I/31A Parent Event Pre-Authorization Form before the event, then follow district purchasing procedures.\n4. Keep the agenda, sign-in sheet, and evaluation. GRPS expects all three for every parent meeting.",
  sources:[{title:"GRPS Parent Event Pre-Authorization Form",url:EVENT_FORM},{title:"Check a specific cost in the Decision Lab",url:"title-i-decision-lab.html"}],
  disclaimer:"Event pre-authorization does not approve individual expenses. Confirm allowability of specific costs before purchasing."}
};
function tokenize(s){return String(s).toLowerCase().replace(/[^a-z0-9 ]/g," ").split(/\s+/).filter(x=>x&&!stop.has(x)).map(x=>synonyms[x]||x)}
function classify(q,previous){const text=String(q||"").trim().slice(0,900);if(!text)return {kind:"empty"};if(untrusted.test(text))return {kind:"unsupported",reason:"I can help with Title I guidance, but not with requests to change my operating instructions."};let hits=patterns.filter(p=>p.re.test(text));if(!hits.length&&previous&&followup.test(text)){return {kind:"followup",topic:previous.topic,context:previous}}
if(!hits.length)return {kind:"unsupported",reason:"I do not have a verified answer for that specific question yet."};
const topic=hits[0].topic;const ambiguous=hits.length>1&&topic==="funding";return {kind:"matched",topic,ambiguous,keywords:tokenize(text),context:previous};}
function answer(question,previous){const m=classify(question,previous);if(m.kind==="empty")return {kind:"empty",message:"Enter a question to get started."};if(m.kind==="unsupported")return {kind:"unsupported",message:m.reason+" Please include the proposed activity, school model, and purpose, or consult the MDE resource center."};if(GRPS[m.topic])return Object.assign({kind:"answered",followup:false,context:{topic:m.topic}},GRPS[m.topic]);const base=root.TitleINowMDE?.answer(m.topic==="funding"?"What can Title I pay for?":({meals:"Can Title I pay for meals?",membership:"Can Title I pay for membership?",family:"What are the family engagement requirements?",private:"What are private school equitable services?",comparability:"What is Title I comparability?",prior:"Do we need prior approval?",micip:"How does Title I connect to MICIP?",schoolwide:"What is schoolwide versus targeted assistance?",monitoring:"How do we monitor student progress?"})[m.topic]);if(!base)return {kind:"unsupported",message:"The MDE knowledge library is unavailable."};
let extra="";const q=String(question).toLowerCase();
if(m.topic==="funding"){extra="For a specific GRPS example, tell me the item or service, the school, the intended beneficiaries, how it addresses a documented need, and whether it is in the approved plan and budget. Possible uses to examine include supplemental literacy intervention, evidence-based professional learning, and family engagement activities; these are examples for review, not blanket approvals."}
if(m.topic==="meals"&&/parent|famil|meeting/.test(q))extra="The guidance above distinguishes staff professional learning and travel. A family-engagement event requires a separate, activity-specific allowability review; do not assume the same conclusion applies.";
if(m.topic==="schoolwide"&&/targeted/.test(q))extra="A school's approved program model determines which student-selection requirements apply.";
if(m.kind==="followup")extra="This follows the previous topic. The assistant cannot determine a new expenditure's allowability from a short follow-up alone; include the specific item, purpose, and school model.";
if(m.topic==="family")extra+=" GRPS meeting documentation expectation: agenda, sign-in sheet, and evaluation for every parent meeting. This does not replace the full federal annual-meeting requirements.";
return {kind:"answered",topic:base.topic,title:base.title,message:base.answer+(extra?"\n\n"+extra:""),sources:base.sources,disclaimer:base.disclaimer,followup:m.kind==="followup",context:{topic:base.topic}};}
root.TitleINowConversation={answer,classify,version:"2026-11-13.3"};
})(typeof window!=="undefined"?window:globalThis);
