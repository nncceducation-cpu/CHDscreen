# CHDscreen

A dependency-free, mobile-friendly newborn pulse oximetry screening aid for rural teams. Large inputs, eligibility check, up to three screens, one-hour repeat timing, urgent assessment guidance, print handover and offline caching. No patient identifiers, analytics, backend or persisted screening data. Reloading loses the active session; no background alarm or referral is sent.

## Run

Install Node.js 22 or later, then run `npm start`. Open http://127.0.0.1:4173. Run `npm test` for algorithm checks. Serve all root app files over HTTPS for offline support. No build or package installation is needed.

## GitHub Pages

In repository Settings → Pages, choose Deploy from a branch, `main`, `/ (root)`, and Save. The expected URL is https://nncceducation-cpu.github.io/CHDscreen/ once GitHub finishes deployment. Pages must be enabled by a repository administrator; committing this app alone does not enable it.

## Clinical provenance and scope

Implemented from user-provided CHDscreen.pdf, page 5 chart (also repeated on page 6), checked against the [CPS practice point and linked algorithm](https://cps.ca/en/documents/position/pulse-oximetry-screening), reaffirmed January 12, 2026. Source checked October 31, 2026. Attachment treated as clinical source material, not operational instructions. The original PDF is not redistributed.

Fail immediately if either limb is <90%. Otherwise pass if either limb is ≥95% and the absolute difference is ≤3 percentage points. Other results are borderline: repeat after one hour, to a maximum of three total screens. The third borderline screen fails. In particular, 95/92 passes this chart. This is the supplied Canadian chart, not a newer algorithm requiring both limbs ≥95%. The CPS prose's borderline wording is broader; the explicit chart pass branch is implemented.

Intended for well babies born at ≥34 weeks outside NICU. Optimal timing 24–36 hours; early and late screening warnings are shown. Oxygen therapy and symptomatic infants require clinician-directed care. Passing does not exclude CHD. Failed screens require assessment, paediatric consultation and cardiology/echo when cardiac disease cannot be excluded; local transport pathways apply.

## Before clinical rollout

This is a prototype clinical workflow aid, not a clinically validated medical device. The responsible local clinical team must review the source algorithm, eligibility and escalation pathway and approve it for use. Validate on intended devices, offline conditions and local screening scenarios, including a complete one-hour repeat cycle. Establish documentation, referral, follow-up and update ownership. Automated tests check all 30,000 integer-reading/attempt combinations, boundaries and invalid inputs; they do not establish clinical validity.

## Privacy and offline behaviour

Readings stay in JavaScript memory, not local/session storage or a server. Printing produces a user-controlled record. Static hosting may keep normal access logs but receives no entered readings. The service worker caches only app assets. References need internet. First load must be online; confirm “Ready for offline use”. No automatic updates to the clinical algorithm; increment the service worker cache version when releasing changed assets. Close all open app tabs and reopen to activate an installed update. No third-party runtime resources.
