# Skin Conditions Assistant

Browser-based clinical reference application.

Live app: https://skin-conditions-assistant.vercel.app/

## Development

Open `index.html` in a browser or serve the repository with any static HTTP server. No dependencies or build step are required.

## Deployment

Vercel serves the repository root as a static site. Pushes to `main` trigger production deployments when the Git integration is connected.

Clinical content requires clinician review before use in patient care.

## Skin lesion RAG update

Imported `skin-lesion-rag.zip` into the existing static application without replacing its browser storage or Indian medicine catalogue. The knowledge base now has 33 conditions: 12 added entries and supplementary reference details for 9 existing entries. The original entry order and names remain stable for medicine mappings, custom conditions, photographs and notes.

New entries: herpes zoster, varicella, EBV rash, CMV/HHV skin disease, mpox, molluscum, orf, parvovirus B19, scabies, urticaria/angioedema, cellulitis/erysipelas, and herpes simplex/eczema herpeticum.

`lesion.html` provides findings/photo input. `api/analyze.js` is a Vercel Node function using the uploaded BM25-style retrieval algorithm. No Next.js migration or build dependency is required. Vercel must serve the root as a static project with Node functions enabled (Framework Preset: Other). A static local server supports reference browsing but not `/api/analyze`; use Vercel preview/deployment to exercise that endpoint.

Optional server-side environment variables: `ANTHROPIC_API_KEY` and `ANTHROPIC_MODEL` (see `.env.example`). Without a key, or if the provider fails, results use text findings only. Image-only submissions never fall back to an arbitrary condition. The UI explicitly states when an image was not analyzed. No submitted findings/photos are written by the function; hosting/provider retention policies still apply. AI responses and imported reference content require clinician review. Uploaded Harrison chapter/source labels are retained as supplied, not represented as independently verified citations. Brand mappings now cover all 33 conditions; see the catalogue coverage summary for verified listings and remaining shortfalls.

Before enabling paid AI on an unrestricted public deployment, apply suitable access controls and provider budgets. The original app has no user authentication, and this update does not add it.


## Indian brand catalogue expansion (2 November 2026)

Preserves all 35 previous medicine groups and adds sourced class references in `lib/indian-brand-additions.js`. The expanded catalogue includes five listings for 60 treatment groups, with explicit shortfalls for specialist/limited-supply classes. Each new listing identifies the active ingredient or class, source-listed marketer, formulation caveats and reference URL; new prices are not invented. Existing dated price information is retained.

`lib/integrate-brands.js` maps medicine groups to all 33 conditions, enables condition links from the lesion analyzer, and renders a live coverage summary. Five entries per class does not imply five brands for every molecule within that class. Brand identity is distinct from current local stock, regulatory indication, therapeutic interchangeability and patient suitability. The catalogue records fewer than five where evidence was insufficient. Zero verified listings does not prove zero availability in India.

Sources include Tata 1mg product/generic listings, Apollo Pharmacy, and the manufacturer's India launch release for Ilumya. These links verify catalogue identities, not the clinical validity of all imported treatment text. Original drug/condition content and RAG behavior are retained.
