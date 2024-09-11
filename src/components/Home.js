import React, { useState } from 'react';
import backlink from "../assets/background.mp4";
import { Link } from 'react-router-dom';
import DialogBox from './DialogBox';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Bar } from 'react-chartjs-2';

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleScan = () => {
    if (url) {
      setLoading(true);
     
      setTimeout(() => {
        setScanResult({
          vulnerabilities: {
            injection: 80, // Example data
            brokenAuth: 50,
            sensitiveDataExposure: 30,
            xmlExternalEntities: 10,
            brokenAccessControl: 70,
            securityMisconfiguration: 40,
            crossSiteScripting: 60,
            insecureDeserialization: 20,
            usingComponentsWithKnownVulnerabilities: 90,
            insufficientLoggingAndMonitoring: 35,
          },
          recommendations: [
            "Sanitize user inputs to prevent SQL Injection.",
            "Implement proper authentication mechanisms.",
            "Ensure sensitive data is encrypted.",
            "Disable XML external entity processing.",
            "Enforce strong access control policies.",
          ],
        });
        setLoading(false);
        setShowDialog(true);
      }, 2000);
    }
  };

  const getBarColor = (percentage) => {
    if (percentage > 70) return '#ff4c4c'; 
    if (percentage > 50) return '#ffc107'; 
    return '#4caf50'; 
  };

  const data = scanResult ? {
    labels: [
      'Injection',
      'Broken Auth',
      'Sensitive Data Exposure',
      'XML External Entities',
      'Broken Access Control',
      'Security Misconfiguration',
      'XSS',
      'Insecure Deserialization',
      'Vulnerable Components',
      'Logging & Monitoring',
    ],
    datasets: [
      {
        label: 'Vulnerability Severity (%)',
        data: Object.values(scanResult.vulnerabilities),
        backgroundColor: Object.values(scanResult.vulnerabilities).map(getBarColor),
      }
    ]
  } : null;

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="App" style={{ height: '100vh', position: 'relative' }}>
      <div className="hero" style={{ height: '100%', overflow: 'hidden' }}>
        <div className="background-video">
          <video autoPlay muted loop>
            <source src={backlink} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div role="banner" className="nav-bar w-nav">
          <div className="w-container">
            <Link to="/" aria-current="page" className="brand-link w-nav-brand w--current">
              <h1 className="logo">Vigilance Scan</h1>
            </Link>
            <nav role="navigation" className="nav-menu w-nav-menu">
              <Link to="/contact" className="nav-link w-nav-link">Contact</Link>
            </nav>
            <div className="menu-button w-clearfix w-nav-button">
              <div className="menu-text">MENU</div>
              <div className="menu-icon w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
        <div className="hero-container w-container" style={{ marginTop: '50px' }}>
          <h1 className="hero-heading">Unleash the Power of Web Scraping</h1>
          <div className="hero-subtitle">
            Effortlessly extract data from any website with our cutting-edge scraper tool.
          </div>
        </div>
        <div className="w-layout-hflex flex-block">
          <div className="div-block">
            <input type="text" className="url-input" placeholder="Enter URL" onChange={handleInputChange} />
            <div className="div-block-2" onClick={handleScan}>
              <div className="arrow">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2%', position: 'relative' }}>
            <div style={{ width: '50px', height: '50px' }}>
              <CircularProgressbar
                value={66}
                text={`Scanning...`}
                styles={buildStyles({
                  pathColor: '#3498db',
                  textColor: '#3498db',
                  trailColor: '#f0f0f0',
                })}
              />
            </div>
          </div>
        )}

      </div>

      {showDialog && scanResult && (
         <DialogBox url={url}  onClose={() => setShowDialog(false)}>
          <div style={{ padding: '20px' }}>
            <h2>Scan Report</h2>
            <Bar data={data} options={options} />
            <div style={{ marginTop: '20px' }}>
              <h3>Recommendations & Countermeasures</h3>
              <ul>
                {scanResult.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogBox>
      )}
    </div>
  );
}
