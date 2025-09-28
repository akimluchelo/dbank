# DBank

A minimal **non-custodial bank** on the Internet Computer (ICP) built with Motoko. Users authenticate with Principals and can **deposit, withdraw, and check balances**. State is persisted across upgrades using stable data and `preupgrade`/`postupgrade` hooks.

> **Note:** This project targets the **local replica** (no mainnet deploy) to avoid cycle costs. 
---

## Features
- Actor-based canister with authenticated calls (Principal-scoped balances)
- Upgrade-safe persistence (stable vars + upgrade hooks)
- Input validation and basic error handling (no negative/overflow operations)
- Candid interface checked into the repo for easy inspection

## Tech Stack
Motoko • DFX • Candid 

---

## Run Locally (1-minute demo)

```bash
# 0) Start from project root
dfx --version

# 1) Start local replica
dfx start --background

# 2) Deploy canisters & generate declarations
dfx deploy

# 3) (Optional) run frontend if present
npm install
npm run dev    # e.g., starts on http://localhost:5173



