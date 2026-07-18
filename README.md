BioMed Nexus AI

One Platform for Every Biomedical Engineer

An AI-powered web platform built for biomedical engineering students and professionals — combining a medical device reference library, an AI assistant, a troubleshooting decision-support tool, an equipment dashboard, and interview preparation, all in one place.
🔗 Live Demo: biomed-nexus-ai.vercel.app
✨ Features


📚 Medical Device Library — Working principles, key components, and clinical uses for devices across categories: Life Support, Diagnostic, Imaging, Orthopaedic Implants, Robotics, and Med-Surg equipment — including real-world manufacturers like Stryker, Zimmer Biomet, GE Healthcare, Siemens Healthineers, Medtronic, Mindray, Arthrex, and DePuy Synthes (J&J MedTech).
🤖 AI Assistant — A live chat assistant for device theory, calibration, and troubleshooting questions, available across multiple sections of the site.
🔧 Troubleshooting Assistant — An interactive decision-tree tool that walks through diagnosing common equipment faults, plus an AI chat for symptoms not covered by the tree.
📋 Equipment Dashboard — A mock hospital asset-management view showing device status, location, and calibration due dates.
🎓 Interview Hub — Curated interview questions plus a live AI Q&A session tuned as an interview coach for biomedical engineering candidates.



🛠️ Tech Stack


Frontend: Vanilla HTML, CSS, and JavaScript (single-page application, no framework overhead)
AI Backend: A serverless function (/api/chat.js) deployed on Vercel, acting as a secure proxy to an LLM API (Groq — Llama 3.3) so the API key is never exposed in the browser
Hosting: Vercel with GitHub-based CI/CD — every push to main auto-deploys
Design: Custom illustrated UI (cream/sage theme) with an animated live ECG waveform



📁 Project Structure

biomed-nexus-ai/
├── index.html        # Full front-end application (all pages/sections)
└── api/
    └── chat.js        # Serverless backend — proxies chat requests to the LLM API


🚀 Deployment

This project is deployed on Vercel, with the API key stored securely as an environment variable (GROQ_API_KEY) rather than in the code — so the AI assistant works publicly without exposing credentials in the browser.

To deploy your own copy:


Fork/clone this repository
Import it into Vercel
Add an environment variable GROQ_API_KEY with your own key from console.groq.com
Deploy 🎉



🎯 About This Project

Built as a portfolio project combining a biomedical engineering background with full-stack web development — from UI/UX design through to a working, deployed AI integration with a secure backend architecture.
📬 Contact
Feel free to reach out or connect if you'd like to discuss this project.
