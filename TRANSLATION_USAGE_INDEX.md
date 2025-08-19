# Translation Usage Index

## Overview
This document indexes all translation keys actually used in the DreamToApp codebase, organized by file and namespace. This will be used to clean up the Arabic translation file and create a corresponding English version.

## File-by-File Translation Usage

### 1. Homepage (`app/[locale]/(homepage)/page.tsx`)
**Namespace**: `homepage`
**Keys Used**:
- `title` - Page title and metadata
- `description` - Page description and metadata
- `organization.name` - Schema markup
- `logo.alt` - Hero logo alt text
- `tagline` - Hero tagline
- `cta.primary` - Primary CTA button
- `cta.secondary` - Secondary CTA button
- `slogon` - Main slogan (used in MainTagline)
- `sections.hero` - Hero section aria-label
- `sections.cromboDetails` - Crombo section aria-label
- `services` - Services section aria-label
- `whyChooseUs` - Why Choose Us section aria-label
- `breadcrumb.home` - Breadcrumb schema

### 2. Navigation Components

#### `components/naviqation/navbar.tsx`
**Namespace**: `navbar`
**Keys Used**:
- `settings` - Settings menu
- `readyToStart` - Ready to start message
- `getInTouch` - Get in touch button
- `getStarted` - Get started button
- `startProject` - Start project button
- `openMenu` - Open menu button
- `mainNavigation` - Main navigation aria-label
- `dreamToAppHome` - Home link
- `dreamToAppLogo` - Logo alt text

#### `components/naviqation/MobileMenu.tsx`
**Namespaces**: `homepage`, `navbar`
**Keys Used**:
- `homepage`: `home`, `services`, `portfolio`, `contact`
- `navbar`: `settings`, `readyToStart`, `getInTouch`, `getStarted`, `startProject`

#### `components/naviqation/DesktopMenu.tsx`
**Namespace**: `homepage`
**Keys Used**:
- `home` - Home link
- `services` - Services link
- `portfolio` - Portfolio link
- `contact` - Contact link

#### `components/naviqation/LangSwicher.tsx`
**Namespace**: `navigation`
**Keys Used**:
- `switchLanguage` - Language switch button

#### `components/naviqation/CTAButton.tsx`
**Namespace**: `navbar`
**Keys Used**:
- `readyToStart` - Ready to start message
- `getInTouch` - Get in touch button

#### `components/naviqation/NavbarBrand.tsx`
**Namespace**: `navbar`
**Keys Used**:
- `dreamToAppHome` - Home link
- `dreamToAppLogo` - Logo alt text

#### `components/naviqation/MobileBrand.tsx`
**Namespace**: `navbar`
**Keys Used**:
- `dreamToAppHome` - Home link
- `dreamToAppLogo` - Logo alt text

### 3. Contact Forms

#### `app/[locale]/contactus/components/ContactForm.tsx`
**Namespace**: `contact`
**Keys Used**:
- `pageTitle` - Page title
- `pageDescription` - Page description
- `heroTitle` - Hero title
- `heroSubtitle` - Hero subtitle
- `badge1` - Badge 1
- `badge2` - Badge 2
- `badge3` - Badge 3
- `formTitle` - Form title
- `formSubtitle` - Form subtitle
- `whyChooseUs` - Why choose us title
- `whyChooseUsSubtitle` - Why choose us subtitle
- `benefit1Title` - Benefit 1 title
- `benefit1Description` - Benefit 1 description
- `benefit2Title` - Benefit 2 title
- `benefit2Description` - Benefit 2 description
- `benefit3Title` - Benefit 3 title
- `benefit3Description` - Benefit 3 description
- `benefit4Title` - Benefit 4 title
- `benefit4Description` - Benefit 4 description
- `needImmediateHelp` - Need immediate help text
- `getInstantSupport` - Get instant support text
- `chatOnWhatsApp` - Chat on WhatsApp text
- `contactTitle` - Contact title
- `contactSubtitle` - Contact subtitle
- `name` - Name field
- `namePlaceholder` - Name placeholder
- `mobile` - Mobile field
- `mobilePlaceholder` - Mobile placeholder
- `email` - Email field
- `emailPlaceholder` - Email placeholder
- `serviceType` - Service type field
- `selectService` - Select service text
- `serviceWebDevelopment` - Web development service
- `serviceMobileApp` - Mobile app service
- `serviceEcommerce` - Ecommerce service
- `serviceCRM` - CRM service
- `serviceUIUX` - UI/UX service
- `serviceDigitalMarketing` - Digital marketing service
- `serviceVisualIdentity` - Visual identity service
- `serviceOther` - Other service
- `projectDescription` - Project description field
- `projectDescriptionPlaceholder` - Project description placeholder
- `budget` - Budget field
- `selectBudget` - Select budget text
- `under5k` - Under 5k budget
- `5kTo10k` - 5k to 10k budget
- `10kTo25k` - 10k to 25k budget
- `25kTo50k` - 25k to 50k budget
- `50kTo100k` - 50k to 100k budget
- `over100k` - Over 100k budget
- `notSure` - Not sure budget
- `timeline` - Timeline field
- `selectTimeline` - Select timeline text
- `asap` - ASAP timeline
- `1To2Weeks` - 1-2 weeks timeline
- `1Month` - 1 month timeline
- `2To3Months` - 2-3 months timeline
- `3To6Months` - 3-6 months timeline
- `flexible` - Flexible timeline
- `message` - Message field
- `messagePlaceholder` - Message placeholder
- `additionalMessage` - Additional message field
- `additionalMessagePlaceholder` - Additional message placeholder
- `sendMessage` - Send message button
- `sending` - Sending text
- `contactWhatsApp` - Contact WhatsApp text
- `formSuccess` - Form success message
- `formError` - Form error message
- `successTitle` - Success title
- `successMessage` - Success message
- `sendAnotherMessage` - Send another message button

#### `app/[locale]/start-your-dream/component/StartDreamForm.tsx`
**Namespace**: `startDream`
**Keys Used**:
- `pageTitle` - Page title
- `pageDescription` - Page description
- `heroTitle` - Hero title
- `heroSubtitle` - Hero subtitle
- `badge1` - Badge 1
- `badge2` - Badge 2
- `badge3` - Badge 3
- `formTitle` - Form title
- `whyChooseUs` - Why choose us title
- `whyChooseUsSubtitle` - Why choose us subtitle
- `benefit1Title` - Benefit 1 title
- `benefit1Description` - Benefit 1 description
- `benefit2Title` - Benefit 2 title
- `benefit2Description` - Benefit 2 description
- `benefit3Title` - Benefit 3 title
- `benefit3Description` - Benefit 3 description
- `benefit4Title` - Benefit 4 title
- `benefit4Description` - Benefit 4 description
- `needImmediateHelp` - Need immediate help text
- `getInstantSupport` - Get instant support text
- `chatOnWhatsApp` - Chat on WhatsApp text
- `selectMultipleServices` - Select multiple services text
- `selectedServices` - Selected services text
- `nameLabel` - Name label
- `namePlaceholder` - Name placeholder
- `mobileLabel` - Mobile label
- `mobilePlaceholder` - Mobile placeholder
- `emailLabel` - Email label
- `emailPlaceholder` - Email placeholder
- `serviceTypeLabel` - Service type label
- `serviceTypePlaceholder` - Service type placeholder
- `serviceWebDevelopment` - Web development service
- `serviceMobileApp` - Mobile app service
- `serviceEcommerce` - Ecommerce service
- `serviceCRM` - CRM service
- `serviceUIUX` - UI/UX service
- `serviceDigitalMarketing` - Digital marketing service
- `serviceVisualIdentity` - Visual identity service
- `serviceConsultation` - Consultation service
- `serviceOther` - Other service
- `projectDescriptionLabel` - Project description label
- `projectDescriptionPlaceholder` - Project description placeholder
- `budgetLabel` - Budget label
- `budgetPlaceholder` - Budget placeholder
- `budgetUnder5k` - Under 5k budget
- `budget5k10k` - 5k-10k budget
- `budget10k25k` - 10k-25k budget
- `budget25k50k` - 25k-50k budget
- `budget50k100k` - 50k-100k budget
- `budgetOver100k` - Over 100k budget
- `budgetNotSure` - Not sure budget
- `timelineLabel` - Timeline label
- `timelinePlaceholder` - Timeline placeholder
- `timelineASAP` - ASAP timeline
- `timeline1To2Weeks` - 1-2 weeks timeline
- `timeline1Month` - 1 month timeline
- `timeline2To3Months` - 2-3 months timeline
- `timeline3To6Months` - 3-6 months timeline
- `timelineFlexible` - Flexible timeline
- `additionalMessageLabel` - Additional message label
- `additionalMessagePlaceholder` - Additional message placeholder
- `startMyDream` - Start my dream button
- `submitting` - Submitting text
- `successMessage` - Success message
- `formDisclaimer` - Form disclaimer
- `successTitle` - Success title
- `redirectingMessage` - Redirecting message

### 4. Portfolio/Worksample

#### `app/[locale]/worksample/page.tsx`
**Namespace**: `worksample`
**Keys Used**:
- `portfolio` - Portfolio title
- `heroTitle` - Hero title
- `heroDescription` - Hero description
- `coverImage` - Cover image alt text
- `noImage` - No image text
- `items` - Items text
- `viewGallery` - View gallery button
- `projectDescription` - Project description
- `noFolders` - No folders text
- `noFoldersDescription` - No folders description
- `taskCount` - Task count text

#### `app/[locale]/worksample/component/Websites.tsx`
**Namespace**: `worksample`
**Keys Used**:
- `featuredWebsites` - Featured websites title
- `websites.happyMoments.title` - Happy moments title
- `websites.happyMoments.description` - Happy moments description
- `websites.alkhuramiEst.title` - Alkhurami Est title
- `websites.alkhuramiEst.description` - Alkhurami Est description
- `websites.dreamToApp.title` - DreamToApp title
- `websites.dreamToApp.description` - DreamToApp description
- `websites.onProgress.title` - On progress title
- `websites.onProgress.description` - On progress description
- `websites.mixyBlog.title` - Mixy blog title
- `websites.mixyBlog.description` - Mixy blog description
- `websites.doIt.title` - Do it title
- `websites.doIt.description` - Do it description
- `websites.carDotNet.title` - Car dot net title
- `websites.carDotNet.description` - Car dot net description

#### `app/[locale]/worksample/show/[foldername]/page.tsx`
**Namespace**: `gallery`
**Keys Used**:
- `title` - Gallery title
- `galleryDescription` - Gallery description
- `noImages` - No images text
- `noImagesDescription` - No images description
- `galleryCollection` - Gallery collection text
- `exploreCollection` - Explore collection text

#### `app/[locale]/worksample/show/[foldername]/component/ImageWithFallback.client.tsx`
**Namespace**: `gallery`
**Keys Used**:
- `imageUnavailable` - Image unavailable text
- `fallbackImage` - Fallback image text
- `reloadImage` - Reload image button

#### `app/[locale]/worksample/show/[foldername]/component/Resize.tsx`
**Namespace**: `gallery`
**Keys Used**:
- `enlargedView` - Enlarged view text
- `enlargedDescription` - Enlarged description
- `rotate` - Rotate button
- `reset` - Reset button
- `share` - Share button
- `download` - Download button
- `openInNewTab` - Open in new tab button
- `useMouseWheel` - Use mouse wheel text
- `dragToPan` - Drag to pan text

### 5. Team Pages

#### `app/[locale]/team/page.tsx`
**Namespace**: `team`
**Keys Used**:
- `ourTeam` - Our team title
- `meetProfessionals` - Meet professionals text
- `joinOurTeam` - Join our team button
- `viewProfile` - View profile text
- `viewProfileBtn` - View profile button
- `yearsOfExperience` - Years of experience text
- `Mangement` - Management text
- `Full Stack Developer` - Full stack developer text
- `Backend Development` - Backend development text

#### `app/[locale]/team/component/TeamMember.tsx`
**Namespace**: `team`
**Keys Used**:
- `viewProfile` - View profile text
- `yearsOfExperience` - Years of experience text

#### `app/[locale]/team/apply/page.tsx`
**Namespace**: `teamApply`
**Keys Used**:
- `title` - Page title
- `name` - Name field
- `email` - Email field
- `phone` - Phone field
- `areaOfExpertise` - Area of expertise field
- `selectExpertise` - Select expertise text
- `yearsOfExperience` - Years of experience field
- `age` - Age field
- `gender` - Gender field
- `male` - Male option
- `female` - Female option
- `preferNotToSay` - Prefer not to say option
- `aboutYou` - About you field
- `aboutYouPlaceholder` - About you placeholder
- `attachment` - Attachment field
- `agreeToTerms` - Agree to terms text
- `jobRolesAndTerms` - Job roles and terms link
- `submitApplication` - Submit application button
- `submitting` - Submitting text
- `backToTeamPage` - Back to team page button
- `termsAlert` - Terms alert text
- `expertise.web-development` - Web development expertise
- `expertise.mobile-development` - Mobile development expertise
- `expertise.ui-ux-design` - UI/UX design expertise
- `expertise.marketing` - Marketing expertise
- `expertise.project-management` - Project management expertise
- `expertise.quality-assurance` - Quality assurance expertise
- `expertise.devops` - DevOps expertise
- `expertise.data-science` - Data science expertise

#### `app/[locale]/apply-job/page.tsx`
**Namespace**: `teamApply`
**Keys Used**: (Same as team/apply/page.tsx)

### 6. Thank You Page

#### `app/[locale]/thank-you/page.tsx`
**Namespace**: `thankyou`
**Keys Used**:
- `title` - Page title
- `subtitle` - Page subtitle
- `messageMain` - Main message
- `messageSecondary` - Secondary message
- `returnHome` - Return home button

### 7. Crombo Components

#### `app/[locale]/(homepage)/component/CromboDetail.tsx`
**Namespace**: `crombo`
**Keys Used**:
- `name` - Crombo name
- `title` - Crombo title
- `description` - Crombo description
- `action` - Action button
- `free` - Free text

#### `app/[locale]/(homepage)/component/CromboForm.tsx`
**Namespace**: `LaunchPage`
**Keys Used**:
- `offerEndsIn` - Offer ends in text
- `title` - Page title
- `description` - Page description
- `companyLabel` - Company label
- `companyPlaceholder` - Company placeholder
- `companyError` - Company error
- `nameLabel` - Name label
- `namePlaceholder` - Name placeholder
- `nameError` - Name error
- `mobileLabel` - Mobile label
- `mobilePlaceholder` - Mobile placeholder
- `mobileError` - Mobile error
- `emailLabel` - Email label
- `emailPlaceholder` - Email placeholder
- `emailError` - Email error
- `noteLabel` - Note label
- `notePlaceholder` - Note placeholder
- `submitButton` - Submit button
- `submitting` - Submitting text
- `successMessage` - Success message
- `errorMessage` - Error message
- `submitErrorMessage` - Submit error message
- `validationErrorMessage` - Validation error message
- `privacyNotice` - Privacy notice
- `loading` - Loading text
- `days` - Days text
- `hours` - Hours text
- `minutes` - Minutes text
- `seconds` - Seconds text
- `bookNow` - Book now button
- `bookNowFree` - Book now free text

### 8. UI Components

#### `components/ui/FloatingConsultationCTA.tsx`
**Namespace**: `consultationCTA`
**Keys Used**:
- `cta` - CTA text
- `title` - Modal title
- `description` - Modal description
- `name` - Name field
- `email` - Email field
- `phone` - Phone field
- `message` - Message field
- `submit` - Submit button
- `sending` - Sending text
- `success` - Success message
- `error` - Error message
- `close` - Close button
- `voiceLabel` - Voice label
- `record` - Record button
- `stop` - Stop button
- `fileTypeError` - File type error
- `recordError` - Record error
- `atLeastOneMessage` - At least one message text
- `messageType` - Message type text
- `text` - Text option
- `voice` - Voice option

#### `components/ui/VoiceRecorder.tsx`
**Namespace**: `voiceRecorder`
**Keys Used**:
- `record` - Record button
- `startRecording` - Start recording text
- `stop` - Stop button
- `clear` - Clear button
- `confirm` - Confirm button
- `close` - Close button
- `title` - Modal title
- `recordingTooShort` - Recording too short text
- `microphoneError` - Microphone error

#### `components/PWAStatus.tsx`
**Namespace**: `pwa`
**Keys Used**:
- `installAvailable` - Install available text
- `enableNotifications` - Enable notifications text
- `notificationsBlocked` - Notifications blocked text
- `installPromptNotAvailable` - Install prompt not available text
- `installing` - Installing text
- `installationCancelled` - Installation cancelled text
- `installationFailed` - Installation failed text

#### `components/InlineQuery/FormQuery.tsx`
**Namespace**: `formQuery`
**Keys Used**:
- `name` - Name field label
- `mobile` - Mobile field label
- `brief` - Brief description field label
- `submit` - Submit button
- `sending` - Sending text
- `successMessage` - Success message

#### `components/BackToTopButton.tsx`
**Namespace**: `footer`
**Keys Used**:
- `backToTop` - Back to top button

### 9. Terms and Privacy Pages

#### `app/[locale]/terms/page.tsx`
**Namespace**: `terms`
**Keys Used**:
- `meta.title` - Meta title
- `meta.description` - Meta description
- `title` - Page title
- `lastUpdated` - Last updated text
- `lastUpdatedDate` - Last updated date
- `introduction.title` - Introduction title
- `introduction.paragraph1` - Introduction paragraph 1
- `introduction.paragraph2` - Introduction paragraph 2
- `introduction.paragraph3` - Introduction paragraph 3
- `definitions.title` - Definitions title
- `definitions.terms.company` - Company definition
- `definitions.terms.companyDesc` - Company description
- `definitions.terms.client` - Client definition
- `definitions.terms.clientDesc` - Client description
- `definitions.terms.services` - Services definition
- `definitions.terms.servicesDesc` - Services description
- `definitions.terms.website` - Website definition
- `definitions.terms.websiteDesc` - Website description
- `definitions.terms.content` - Content definition
- `definitions.terms.contentDesc` - Content description
- `services.title` - Services title
- `services.description` - Services description
- `services.types.web` - Web services
- `services.types.mobile` - Mobile services
- `services.types.crm` - CRM services
- `services.types.ecommerce` - Ecommerce services
- `services.types.consulting` - Consulting services
- `services.types.maintenance` - Maintenance services
- `acceptance.title` - Acceptance title
- `acceptance.description` - Acceptance description
- `acceptance.conditions.use` - Use condition
- `acceptance.conditions.legal` - Legal condition
- `acceptance.conditions.age` - Age condition
- `acceptance.conditions.capacity` - Capacity condition
- `userResponsibilities.title` - User responsibilities title
- `userResponsibilities.description` - User responsibilities description
- `userResponsibilities.obligations.accuracy` - Accuracy obligation
- `userResponsibilities.obligations.compliance` - Compliance obligation

## Summary of Required Namespaces

Based on the analysis, the following namespaces are actually used:

1. **`app`** - App name and slogan
2. **`navigation`** - Navigation elements
3. **`homepage`** - Homepage content
4. **`services`** - Services content
5. **`contactus`** - Contact form (legacy)
6. **`contact`** - Contact form (new)
7. **`startDream`** - Start dream form
8. **`worksample`** - Portfolio/worksample
9. **`gallery`** - Image gallery
10. **`team`** - Team pages
11. **`teamApply`** - Team application
12. **`thankyou`** - Thank you page
13. **`crombo`** - Crombo component
14. **`LaunchPage`** - Launch page
15. **`consultationCTA`** - Consultation CTA
16. **`voiceRecorder`** - Voice recorder
17. **`pwa`** - PWA status
18. **`footer`** - Footer content
19. **`navbar`** - Navbar content
20. **`terms`** - Terms of service
21. **`buttons`** - Button texts
22. **`login`** - Login forms
23. **`contactUsPage`** - Contact page
24. **`notFound`** - 404 page

## Namespaces to Remove

The following namespaces can be removed as they are not used:

1. **`mobileAppPhases`** - Not used in current components
2. **`privacy`** - Large section, mostly unused
3. **`footer`** - Redundant with other sections
4. **`whyChooseUs`** - Redundant with services section
5. **`page`** - Not used in current app
6. **`dashboard`** - Admin only, not needed in public translations
7. **`offline`** - PWA specific, minimal usage
8. **`formQuery`** - Need to verify usage

## Next Steps

1. Create cleaned Arabic translation file with only used keys
2. Create corresponding English translation file
3. Test all pages to ensure no missing translations
4. Update documentation 