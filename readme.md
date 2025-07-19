# Lab: Implement External User Verification with Auth0 Forms

Launching a private beta for your app that requires external user verification? There's many solutions to this use case, but with Auth0 Forms you can gate access to app login without blocking user sign up, so they can easily join in when your app goes public. It's as easy as configuring an Auth0 Form and writing a Post-Login Action to prompt the user for a provided verification code.

Forms for Actions is a visual editor tool that streamlines the registration and login flows. Forms allow you to build custom forms connected to the Universal Login page. With Forms, you don't need to redirect users to your application to prompt end users for additional data that should be available at or after the registration or login process. You can build and manage the identity flow using UI components, custom business logic, and integration with APIs based on a low-code solution. This gives you the flexibility to create personalized experiences that increase user conversion and retention!

Forms enables you to build use cases like:

- **Progressive profiling**: Define a set of conditions to require users to complete additional information as they engage with your product. For example, when users login for a third-time, you can require them to complete their profile.
- **Custom policies acceptance**: If you need to update your policies, you can define logic to check if users have accepted the latest policies, and depending on that, display a custom form to users requiring acceptance.
- **Custom signup or login steps**: Extend and customize your flows with additional steps and custom logic. For example, you can verify email or phone numbers with OTP and account linking, or verify payment details with Stripe, and more.

In this [Okta Learning](https://learning.okta.com/) hands-on lab learners will put Forms into practice.

---

# How to Get Started with this Lab

## Create Required Free Accounts

1. A GitHub account with Codespaces access (you can use the free plan, which gives you 60 hours of use per month). Create a free account [here](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account) if you do not already have one.

    **⚠️ Note to internal Okta employees: Do NOT use your EMU (Enterprise-managed user) account since Codespaces are disabled.**

2. An Auth0 account: You'll also need an Auth0 account. If you do not already have one, you can create a free one [here](https://auth0.com/signup).

## Accessing and Working with Auth0 Labs

1. **After logging into GitHub, open the lab repo in a Codespace:** From the *Code* dropdown menu of this branch, toggle to the *Codespaces* tab. Click the plus sign to create and open the lab in a Codespace. A new tab will open, and Codespaces will begin configuring the lab environment. Wait for the environment to finish building.
2. **Begin working with the lab:** Once the environment is ready you'll see a Codetour popup with instructions for connecting the lab to your Auth0 account. This can take some time, as the environment is installing several extensions and libraries to facilitate the lab. Once it is complete, you can open the Codetour to view all steps using the panel in the lower right. At this point, you should follow the remainder of the instructions within Codetour!

### Notes:
- **If you'd like to save your work to your own fork:** You can commit and push your changes to a fork of this repo. (See: [Using Source Control in Your Codespace](https://docs.github.com/en/codespaces/developing-in-codespaces/using-source-control-in-your-codespace)).
- **Close the Codespace when you're finished with the lab:** Codespaces come with a set amount of free usage. To avoid using all of your free use allocation, be sure to return to the forked repo, select the "Code" dropdown, select the dots next to your open Codespace, and select "Delete." This will not delete your forked repository. You can keep that forever, and open a new Codespace whenever you like.

---
### What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://auth0.com/docs/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional [username/password databases](https://auth0.com/docs/connections/database/custom-db).
* Add support for [linking different user accounts](https://auth0.com/docs/link-accounts) with the same user.
* Support for generating signed [JSON Web Tokens](https://auth0.com/docs/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when, and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://auth0.com/docs/rules/current).

### Issue Reporting
---
If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

### Author
---

[Auth0](https://auth0.com)

### License
---

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.