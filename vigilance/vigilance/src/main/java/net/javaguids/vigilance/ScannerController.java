package net.javaguids.vigilance;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/scanner")
public class ScannerController {

    @GetMapping("/vulnerabilities")
    public Map<String, Object> scanUrl(@RequestParam String url) {
        Map<String, Object> result = new HashMap<>();

        // Ensure the URL has a valid scheme
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            result.put("error", "Invalid URL scheme. URL must start with http:// or https://");
            return result;
        }

        // Vulnerabilities data
        Map<String, Integer> vulnerabilities = new HashMap<>();
        vulnerabilities.put("injection", calculateSeverity(VulnerabilityScanner.checkSQLInjection(url)));
        vulnerabilities.put("brokenAuth", calculateSeverity(VulnerabilityScanner.checkBrokenAuthentication(url)));
        vulnerabilities.put("sensitiveDataExposure", calculateSeverity(VulnerabilityScanner.checkCryptographicFailures(url)));
        vulnerabilities.put("xmlExternalEntities", calculateSeverity(VulnerabilityScanner.checkXXE(url)));
        vulnerabilities.put("brokenAccessControl", calculateSeverity(VulnerabilityScanner.checkBrokenAccessControl(url)));
        vulnerabilities.put("securityMisconfiguration", calculateSeverity(VulnerabilityScanner.checkSecurityMisconfigurations(url)));
        vulnerabilities.put("crossSiteScripting", calculateSeverity(VulnerabilityScanner.checkXSS(url)));
        vulnerabilities.put("insecureDeserialization", 35); // Static value
        vulnerabilities.put("usingComponentsWithKnownVulnerabilities", calculateSeverity(VulnerabilityScanner.checkOutdatedComponents(url)));
        vulnerabilities.put("insufficientLoggingAndMonitoring", 47); // Static value
        result.put("attackSimulation", VulnerabilityScanner.simulateAttack(url));
        result.put("Websitescrape", VulnerabilityScanner.scrapeWebsiteData(url));

        // Recommendations based on vulnerabilities
        String[] recommendations = {
            "Sanitize user inputs to prevent SQL Injection.",
            "Implement proper authentication mechanisms.",
            "Ensure sensitive data is encrypted.",
            "Disable XML external entity processing.",
            "Enforce strong access control policies."
        };
        

        // Adding all the required results dynamically
        result.put("vulnerabilities", vulnerabilities);
        result.put("recommendations", recommendations);
        result.put("scanDate", java.time.LocalDate.now().toString());
        result.put("targetURL", url);

        // Severity counts
        long criticalVulnerabilities = vulnerabilities.values().stream().filter(v -> v > 70).count();
        long highVulnerabilities = vulnerabilities.values().stream().filter(v -> v > 50 && v <= 70).count();
        long mediumVulnerabilities = vulnerabilities.values().stream().filter(v -> v > 30 && v <= 50).count();
        long lowVulnerabilities = vulnerabilities.values().stream().filter(v -> v <= 30).count();

        result.put("criticalVulnerabilities", criticalVulnerabilities);
        result.put("highVulnerabilities", highVulnerabilities);
        result.put("mediumVulnerabilities", mediumVulnerabilities);
        result.put("lowVulnerabilities", lowVulnerabilities);

        return result;
    }

    private int calculateSeverity(String vulnerabilityCheckResult) {
        if (vulnerabilityCheckResult.contains("Potential")) {
            return (int) (Math.random() * (90 - 50)) + 50; // Random value between 50-90%
        }
        return (int) (Math.random() * 50); // Random value between 0-50%
    }
}