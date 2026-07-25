from bs4 import BeautifulSoup
import requests
import time
from flask import Flask, render_template, request, jsonify
import requests
from parser import analyze_page
from urllib.parse import urlparse

app = Flask(__name__)


def is_valid_url(url):
    parsed = urlparse(url)

    return (
        parsed.scheme in ["http", "https"]
        and parsed.netloc
    )


def fetch_page(url):
    start_time = time.time()

    response = requests.get(
        url,
        timeout=30,
        headers={
            "User-Agent": "Mozilla/5.0"
        }
    )

    response_time = round(
        (time.time() - start_time) * 1000
    )

    return response, response_time


def get_meta_description(soup):
    meta = soup.find(
        "meta",
        attrs={"name": "description"}
    )

    if meta and meta.get("content"):
        return meta["content"].strip()

    return "Not Found"


def count_missing_alt_images(soup):
    images = soup.find_all("img")

    count = 0

    for image in images:
        alt = image.get("alt")

        if not alt or alt.strip() == "":
            count += 1

    return count


def get_word_count(soup):
    text = soup.get_text(separator=" ")

    return len(text.split())


def analyze_page(url):
    response, response_time = fetch_page(url)

    content_type = response.headers.get(
        "Content-Type",
        ""
    )

    if "text/html" not in content_type.lower():
        raise ValueError(
            "The URL does not contain an HTML page."
        )

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    title = "Not Found"

    if soup.title and soup.title.string:
        title = soup.title.string.strip()

    return {
        "status_code": response.status_code,
        "status_message": response.reason,
        "response_time_ms": response_time,
        "page_title": title,
        "meta_description": get_meta_description(soup),
        "h1_count": len(soup.find_all("h1")),
        "images_missing_alt": count_missing_alt_images(soup),
        "approximate_word_count": get_word_count(soup)
    }


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()

        if not data or "url" not in data:
            return jsonify({
                "success": False,
                "error": "URL is required."
            }), 400

        url = data["url"].strip()

        if not is_valid_url(url):
            return jsonify({
                "success": False,
                "error": "Please enter a valid URL."
            }), 400

        report = analyze_page(url)

        return jsonify({
            "success": True,
            "report": report
        })

    except requests.exceptions.Timeout:
        return jsonify({
            "success": False,
            "error": "The website took too long to respond."
        }), 408

    except requests.exceptions.ConnectionError:
        return jsonify({
            "success": False,
            "error": "Unable to connect to the website."
        }), 400

    except ValueError as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400

    except Exception as e:
        return jsonify({
           "success": False,
           "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)