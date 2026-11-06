# GlassStore Internal Portal

React/Vite operations portal for POS, OMS, optometry, Lab/QC, inventory, CRM and administration. The complete Java/MySQL setup and shared launcher are documented in backend/README.md.

## Standard local environment

| Component | Address |
|---|---|
| Internal portal | http://127.0.0.1:5174/login |
| Customer web | http://127.0.0.1:5173 |
| API Gateway | http://127.0.0.1:8080 |
| MySQL used by backend | 127.0.0.1:3306 |

Use Node.js 20 or newer. Frontend never connects directly to a database. It calls relative /api URLs through Vite and the gateway.

## Run the complete workspace

Use this folder layout:

```text
GlassStore/
  backend/
  frontend/
    customer-web/
    internal-portal/
```

Prepare backend/.env and initialize only a fresh database using the backend guide. Then run backend/START_GLASSSTORE.bat. The launcher builds five BE services, installs missing frontend dependencies and starts both FE sites. It does not stop an existing MySQL service, delete data or silently choose different ports.

Use backend/CHECK_GLASSSTORE.bat to check readiness, and backend/STOP_GLASSSTORE.bat to stop applications owned by the launcher. Logs and process records are in backend/.runtime.

## Run only the portal

```powershell
npm ci
npm run dev
```

Vite binds to 127.0.0.1:5174 and uses strictPort. Keep the backend/gateway running. Optional frontend .env configuration:

```text
VITE_API_GATEWAY_URL=
VITE_PROXY_TARGET=http://127.0.0.1:8080
VITE_PORT=5174
```

Keep the API base empty for the shared proxy setup. Remove old direct API overrides from .env.local. Never put JWT_SECRET or DB credentials in frontend environment variables. .env files are ignored by Git; restart Vite after changing them.

## Canonical local accounts

| Role | Username | Email | Demo password |
|---|---|---|---|
| Admin | admin | adminoptic@gmail.com | 123456 |
| POS cashier | staff | posoptic@gmail.com | 123456 |
| Optometrist | optometrist | optometryoptic@gmail.com | 123456 |
| Lab technician | labtech | laboptic@gmail.com | 123456 |

These accounts belong to the canonical fresh SQL dataset. Usernames pos/optometry/lab are not aliases for these SQL accounts. Authentication must pass the backend BCrypt check; there is no offline-token login or universal-password bypass. Custom passwords on an existing server are not reset by setup.

The sample dataset has inventory at BRANCH_01 and BRANCH_02. For an existing database, missing branch stock must be resolved by actual transfers, not by displaying LAB/global stock as branch availability. A 401 is an authentication/session issue, not proof that products or customers disappeared.

## Verification

```powershell
node --test src/api/authApi.test.js src/api/orderApi.test.js src/api/warrantyApi.test.js
npm run build
```

Check actual login and API permissions for each role. Frontend route guards do not replace backend authorization. Use a consistent hostname; localhost and 127.0.0.1 store separate sessions.