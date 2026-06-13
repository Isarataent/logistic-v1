# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Logistic Pro - Fleet Management System. Web application for managing 400+ vehicles (company-owned and partner/outsourced). Replaces paper-based and Excel processes with real-time digital operations.

## Tech Stack

- Next.js 16 (App Router)
- React + TypeScript
- Tailwind CSS
- lucide-react (icons)
- @dnd-kit/core + sortable + utilities (drag & drop)

## Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Build
npm run build        # Production build
npx next build       # Check for compile errors quickly

# No test suite configured yet
```

## Architecture

### Pages (App Router)
- `/` — Dashboard (Admin/Dispatcher view). KPI cards, live fleet map placeholder, vehicle list, actionable alerts, quick actions.
- `/fleet` — Live Fleet tracking. Full vehicle table with status, speed, progress bars, map placeholder, filter tabs.
- `/planning` — Route Planning. Route list table with brand filtering, stats cards. **Route Creation Wizard** (2-step modal): Step 1 (Setup: brand/driver/vehicle with readiness checks), Step 2 (Route Builder: stops with drag & drop, optimization mock, summary). Supports brand tagging (Shopee/Makro/Express), vehicle readiness (maintenance/tax/insurance warnings), partner/outsourced vehicles.
- `/hr` — HR & Documents. Employee table, vehicle documents table. **Employee Creation Modal** (3-tab): Personal info (with emergency contact), Employment (type: in-house/outsource, role, bank details, vehicle assignment), Documents (license with smart date validation: green/yellow/red tiers, upload placeholders for ID card and background check). Employee ID auto-generates with role prefix: DRV-/ADM-/ACC-/MGR-.
- `/penalties` — Penalty Disputes. Table with customer penalties, dispute status tracking, evidence status.
- `/settings` — Settings page with account, system, display preferences.
- `/driver` — **Mobile Driver App** (phone frame simulation). Driver check-in flow with photo + GPS timestamp, job history, profile. Uses `max-w-md mx-auto h-[800px] rounded-[2rem] shadow-2xl border-4 border-gray-900` phone frame. Check-in state machine: idle → capturing → confirming → done. Issue reporting modal with type selection.

### Shared Components
- `src/components/Sidebar.tsx` — Navigation sidebar with active state highlighting, fleet status summary card (412 vehicles: 312 active, 58 idle, 42 maintenance).
- `src/components/Header.tsx` — Top header with global search, notification bell (badge count), user profile dropdown.
- `src/components/StatusBadge.tsx` — Reusable status badges with color coding: emerald (available/ok), amber (in-transit/warning), rose (offline/critical), sky (maintenance/planned).
- `src/components/RouteWizard/` — Route creation wizard components: types, RouteWizardModal (2-step with step indicator), VehicleSelector (readiness indicators), StopList (drag & drop with @dnd-kit).
- `src/components/EmployeeModal.tsx` — Employee creation modal (3-tab with tab indicator, validation per tab, smart license date validation).

### Design System
- **Colors**: Indigo/violet gradients for primary actions. Emerald=success/available, Amber=warning/in-transit, Rose=critical/offline, Sky=info/maintenance.
- **Layout**: Sidebar (w-64) + main content. All admin pages use `flex h-screen bg-slate-50` pattern.
- **Cards**: `bg-white rounded-xl border border-slate-200 shadow-sm` standard card pattern.
- **Buttons**: Primary `bg-indigo-600`, secondary `bg-white border`, danger `bg-rose-50`.
- **Tables**: White card container with `bg-slate-50` header row, hover states.

### Key Features Implemented
1. **Real-time visibility**: Dashboard with fleet status, live vehicle list with progress bars, map placeholder.
2. **Route planning**: 2-step wizard with brand tagging, vehicle readiness checks, customer/location master dropdown, drag & drop stop management, route optimization mock with fuel estimates.
3. **Driver mobile app**: Phone-frame UI, check-in with photo + GPS + timestamp, issue reporting, job history, profile.
4. **HR & Documents**: Employee management with 3-tab creation modal, smart license expiry validation (3 tiers: >30 days green, <30 days yellow warning, expired red critical), document upload placeholders, bank details, emergency contacts.
5. **Penalty tracking**: Penalty dispute table with status badges, evidence tracking.
6. **Vehicle readiness**: Maintenance, tax, insurance expiry warnings in vehicle selection.

### Mock Data Patterns
- All data is hardcoded mock data in page files.
- Vehicle statuses: in-transit, available, maintenance, offline.
- Route statuses: active, planned, completed.
- Brands: Shopee (orange), Makro (blue), Express (red).
- Employee types: in-house (indigo), outsource (violet).
- License validation: 3-tier system based on days until expiry.

### File Structure
```
src/
  app/
    page.tsx              # Dashboard
    fleet/page.tsx        # Live Fleet
    planning/page.tsx     # Route Planning + wizard trigger
    hr/page.tsx           # HR + employee modal trigger
    penalties/page.tsx    # Penalty Disputes
    settings/page.tsx     # Settings
    driver/page.tsx       # Mobile Driver App
  components/
    Sidebar.tsx           # Navigation
    Header.tsx            # Top bar
    StatusBadge.tsx       # Status badges
    DashboardContent.tsx  # Dashboard main content
    EmployeeModal.tsx     # 3-tab employee creation
    RouteWizard/          # Route creation components
      types.ts
      RouteWizardModal.tsx
      VehicleSelector.tsx
      StopList.tsx
```

### Notes for Future Development
- No backend API yet — all mock data.
- No authentication system.
- Map integrations are placeholders (Google Maps/Mapbox comments).
- Photo upload is simulated (no actual file handling).
- GPS coordinates are hardcoded mock values.
- Route optimization is mock (reverses stops after 1.5s spinner).
- Build always passes `npx next build` for error checking.
