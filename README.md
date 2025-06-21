## Angular UPI Payment Gateway

This project is an Angular implementation of a basic UPI Payment Gateway interface, created as a coding assignment for WowPe.

It demonstrates fundamental Angular skills including component design, reactive forms, routing, validation, and transaction listing.

## 📋 Features Implemented
### ✅ Authentication

- Simple login screen with mock validation.
- Phone Number Validation in-place.

### ✅ UPI ID Validation

- Form for entering and verifying UPI ID.
- Displays error messages for invalid input.

### ✅ Send Money
Form for initiating payments:

Fields: Sender's UPI ID, Recipient's Name, UPI ID, Amount, Notes, UPI PIN.

### Validations:
- UPI ID format.
- UPI PIN Validation.
- Amount field validations (Max Amount capped at 1,00,000).
- User can decide the direction of transaction (success / failure).
- Shows a success message upon submission (mock implementation).

### ✅ Transaction History
### Displays past transactions
- Recipient's Name, UPI ID
- Sender's UPI ID
- Transaction Date
- Remarks
- Status (Success / Failed)

Includes pagination, search and filter functionality (by recipient name, UPI ID, and Remarks).

## ⚠️Note
``npm install`` will fail on this project. This is because Angular 20 is pretty recent as of today and a few external dependencies (like bootstrap 5) haven't yet built their version of package for Angular 20. This you need to run install packages with ``legacy-peer-deps`` flag.

## Install

```sh
npm run start
```

## Usage

```sh
npm run start
```

## Author

👤 **Kaushik M**

* Github: [@KaushikMani5002](https://github.com/KaushikMani5002)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2025 [Kaushik M](https://github.com/KaushikMani5002).<br />
This project is [MIT](https://opensource.org/license/mit) licensed.