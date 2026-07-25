# Page Pulse

Page Pulse is a web auditing tool that analyzes a webpage URL and generates a report containing technical and content-related insights.

The application fetches a webpage, parses its HTML content, and provides details such as response status, response time, page title, meta description, heading structure, missing image alt attributes, and approximate word count.

## Features

- URL validation
- Website response analysis
- HTTP status detection
- Response time measurement
- Page title extraction
- Meta description extraction
- H1 tag counting
- Missing image alt text detection
- Approximate word count calculation
- Error handling for invalid URLs, timeouts, and non-HTML pages


## Tech Stack

- Python
- Flask
- BeautifulSoup
- Requests
- HTML/CSS/JavaScript
- Pytest


## Project Structure
PagePulse/
│
├── app.py
├── parser.py
├── tests/
│ └── test_parser.py
├── templates/
│ └── index.html
├── static/
│ ├── style.css
│ └── script.js
└── requirements.txt


## Installation

Clone the repository:

```bash
git clone <repository-url>