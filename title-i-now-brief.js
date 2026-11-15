/* Title I NOW — monthly action brief.
   Renders the header stamp, home feature, "This Month" brief and the operating-check
   hero from one place, for whichever month is current (see grpsCurrentMonthCode in
   index.html). October and November are hand-written issues; any other month falls
   back to the 2026–27 roadmap data so the site never shows a stale month.
   Preview an issue: index.html?month=DEC#month */
(function () {
  'use strict';

  const ORDER = ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
  const NAMES = { JUL: 'July', AUG: 'August', SEP: 'September', OCT: 'October', NOV: 'November', DEC: 'December', JAN: 'January', FEB: 'February', MAR: 'March', APR: 'April', MAY: 'May', JUN: 'June' };
  const YEAR = { JUL: 2026, AUG: 2026, SEP: 2026, OCT: 2026, NOV: 2026, DEC: 2026, JAN: 2027, FEB: 2027, MAR: 2027, APR: 2027, MAY: 2027, JUN: 2027 };

  const ACTIVITY_LOG = 'https://docs.google.com/forms/d/e/1FAIpQLSclvoVBEkWh4qPY6h0NDj7n3cDeB_q7GmmB43xXCjYPbykg6g/viewform';
  const ACTIVITY_LOG_HELP = 'https://docs.google.com/document/d/153uAXHLMnZElYo6ezPD5DWv4ijlqQDuG/edit';
  const ACTIVITY_LOG_VIDEO = 'https://drive.google.com/file/d/1Mu9i1M6WozNAb1alQBrZpfIHNhP9r7sB/view';
  const MDE_MONITOR_STRATEGY = 'https://www.michigan.gov/mde/-/media/Project/Websites/mde/MICIP/Resources/Monitoring_Strategy_Implementation.docx?hash=2C00C2DE88EDFF34E3E113AD93D79B1E&rev=473b61e16c144c79b42a5698bd7316c7';
  const MICIP_CROSSWALK = 'https://www.michigan.gov/mde/-/media/Project/Websites/mde/MICIP/Resources/MICIP_Crosswalk_with_Title_I.pdf?hash=27464D8A8C422AC0ACA222431EB4169F&rev=9219f94201164b45bdb25de9108776b6';
  const MDE_MONITOR_PLAN ='https://www.michigan.gov/mde/-/media/Project/Websites/mde/MICIP/Resources/Strategy_Implementation_Monitoring_Plan_Template.pdf?hash=8648AEC3FFFD1E70FE6E598623DA83DF&rev=996446c2f4c24f68a2179dab0f75fe1f';

  /* Action types: view (switch page), tool (open a Toolkit tool), link (external). */
  const BRIEFS = {
    OCT: {
      summary: 'Check implementation. Support scholars. Complete required work.',
      headline: 'October: Three priorities. One clear focus.',
      focus: 'Make sure the support we planned is reaching scholars.',
      priorities: [
        { audience: 'SCHOOL LEADERSHIP', title: 'Annual Title I Meeting', text: 'Help families understand school priorities, Title I supports, and how their input will be used. Keep the required meeting evidence.', actions: [{ type: 'view', view: 'meeting', label: 'Open meeting resources →' }] },
        { audience: 'SCHOOL LEADERSHIP', title: 'Check whether support is reaching scholars', text: 'Compare planned services with actual rosters, schedules, participation, and frequency. Identify one owner and next step for each gap.', actions: [{ type: 'view', view: 'priorities', label: 'Open October implementation check →' }] },
        { audience: 'FEDERALLY FUNDED STAFF · SUPERVISORS', title: 'Federal Activity Log', text: 'Applicable staff submit one Google Form per completed activity. Supervisors review documentation for completeness, accuracy, and alignment with funded duties.', actions: [{ type: 'link', href: ACTIVITY_LOG, label: 'Complete Activity Log ↗', filled: true }, { type: 'link', href: ACTIVITY_LOG_HELP, label: 'Instructions ↗' }, { type: 'link', href: ACTIVITY_LOG_VIDEO, label: 'Example video ↗' }] }
      ],
      ongoingActivityLog: false,
      details: [
        ['What changed', 'There is no routine principal-facing allocation task this month. Central office will bring forward funding or amendment issues only when a school decision is required.'],
        ['Continuous improvement / MICIP', 'Before interpreting results, confirm the strategy was delivered to the intended scholars at the planned frequency and intensity.'],
        ['Keep the evidence', 'Retain relevant service rosters, schedules, participation records, meeting materials and feedback, Activity Log documentation, and records of corrections.'],
        ['Coming in November', 'Review early scholar results alongside implementation evidence to distinguish delivery gaps from strategy concerns.']
      ],
      detailsTool: '30-Minute Title I Team Meeting',
      check: {
        title: 'Make sure scholars are receiving the support we planned.',
        intro: 'Use October to verify implementation, complete the Annual Title I Meeting, review Activity Logs for quality, and correct gaps before they grow.'
      }
    },
    NOV: {
      summary: 'Put early results beside implementation. Make one clear decision per strategy.',
      headline: 'November: Three priorities. One clear focus.',
      focus: 'Look at what is happening for scholars before changing the strategy.',
      priorities: [
        { audience: 'SCHOOL LEADERSHIP · TITLE I TEAM', title: 'Put early results beside implementation', text: 'For each major strategy, line up early progress information with service participation, frequency, and intensity. Use the data the school already has.', actions: [{ type: 'view', view: 'priorities', label: 'Open November implementation check →' }, { type: 'link', href: MDE_MONITOR_PLAN, label: 'MDE monitoring plan template ↗' }] },
        { audience: 'SCHOOL LEADERSHIP', title: 'Separate a delivery problem from a strategy problem', text: 'A weak early result is not proof the strategy is wrong if delivery was inconsistent. Check whether scholars with the greatest identified need are actually being reached.', actions: [{ type: 'link', href: MDE_MONITOR_STRATEGY, label: 'Monitoring of Strategy Implementation ↗' }] },
        { audience: 'SCHOOL LEADERSHIP · TITLE I TEAM', title: 'Make one decision for each major strategy', text: 'Continue, Correct Implementation, or Intensify. Record the decision and the reason, and give any correction one owner and a due date.', actions: [{ type: 'tool', tool: '30-Minute Title I Team Meeting', label: 'Open the 30-Minute Title I Team Meeting →' }] }
      ],
      ongoingActivityLog: true,
      details: null, // built from the roadmap's November plan
      detailsTool: 'Monthly Title I Principal Checklist',
      check: {
        title: 'Put early results beside what was actually delivered.',
        intro: 'Use November to compare early scholar progress with implementation evidence, separate delivery gaps from strategy concerns, and make one clear decision for each major strategy.'
      }
    },
    DEC: {
      summary: 'Check that the work and the evidence tell the same story. Give every gap an owner.',
      headline: 'December: Three priorities. One clear focus.',
      focus: 'Make sure the work and the evidence tell the same story.',
      priorities: [
        { audience: 'SCHOOL LEADERSHIP · TITLE I TEAM', title: 'Walk the evidence chain for each strategy', text: 'For each major Title I strategy, follow the story from the identified need to the strategy, what was delivered, early results, and any adjustment. Could someone else follow it?', actions: [{ type: 'tool', tool: 'Title I On-Site Review Evidence Structure', label: 'Open the Evidence Organizer →' }, { type: 'link', href: MICIP_CROSSWALK, label: 'MICIP–Title I Crosswalk ↗' }] },
        { audience: 'SCHOOL LEADERSHIP', title: 'Name each gap for what it is', text: 'Sort every meaningful gap: implementation, documentation, staffing, fiscal or support, or follow-up. Fill in missing evidence only when the work actually happened—paperwork should never cover for work that did not.', actions: [{ type: 'tool', tool: 'Prepare for On-Site Review', label: 'Open Monitoring Readiness →' }] },
        { audience: 'SCHOOL LEADERSHIP · TITLE I TEAM', title: 'Give every open gap an owner', text: 'Before winter break, assign one owner, a due date, and a follow-up date for each unresolved gap, so the work picks up in January instead of starting over.', actions: [{ type: 'tool', tool: '30-Minute Title I Team Meeting', label: 'Open the 30-Minute Title I Team Meeting →' }] }
      ],
      ongoingActivityLog: true,
      details: null, // built from the roadmap's December plan
      detailsTool: 'Monthly Title I Principal Checklist',
      check: {
        title: 'Make sure the work and the evidence tell the same story.',
        intro: 'Use December’s midyear point to follow each strategy from need to result, name every meaningful gap, and give each one an owner before winter break.'
      }
    }
  };

  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function actionHTML(a) {
    if (a.type === 'view') return `<button type="button" class="briefAction viewLink" data-view="${esc(a.view)}">${esc(a.label)}</button>`;
    if (a.type === 'tool') return `<button type="button" class="briefAction" data-tool-open-title="${esc(a.tool)}">${esc(a.label)}</button>`;
    return `<a class="briefAction${a.filled ? ' briefActionFilled' : ''}" href="${esc(a.href)}" target="_blank" rel="noopener noreferrer">${esc(a.label)}</a>`;
  }

  /* Generic issue from the roadmap data for months without a hand-written brief. */
  function genericBrief(code, m, tools) {
    const name = NAMES[code];
    const tt = (tools || []).map((t) => {
      if (t.kind === 'internal') return { type: 'tool', tool: t.target, label: t.label + ' →' };
      if (t.kind === 'logs') return { type: 'view', view: 'logs', label: t.label + ' →' };
      if (t.kind === 'meeting') return { type: 'view', view: 'meeting', label: t.label + ' →' };
      return { type: 'link', href: t.url, label: t.label + ' ↗' };
    });
    const actions = (m.actions || []).slice(0, 3);
    return {
      summary: m.focus,
      headline: `${name}: ${actions.length === 1 ? 'One priority' : (actions.length === 2 ? 'Two priorities' : 'Three priorities')}. One clear focus.`,
      focus: m.focus,
      priorities: actions.map((text, i) => ({ audience: 'SCHOOL LEADERSHIP', title: text, text: '', actions: tt[i] ? [tt[i]] : [] })),
      ongoingActivityLog: true,
      details: null,
      detailsTool: 'Monthly Title I Principal Checklist',
      check: { title: m.focus, intro: m.outcome ? `By the end of ${name}: ${m.outcome}` : '' }
    };
  }

  function detailsFromRoadmap(code, m) {
    const nextIdx = ORDER.indexOf(code) + 1;
    const rows = [];
    if (m.changed) rows.push(['What changed', m.changed]);
    if (m.micip) rows.push(['Continuous improvement / MICIP', m.micip]);
    if (m.data) rows.push(['Data and scholar check', m.data]);
    if (m.evidence) rows.push(['Keep the evidence', m.evidence]);
    if (m.next && ORDER[nextIdx]) rows.push([`Coming in ${NAMES[ORDER[nextIdx]]}`, m.next.replace(/^[A-Za-z /]+ — /, '')]);
    return rows;
  }

  function render() {
    const code = (window.grpsCurrentMonthCode && window.grpsCurrentMonthCode()) || 'NOV';
    const months = window.TITLE_I_MONTHS || {};
    const toolsByMonth = window.TITLE_I_MONTH_TOOLS || {};
    const m = months[code] || {};
    const brief = BRIEFS[code] || genericBrief(code, m, toolsByMonth[code]);
    const name = NAMES[code];
    const upper = `${name.toUpperCase()} ${YEAR[code]}`;
    const details = brief.details || detailsFromRoadmap(code, m);
    const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };

    set('issueStamp', `${name} ${YEAR[code]}`);
    set('homeBriefEyebrow', `CURRENT BRIEF · ${upper}`);
    set('homeBriefTitle', `${name} priorities`);
    set('homeBriefSummary', brief.summary);
    set('homeBriefButton', `See ${name} priorities`);
    set('checkEyebrow', `${name.toUpperCase()} · GRPS TITLE I OPERATING CHECK`);
    set('checkTitle', brief.check.title);
    set('checkIntro', brief.check.intro);
    set('checkCount', `Six checks for ${name}.`);
    const homeFeature = document.querySelector('#siteHome .homeFeature');
    if (homeFeature) homeFeature.setAttribute('aria-label', `Current monthly focus: ${name}`);

    const mount = document.getElementById('monthBriefMount');
    if (mount) {
      const priorities = brief.priorities.map((p, i) => `
        <div class="briefPriority" id="section${i + 1}">
          <div class="briefNumber">${String(i + 1).padStart(2, '0')}</div><div class="briefPriorityText"><span class="briefAudience">${esc(p.audience)}</span><h3>${esc(p.title)}</h3>${p.text ? `<p>${esc(p.text)}</p>` : ''}${p.actions.length ? `<div class="briefActions">${p.actions.map(actionHTML).join('')}</div>` : ''}</div>
        </div>`).join('');
      const ongoing = brief.ongoingActivityLog ? `
        <div class="briefOngoing"><div><span class="briefAudience">KEEP GOING · FEDERALLY FUNDED STAFF</span><h3>Federal Activity Log</h3><p>Submit one Google Form per completed activity. Supervisors keep reviewing for accuracy and alignment with funded duties.</p></div>
        <div class="briefActions">${actionHTML({ type: 'link', href: ACTIVITY_LOG, label: 'Complete Activity Log ↗', filled: true })}${actionHTML({ type: 'view', view: 'logs', label: 'Help & instructions →' })}</div></div>` : '';
      mount.innerHTML = `
    <section class="briefIntro" aria-labelledby="briefHeading">
      <div class="briefTopline"><span>TITLE I NOW · MONTHLY ACTION BRIEF</span><span>${esc(upper)}</span></div>
      <h1 id="briefHeading">${esc(brief.headline)}</h1>
      <p class="briefFocus"><strong>This month's focus:</strong> ${esc(brief.focus)}</p>
      <p class="briefSummary">Use the tools below to complete the work, verify implementation, and address gaps. No additional reporting system is needed.</p>
    </section>
    <section class="briefBody" aria-label="${esc(name)} priorities">
      <h2>What needs your attention</h2>
      ${priorities}
      ${ongoing}
      <div class="briefFooter" id="section${brief.priorities.length + 1}"><div><span class="briefAudience">NEED MORE DETAIL?</span><h3>Guidance when you need it—not another long newsletter.</h3><p>Use the full roadmap for upcoming work or the toolkit for program guidance and supporting documents.</p></div><div class="briefActions"><button type="button" class="briefAction viewLink" data-view="year">2026–27 Roadmap →</button><button type="button" class="briefAction viewLink" data-view="tools">Title I Toolkit →</button></div></div>
      <details class="briefDetails" id="section${brief.priorities.length + 2}"><summary>Additional ${esc(name)} guidance <span>${esc(details.map((d) => d[0].replace('Continuous improvement / ', '')).join(', '))}</span></summary><div class="briefDetailContent">${details.map((d) => `<h3>${esc(d[0])}</h3><p>${esc(d[1])}</p>`).join('')}${brief.detailsTool ? `<button type="button" class="briefAction" data-tool-open-title="${esc(brief.detailsTool)}">Open the ${esc(brief.detailsTool)} →</button>` : ''}</div></details>
    </section>`;
    }

    // Preview banner when someone is looking at a month other than the real current one.
    let preview = null;
    try { preview = new URLSearchParams(location.search).get('month'); } catch (e) { /* ignore */ }
    if (preview && !document.querySelector('.previewBanner')) {
      const bar = document.createElement('div');
      bar.className = 'previewBanner';
      bar.setAttribute('role', 'status');
      bar.innerHTML = `Previewing the ${esc(name)} issue. <a href="${esc(location.pathname)}">Return to the current issue</a>`;
      document.body.prepend(bar);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
  window.grpsRenderMonthlyBrief = render;
})();
