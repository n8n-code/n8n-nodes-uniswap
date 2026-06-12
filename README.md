# @n8n-dev/n8n-nodes-uniswap

![uniswap Banner](banner.svg)

[![npm version](https://img.shields.io/npm/v/@n8n-dev/n8n-nodes-uniswap.svg)](https://www.npmjs.com/package/@n8n-dev/n8n-nodes-uniswap)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

**Stop writing uniswap API integrations by hand.**

Every time you connect n8n to uniswap, you waste hours mapping endpoints, defining parameters, and debugging schemas. You copy-paste from docs, fix edge cases, and pray nothing breaks.

**What if connecting n8n to uniswap took 5 minutes, not half a day?**

This node gives you **5+ resources** out of the box: **Swapping**, **Utilities**, **Liquidity Provisioning**, **Swap Batching**, **Chained Swapping**: with full CRUD operations, typed parameters, and zero manual configuration.

---

## What You Get

- **Zero boilerplate**: Resources, operations, and fields are pre-configured and ready to use
- **Full CRUD**: Create, read, update, and delete support where the API allows it
- **Typed parameters**: No more guessing field types
- **Built-in auth**: API key authentication, ready to go
- **Declarative**: Native n8n performance, no custom execute() overhead

---

## Install

```bash
npm install @n8n-dev/n8n-nodes-uniswap
```

**Or in n8n:**
1. **Settings → Community Nodes → Install**
2. Search: `@n8n-dev/n8n-nodes-uniswap`
3. Click **Install**

---

## Quick Start

1. Install the node (above)
2. Add credentials: **uniswap API** → paste your API key
3. Drag the **uniswap** node into your workflow
4. Pick a resource → pick an operation → done.

That's it. No configuration files. No code. It just works.

---

## Resources

<details>
<summary><b>Swapping</b> (8 operations)</summary>

- Post Check swap approvals
- Post Get a quote
- Post Create a gasless order
- Get gasless order status
- Post Create swap calldata
- Get swap status
- Post Get a limit order quote
- Post Create swap ERC 4337 UserOperation

</details>

<details>
<summary><b>Utilities</b> (5 operations)</summary>

- Post Check token KYC permissions
- Get bridgable tokens
- Post Get pool state
- Post Get wallet delegations
- Post Encode ERC 4337 UserOperation

</details>

<details>
<summary><b>Liquidity Provisioning</b> (6 operations)</summary>

- Post Check LP token approvals
- Post Create a V3 or V4 LP position
- Post Increase an LP position
- Post Decrease an LP position
- Post Claim LP position fees
- Post Create a classic V2 LP position

</details>

<details>
<summary><b>Swap Batching</b> (3 operations)</summary>

- Post Encode wallet transactions
- Post Create swap EIP 5792 calldata
- Post Create swap EIP 7702 calldata

</details>

<details>
<summary><b>Chained Swapping</b> (3 operations)</summary>

- Post Create an execution plan
- Get an execution plan
- Patch Update an execution plan

</details>

---

## Why This Node?

**Without this node:**
- Hours of manual API integration
- Copy-pasting from uniswap docs
- Debugging auth, pagination, error handling
- Maintaining your own client code

**With this node:**
- Install → configure → use. 5 minutes.
- Auto-generated from the official uniswap OpenAPI spec
- Always up to date when the API changes
- Native n8n performance

---

## Auto-Generated
This node was auto-generated from the official **uniswap** OpenAPI specification using
[@n8n-dev/n8n-openapi-node-ultimate](https://github.com/kelvinzer0/n8n-openapi-node-ultimate),
then validated against the live API so you get accurate types and real parameters, not guesswork.

When the uniswap API updates, this node updates too.

---


## License

MIT © [kelvinzer0](https://github.com/n8n-code)
