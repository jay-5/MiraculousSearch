import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [need, setNeed] = useState('');
  const [language, setLanguage] = useState('');
  const [platform, setPlatform] = useState('');
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    const response = await fetch('/api/generate-recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ need, language, platform }),
    });
    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <meta charset="utf-8" />
        <title>Software Tool Recommendation Chatbot</title>
        <link rel="stylesheet" href="styles.css" />
      </Head>
      <body>
        <h1>Software Tool Recommendation Chatbot</h1>
        <p>Enter your need, language, and platform to get a recommendation for a software tool:</p>
               <form id="tool-form" onSubmit={onSubmit}>
          <label htmlFor="need">Need:</label>
          <input
            type="text"
            id="need"
            name="need"
            required
            value={need}
            onChange={(event) => setNeed(event.target.value)}
          />
          <br />
          <label htmlFor="language">Language:</label>
          <input
            type="text"
            id="language"
            name="language"
            required
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          />
          <br />
          <label htmlFor="platform">Platform:</label>
          <input
            type="text"
            id="platform"
            name="platform"
            required
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
          />
          <br />
          <button type="submit" disabled={loading}>
            Get Recommendation
          </button>
        </form>
        <div id="recommendation">
          {loading && <p id="loading">Loading recommendation...</p>}
          {result && <p id="result">{result}</p>}
        </div>
      </body>
    </div>
  );
}