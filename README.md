# PulseAudit

PulseAudit is a web-based website auditing tool that analyzes any webpage URL and generates a technical and SEO snapshot.

The application fetches a webpage, processes its HTML content, and provides insights such as HTTP status, response time, page title, meta description, heading structure, missing image alt attributes, approximate word count, and website health indicators.

The goal of PulseAudit is to provide a simple and accessible way to understand the basic technical health and structure of a webpage.

---

## Features

- URL validation
- Website availability checking
- HTTP status detection
- Response time measurement
- Page title extraction
- Meta description extraction
- H1 heading count analysis
- Missing image alt attribute detection
- Approximate word count calculation
- Website health summary
- Error handling for invalid URLs, timeouts, and unsupported responses

---

## Tech Stack

**Backend**
- Python
- Flask
- Requests
- BeautifulSoup

**Frontend**
- HTML
- CSS
- JavaScript

**Testing**
- Pytest

**Deployment**
- Render

---

## Project Structure

```
PulseAudit/
│
├── app.py                 # Flask application and API routes
├── parser.py              # HTML parsing and analysis logic
├── requirements.txt       # Project dependencies
├── Procfile               # Deployment configuration
│
├── tests/
│   └── test_parser.py     # Parser unit tests
│
├── templates/
│   └── index.html         # Frontend page
│
└── static/
    ├── style.css          # Styling
    └── script.js          # Frontend interaction logic
```

---

# Installation

## Clone the repository

```bash
git clone <repository-url>
```

## Navigate to the project folder

```bash
cd PulseAudit
```

## Create a virtual environment

```bash
python -m venv venv
```

## Activate the virtual environment

Windows:

```bash
venv\Scripts\activate
```

## Install dependencies

```bash
pip install -r requirements.txt
```

## Run the application

```bash
python app.py
```

The application will run locally at:

```
http://127.0.0.1:5000
```

---

# API Contract

## Analyze Website Endpoint

### Endpoint

```
POST /analyze
```

### Request Body

```json
{
    "url": "https://example.com"
}
```

### Successful Response

```json
{
    "success": true,
    "report": {
        "status_code": 200,
        "response_time_ms": 1200,
        "page_title": "Example Domain",
        "meta_description": "Not Found",
        "h1_count": 1,
        "images_missing_alt": 0,
        "approximate_word_count": 21
    }
}
```

### Error Response

```json
{
    "success": false,
    "error": "Unable to fetch webpage"
}
```

The API handles invalid URLs, request failures, timeouts, and non-HTML responses without crashing.

---

# Testing

Parser functionality is tested using Pytest.

The tests cover:

- Successful HTML parsing
- Missing HTML elements
- Invalid or empty webpage content

Run tests using:

```bash
pytest
```

---

# Design Decisions

## 1. Separated Parsing Logic from Flask Routes

The webpage analysis logic was placed in a separate `parser.py` module instead of keeping all functionality inside `app.py`.

This improves code organization and makes individual parsing functions easier to test, maintain, and modify.

---

## 2. Used a JSON-Based API Architecture

The backend communicates with the frontend using structured JSON responses from the `/analyze` endpoint.

This keeps frontend rendering separate from backend processing and makes the application easier to extend with additional features.

---

## 3. Added Defensive Error Handling

The application handles invalid URLs, connection failures, timeouts, and unsupported webpage responses.

This prevents unexpected crashes and provides meaningful feedback to users when analysis cannot be completed.

---

# Future Improvements

If given additional time, the website health scoring system could be improved from a simple rule-based approach into a weighted scoring model.

Different metrics could have different importance levels, where factors such as website availability and response time contribute more heavily than smaller SEO factors. This would make the final health score more meaningful and actionable for users.

---

# AI Usage Disclosure

AI tools were used during development for debugging assistance, exploring implementation approaches, improving documentation structure, and resolving technical issues.

All final implementation decisions, code organization, testing, and project-specific choices were reviewed and completed by me.

---

# Live Demo

https://pulseaudit-15zh.onrender.com/

---

# GitHub Repository

https://github.com/KammyS-hub

---

<add-your-github-url>
