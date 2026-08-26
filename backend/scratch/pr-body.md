## Summary
Closes open items from the Website Bugs spreadsheet by wiring CMS to the public site and fixing API blockers that prevented admin edits from showing in production.

## What changed
- **Homepage CMS:** Hero video, slides, Live to Inspire CTA, and Digital Empire social counts now load from `/home-page` (editable in Admin → Home).
- **Events API:** Persist `showOnCard`; remove invalid `cloudinaryPublicId` writes that broke create/update. Ticket card description works when “Show on card” is enabled. Calendar supports past months.
- **Speaking:** Program Catalog landing links + image merge; Universal Features shows only the last 3 cards; strip logo remains CMS-editable.
- **Contributions:** Teachers Training and YMF cards are clickable (`linkUrl`); gallery archive uses media URL resolution and empty-array fallback.
- **Admin / UX:** Banner upload with recommended size guidance; clearer Razorpay validation errors; reduced Events CTA → footer spacing.
- **Boot safety:** On API start, repair corrupted CMS JSON and fill missing initiative links / `digital_empire` section.

## Out of scope / follow-up
- Home **Media & Press** section still off homepage pending stakeholder approval.
- True live Instagram/YouTube API counts need platform API keys (counts are CMS-editable for now).
- Production Razorpay still requires valid keys in Admin → Settings.

## Test plan
- [ ] Home: change hero CTA / video / social counts in admin → verify on `/`
- [ ] Events: toggle Show on card + description + poster → verify ticket cards and calendar past months
- [ ] Speaking: program cards open landing URLs; Universal Features shows 3 items
- [ ] Contributions: Teachers and YMF cards navigate; gallery images load
- [ ] Admin → Banner: size hint visible; popup image resolves
- [ ] Cart checkout: missing Razorpay keys returns clear error (not opaque 500)
- [ ] After deploy: restart API; confirm `/health` and CMS repair logs
