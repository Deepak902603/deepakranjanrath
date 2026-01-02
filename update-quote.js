const fs = require("fs");
const path = require("path");

async function updateQuote() {
  try {
    // Read JSON manually (important for GitHub Actions)
    const quotesPath = path.join(__dirname, "quotes.json");
    const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf-8"));

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const { quote, author } = quotes[randomIndex];

    const cardDesign = `
<!--STARTS_HERE_QUOTE_CARD-->
<p align="center">
  <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(
    author
  )}&quote=${encodeURIComponent(
      quote
    )}&theme=dark&bg_color=220a28&author_color=ffeb95&accent_color=c56a90">
</p>
<!--ENDS_HERE_QUOTE_CARD-->
`;

    const readmePath = path.join(__dirname, "README.md");
    let readmeContent = fs.readFileSync(readmePath, "utf-8");

    readmeContent = readmeContent.replace(
      /<!--STARTS_HERE_QUOTE_CARD-->[\s\S]*?<!--ENDS_HERE_QUOTE_CARD-->/,
      cardDesign.trim()
    );

    fs.writeFileSync(readmePath, readmeContent);
    console.log("✅ Quote updated successfully");
  } catch (error) {
    console.error("❌ Error updating quote:", error);
  }
}

updateQuote();
