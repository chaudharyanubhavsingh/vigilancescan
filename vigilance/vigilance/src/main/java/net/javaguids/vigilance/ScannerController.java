package net.javaguids.vigilance;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/scanner")
public class ScannerController {

    private static final int TOTAL_ATTEMPTS = 10;

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
        vulnerabilities.put("injection", calculateSeverity(VulnerabilityScanner.checkSQLInjection(url, TOTAL_ATTEMPTS)));
        vulnerabilities.put("brokenAuth", calculateSeverity(VulnerabilityScanner.checkBrokenAuthentication(url, TOTAL_ATTEMPTS)));
        vulnerabilities.put("sensitiveDataExposure", calculateSeverity(VulnerabilityScanner.checkCryptographicFailures(url, TOTAL_ATTEMPTS)));
        vulnerabilities.put("xmlExternalEntities", calculateSeverity(VulnerabilityScanner.checkXXE(url, TOTAL_ATTEMPTS)));
        vulnerabilities.put("brokenAccessControl", calculateSeverity(VulnerabilityScanner.checkBrokenAccessControl(url, TOTAL_ATTEMPTS)));
        vulnerabilities.put("securityMisconfiguration", calculateSeverity(VulnerabilityScanner.checkSecurityMisconfigurations(url, TOTAL_ATTEMPTS)));
        vulnerabilities.put("crossSiteScripting", calculateSeverity(VulnerabilityScanner.checkXSS(url, TOTAL_ATTEMPTS)));
        vulnerabilities.put("insecureDeserialization", calculateSeverity(VulnerabilityScanner.checkInsecureDeserialization(url, TOTAL_ATTEMPTS)));
        vulnerabilities.put("usingComponentsWithKnownVulnerabilities", calculateSeverity(VulnerabilityScanner.checkOutdatedComponents(url, TOTAL_ATTEMPTS)));
        vulnerabilities.put("insufficientLoggingAndMonitoring", calculateSeverity(VulnerabilityScanner.checkInsufficientLogging(url, TOTAL_ATTEMPTS)));

        result.put("attackSimulation", VulnerabilityScanner.simulateAttack(url, TOTAL_ATTEMPTS));
        result.put("websiteScrape", VulnerabilityScanner.scrapeWebsiteData(url));

        // Recommendations based on vulnerabilities
        Map<String, String> recommendations = generateRecommendations(vulnerabilities);

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

    private int calculateSeverity(int successfulAttempts) {
        // Severity is a percentage based on successful attempts out of TOTAL_ATTEMPTS
        return (int) ((successfulAttempts / (double) TOTAL_ATTEMPTS) * 100);
    }

    private Map<String, String> generateRecommendations(Map<String, Integer> vulnerabilities) {
        Map<String, String> recommendations = new HashMap<>();

        if (vulnerabilities.getOrDefault("injection", 0) > 0) {
            recommendations.put("injection", "Sanitize and validate all user inputs to prevent SQL Injection.");
        }
        if (vulnerabilities.getOrDefault("brokenAuth", 0) > 0) {
            recommendations.put("brokenAuth", "Implement strong authentication mechanisms and session management.");
        }
        if (vulnerabilities.getOrDefault("sensitiveDataExposure", 0) > 0) {
            recommendations.put("sensitiveDataExposure", "Ensure all sensitive data is encrypted both at rest and in transit.");
        }
        if (vulnerabilities.getOrDefault("xmlExternalEntities", 0) > 0) {
            recommendations.put("xmlExternalEntities", "Disable XML external entity processing to prevent XXE attacks.");
        }
        if (vulnerabilities.getOrDefault("brokenAccessControl", 0) > 0) {
            recommendations.put("brokenAccessControl", "Enforce strict access control policies and least privilege principle.");
        }
        if (vulnerabilities.getOrDefault("securityMisconfiguration", 0) > 0) {
            recommendations.put("securityMisconfiguration", "Regularly audit and update server configurations to prevent security misconfigurations.");
        }
        if (vulnerabilities.getOrDefault("crossSiteScripting", 0) > 0) {
            recommendations.put("crossSiteScripting", "Implement Content Security Policy (CSP) and sanitize user inputs to prevent XSS.");
        }
        if (vulnerabilities.getOrDefault("insecureDeserialization", 0) > 0) {
            recommendations.put("insecureDeserialization", "Avoid deserializing untrusted data and implement integrity checks.");
        }
        if (vulnerabilities.getOrDefault("usingComponentsWithKnownVulnerabilities", 0) > 0) {
            recommendations.put("usingComponentsWithKnownVulnerabilities", "Regularly update and patch all components to the latest versions.");
        }
        if (vulnerabilities.getOrDefault("insufficientLoggingAndMonitoring", 0) > 0) {
            recommendations.put("insufficientLoggingAndMonitoring", "Implement comprehensive logging and monitoring to detect and respond to incidents promptly.");
        }

        return recommendations;
    }
}
