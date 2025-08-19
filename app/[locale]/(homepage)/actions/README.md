# Newsletter Actions

This folder contains server actions for newsletter subscription functionality.

## Files

### `newsletterActions.ts`

Contains server actions for managing newsletter subscriptions:

#### Functions

- **`subscribeToNewsletter(formData: FormData)`**
  - Validates email input
  - Checks for existing subscriptions
  - Creates new subscription or reactivates inactive ones
  - Returns success/error messages

- **`unsubscribeFromNewsletter(email: string)`**
  - Deactivates an existing subscription
  - Returns success/error messages

- **`getNewsletterStats()`**
  - Returns total active subscribers
  - Returns recent subscribers (last 30 days)

#### Database Schema

The newsletter functionality uses the `NewsletterSubscription` model in Prisma:

```prisma
model NewsletterSubscription {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Features

- ✅ Email validation using Zod
- ✅ Duplicate email prevention
- ✅ Subscription reactivation for inactive users
- ✅ Soft delete (deactivation) instead of hard delete
- ✅ Comprehensive error handling
- ✅ Arabic and English error messages
- ✅ Statistics tracking

#### Usage

The newsletter subscription form is integrated into the footer component and provides:

- Real-time form validation
- Loading states
- Success/error notifications
- Automatic form clearing on success
- Accessibility features 