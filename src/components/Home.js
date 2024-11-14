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

  const handleScan = async () => {
    if (url) {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8080/api/v1/scanner/vulnerabilities?url=${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to scan the website');
        }
        setShowDialog(true);
        const result = await response.json();

        setScanResult(result);
        
      } catch (error) {
        console.error('Error scanning the URL:', error);
        alert('Failed to scan the URL');
      } finally {
        setLoading(false);
      }
    }
  };

  const getBarColor = (percentage) => {
    if (percentage > 70) return '#ff4c4c'; // Critical vulnerabilities
    if (percentage > 50) return '#ffc107'; // High vulnerabilities
    return '#4caf50'; // Low/medium vulnerabilities
  };

  const data = scanResult && scanResult.vulnerabilities ? {
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
                  trailColor: '#eee',
                })}
              />
            </div>
          </div>
        )}

        {showDialog && scanResult && (
          <DialogBox url={url}  scanResult={scanResult} title={`Scan Result for ${scanResult.targetURL}`} onClose={() => setShowDialog(false)}>
            <div>
              <h3>Vulnerabilities Severity</h3>
              <Bar data={data} options={options} />

            
              <h3>Summary</h3>
              <p>Critical: {scanResult.criticalVulnerabilities}</p>
              <p>High: {scanResult.highVulnerabilities}</p>
              <p>Medium: {scanResult.mediumVulnerabilities}</p>
              <p>Low: {scanResult.lowVulnerabilities}</p>
              <p>Scan Date: {scanResult.scanDate}</p>
            </div>
          </DialogBox>
        )}
      </div>
    </div>
  );
}
