# update-navigation.ps1 - Generates clean Prev/TOC/Next footers for all topics with comfortable visual spacing

$orderedFiles = @(
    "01-foundations/01-why-angular.md",
    "01-foundations/02-spa-concepts.md",
    "01-foundations/03-component-based-architecture.md",
    "01-foundations/04-angular-architecture-overview.md",
    "01-foundations/05-typescript-essentials-for-angular.md",
    "02-core-angular/06-angular-components.md",
    "02-core-angular/07-templates-and-data-binding.md",
    "02-core-angular/08-directives.md",
    "02-core-angular/09-services.md",
    "02-core-angular/10-dependency-injection.md",
    "02-core-angular/11-http-client.md",
    "03-intermediate/12-rxjs-and-observables-fundamentals.md",
    "03-intermediate/13-component-communication.md",
    "03-intermediate/14-lifecycle-hooks.md",
    "03-intermediate/15-forms.md",
    "04-reactivity/16-subjects-and-behaviorsubject.md",
    "04-reactivity/17-rxjs-operators-deep-dive.md",
    "04-reactivity/17a-common-enterprise-rxjs-scenarios.md",
    "04-reactivity/17b-async-pipe-and-rxjs-template-patterns.md",
    "04-reactivity/18-signals.md",
    "04-reactivity/18a-signal-based-component-apis.md",
    "05-advanced/19-ngmodules-fundamentals.md",
    "05-advanced/20-standalone-components.md",
    "05-advanced/21-routing-and-navigation.md",
    "05-advanced/22-route-parameters-and-query-parameters-deep-dive.md",
    "05-advanced/23-route-guards.md",
    "05-advanced/24-nested-routes.md",
    "05-advanced/25-route-resolvers.md",
    "05-advanced/26-lazy-loading.md",
    "05-advanced/27-http-interceptors.md",
    "05-advanced/28-change-detection.md",
    "05-advanced/29-performance-optimization.md",
    "06-senior-architecture/30-state-management-fundamentals.md",
    "06-senior-architecture/31-ngrx-fundamentals.md",
    "06-senior-architecture/32-authentication-authorization.md",
    "06-senior-architecture/33-error-handling-strategy.md",
    "06-senior-architecture/34-enterprise-architecture.md",
    "06-senior-architecture/35-micro-frontends.md",
    "07-interview-preparation/36-mock-interview-questions.md",
    "07-interview-preparation/37-frontend-system-design.md",
    "07-interview-preparation/38-angular-testing-deep-dive.md",
    "07-interview-preparation/39-behavioral-interview-preparation.md",
    "07-interview-preparation/40-angular-system-design-case-studies.md",
    "07-interview-preparation/41-quick-fire-qa.md",
    "08-cheat-sheets/01-angular-cheat-sheet.md",
    "08-cheat-sheets/02-rxjs-cheat-sheet.md",
    "08-cheat-sheets/03-signals-cheat-sheet.md",
    "08-cheat-sheets/04-routing-cheat-sheet.md",
    "08-cheat-sheets/05-forms-cheat-sheet.md",
    "08-cheat-sheets/06-ngrx-cheat-sheet.md",
    "08-cheat-sheets/07-auth-cheat-sheet.md",
    "08-cheat-sheets/08-architecture-cheat-sheet.md",
    "08-cheat-sheets/09-interview-day-cheat-sheet.md"
)

function Get-RelativePath($fromPath, $toPath) {
    $fromDir = [System.IO.Path]::GetDirectoryName($fromPath).Replace("\", "/")
    $toDir = [System.IO.Path]::GetDirectoryName($toPath).Replace("\", "/")
    $toName = [System.IO.Path]::GetFileName($toPath)
    if ($fromDir -eq $toDir) {
        return $toName
    } else {
        return "../$toPath"
    }
}

function Get-TopicTitle($path) {
    $lines = Get-Content $path -TotalCount 8
    foreach ($line in $lines) {
        if ($line -match '^#\s+(.+)$') {
            return $matches[1].Trim()
        }
    }
    return [System.IO.Path]::GetFileNameWithoutExtension($path)
}

$updatedCount = 0

for ($i = 0; $i -lt $orderedFiles.Count; $i++) {
    $curr = $orderedFiles[$i]
    if (-not (Test-Path $curr)) {
        Write-Warning "File not found: $curr"
        continue
    }

    $prev = if ($i -gt 0) { $orderedFiles[$i - 1] } else { $null }
    $next = if ($i -lt $orderedFiles.Count - 1) { $orderedFiles[$i + 1] } else { $null }

    $prevText = if ($prev) { "⬅️ **Previous:** [" + (Get-TopicTitle $prev) + "](" + (Get-RelativePath $curr $prev) + ")" } else { "⬅️ **Previous:** *None (First Topic)*" }
    $nextText = if ($next) { "➡️ **Next:** [" + (Get-TopicTitle $next) + "](" + (Get-RelativePath $curr $next) + ")" } else { "➡️ **Next:** *None (End of Guide)*" }

    $navBlock = @"
<!-- navigation-start -->

<br/>
<br/>

---

<br/>

$prevText &nbsp;|&nbsp; 🏠 **[Table of Contents](../README.md)** &nbsp;|&nbsp; $nextText

<br/>
<!-- navigation-end -->
"@

    $content = Get-Content $curr -Raw -Encoding utf8
    if ($content -match '(?s)<!-- navigation-start -->.*?<!-- navigation-end -->') {
        $newContent = [regex]::Replace($content, '(?s)<!-- navigation-start -->.*?<!-- navigation-end -->', $navBlock.Trim())
    } else {
        $newContent = $content.TrimEnd() + "`r`n`r`n" + $navBlock.Trim() + "`r`n"
    }

    [System.IO.File]::WriteAllText((Resolve-Path $curr).Path, $newContent, (New-Object System.Text.UTF8Encoding($false)))
    $updatedCount++
}

Write-Output "Successfully updated navigation spacing across $updatedCount files!"
