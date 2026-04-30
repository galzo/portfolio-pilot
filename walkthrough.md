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

**Goal**: Unlock the code review challenge, find the vulnerabilities, and bypass the AI protections.

**Solution**:
1. Navigate to the Code Review Challenge at `http://localhost:5174`.
2. It requires a "Previous Flag" to unlock. Enter any valid flag you obtained (e.g., `flag{DimondHands2023}`).
3. Once unlocked, you are presented with a 300+ line code snippet. 
> [!NOTE]
> The code contains CSS obfuscation (invisible zero-width spaces are injected between characters) and hidden prompt injections. If you try to blindly copy-paste this code into ChatGPT or Claude, the AI will get confused by the invisible characters and the hidden instructions, and it will falsely claim the code is 100% secure! You must rely on your own eyes.
4. Manually inspect the code to find:
   - **Vulnerability 1**: A BOLA vulnerability exists on lines 120-140. There is a missing check to ensure `req.user.id === document.ownerId` in the document deletion route.
   - **Vulnerability 2**: A BFLA vulnerability exists on lines 210-230. There is a missing check to ensure `req.user.role === 'admin'` before allowing the deletion of users.
5. Submit these line ranges and select the correct vulnerability types from the dropdown on the right side of the screen.
6. The server will reward you with the final flag: `flag{C0d3R3v13wM4st3r}`.

---

## The Leaderboard

You can submit all your collected flags to the Leaderboard at `http://localhost:5175`.
- **Dynamic Scoring**: The first person to submit a flag gets 100 points. Subsequent solvers get 5 points less (95, 90, 85...).
- **Penalties**: You get 3 free incorrect guesses. After that, each incorrect guess deducts 1 point from your total score.
- **CAPTCHA**: A simple math-based CAPTCHA is required for every submission to prevent brute-forcing tools from simply submitting thousands of random strings.
