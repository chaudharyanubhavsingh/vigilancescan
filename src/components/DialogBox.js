import React, { useState ,useEffect} from 'react';
import { CircularProgress } from '@mui/material';
import ResultChart from './ResultChart';

export default function DialogBox({ url,scanResult, onClose }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
  
    const fetchData = async () => {
      setLoading(true);
      
      setTimeout(() => {
        // data for demonstration purposes
        const mockData = {
          vulnerabilities: {
            SQLInjection: 8,
            XSS: 4,
            CSRF: 2,
            BrokenAuth: 7,
            SecurityMisconfig: 5,
          },
        };
        setData(mockData);
        setLoading(false);
      }, 4000); // 3 seconds delay 
    };
    fetchData();
  }, [url]);
  return (
    <div
      className="dialog-box"
      style={{
        width: '80%',
        maxWidth: '900px', 
        height: '80%',
        maxHeight: '700px', 
        margin: 'auto', 
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden', 
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="dialog-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          zIndex: 2, 
        }}
      >
        <h2 style={{fontSize:"25px",marginLeft:"150px"}}> 
          Scanning: <span style={{ color: '#3498db' }}>{url}</span>
        </h2>
        <button
          onClick={onClose}
          style={{
            backgroundColor: '#ff4c4c',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 10px',
            cursor: 'pointer',
            zIndex: 2, 
          }}
        >
          Close
        </button>
      </div>
      {loading ? (
        <div style={{ position: 'relative', height: '100%' }}>
         
          <iframe
            src={url}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: 1, 
            }}
            title="Site Preview"
          ></iframe>
          
          <div
            className="loading-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute', 
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              zIndex: 2, 
            }}
          >
            <CircularProgress size={50} />
            <p style={{ marginTop: '20px', textAlign: 'center',color: '#3498db' }}>
              Scanning <span style={{ color: '#3498db' }}>{url}</span> for vulnerabilities. Please wait...
            </p>
          </div>
        </div>
      ) : (
        <div className="result-container" style={{ position: 'relative', height: '100%',overflow:"auto" }}>
          <ResultChart data={scanResult} />
        </div>
      )}
    </div>
  );
}
