# CRG Dynamics

CRG Research & Consulting

I have attached files from a website that I am currently working on, the home page has already been built and the ONLY changes that I would like for you to implement are: I want you to add animation all throughout the website make it responsive as well, when a user hovers over different links on the navigation bar colored circles should appear. At the very top page of the website on the landing page I want you to create a beautiful, interactive slideshow which covers the entire web page using the images attached and they should follow the following sequence: image-8 should be first in the slide show animation, image-5 should be second in the slide show animation, image-3 should be third in the slide show animation, image-4 should be 4th in the slide show animation, and onwards you can add the rest of the images. Add SEO. Add google maps integration to show exactly where their offices are located they are located at: 6 Luther Street, The Village, Eros Windhoek, Namibia. The following is their @connector:linkedin:"LinkedIn"  social account link and it should be added at the very bottom of the website: https://www.linkedin.com/company/crg-research-consulting/posts/?feedView=all                 

I would also like you to add the following: Software Requirements Specification
Admin Portal Feature Additions — Company Website
Recent Work Updates • Employee Email Management • Restricted Admin Authentication
Field	Detail
Document Version	1.0
Prepared By	Saya Mubiana, Freelance Software Developer
Date	25 August 2026
Backend	Supabase (PostgreSQL, Auth, Row Level Security)
Status	Draft — for client review
 
Table of Contents


 
1. Introduction
1.1 Purpose
This document specifies the software requirements for two new admin-only features being added to an existing, already-built company website (Home, About Us, Contact, and other public pages are already live and are not affected by this specification). It defines what is being built, how it should behave, and the constraints it must respect, so that development, testing, and client sign-off are based on a shared, unambiguous understanding.
1.2 Scope
This specification covers only the following additions to the existing website:
•	A Recent Work / Project Updates feature, allowing an admin to publish updates about completed company work, visible to public site visitors.
•	An Employee Email Management feature, allowing an admin to add, edit, update, delete, and suspend company employee email records.
•	A restricted, non-public admin authentication mechanism that gates access to both features above.
All existing public pages (Home, About Us, Contact, etc.) remain unchanged in structure and are only affected to the extent that the new "Recent Work" content may be displayed on the public site using the existing visual design.
1.3 Intended Audience
This document is intended for the website owner (client), the developer, and any future developer who may maintain or extend this system.
1.4 Definitions
Term	Meaning
Admin	An authorised company representative with credentials to log in and manage the two features described in this document. There is no public/customer account system on this website.
Work Update	A published entry describing a project or piece of work the company has completed, shown to public visitors.
Employee Email Record	An internal record representing a company employee's email address and its status, managed by the admin.
RLS	Row Level Security — PostgreSQL/Supabase feature restricting which rows a user can read or write based on their identity/role.
2. Overall Description
2.1 Product Perspective
The website already exists and is in production. This project adds an admin-only layer on top of it: a hidden/restricted login, and two management screens reachable only after authentication. No changes are required to the public-facing pages other than optionally rendering the new "Recent Work" content and, later, an employee directory if the client chooses to expose one publicly (out of scope unless separately requested).
2.2 User Classes
User Class	Description	Access Level
Site Visitor	General public browsing the existing website.	Read-only access to public pages, including published Work Updates.
Admin	Authorised company staff member(s) responsible for content and employee email records.	Full access to the two admin features, via restricted login only.
ASSUMPTION: Based on your description, there is a single "Admin" role for this phase — the specification assumes all logged-in admins have equal, full access to both features. If CRG later wants tiered permissions (e.g. a content-only admin who cannot touch employee emails), that would be an additional requirement to scope separately.
2.3 Design Constraints
•	All new pages/screens must reuse the existing website's established colour scheme, typography, spacing, and component style exactly as-is — no new colours, fonts, or design language are to be introduced unless separately requested by the client.
•	The new admin functionality must not alter the layout, navigation, or content of the existing public pages (Home, About Us, Contact, etc.), beyond optionally surfacing published Work Updates.
•	Backend data storage and authentication must use Supabase.
3. Functional Requirements
3.1 Restricted Admin Authentication
The website has no general user registration or public login. The only authentication on the site exists to gate the two admin features below, and must not be discoverable or advertised to ordinary site visitors.
ID	Requirement	Priority	Notes
FR-1.1	The system shall provide an admin login screen reachable only via a private, unlisted URL that is not linked from any public page, menu, or sitemap, and is shared with authorised staff out-of-band (e.g. verbally or via internal company communication).	Must-have	Prevents casual discovery via browsing or search engines.
FR-1.2	The system shall authenticate admins using Supabase Auth (email + password).	Must-have	Passwords are hashed and managed by Supabase, never stored in plain text by the application.
FR-1.3	The admin login page shall exclude the site's normal navigation/header elements that might hint at a login area, keeping its design minimal and unbranded relative to the public site.	Should-have	Reduces discoverability further.
FR-1.4	The system shall lock out or throttle login attempts after multiple consecutive failures from the same source, to reduce brute-force risk.	Must-have	Can be implemented via Supabase rate limiting or a lightweight custom check.
FR-1.5	The system shall end an admin's session after a period of inactivity and require re-authentication.	Should-have	Session timeout — exact duration to be agreed with client.
FR-1.6	Only accounts explicitly created for company staff (provisioned directly in Supabase by the developer/site owner) shall be able to log in — there is no public admin sign-up flow.	Must-have	New admin accounts are provisioned manually, not self-registered.
3.2 Recent Work / Project Updates Management
Allows the admin to publish, edit, and remove updates about work the company has completed, for display to site visitors.
ID	Requirement	Priority	Notes
FR-2.1	The system shall allow an authenticated admin to create a new Work Update with a title, description, one or more images, and a date.	Must-have	Images supplied/uploaded by admin.
FR-2.2	The system shall allow an admin to save a Work Update as a Draft (not publicly visible) or set it to Published (visible on the public site).	Should-have	Lets the client prepare content before it goes live.
FR-2.3	The system shall allow an admin to edit an existing Work Update's title, description, images, and date.	Must-have	—
FR-2.4	The system shall allow an admin to delete a Work Update permanently.	Must-have	Consider a confirmation step to prevent accidental deletion.
FR-2.5	The system shall display all Published Work Updates on the public website, ordered by most recent first, using the existing site's visual design.	Must-have	No new colours/styles introduced.
FR-2.6	The system shall not display Draft Work Updates anywhere on the public site.	Must-have	—
FR-2.7	The admin interface for managing Work Updates shall be reachable only after successful admin authentication (see 3.1).	Must-have	—
3.3 Employee Email Management
Allows the admin to maintain the company's internal record of employee email accounts.
ID	Requirement	Priority	Notes
FR-3.1	The system shall allow an authenticated admin to add a new employee email record, capturing at minimum the employee's name and email address.	Must-have	Optional fields (department, position) can be added if useful to CRG.
FR-3.2	The system shall allow an admin to edit an existing employee email record's details.	Must-have	—
FR-3.3	The system shall allow an admin to permanently delete an employee email record.	Must-have	Consider a confirmation step.
FR-3.4	The system shall allow an admin to suspend an employee email record without deleting it, marking it as inactive while preserving its data.	Must-have	Useful for staff on leave or temporarily inactive, without losing history.
FR-3.5	The system shall allow an admin to reactivate a previously suspended employee email record.	Must-have	—
FR-3.6	The system shall display each employee email record's current status (Active / Suspended) clearly in the admin interface.	Must-have	—
FR-3.7	Employee email records shall never be publicly visible or accessible outside the authenticated admin interface, unless CRG separately requests a public staff directory in future.	Must-have	Protects staff contact data from public exposure.
ASSUMPTION: This specification assumes the Employee Email Management feature maintains an internal record/directory of company email addresses (for CRG's own administrative reference) rather than actually provisioning live mailboxes with an email provider. If the intention is for this admin screen to also create real, working mailboxes (e.g. via an email hosting provider's API), that would require additional integration work and should be confirmed and scoped separately.
4. Non-Functional Requirements
4.1 Security
•	All admin routes/pages must be protected server-side (not just hidden via front-end routing) so that direct URL access without a valid authenticated session is blocked.
•	Supabase Row Level Security (RLS) policies must ensure only authenticated admins can read/write Work Updates (drafts) and Employee Email records; public/anonymous access must be limited to Published Work Updates only.
•	All traffic must be served over HTTPS.
•	Employee email data and admin credentials must never be exposed in client-side code, logs, or public API responses.
4.2 Usability & Design Consistency
•	All new admin screens must visually match the existing website's colour palette, fonts, and component styling — no new colours introduced unless the client requests them.
•	The admin interface should be simple and require minimal training for non-technical staff to use confidently.
•	Actions that cannot be undone (delete) should require a confirmation step.
4.3 Performance
•	Published Work Updates should load on the public site with no noticeable delay under normal usage/traffic levels.
•	Admin actions (create/edit/delete/suspend) should reflect in the interface within a few seconds of submission.
4.4 Reliability & Data Integrity
•	Deleted Work Updates and employee records are permanently removed; suspension (for employee records) is the recommended way to preserve data while restricting visibility/use.
•	Required fields (e.g. title, employee name, email address) must be validated before saving.
4.5 Compatibility
•	The admin interface and any updated public pages must be responsive and function correctly on desktop, tablet, and mobile screen sizes, consistent with the existing site.
•	Must function correctly on current versions of major browsers (Chrome, Safari, Edge, Firefox).
4.6 Maintainability
•	Code for the new admin features should follow the existing website's project structure and coding conventions where applicable, to keep the codebase consistent for future maintenance.
5. Data Requirements (Supabase Schema Overview)
The following is a proposed high-level schema to support the requirements above. Exact column types and constraints can be refined during implementation.
5.1 work_updates
Column	Type	Notes
id	uuid (PK)	Auto-generated primary key
title	text	Required
description	text	Required
image_urls	text[] / jsonb	One or more image references (Supabase Storage)
work_date	date	Date the work/project relates to
status	text (draft / published)	Controls public visibility
created_by	uuid (FK → admin user)	Which admin created the entry
created_at / updated_at	timestamptz	Auto-managed timestamps
5.2 employee_emails
Column	Type	Notes
id	uuid (PK)	Auto-generated primary key
employee_name	text	Required
email_address	text	Required, unique
status	text (active / suspended)	Defaults to active on creation
created_by	uuid (FK → admin user)	Which admin created the record
created_at / updated_at	timestamptz	Auto-managed timestamps
5.3 Admin Accounts
Admin accounts are managed via Supabase Auth's built-in users table rather than a custom table, with access controlled through RLS policies checking the authenticated user's session — no separate public-facing admin signup table is required.
5.4 Row Level Security Summary
Table	Public (anon) access	Authenticated admin access
work_updates	Read-only, status = 'published' rows only	Full read/write on all rows
employee_emails	No access	Full read/write on all rows
6. Assumptions & Constraints
•	The existing website's codebase and hosting platform can accommodate the addition of Supabase as a backend without requiring a full rebuild.
•	The client will supply or approve the images used in Work Updates.
•	There is no requirement in this phase for site visitors to create accounts, comment, or interact beyond viewing published Work Updates.
•	Admin account creation is a manual, developer-assisted process in this phase, not a self-service flow.
•	The number of admin users is expected to be small (e.g. one to a handful of company staff).
7. Out of Scope
•	Public visitor accounts, registration, or login of any kind.
•	A public-facing employee/staff directory (unless separately requested).
•	Real-time provisioning of live email mailboxes via a third-party email provider's API (see note in Section 3.3).
•	Multi-tier admin permission levels (all admins have equal access in this phase).
•	Analytics, notifications, or reporting dashboards.
8. Future Considerations (Optional, Not Currently Requested)
Not required for this phase, but worth flagging as possible future enhancements if useful to CRG:
•	An audit log recording which admin performed which action and when, for accountability.
•	Two-factor authentication (2FA) for admin login, for stronger security.
•	Tiered admin roles (e.g. separating content management from employee-record management).
•	A public staff directory page, if CRG later wants employee emails visible to site visitors.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5fd7f216-12aa-4acc-b20a-77575761998a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
