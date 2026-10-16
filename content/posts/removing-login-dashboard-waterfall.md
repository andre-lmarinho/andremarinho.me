---
title: Removing the login-to-dashboard waterfall in Next.js
description: How I moved LawFlow's authenticated bootstrap to the server, preserved billing gates and stopped the browser from rebuilding the same initial state.
date: 2026-08-11
tags: Next.js, React, Supabase, performance, authentication
project: lawflow
---

The slow part of entering [LawFlow](/projects/lawflow) crossed several systems. After authentication, the browser hydrated its session, resolved the workspace, checked billing access, loaded shared workspace data and finally mounted screens that could request their own data.

The user had to wait for a chain of dependent browser requests. Optimizing a query helped its own stage while leaving the rest of that chain intact.

I changed the authenticated entry route to resolve an authorized bootstrap on the server and pass the result into the client providers. The browser could initialize from that snapshot instead of discovering the workspace and rebuilding the shared state after mounting.

## Following the dependencies across providers

The loading path had grown as authentication, multi-tenancy and billing were added. Session polling delayed workspace resolution. A billing gate controlled whether parts of the application mounted, so their data requests started only after that gate finished. Other paths repeated workspace or authorization lookups through separate calls.

My first changes stayed within that structure. I replaced session polling with explicit session hydration, let independent billing and bootstrap work run in parallel, and made a detailed subscription-status request conditional on denied access. A user already allowed by the entitlement check did not need that extra request before entering.

The intermediate flow still took approximately 5.7 to 6 seconds in production. The request map at that stage contained about ten authentication or database operations on the successful path, even though some were parallel or shared an HTTP batch. Counting HTTP requests alone hid work performed inside each request.

The remaining question was which information the browser actually needed to discover for itself. The server already knew the authenticated user before rendering the entry page. Resolving the same user's workspace after that page mounted added another dependency boundary.

## One entry route produces the initial state

The authenticated page now follows this shape:

```tsx
const session = await getServerSession();
if (!session) redirect("/login");

const initialBootstrap = await resolveCrmShellData(session);

return <CrmView initialBootstrap={initialBootstrap} />;
```

The resolver verifies the workspace for that authenticated user, reads the workspace context needed by billing, resolves access and then loads the authorized bootstrap data. Reusing the workspace row avoids fetching it again inside billing.

The snapshot contains shared application state: the current user's profile, workspace members, office settings, field configuration, notification settings and onboarding status. Client providers initialize their state from those values. Their mount no longer starts a second bootstrap through `useEffect`.

Screen-specific queries still exist. Moving the bootstrap did not require loading every lead, proposal or dashboard result before returning the page. The boundary covers the shared state required to enter the CRM.

Next.js supports passing serializable data from Server Components into Client Components through props. That is the [server/client boundary](https://nextjs.org/docs/app/getting-started/server-and-client-components) used here. A prop reaches the client, so the bootstrap has an explicit shape rather than passing through an unrestricted database result.

## Access checks determine which snapshot can exist

Moving work to the server also made the authorization order explicit. The resolver derives the workspace from the verified caller; it does not trust a workspace selected in the browser. It loads application bootstrap data only after billing permits access.

Denied access produces a recovery snapshot with the information needed to show the billing gate. Failure to check billing produces an unavailable state with a retry path. Neither branch falls through to an authorized CRM with empty defaults. A missing workspace is handled as a workspace error rather than being relabeled as a billing outage.

API operations retain their own authorization checks. The snapshot reflects authorization for that render; it is not permission for later mutations. Removing repeated checks within that render did not remove the checks at the API boundary.

The login action needed attention too. After it wrote the session cookies, the client refreshed its router state and navigated to `/`. That entry request produced the bootstrap against the fresh session. Returning success from the action avoided rendering the same bootstrap inside a server-action redirect and then doing it again during navigation.

## Measuring the complete login flow

The original path took approximately 7,441 milliseconds from clicking Log in to the rendered CRM. After the server bootstrap changes, measurements during the implementation were approximately 760 milliseconds for that same full flow, about a 90% reduction.

These are approximate end-to-end measurements from the implementation. I did not preserve the final raw traces or a reproducible set of runs. The intermediate production measurements and request map were recorded, but the final numbers should not be read as a controlled benchmark or a latency guarantee for every workspace and network condition.

Tests covered the resolver's authorized, denied and unavailable branches, snapshot mapping and login-action failures.

Server-side loading still has a critical path. Authentication must precede workspace resolution, and access must precede loading protected application data. The improvement came from placing those dependencies in one server-owned flow, reusing resolved context and letting the client begin with the result.
