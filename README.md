# ---------------------Vigilance Scan-------------------


# Frontend

## Introduction

Vigilance Scan is a web application that scans websites for vulnerabilities. This repository contains the frontend code for the application, built using React.

## Features

- User input form to enter URL to be scanned
- Scan button to initiate the scan
- Loading indicator during scan
- Dialog box to display scan results, including:
  - Bar chart showing severity of vulnerabilities
  - Summary of results, including critical, high, medium, and low vulnerabilities
  - Scan date

## Technologies Used

- React
- JavaScript
- HTML/CSS
- Material-UI for styling

## Getting Started

1. Clone the repository: `git clone https://github.com/chaudharyanubhavsingh/vigilance-scan-frontend.git`
2. Install dependencies: `npm install`
3. Start the application: `npm start`
4. Open your browser and navigate to `http://localhost:3000`

## API Documentation

The frontend communicates with the backend API to scan websites for vulnerabilities. The API endpoint is `http://localhost:8080/api/v1/scanner/vulnerabilities?url={url}`.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## License

This project is licensed under the MIT License.

---

**Backend Repository**

# Vigilance Scan Backend

## Introduction

Vigilance Scan is a web application that scans websites for vulnerabilities. This repository contains the backend code for the application, built using Spring Boot.

## Features

- API endpoint to scan websites for vulnerabilities
- Supports GET requests with URL parameter
- Returns scan results in JSON format

## Technologies Used

- Spring Boot
- Java
- Maven

## Getting Started

1. Change directory: `cd Backend`
2. Install dependencies: `mvn clean install`
3. Start the application: `mvn spring-boot:run`
4. Open your browser and navigate to `http://localhost:8080/api/v1/scanner/vulnerabilities?url={url}`

## API Documentation

### GET /api/v1/scanner/vulnerabilities

- Parameters:
  - `url` (string): URL to be scanned
- Returns:
  - `200 OK`: Scan results in JSON format
  - `500 Internal Server Error`: Error scanning website

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## License

This project is licensed under the MIT License.

