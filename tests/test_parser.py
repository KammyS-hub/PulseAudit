from bs4 import BeautifulSoup
import sys
import os

sys.path.append(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)

from parser import (
    get_meta_description,
    count_missing_alt_images,
    get_word_count
)


def test_meta_description():
    html = """
    <html>
        <head>
            <meta name="description" content="Test description">
        </head>
    </html>
    """

    soup = BeautifulSoup(html, "html.parser")

    result = get_meta_description(soup)

    assert result == "Test description"


def test_missing_alt_images():
    html = """
    <html>
        <body>
            <img src="image.png">
        </body>
    </html>
    """

    soup = BeautifulSoup(html, "html.parser")

    result = count_missing_alt_images(soup)

    assert result == 1


def test_word_count():
    html = """
    <html>
        <body>
            This is a sample webpage with words
        </body>
    </html>
    """

    soup = BeautifulSoup(html, "html.parser")

    result = get_word_count(soup)

    assert result == 7