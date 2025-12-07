# Peptide - Health & Anti-Aging Management Platform

## Vision
A comprehensive platform helping users manage their peptide protocols, weight loss journeys, and anti-aging routines while providing a seamless e-commerce experience for health products.

---

## Core Features

### 1. User Onboarding & Profile
- **Health Assessment Quiz**: Goals (weight loss, anti-aging, muscle building, recovery)
- **Medical History**: Allergies, conditions, current medications
- **Body Metrics**: Weight, height, body composition tracking
- **Experience Level**: New to peptides vs. experienced users

### 2. Peptide Protocol Management

#### Injection Tracking
- **Dosage Calculator**: Based on body weight and protocol
- **Injection Site Rotation**: Visual body map with site history
- **Reconstitution Calculator**: BAC water ratios for peptide vials
- **Needle/Syringe Inventory**: Track supplies, reorder reminders
- **Injection Timer**: Countdown to next dose with notifications
- **Pain/Reaction Logging**: Track injection site reactions

#### Protocol Library
- Pre-built protocols for common goals:
  - Weight Loss (Semaglutide, Tirzepatide, etc.)
  - Anti-Aging (BPC-157, GHK-Cu, Epithalon)
  - Muscle/Recovery (TB-500, IGF-1 LR3)
  - Skin/Hair (GHK-Cu, Copper Peptides)
- Custom protocol builder
- Stacking recommendations
- Cycling schedules (on/off periods)

### 3. Health Tracking Dashboard

#### Daily Logging
- Weight & body measurements
- Energy levels (1-10 scale)
- Sleep quality & duration
- Mood tracking
- Side effects journal
- Photo progress (before/after)
- Fasting windows (IF integration)

#### Biomarker Tracking
- Blood work results integration
- Hormone panels (testosterone, HGH, IGF-1)
- Metabolic markers (glucose, insulin, A1C)
- Inflammation markers (CRP, etc.)
- Trend visualization over time

### 4. Smart Reminders & Notifications
- Injection reminders with customizable times
- Supply reorder alerts (low inventory)
- Fasting window notifications
- Supplement timing reminders
- Blood work scheduling reminders
- Protocol phase transitions

### 5. E-Commerce Integration

#### Product Categories
- Peptides (requires verification)
- Supplies (syringes, needles, BAC water, alcohol swabs)
- Supplements (supporting supplements for protocols)
- Equipment (body composition scales, glucose monitors)
- Skincare (peptide-infused products)

#### Smart Recommendations
- Based on current protocol
- Reorder predictions from usage patterns
- Bundle deals for protocol starters
- Subscription options for recurring needs

### 6. Educational Content
- Peptide encyclopedia with mechanisms of action
- Video tutorials for reconstitution and injection
- Safety guidelines and best practices
- Research papers and studies
- FAQ and troubleshooting

### 7. Community Features
- Anonymous progress sharing
- Protocol reviews and ratings
- Success stories
- Expert Q&A sessions

---

## Technical Architecture

### Flutter Mobile App Structure

```
lib/
├── main.dart
├── app/
│   ├── app.dart
│   ├── routes.dart
│   └── theme.dart
├── core/
│   ├── constants/
│   ├── utils/
│   ├── extensions/
│   └── errors/
├── data/
│   ├── models/
│   │   ├── user.dart
│   │   ├── peptide.dart
│   │   ├── protocol.dart
│   │   ├── injection_log.dart
│   │   ├── health_metric.dart
│   │   ├── product.dart
│   │   └── order.dart
│   ├── repositories/
│   │   ├── auth_repository.dart
│   │   ├── protocol_repository.dart
│   │   ├── health_repository.dart
│   │   └── shop_repository.dart
│   ├── providers/
│   │   └── api_provider.dart
│   └── local/
│       └── database.dart
├── features/
│   ├── auth/
│   │   ├── screens/
│   │   ├── widgets/
│   │   └── bloc/
│   ├── onboarding/
│   │   ├── screens/
│   │   │   ├── welcome_screen.dart
│   │   │   ├── goals_screen.dart
│   │   │   ├── health_assessment_screen.dart
│   │   │   └── experience_screen.dart
│   │   └── widgets/
│   ├── dashboard/
│   │   ├── screens/
│   │   │   └── dashboard_screen.dart
│   │   └── widgets/
│   │       ├── today_card.dart
│   │       ├── upcoming_doses.dart
│   │       ├── progress_summary.dart
│   │       └── quick_actions.dart
│   ├── protocols/
│   │   ├── screens/
│   │   │   ├── protocols_list_screen.dart
│   │   │   ├── protocol_detail_screen.dart
│   │   │   ├── protocol_builder_screen.dart
│   │   │   └── active_protocol_screen.dart
│   │   └── widgets/
│   │       ├── protocol_card.dart
│   │       ├── dosage_calculator.dart
│   │       └── cycle_calendar.dart
│   ├── injections/
│   │   ├── screens/
│   │   │   ├── injection_tracker_screen.dart
│   │   │   ├── site_rotation_screen.dart
│   │   │   ├── reconstitution_screen.dart
│   │   │   └── log_injection_screen.dart
│   │   └── widgets/
│   │       ├── body_map.dart
│   │       ├── injection_timer.dart
│   │       ├── syringe_calculator.dart
│   │       └── supplies_inventory.dart
│   ├── tracking/
│   │   ├── screens/
│   │   │   ├── health_log_screen.dart
│   │   │   ├── weight_tracker_screen.dart
│   │   │   ├── biomarkers_screen.dart
│   │   │   ├── photos_screen.dart
│   │   │   └── journal_screen.dart
│   │   └── widgets/
│   │       ├── metric_input.dart
│   │       ├── trend_chart.dart
│   │       └── photo_comparison.dart
│   ├── shop/
│   │   ├── screens/
│   │   │   ├── shop_home_screen.dart
│   │   │   ├── product_detail_screen.dart
│   │   │   ├── cart_screen.dart
│   │   │   ├── checkout_screen.dart
│   │   │   └── orders_screen.dart
│   │   └── widgets/
│   │       ├── product_card.dart
│   │       ├── recommendation_carousel.dart
│   │       └── subscription_option.dart
│   ├── education/
│   │   ├── screens/
│   │   │   ├── learn_home_screen.dart
│   │   │   ├── peptide_guide_screen.dart
│   │   │   ├── video_tutorial_screen.dart
│   │   │   └── article_screen.dart
│   │   └── widgets/
│   └── settings/
│       ├── screens/
│       └── widgets/
├── services/
│   ├── notification_service.dart
│   ├── analytics_service.dart
│   └── sync_service.dart
└── widgets/
    ├── common/
    └── charts/
```

### Website Structure (Next.js)

```
website/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── layout.tsx
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── protocols/
│   │   │   ├── tracking/
│   │   │   ├── injections/
│   │   │   └── settings/
│   │   ├── shop/
│   │   │   ├── page.tsx
│   │   │   ├── [category]/
│   │   │   ├── product/[id]/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── learn/
│   │   │   ├── page.tsx
│   │   │   ├── peptides/
│   │   │   ├── guides/
│   │   │   └── videos/
│   │   └── api/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── shop/
│   │   └── charts/
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── hooks/
│   ├── stores/
│   └── types/
```

### Backend API (Node.js/Express or Supabase)

```
backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── protocol.controller.ts
│   │   ├── injection.controller.ts
│   │   ├── health.controller.ts
│   │   ├── product.controller.ts
│   │   └── order.controller.ts
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   │   ├── notification.service.ts
│   │   ├── recommendation.service.ts
│   │   └── analytics.service.ts
│   └── utils/
```

---

## Database Schema (Key Tables)

### Users
- id, email, password_hash, created_at
- profile (name, dob, gender, height)
- goals[], experience_level
- subscription_status

### Peptides
- id, name, category, description
- mechanism_of_action
- typical_dosage, frequency
- reconstitution_info
- warnings, contraindications

### Protocols
- id, name, description, goal
- peptides[] with dosages
- duration, cycle_info
- is_template, created_by

### User_Protocols
- id, user_id, protocol_id
- start_date, end_date
- status (active, paused, completed)
- custom_modifications

### Injection_Logs
- id, user_id, protocol_id, peptide_id
- datetime, dosage, site
- notes, reaction_rating
- photo_url

### Health_Metrics
- id, user_id, date
- weight, body_fat_percentage
- measurements{}
- energy_level, sleep_hours, mood
- notes

### Biomarkers
- id, user_id, date, type
- value, unit, reference_range
- source (lab_name)

### Products
- id, name, category, description
- price, subscription_price
- images[], inventory
- related_peptides[]

### Orders
- id, user_id, status
- items[], total
- shipping_info, payment_info

---

## UI/UX Design Principles

### Color Palette
- Primary: Deep teal (#0D9488) - trust, health
- Secondary: Gold (#F59E0B) - premium, anti-aging
- Accent: Rose (#F43F5E) - alerts, injections
- Background: Slate (#0F172A) dark / White light mode
- Success: Emerald (#10B981)

### Design Elements
- Clean, medical-grade aesthetic
- Neumorphic cards with subtle shadows
- Smooth animations for engagement
- Dark mode default (premium feel)
- Accessible contrast ratios

### Key UX Patterns
- One-tap injection logging
- Swipe gestures for quick actions
- Visual progress indicators
- Celebration animations for milestones
- Smart defaults to reduce input

---

## Monetization Strategy

### 1. Product Sales (Primary)
- Peptides (high margin, verification required)
- Injection supplies (recurring revenue)
- Supplements (add-on sales)
- Equipment (one-time purchases)

### 2. Subscription Tiers

**Free Tier**
- Basic protocol tracking (1 active)
- Manual logging only
- Limited educational content
- Ads for products

**Premium ($14.99/mo)**
- Unlimited protocols
- Advanced analytics
- Biomarker tracking
- Full education library
- Priority support
- No ads

**Pro ($29.99/mo)**
- Everything in Premium
- AI protocol recommendations
- Personalized coaching tips
- Early access to products
- Exclusive community access

### 3. Affiliate/Partner Revenue
- Lab testing partnerships
- Telemedicine referrals
- Equipment brand partnerships

---

## Implementation Phases

### Phase 1: MVP (4-6 weeks)
- [ ] User auth & onboarding
- [ ] Basic protocol management
- [ ] Injection logging with site rotation
- [ ] Simple health tracking (weight, energy)
- [ ] Push notifications
- [ ] Basic product catalog (view only)
- [ ] Landing page website

### Phase 2: Core Features (4-6 weeks)
- [ ] Full e-commerce functionality
- [ ] Reconstitution & dosage calculators
- [ ] Photo progress tracking
- [ ] Advanced reminders system
- [ ] Protocol templates library
- [ ] Basic analytics dashboard

### Phase 3: Growth Features (4-6 weeks)
- [ ] Biomarker tracking & integration
- [ ] Subscription system
- [ ] Smart recommendations engine
- [ ] Educational video content
- [ ] Community features
- [ ] Admin dashboard

### Phase 4: Scale (Ongoing)
- [ ] AI-powered insights
- [ ] Telemedicine integration
- [ ] Lab result imports
- [ ] Wearable integrations
- [ ] International expansion

---

## Tech Stack Recommendations

### Mobile (Flutter)
- State Management: Riverpod or BLoC
- Local DB: Drift (SQLite) or Isar
- API: Dio with Retrofit
- Charts: FL Chart
- Notifications: Firebase Cloud Messaging
- Analytics: Firebase Analytics + Mixpanel

### Website (Next.js 14)
- UI: Tailwind CSS + shadcn/ui
- State: Zustand or TanStack Query
- Auth: NextAuth.js or Supabase Auth
- Payments: Stripe
- CMS: Sanity (for educational content)

### Backend Options
**Option A: Supabase (Faster MVP)**
- Auth, Database, Storage, Edge Functions
- Real-time subscriptions
- Row-level security

**Option B: Custom (More Control)**
- Node.js + Express/Fastify
- PostgreSQL + Prisma
- Redis for caching
- AWS/GCP hosting

---

## Compliance Considerations

1. **Medical Disclaimers**: Not medical advice, consult healthcare provider
2. **Age Verification**: 18+ requirement
3. **Data Privacy**: HIPAA-adjacent practices, GDPR compliance
4. **Product Restrictions**: Verification for peptide purchases
5. **Terms of Service**: Clear liability limitations

---

## Next Steps

1. Confirm tech stack preferences
2. Set up project repositories and CI/CD
3. Design system and UI mockups
4. Begin Phase 1 development
5. Establish product sourcing partnerships
