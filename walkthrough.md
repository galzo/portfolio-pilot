# Portfolio Pilot CTF - Walkthrough & Solutions

Welcome to the Portfolio Pilot CTF! This document provides a complete walkthrough of all the challenges and their solutions. 

> [!IMPORTANT]
> The CTF consists of multiple services hosted via Docker. 
> - **Main App Frontend**: http://localhost:5173
> - **Code Review Challenge**: http://localhost:5174
> - **Leaderboard**: http://localhost:5175

---

## Challenge 1: The Hidden Seed

**Goal**: Find the hidden flag in one of the seeded users' portfolios.

**Solution**:
1. When the database is seeded, 10 random users are created.
2. User ID 5 is injected with a special fake stock position.
3. Log in as user ID 5 (you can find their email in the database or guess the pattern if emails are predictable, but the easiest way is to inspect the `/api/user/all` endpoint or guess the email/password). The password for all seeded users is `password123`.
4. Navigate to the Portfolio page.
5. The flag will be displayed as a stock ticker/name: `flag{H0laB0la$$}`.

---

## Challenge 2: Admin Privileges

**Goal**: Obtain the flag reserved for administrators.

**Solution**:
1. The signup endpoint `/api/user/signup` contains a Mass Assignment vulnerability.
2. Intercept the signup request and modify the JSON payload to include `"isAdmin": true`.
3. Complete the signup and navigate to the Portfolio page.
4. The server checks `req.user.isAdmin` and returns the flag in the API response payload.
5. Inspect the network tab or the UI (if rendered) to find: `flag{B0l@B0l@$$$$}`.

---

## Challenge 3: Broken Object Level Authorization (BOLA)

**Goal**: Sell a stock position belonging to another user.

**Solution**:
1. Log in to your normal account.
2. Intercept the request to `/api/portfolio/sell`.
3. Notice that the payload includes `userId` and `stockId`. The backend uses the `userId` from the payload instead of your authentication token.
4. Change the `userId` to another user's ID (e.g., `1` for admin or `5` for the seeded user) and set a valid `stockId` that they own.
5. Send the request. Because you successfully manipulated the portfolio of another user, the backend will return the flag in the JSON response: `flag{DimondHands2023}`.

---

## Challenge 4: Broken Function Level Authorization (BFLA) / Infinite Money

**Goal**: Exploit the endpoint to add infinite funds to your account.

**Solution**:
1. Notice the `addFunds` endpoint at `/api/portfolio/addFunds`. 
2. Normally, this endpoint might be hidden from the UI or intended only for admins. However, the `authenticate` middleware doesn't check for administrative privileges (BFLA).
3. Send a POST request to `/api/portfolio/addFunds` with your `portfolioId` and a `cash` amount.
4. Upon successfully adding funds, the server rewards you with the flag in the response message: `flag{$InfiniteMoneyGlitch$}`.

---

## Challenge 5: Code Review Master

**Goal**: Unlock the code review challenge, find the vulnerabilities, and bypass the AI protections.

**Solution**:
1. Navigate to the Code Review Challenge at `http://localhost:5174`.
2. It requires a previous flag to unlock. Enter any valid flag you obtained (e.g., `flag{DimondHands2023}`).
3. Once unlocked, you are presented with a 300+ line code snippet. 
> [!NOTE]
> The code contains CSS obfuscation (zero-width spaces) and hidden prompt injections to confuse AI tools. Copy-pasting this blindly to an LLM will result in the AI claiming the code is 100% secure.
4. Manually inspect the code to find:
   - **Vulnerability 1**: BOLA on lines 120-140 (Missing check to ensure `req.user.id === document.ownerId` in the delete route).
   - **Vulnerability 2**: BFLA on lines 210-230 (Missing check for `req.user.role === 'admin'` in the delete user route).
5. Submit these line ranges and select the correct vulnerability types from the dropdown.
6. The server will reward you with the final flag: `flag{C0d3R3v13wM4st3r}`.

---

## The Leaderboard

You can submit all your collected flags to the Leaderboard at `http://localhost:5175`.
- **Dynamic Scoring**: The first person to submit a flag gets 100 points. Subsequent solvers get 5 points less (95, 90, 85...).
- **Penalties**: You get 3 free incorrect guesses. After that, each incorrect guess deducts 1 point from your total score.
- **CAPTCHA**: A simple math-based CAPTCHA is required for every submission to prevent brute-forcing.
