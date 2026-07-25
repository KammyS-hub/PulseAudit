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
            result.innerHTML = `<p>${data.error}</p>`;
            return;
        }

        const report = data.report;
        let score = 0;

if (report.status_code === 200) score++;
if (report.meta_description !== "Not Found") score++;
if (report.h1_count > 0) score++;
if (report.images_missing_alt === 0) score++;
if (report.approximate_word_count >= 100) score++;
if (report.response_time_ms < 2000) score++;

let healthMessage = "";

if (score >= 5) {
    healthMessage = "Excellent overall website health.";
} else if (score >= 3) {
    healthMessage = "Good website health with some areas for improvement.";
} else {
    healthMessage = "Several improvements are recommended.";
}

        result.innerHTML = `
            <h2>Audit Report</h2>

            <div class="report-grid">

                <div class="card">
                <h3>🟢 HTTP Status</h3>
                <p>${report.status_code} ${report.status_message}</p>
                <small>Website is reachable.</small>
                </div>

                <div class="card">
                <h3>⚡ Response Time</h3>
                <p>${report.response_time_ms} ms</p>
                <small>Lower response times generally improve user experience.</small>
                </div>

                <div class="card">
                    <h3>Page Title</h3>
                    <p>${report.page_title}</p>
                </div>

                \<div class="card">
               <h3>📝 Meta Description</h3>
               <p>${report.meta_description}</p>
               <small>${report.meta_description === "Not Found"
               ? "Missing meta description may reduce SEO effectiveness."
               : "Meta description detected."
               }</small>
               </div>

                <div class="card">
                    <h3>H1 Tags</h3>
                    <p>${report.h1_count}</p>
                </div>

                <div class="card">
                    <h3>Images Missing Alt</h3>
                    <p>${report.images_missing_alt}</p>
                </div>

                <div class="card">
                    <h3>Word Count</h3>
                    <p>${report.approximate_word_count}</p>
                </div>

            </div>
        `;

    } catch (error) {

        result.innerHTML = `
            <p>Something went wrong.</p>
        `;

        console.error(error);

    }

});