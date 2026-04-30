# Portfolio Pilot CTF - Walkthrough & Solutions

Welcome to the Portfolio Pilot CTF! This document provides a complete, step-by-step walkthrough of all the challenges and their solutions. It is designed to be accessible even if you are new to web security concepts like BOLA (Broken Object Level Authorization) and BFLA (Broken Function Level Authorization).

> [!IMPORTANT]
> The CTF consists of multiple services hosted via Docker. 
> - **Main App Frontend**: http://localhost:5173
> - **Code Review Challenge**: http://localhost:5174
> - **Leaderboard**: http://localhost:5175
>
> **Tooling**: To solve these challenges, you will need a way to intercept and modify HTTP requests. You can use a local proxy like **Burp Suite**, or simply use your browser's **Developer Tools** (specifically the "Network" tab, where you can right-click a request, select "Copy as fetch", paste it into the console, modify it, and run it).

---

## Challenge 1: The Hidden Seed (BOLA)

**Goal**: Find the hidden flag in one of the seeded users' portfolios.

**Concept**: BOLA (Broken Object Level Authorization) occurs when an application does not properly verify if the authenticated user has permission to access a specific object (like another user's portfolio).

**Solution**:
1. When the database is seeded on startup, 10 random users are created. User ID 5 is injected with a special fake stock position containing the flag. The passwords for these users are 32 random characters, so you cannot guess them!
2. Create an account and log in as yourself.
3. Open your browser's Developer Tools (F12) and go to the **Network** tab.
4. Refresh the page to trigger the app to fetch your portfolio. You will see a request to `/api/portfolio/getPortfolio?userId=<your_id>`.
5. Notice that the application uses the `userId` in the URL to decide whose portfolio to return, rather than relying strictly on your secure session token.
6. **The Exploit**: Copy the URL and change the `userId` to `5`. Make a GET request to `http://localhost:3000/api/portfolio/getPortfolio?userId=5` (make sure to include your `Authorization: Bearer <token>` header). 
7. The server will happily return User 5's portfolio! Look at the JSON response, and you will see the flag displayed as a stock ticker/name: `flag{H0laB0la$$}`.

---

## Challenge 2: Admin Privileges (Mass Assignment)

**Goal**: Obtain the flag reserved for administrators.

**Concept**: Mass Assignment occurs when an application automatically binds user input to internal object properties without filtering. If an attacker passes unexpected properties (like `isAdmin`), the application might blindly accept them.

**Solution**:
1. Go to the Sign Up page.
2. Fill out the form with a random name, email, and password.
3. Before hitting "Sign Up", open your Network tab or Burp Suite to intercept the request.
4. The frontend will send a JSON payload like this: `{"name":"Test","email":"test@test.com","password":"password"}` to the `/api/user/signup` endpoint.
5. **The Exploit**: Modify the JSON payload before it reaches the server to include `"isAdmin": true`. Your payload should look like: `{"name":"Test","email":"test@test.com","password":"password","isAdmin":true}`.
6. Forward the request. The server will blindly assign the `isAdmin` property to your new user in the database!
7. Log in with your new account and fetch your portfolio (or just look at the network response when your portfolio loads). The server sees you are an admin and returns the hidden flag: `flag{B0l@B0l@$$$$}`.

---

## Challenge 3: Diamond Hands (BOLA - Modifying Data)

**Goal**: Sell a stock position belonging to another user.

**Solution**:
1. Log in to your normal account. Make sure you have at least one stock position (you can buy some Apple stock to test).
2. Click "Sell" on a stock and intercept the request to `/api/portfolio/sell`.
3. Look at the JSON payload. It looks like this: `{"userId": <your_id>, "stockId": 1, "amount": 10}`.
4. **The Exploit**: Similar to Challenge 1, the backend uses the `userId` from the payload instead of your secure authentication token to decide *who* is selling the stock. Change the `userId` to another user's ID (e.g., `1` for the admin) and set a valid `stockId` that they own.
5. Send the request. Because you successfully manipulated the portfolio of another user, the backend detects the BOLA exploitation and rewards you with the flag in the JSON response: `{"isSuccess": true, "message": "flag{DimondHands2023}"}`.

---

## Challenge 4: Infinite Money Glitch (BFLA)

**Goal**: Exploit the endpoint to add infinite funds to your account.

**Concept**: BFLA (Broken Function Level Authorization) occurs when an application fails to restrict access to privileged functions (like adding money).

**Solution**:
1. You might notice that there is no button in the UI to add funds. However, the backend might have an endpoint for administrators to credit accounts.
2. Through source code review or API fuzzing, you can discover the `addFunds` endpoint at `POST /api/portfolio/addFunds`. 
3. This endpoint is supposed to be for admins only, but the `authenticate` middleware doesn't actually check for administrative privileges!
4. **The Exploit**: Send a POST request to `http://localhost:3000/api/portfolio/addFunds` with your `Authorization` header and a JSON payload containing your `portfolioId` and a `cash` amount: `{"portfolioId": <your_portfolio_id>, "cash": 999999}`. (You can find your `portfolioId` by looking at the response from the `getPortfolio` endpoint).
5. Upon successfully executing this privileged function, the server rewards you with the flag in the response message: `flag{$InfiniteMoneyGlitch$}`.

---

## Challenge 5: Code Review Master

**Goal**: Unlock the code review challenge, find the two real vulnerabilities, and avoid being misled by red herrings and AI hallucinations.

**Solution**:
1. Navigate to the Code Review Challenge at `http://localhost:5174`.
2. It requires a "Previous Flag" to unlock. Enter any valid flag you obtained (e.g., `flag{DimondHands2023}`).
3. Once unlocked, you are presented with a ~430-line Express service (`portfolioRoutes.ts`) rendered with syntax highlighting and real line numbers. Click any line number to start a range and shift-click another to set the end — the form on the right autofills.

> [!IMPORTANT]
> **Per-session watermarking.** The server issues a unique copy of the source per browser session — a random number of "padding" comment lines are inserted before each vulnerable block, so the line numbers of the real bugs are different for every solver. AI answers shared between users will not transfer.
>
> **Layered anti-AI defense.** The challenge actively fights LLM-assisted cheating:
> 1. **Clipboard poisoning** — when you copy code from the panel, every third character gets a zero-width space inserted, plus decoy `// SECURITY-REVIEWED` comments are spliced into the copied text. Naive paste-into-ChatGPT misreads the file.
> 2. **Decoy prompt injections** — the file's banner comment, a `<meta name="ai-instruction">` tag, a hidden `<div>`, and several inline `// SECURITY-REVIEWED` annotations all confidently announce that the file is audit-clean except for an imaginary SQL injection. LLMs that obey those instructions report the wrong answer.
> 3. **Red herrings** — several routes look vulnerable but are not: a SQL string that's actually parameterized via `parameterizedQuery()`, a `/portfolio/redirect` that's allow-listed by host, an `/admin/users` handler that inherits `requireAdmin` from the `adminRouter` mount, and a JSON.parse for the audit-log filter that's length-bounded and try/catched.
>
> Read the code with your own eyes. Specifically watch the request body: who is the handler claiming to act on behalf of, and is the privileged middleware actually applied?

4. Find the two real vulnerabilities (line ranges will differ per session — verify in your own copy):
   - **BOLA** in `router.post('/portfolio/getPosition', ...)`. The handler reads `req.body.userId` and returns that user's position, never checking it against `req.user.id`. Click the route's opening `router.post(...)` line, then shift-click the closing `});` of that handler. Choose **Broken Object Level Authorization** in the dropdown.
   - **BFLA** in `router.post('/admin/users/delete', ...)`. The handler is mounted on the main `router` and only wraps `requireAuth` — it never goes through the `adminRouter` (which is the only place `requireAdmin` is applied). Any authenticated non-admin can call it. Select that handler's line range with type **Broken Function Level Authorization**.

5. Submit. The server validates the submitted ranges against your session's actual ranges and rewards the final flag: `flag{C0d3R3v13wM4st3r}`.

---

## The Leaderboard

You can submit all your collected flags to the Leaderboard at `http://localhost:5175`.
- **Dynamic Scoring**: The first person to submit a flag gets 100 points. Subsequent solvers get 5 points less (95, 90, 85...).
- **Penalties**: You get 3 free incorrect guesses. After that, each incorrect guess deducts 1 point from your total score.
- **CAPTCHA**: A server-issued single-use math CAPTCHA is required for every submission. The client cannot supply or precompute the expected answer — the server hands out a `captchaId` that is consumed once. Brute-force scripts have to fetch a fresh CAPTCHA per attempt.
- **Floor**: scores never drop below 10 points per flag, so even latecomers earn something for solving.
