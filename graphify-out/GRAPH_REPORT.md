# Graph Report - .  (2026-05-05)

## Corpus Check
- Corpus is ~32,207 words - fits in a single context window. You may not need a graph.

## Summary
- 108 nodes · 122 edges · 29 communities (16 shown, 13 thin omitted)
- Extraction: 73% EXTRACTED · 27% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Auth & Post Interactions|Auth & Post Interactions]]
- [[_COMMUNITY_Data Fetching & Post Creation|Data Fetching & Post Creation]]
- [[_COMMUNITY_Profile Management|Profile Management]]
- [[_COMMUNITY_Post CRUD Icons & Reducers|Post CRUD Icons & Reducers]]
- [[_COMMUNITY_Auth Architecture Concepts|Auth Architecture Concepts]]
- [[_COMMUNITY_App Entry & Registration|App Entry & Registration]]
- [[_COMMUNITY_Visual Assets & UI Identity|Visual Assets & UI Identity]]
- [[_COMMUNITY_Post Display Components|Post Display Components]]
- [[_COMMUNITY_Project Config & Branding|Project Config & Branding]]
- [[_COMMUNITY_Profile State Provider|Profile State Provider]]
- [[_COMMUNITY_Post State Provider|Post State Provider]]
- [[_COMMUNITY_3-Dots Menu Icon|3-Dots Menu Icon]]
- [[_COMMUNITY_Check Icon|Check Icon]]
- [[_COMMUNITY_Close Icon|Close Icon]]
- [[_COMMUNITY_Home Icon|Home Icon]]
- [[_COMMUNITY_Notification Icon|Notification Icon]]
- [[_COMMUNITY_Registration Icon|Registration Icon]]
- [[_COMMUNITY_Settings Icon|Settings Icon]]
- [[_COMMUNITY_Share Icon|Share Icon]]
- [[_COMMUNITY_Time Icon|Time Icon]]
- [[_COMMUNITY_Debug Hook Concept|Debug Hook Concept]]

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 17 edges
2. `useAxios()` - 12 edges
3. `useProfile()` - 10 edges
4. `Facehook Project Notes Part 2` - 8 edges
5. `usePost()` - 5 edges
6. `AuthContext and AuthContextType` - 5 edges
7. `Like Feature via POST_LIKED Reducer Action` - 5 edges
8. `ProfilePage()` - 4 edges
9. `LoginForm()` - 3 edges
10. `Logout()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Like Feature via POST_LIKED Reducer Action` --conceptually_related_to--> `Like Filled / Thumbs Up Active State Icon`  [INFERRED]
  Facehook Project part 2.txt → src/assets/icons/like-fill-6.svg
- `Like Feature via POST_LIKED Reducer Action` --conceptually_related_to--> `Like / Thumbs Up Outline Icon`  [INFERRED]
  Facehook Project part 2.txt → src/assets/icons/like.svg
- `Facehook App Logo (Learnerswith brand)` --conceptually_related_to--> `index.html Application Entry Point`  [INFERRED]
  src/assets/images/logo.svg → index.html
- `README - React TypeScript Vite Template` --conceptually_related_to--> `Vite Logo SVG`  [INFERRED]
  README.md → public/vite.svg
- `README - React TypeScript Vite Template` --conceptually_related_to--> `React Logo SVG`  [INFERRED]
  README.md → src/assets/react.svg

## Hyperedges (group relationships)
- **Post Social Interaction Icons (Like, Comment, Share)** — icon_like, icon_like_fill, icon_comment, icon_share [INFERRED 0.85]
- **Post CRUD Operations via Reducer Actions** — concept_post_create_reducer, concept_like_reducer, concept_delete_comment [INFERRED 0.85]
- **Authentication Token Management Flow** — concept_auth_context, concept_token_storage, concept_axios_interceptor [INFERRED 0.95]
- **Social Media App Visual Identity Assets** — auth_illustration_social_media_3d, avatar_1_user_profile_photo, avatar_2_user_profile_photo [INFERRED 0.85]
- **User Onboarding and Authentication UI Assets** — auth_illustration_social_media_3d, concept_user_authentication_ui, concept_default_avatar_set [INFERRED 0.75]
- **Social Engagement Visual Theme Across Assets** — auth_illustration_social_media_3d, poster_bangla_social_media_ad, concept_social_media_engagement [INFERRED 0.65]

## Communities (29 total, 13 thin omitted)

### Community 0 - "Auth & Post Interactions"
Cohesion: 0.19
Nodes (3): LoginForm(), Logout(), useAuth()

### Community 1 - "Data Fetching & Post Creation"
Cohesion: 0.23
Nodes (3): useAxios(), usePost(), HomePage()

### Community 2 - "Profile Management"
Cohesion: 0.21
Nodes (3): useProfile(), ProfilePage(), MyPosts()

### Community 3 - "Post CRUD Icons & Reducers"
Cohesion: 0.27
Nodes (10): Delete Comment Feature (POST_COMMENT_DELETED action), File Upload via useRef (Custom Button Trigger), Like Feature via POST_LIKED Reducer Action, Post Creation via Reducer (POST_CREATED action), Add Photo / Image Upload Icon, Camera / Profile Photo Icon, Delete / Trash Bin Icon, Edit / Pencil Icon (+2 more)

### Community 4 - "Auth Architecture Concepts"
Cohesion: 0.29
Nodes (10): AuthContext and AuthContextType, Axios Interceptor for JWT Auto-Refresh (useAxios hook), Comment Submit via Enter Key (onKeyDown), Lazy Initializer Function for useState, Private/Protected Route Pattern, Profile State Pattern: Reducer + Context + Hook, Token Storage Strategy (Access + Refresh Token), Facehook Project Notes Part 2 (+2 more)

### Community 6 - "Visual Assets & UI Identity"
Cohesion: 0.38
Nodes (7): Auth Illustration - Social Media 3D Graphic, Avatar 1 - Male User Profile Photo (Green Background), Avatar 2 - Male User Profile Photo (Yellow Background), Default Avatar Set for User Profiles, Social Media Engagement (Likes, Hearts, Megaphone), User Authentication UI Context, Poster - Bangla Social Media Advertisement

### Community 7 - "Post Display Components"
Cohesion: 0.33
Nodes (3): PostBody(), PostCard(), PostList()

### Community 8 - "Project Config & Branding"
Cohesion: 0.4
Nodes (5): index.html Application Entry Point, Facehook App Logo (Learnerswith brand), React Logo SVG, README - React TypeScript Vite Template, Vite Logo SVG

## Knowledge Gaps
- **15 isolated node(s):** `React Logo SVG`, `Three Dots Vertical Ellipsis Menu Icon`, `Checkmark / Confirmation Icon`, `Close / Dismiss (X) Icon`, `Comment / Chat Bubble Icon` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useAuth()` connect `Auth & Post Interactions` to `Data Fetching & Post Creation`, `Profile Management`, `App Entry & Registration`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `useAxios()` connect `Data Fetching & Post Creation` to `Auth & Post Interactions`, `Profile Management`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Why does `PostList()` connect `Post Display Components` to `Data Fetching & Post Creation`, `Profile Management`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `useAuth()` (e.g. with `LoginForm()` and `Logout()`) actually correct?**
  _`useAuth()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `useAxios()` (e.g. with `useAuth()` and `HomePage()`) actually correct?**
  _`useAxios()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `useProfile()` (e.g. with `MyPosts()` and `ProfilePage()`) actually correct?**
  _`useProfile()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `React Logo SVG`, `Three Dots Vertical Ellipsis Menu Icon`, `Checkmark / Confirmation Icon` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._