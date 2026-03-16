---
status: diagnosed
trigger: "the domain and url mask does not do anything — these types should validate on blur but nothing happens"
created: 2026-03-16T00:00:00Z
updated: 2026-03-16T00:00:00Z
---

## Current Focus

hypothesis: Validation functions exist and are called correctly, but the error state is never surfaced to the user because `errorMessage` is not provided in stories and the blur validation skips empty values
test: Traced entire blur path — handleBlur -> setHasError -> showError -> errorMessage render
expecting: confirmed root causes identified
next_action: return diagnosis

## Symptoms

expected: Typing an invalid domain or URL and blurring the Input should show an error state (red border, error message)
actual: Nothing visible happens when blurring a domain or url type input
errors: none (silent failure)
reproduction: Render <Input type="domain" /> or <Input type="url" />, type anything, tab away
started: as-built (never worked end-to-end)

## Eliminated

- hypothesis: blur handler does not call isValidDomain / isValidUrl
  evidence: handleBlur at line 150-151 correctly calls both functions when type matches
  timestamp: 2026-03-16T00:00:00Z

- hypothesis: isValidDomain / isValidUrl are not exported from utils
  evidence: both are exported from src/utils/index.ts lines 429 and 435
  timestamp: 2026-03-16T00:00:00Z

- hypothesis: import in Input.tsx is broken
  evidence: line 7 imports { applyMask, isValidEmail, isValidDomain, isValidUrl } from ../../utils/index — all four are present
  timestamp: 2026-03-16T00:00:00Z

## Evidence

- timestamp: 2026-03-16T00:00:00Z
  checked: Input.tsx handleBlur (lines 144-154)
  found: setHasError is called correctly for domain and url types
  implication: validation state IS updated — problem is downstream in rendering

- timestamp: 2026-03-16T00:00:00Z
  checked: Input.tsx showError and errorMessage render (lines 168, 253-255)
  found: |
    showError = isError || hasError (line 168) — this correctly turns on the red border
    but the error paragraph at line 253 only renders when `errorMessage` prop is ALSO provided:
      {errorMessage && showError && (<p ...>{errorMessage}</p>)}
  implication: the red border DOES appear on blur, but there is no visible text because
    no errorMessage prop is passed. This is one real gap.

- timestamp: 2026-03-16T00:00:00Z
  checked: Input.stories.tsx — all story definitions
  found: |
    - No story uses type="domain" or type="url" with an explicit errorMessage prop
    - The "Types" story (line 33-41) renders all types with no extra props at all
    - The "IsError" story uses type="text" only
  implication: no story demonstrates or tests blur validation for domain/url types

- timestamp: 2026-03-16T00:00:00Z
  checked: handleBlur empty-value path (line 148)
  found: |
    val = currentValue ?? ''
    if (type === 'email') setHasError(!isValidEmail(val))
    else if (type === 'domain') setHasError(!isValidDomain(val))
    else if (type === 'url') setHasError(!isValidUrl(val))
    — no guard for empty string. isValidDomain('') returns false (regex does not match),
      so blurring an empty domain input WILL immediately show an error.
      This is actually correct behaviour for required fields but may surprise users
      on optional fields.
  implication: secondary UX concern, not the primary silent-failure bug

- timestamp: 2026-03-16T00:00:00Z
  checked: applyMask in utils/index.ts (lines 392-423)
  found: |
    The switch statement handles 'cpf', 'cnpj', 'cep' — but the 'domain' and 'url'
    cases have NO body. They fall through to the default (implicit no-op).
    The mask prop is also gated in handleChange: `if (mask && type === 'text')` —
    so passing mask="domain" on type="domain" would do nothing anyway.
  implication: mask="domain" / mask="url" are listed as valid options in stories
    argTypes but are entirely non-functional — they produce no formatting at all

## Resolution

root_cause: |
  TWO independent root causes:

  ROOT CAUSE 1 — "validation does nothing visually"
    The blur handler DOES run and DOES call setHasError. The red border IS applied via
    showError. However the user sees nothing because:
      a) the error paragraph is gated on `errorMessage && showError` — no errorMessage
         prop means no visible feedback text ever appears.
      b) No story exercises domain/url with an errorMessage prop, so the feature was
         never validated in Storybook.

  ROOT CAUSE 2 — "domain and url mask does nothing"
    applyMask() in src/utils/index.ts has case entries for 'domain' and 'url' in the
    TypeScript type signature (line 394) but zero implementation inside the switch
    statement (lines 396-422). The cases simply do not exist. Even if they did,
    handleChange (line 118) guards mask application with `type === 'text'`, so
    mask on a non-text type is silently skipped.

fix: not applied (diagnose-only mode)
verification: not applied
files_changed: []
