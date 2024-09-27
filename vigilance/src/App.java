import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Scanner;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;



public class App {
    public static String checkXSS(String url) {
        // Encode the XSS payload
        String encodedPayload = URLEncoder.encode("<script>alert(1)</script>", StandardCharsets.UTF_8);
        
        // Add the encoded payload to the URL
        String testUrl = url + "?q=" + encodedPayload;
        
        String response = sendGetRequest(testUrl);
        if (response.contains("<script>alert(1)</script>")) {
            return "Potential XSS vulnerability found.";
        }
        return "No XSS vulnerability found.";
    }
    public static String checkSQLInjection(String url) {
        // Encode the SQL Injection payload
        String encodedPayload = URLEncoder.encode("1' OR '1'='1", StandardCharsets.UTF_8);
        
        // Add the encoded payload to the URL
        String testUrl = url + "?id=" + encodedPayload;
        
        String response = sendGetRequest(testUrl);
        if (response.contains("syntax") || response.contains("SQL")) {
            return "Potential SQL Injection vulnerability found.";
        }
        return "No SQL Injection vulnerability found.";
    }
    public static String checkInsecureHttp(String url) {
        // Check if the site uses HTTPS
        if (url.startsWith("https")) {
            return "Site uses HTTPS.";
        }
        return "Site does not use HTTPS, potential Insecure Communication vulnerability.";
    }
    public static String sendGetRequest(String url) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.body();
        } catch (IOException | InterruptedException e) {
            return "Error sending GET request: " + e.getMessage();
        }
    }
    public static void scrapeWebsiteData(String url) {
        try {
            Document doc = Jsoup.connect(url).get();
            
            Elements links = doc.select("a[href]");
            Elements images = doc.select("img[src]");
            Elements paragraphs = doc.select("p");

            System.out.println("\nScraped data:");
            
            if (!links.isEmpty()) {
                System.out.println("Links:");
                for (Element link : links) {
                    System.out.println(link.attr("href"));
                }
            } else {
                System.out.println("No links found.");
            }

            if (!images.isEmpty()) {
                System.out.println("Images:");
                for (Element image : images) {
                    System.out.println(image.attr("src"));
                }
            } else {
                System.out.println("No images found.");
            }

            if (!paragraphs.isEmpty()) {
                System.out.println("Paragraphs:");
                for (Element paragraph : paragraphs) {
                    System.out.println(paragraph.text());
                }
            } else {
                System.out.println("No paragraphs found.");
            }
        } catch (IOException e) {
            System.out.println("Error scraping website data: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter the website URL: ");
        String url = scanner.nextLine().trim();

        // Ensure URL is valid and starts with HTTP/HTTPS
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "http://" + url;
        }
        
        System.out.println("\nChecking vulnerabilities for: " + url);

        // Run vulnerability checks
        System.out.println(checkXSS(url));
        System.out.println(checkSQLInjection(url));
        System.out.println(checkInsecureHttp(url));
        
        // Scrape website data
        System.out.println("\nScraping website data...");
        scrapeWebsiteData(url);

        scanner.close();
    }
}
