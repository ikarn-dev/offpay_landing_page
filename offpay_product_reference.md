# OffPay — Product Reference for Landing Page

> Distilled from all files in `public/ref-docs/` — README, plan.md, client-module-status.md, OffPay_PRD_v4_0-1.md, backend-docs/documentations/*, and backend-docs/docs/*.
>
> **Last updated:** May 2026

---

## Product Identity

| Field | Value |
|---|---|
| **Name** | OffPay |
| **Tagline** | Privacy-first, dual-mode, non-custodial mobile wallet built on Solana |
| **Blockchain** | Solana (Devnet + Mainnet-Beta) |
| **Platform** | React Native (Expo SDK 54) — iOS & Android |
| **Wallet Model** | Non-custodial self-custody — no login, no signup, no subscription |
| **Backend** | Hono on Vercel (Node.js) at `api.offpay.app` |
| **Version** | v4.0 (April 2026) |

### One-liner

> The only Solana wallet that combines offline P2P payments, zero-knowledge privacy, and best-price swaps — all without creating an account.

### Elevator Pitch

OffPay is a self-custody Solana wallet that lets you pay anyone, anywhere — even without internet. It uses Solana durable nonces for cryptographically secure offline payments via QR code exchange, Umbra Protocol for ZK-shielded transfers, MagicBlock for private on-chain settlement, Helius for wallet intelligence, and Jupiter for in-app swaps. No login. No subscription. No custodian.

---

## Five Architectural Layers

Each layer functions independently — a bug in one doesn't affect the others. All compose into a single payment experience.

| # | Layer | Provider | Purpose |
|---|---|---|---|
| 1 | **Offline Layer** | Solana Durable Nonces + QR Exchange | Zero-internet P2P payments with local cryptographic verification and settlement on reconnect |
| 2 | **Online Layer** | MagicBlock (Private Payments API + Ephemeral Rollups) | Confidential online P2P transfers and private batch settlement |
| 3 | **Privacy Layer** | Umbra Protocol (ZK Shielded Transfers) | Zero-knowledge shielded balances, transfers, and viewing keys |
| 4 | **Intelligence Layer** | Helius (Wallet API + Enhanced Tx + Activity Streaming) | Wallet data, live activity, counterparty safety badges, spam filtering |
| 5 | **Swap Layer** | Jupiter Developer Platform (Swap V2, Trigger, DCA) | Best-price in-app token swaps across all Solana DEXs |

**Shared Solana Layer:** `@solana/web3.js`, Mobile Wallet Adapter (Phantom/Solflare), Helius RPC (via backend proxy)

**Backend Trust Boundary:** The app never calls Helius, Jupiter, MagicBlock, or any keyed RPC directly. All provider traffic routes through `api.offpay.app`. The backend owns provider credentials, sanitizes responses, enforces feature gates, and stores only server-safe metadata.

---

## Current Build Status Overview

> [!IMPORTANT]
> This section reflects what is **actually implemented** per `client-module-status.md` and backend testing docs. The landing page should market the product vision but stay honest about what's shipping.

### Built & Backend-Integrated
- Auth signing, bootstrap, capability gating
- Wallet balances, transaction history, risk scoring, live SSE activity stream
- Private payments (MagicBlock) — init, balance, send, broadcast, settle
- Normal swaps (Jupiter) — tokens, price, quote, execute
- Advanced swap modes (trigger, recurring, privacy-envelope) — implemented & capability-gated
- Pending backup encrypted queue, restore, settlement engine
- Umbra SDK execution actions (shield, unshield, private-send, claim, register, balance)
- Offline payment slots — nonce pool, preparation, advance, status, SOL recovery, token context
- QR scanning/generation — Solana URI, offline request, Umbra private address, nonce payment
- Durable nonce construction, receiver-side verification, settlement-linked lifecycle
- USDC/USDT stablecoin-only offline transfer construction

### Not Yet Built
- **BLE / WiFi Hotspot device-to-device transport** — the offline P2P transport layer is not implemented. Offline payments currently work via QR code address/amount exchange → local durable nonce construction → encrypted queue → settlement on reconnect
- Unified P2P send/receive/review/confirmation UX
- Shared payment confirmation receipt screen
- Live Umbra positive-path validation (awaiting funded release credentials)
- Physical device QA for camera, signing, attestation

---

## Core Features (Landing Page Ready)

### 1. Offline Payments — Zero Internet Required

**Headline:** Pay anyone, anywhere — even without internet
**Description:** Pre-signed transactions built entirely on-device using Solana durable nonces. Exchange payment details via QR code. Get cryptographic confirmation instantly — no internet needed at the point of payment. Settlement happens privately when you reconnect.

**Key details:**
- One-time setup (~0.0015 SOL for nonce account), then ready for offline payments
- QR-based payment request exchange — scan to pre-fill recipient and amount
- Receiver verifies Ed25519 signature, nonceAdvance instruction, amount, and recipient — all offline
- Signed transaction blob stored in encrypted local queue
- Automatic private settlement via MagicBlock when internet reconnects
- Nonce mechanism makes double-spend architecturally impossible
- USDC/USDT stablecoin-only for offline P2P
- Payment slots: opt-in with pool size presets (10, 20, 50, or custom), live backend rent estimates
- SOL recovery for unused offline slots with explicit user confirmation

**Differentiator:** No other consumer wallet on Solana — or any other chain — can do trustless offline P2P.

> [!NOTE]
> **What's built:** Durable nonce construction, QR scanning/generation, signed blob verification, encrypted pending queue, settlement engine, offline payment slots with nonce pool management, USDC/USDT offline transfer construction.
> **What's planned (not built):** BLE GATT and WiFi Hotspot device-to-device transport for proximity transfer without QR. The PRD envisions this, but current implementation uses QR-based exchange.

---

### 2. Zero-Knowledge Privacy (Umbra Protocol)

**Headline:** Your transactions are invisible on-chain
**Description:** Umbra Protocol shields private transactions with zero-knowledge proofs. On-chain observers see only encrypted bytes — no amount, no sender, no receiver. Viewing keys allow selective disclosure for compliance without exposing full history.

**Key details:**
- Shield: public balance → encrypted PDA (invisible on-chain)
- Private Send: ZK transfer between Umbra addresses, no metadata on-chain
- Unshield: exit private pool to any Solana address with ZK claim + nullifier
- Gasless private receive via relayer network (recipient needs no SOL)
- ZK proofs generated entirely client-side using official Groth16 provers
- Master Viewing Key and Per-Address Viewing Keys for selective audit
- USDC/USDT only for private payments; SOL retained only as fee/rent token
- SDK-first: client owns key derivation, signing, proof generation, and local decryption
- Backend proxies Umbra indexer/relayer traffic through `/api/umbra/*` routes

**Differentiator:** Only Solana wallet with native ZK-shielded transfers.

> [!NOTE]
> **What's built:** Umbra SDK dependency, Groth16 prover package, backend proxy providers, execution actions (shield/unshield/private-send/claim/register/balance), functional capability-gated controls.
> **What's pending:** Live positive-path validation with funded release credentials and SDK-v4 prover signoff.

---

### 3. Private On-Chain Settlement (MagicBlock)

**Headline:** Even your settlement is private
**Description:** All online transfers use MagicBlock's confidential payment layer. When offline sessions settle on reconnect, the entire batch is processed privately — amounts, timing, and sequence hidden on-chain.

**Key details:**
- Online P2P: single encrypted event on-chain, no amount or parties visible
- Private mint initialization, private balance, private send — all implemented
- Settlement engine: NetInfo reconnect listener, batch submission, per-item result handling
- Exponential backoff capped at 60 seconds for retries
- Queue preserved until confirmed; backup cleanup after settlement confirmation
- Signed transaction verification before signing (signer, recipient, mint, amount, instruction indexes)
- Single fresh-prepare retry for stale blockhash broadcast errors

**Differentiator:** No other wallet offers confidential online payments + private batch settlement.

---

### 4. Counterparty Safety Badge (Helius-powered)

**Headline:** Know who you're paying before you sign
**Description:** Pre-payment counterparty safety badge computed by the backend from wallet age, transaction history, funding signals, token quality, and on-chain heuristics. Shown on every payment confirmation screen.

**Key details:**
- Three badge levels: ✅ **ESTABLISHED** (80–100) | ⚠️ **NEW WALLET** (50–79) | ❌ **FLAGGED** (0–49)
- Backend-computed from Helius wallet/activity data + Jupiter token verification metadata
- Never blocks payment — informational only
- Badge cached locally for 1 hour (usable offline when cached)
- Pure on-chain signal — no off-chain identity lookup
- Client displays the backend badge as-is — never recomputes the scoring algorithm

**Differentiator:** No existing Solana wallet shows any safety signal about who you're about to pay.

---

### 5. Best-Price In-App Swaps (Jupiter)

**Headline:** Swap any token at the best price without leaving the app
**Description:** Jupiter routes best-price swaps across all Solana DEXs — Raydium, Orca, Meteora, and more — directly inside OffPay via the backend proxy. See price impact, route breakdown, and fees before you confirm.

**Key details:**
- Verified token list from `/api/swap/tokens`
- Real-time USD pricing from `/api/swap/price`
- Debounced quotes with expiry countdown and auto-refresh
- Client signs unsigned transaction locally, executes via `/api/swap/execute`
- `quoteId` is opaque — returned unchanged to backend
- Post-swap: balance and transaction history automatically refreshed
- Token safety checks before every swap
- Advanced modes (capability-gated): limit orders (Trigger API), recurring/DCA swaps, privacy-envelope swaps
- Network-aware: normal swap validated on mainnet; devnet returns `unsupported_network`

**Differentiator:** Integrated best-price swaps with privacy-composition path (Swap & Shield) planned when enabled.

---

### 6. Spam & Phishing Token Auto-Detection

**Headline:** Your wallet stays clean
**Description:** On every balance refresh, OffPay auto-hides spam and phishing tokens using Helius wallet data + Jupiter token verification metadata. No more scam airdrops cluttering your wallet.

**Key details:**
- Auto-detection: no price, missing metadata, unsolicited transfers, suspicious patterns
- Hidden tokens can be manually reviewed and restored
- Notification: "X potential spam tokens hidden"
- Uses backend-sanitized balance responses — no raw provider data exposed

---

### 7. Cash-Like UX — Zero Blockchain Complexity

**Headline:** As simple as paying with cash
**Description:** Tap to pay, scan to receive, swipe to swap. Durable nonces, ZK proofs, and settlement happen invisibly. Users see a balance and a Send button — not gas fees, private keys, or token accounts.

**Key details:**
- Mode-aware QR scanning — auto-routes Solana URI, OffPay offline, Umbra private, and nonce requests
- Wallet creation/import with no signup
- Biometric-gated signing via Mobile Wallet Adapter (Phantom, Solflare)
- All blockchain complexity abstracted away
- Wallet warm-start: cached data renders instantly, fresh data replaces in background
- Offline app-open shows last known data + stale indicator instead of empty state

---

### 8. True Self-Custody — Zero Counterparty Risk

**Headline:** Your keys. Your coins. Always.
**Description:** Non-custodial by design. Private keys stored in Secure Enclave (iOS) / Android Keystore — non-exportable, biometric-gated. OffPay never holds your funds. All provider API keys live server-side — never in the app binary.

**Key details:**
- No login, no email, no phone number
- No subscription — all features permanently free
- Seed phrase recovery for wallet and nonce accounts
- Keys never leave device; app never calls provider APIs directly
- Backend proxy architecture: Helius/Jupiter/MagicBlock keys are server-side env vars
- Encrypted local storage for pending queue, nonce cache, risk cache, address book
- Large caches use file-backed storage (not SecureStore) to avoid size limits
- Pure Ed25519 + durable nonce cryptography
- OffPay holds nothing

---

## Dual-Mode Design (Key Differentiator)

| Dimension | Offline Mode | Online Mode |
|---|---|---|
| **Internet Required** | No — never (post-setup) | Yes — always |
| **Payment Engine** | Solana Durable Nonce | MagicBlock Private Payments API |
| **Privacy** | Umbra ZK (proofs generated client-side) | Umbra ZK + MagicBlock |
| **Settlement** | Async via backend settlement on reconnect | Instant via MagicBlock |
| **Exchange Method** | QR code scan (BLE/Hotspot planned) | HTTPS via `api.offpay.app` |
| **Safety** | Cached safety badge (TTL: 1hr) | Live safety badge |
| **On-Chain Footprint** | Single encrypted commitment | Single encrypted MagicBlock event |
| **Trust Model** | Trustless Ed25519 cryptography | MagicBlock confidential execution |

---

## Target Users (for landing page personas / use cases)

| User Segment | Why OffPay |
|---|---|
| **Rural / low-connectivity users** | The only wallet that works when internet fails. Offline payments with cryptographic confirmation. |
| **Privacy-conscious users** | ZK-shielded balances and transfers. Viewing keys for compliance. No metadata on-chain. |
| **Merchants at markets & festivals** | Offline QR acceptance. Instant cryptographic confirmation. Zero POS hardware cost. |
| **Migrant workers & remittance senders** | Send USDC globally, privately, with near-zero fees (~$0.00025 per tx). |
| **Freelancers & remote workers** | Receive global payments. Prove specific payments with receipt proofs without exposing full history. |
| **Crypto-native DeFi users** | Best-price Jupiter swaps + privacy-composed flows when enabled. |
| **Humanitarian & disaster relief orgs** | Works when earthquake, flood, or conflict takes down internet. Offline payments survive without towers. |

---

## Competitive Comparison Matrix

| Capability | OffPay | Phantom | Solflare | Jupiter Mobile | Others |
|---|:---:|:---:|:---:|:---:|:---:|
| Offline P2P Payments (zero internet) | ✅ | ❌ | ❌ | ❌ | ❌ |
| ZK-Shielded Transfers (Umbra) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Private Settlement (MagicBlock) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Pre-Payment Safety Badge | ✅ | ❌ | ❌ | ❌ | ❌ |
| Spam/Phishing Auto-Detection | ✅ | Partial | Partial | Partial | ❌ |
| In-App Best-Price Swap (Jupiter) | ✅ | ✅ | ✅ | ✅ | Varies |
| Offline + ZK Private Combined | ✅ | ❌ | ❌ | ❌ | ❌ |
| Private Viewing Keys for Compliance | ✅ | ❌ | ❌ | ❌ | ❌ |
| No Login, Self-Custodial | ✅ | ✅ | ✅ | ❌ | Varies |
| Live Wallet Risk Intelligence | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## Problems & Solutions (for landing page storytelling)

| # | Problem | Solution |
|---|---|---|
| 1 | **No Internet = No Payment.** Every existing crypto wallet requires internet. Market vendors and delivery drivers in remote areas can't accept crypto when connectivity fails. | **Offline Mode** — durable nonce P2P via QR exchange. Zero internet at point of payment. |
| 2 | **On-chain payments are fully transparent.** Anyone can see wallet, amount, sender, receiver, timestamp. | **Umbra ZK Privacy** — encrypted PDAs, no amount/sender/receiver on-chain. |
| 3 | **Online payments leave metadata trails.** Full transaction metadata exposed permanently. | **MagicBlock Private Payments** — single encrypted commitment, no amounts or timing visible. |
| 4 | **No risk signal before you pay.** Wallet drainers, phishing tokens, scam addresses — no existing wallet warns you. | **Counterparty Safety Badge** — ESTABLISHED / NEW / FLAGGED based on on-chain heuristics. |
| 5 | **Swapping requires leaving the app.** Holding SOL, need USDC? Exit wallet → DEX → swap → return → pay. | **Jupiter in-app swaps** — best price across all Solana DEXs, one tap. |
| 6 | **DeFi complexity blocks mass adoption.** Gas, private keys, RPCs, token accounts, slippage. | **Abstracted UX** — tap to pay, scan to receive, swipe to swap. All complexity invisible. |

---

## Backend Architecture Summary

| Layer | Tech | Purpose |
|---|---|---|
| API runtime | Hono on Vercel (Node.js) | Serves all `/api/*` routes |
| Auth | Wallet Ed25519 signatures + HMAC | Verifies every authenticated request |
| Bootstrap | Vercel KV + platform attestation | Issues nonce, provisions device secret |
| Rate limits | Vercel KV / Upstash | Per-route and per-wallet throttling |
| Pending backups | Vercel Blob + server HMAC | Stores opaque encrypted tx backups |
| Wallet data | Helius | Balance, transactions, RPC, broadcast, stream |
| Risk | Helius-derived | Server-side risk score and badge |
| Swaps | Jupiter | Token list, price, quote, execute, recurring |
| Payments | MagicBlock + Helius | Private init/balance/send/settle/broadcast |
| Umbra proxies | Umbra indexer/relayer | Authenticated proxy for SDK provider traffic |
| Logging | Vercel stdout, optional Axiom | Sanitized structured operational logs |

**Key rule:** The app never sees provider API keys. The backend owns all provider credentials.

---

## Security Model Summary (for Security section)

- **Non-custodial:** Keys stored in Secure Enclave (iOS) / Android Keystore, biometric-gated
- **Zero-knowledge:** Umbra ZK proofs, encrypted PDAs, nullifiers prevent double-spend
- **Ed25519 cryptography:** Every offline tx is signed and verifiable without a trusted third party
- **Backend proxy architecture:** All provider API keys server-side; app never sees Helius/Jupiter/MagicBlock keys
- **Authenticated API surface:** Wallet signature + HMAC + timestamp + canonical body hash on every request
- **Encrypted local storage:** Pending queue encrypted with wallet-derived key, nonce cache in SecureStore
- **Replay prevention:** Millisecond timestamps, canonical body hash, HMAC, single-use bootstrap nonce
- **Attestation:** iOS App Attest, Android Play Integrity (prototype bypass for devnet APK testing only)
- **Secret rotation:** `SECRET_ROTATED` → delete stored secret → re-bootstrap → retry original request

---

## Tech Stack Highlights (for landing page)

| Layer | Tech |
|---|---|
| Mobile | React Native + Expo SDK 54 (iOS & Android) |
| Blockchain | Solana (`@solana/web3.js`) |
| Signing | Mobile Wallet Adapter (Phantom, Solflare) |
| Privacy | Umbra Protocol SDK + Groth16 ZK Provers |
| Settlement | MagicBlock Private Payments API + Ephemeral Rollups |
| Wallet Data | Helius Wallet APIs + Enhanced Transactions + SSE Streaming |
| Swaps | Jupiter Swap V2 + Trigger + DCA |
| Backend | Hono on Vercel (Node.js) + Vercel KV + Vercel Blob |
| State | Zustand 5.x + TanStack Query 5.x |
| Validation | Zod 4 |
| Animations | Reanimated 4.x |
| Language | TypeScript 5.9 (strict mode) |

---

## QR Engine Formats (for "How It Works" or features)

| QR Type | Format | Use |
|---|---|---|
| Solana Wallet Address | `solana:<address>?amount=x&token=USDC` | Pre-fill recipient + amount |
| OffPay Offline Request | `offpay://offline/<addr>/<amount>/<token>/<memo>` | Complete offline payment request |
| Umbra Private Address | `offpay://private/<umbra_address>` | Route to ZK shielded payment |
| Nonce Payment Payload | `offpay://nonce/<encoded_tx_request>` | Receiver shows pre-built request |

---

## FAQ Content (already on landing page)

Existing FAQ items in `constants/index.ts` cover:
1. Account/signup requirements → No signup needed
2. Pricing → All features permanently free
3. Offline payment internet requirement → No internet after one-time setup
4. Private balance visibility → Encrypted PDAs, device-only decryption
5. Fund custody → User holds everything, OffPay holds nothing
6. Double-spend prevention → Durable nonce mechanism prevents it architecturally

### Additional FAQ from PRD (not yet on landing page)

- **Is OffPay open source?** → Yes. Nonce module, transport module, and core app are MIT-licensed.
- **What guarantees does the receiver have?** → Mathematical: Ed25519 signature verification proves the sender's key signed it, amount/recipient match, nonceAdvance prevents replay.
- **What if I lose my phone?** → Funds live on-chain, nonce account can be recreated from seed. Recovery independent of OffPay.
- **Can I prove a private payment happened?** → Yes: per-transaction receipt proof or scoped viewing key.
- **What does the safety badge check?** → Wallet age, tx count, funding quality, token quality, spam patterns, unusual flows. Pure on-chain signal.
- **How are swaps routed?** → Via `api.offpay.app` using backend-managed Jupiter routes. No direct Jupiter calls.

---

## Performance Targets (for trust/credibility)

| Metric | Target |
|---|---|
| ZK proof generation | < 8 seconds on-device |
| Jupiter swap quote | < 1 second |
| QR scan resolution | < 2 seconds |
| MagicBlock settlement | < 10 seconds post-reconnect |
| Pending queue capacity | Up to 1,000 transactions |
| Network fee per tx | ~$0.00025 |
| iOS support | iOS 15+ |
| Android support | Android 10+ (API 29+) |

---

## Notes for Features Section Redesign

> [!IMPORTANT]
> The current features section shows 3 cards + a mockup. The product has **5 distinct layers** and **8 landing-page-worthy features**. The redesign should consider:

1. **Feature count:** Expand from 3 to at least 5–6 primary feature cards (one per layer + UX/security)
2. **Hierarchy:** Lead with the strongest differentiators — **Offline Payments** and **ZK Privacy** — these are unique to OffPay
3. **Visual language:** Each layer has a distinct provider (MagicBlock, Umbra, Helius, Jupiter) that could inform visual treatments
4. **Problem→Solution framing:** Each feature card could lead with the problem it solves
5. **Competitive angle:** Highlight the ✅/❌ comparison — OffPay is the only wallet with offline + ZK + private settlement
6. **Data points:** Include concrete numbers (~$0.00025 fees, < 10s settlement, etc.)
7. **Honest framing:** Offline payments use QR exchange + durable nonces — do NOT claim BLE/Hotspot transport (not built yet)
8. **3D assets:** Current cards use 3D assets from `public/3d-assets/` — consider creating/generating new ones per feature

### Suggested Feature Card Mapping

| Card | Feature | Icon/Asset Theme | Accent Color |
|---|---|---|---|
| 1 | Offline Payments | QR code + signal-off icon | Deep blue → cyan |
| 2 | ZK Privacy (Umbra) | Shield/lock with encrypted stream | Purple → violet |
| 3 | Private Settlement (MagicBlock) | Compressed/encrypted block | Dark navy → gold |
| 4 | Safety Badge (Helius) | Badge/checkmark with scan lines | Green → emerald |
| 5 | In-App Swaps (Jupiter) | Swap arrows, token orbit | Orange → amber |
| 6 | Self-Custody / Security | Key in vault, fingerprint | Charcoal → steel |
