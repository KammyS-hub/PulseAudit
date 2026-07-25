const button = document.getElementById("analyzeBtn");
const urlInput = document.getElementById("urlInput");
const result = document.getElementById("result");


button.addEventListener("click", async () => {

    const url = urlInput.value.trim();

    if (!url) {
        result.innerHTML = "<p>Please enter a URL.</p>";
        return;
    }

    result.innerHTML = "<p>Analyzing...</p>";

    try {

        const response = await fetch("/analyze", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                url: url
            })

        });


        const data = await response.json();


        if (!data.success) {

            result.innerHTML = `
                <p>${data.error}</p>
            `;

            return;
        }


        const report = data.report;


        result.innerHTML = `

            <h2>Analysis Report</h2>

            <p><b>Status:</b> 
            ${report.status_code} ${report.status_message}</p>

            <p><b>Response Time:</b>
            ${report.response_time_ms} ms</p>

            <p><b>Page Title:</b>
            ${report.page_title}</p>

            <p><b>Meta Description:</b>
            ${report.meta_description}</p>

            <p><b>H1 Count:</b>
            ${report.h1_count}</p>

            <p><b>Images Missing Alt:</b>
            ${report.images_missing_alt}</p>

            <p><b>Approximate Word Count:</b>
            ${report.approximate_word_count}</p>

        `;


    } catch (error) {

        result.innerHTML = `
            <p>Something went wrong.</p>
        `;

    }

});