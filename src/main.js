import { input } from "@inquirer/prompts";
import { searchCity } from "./lib/qdrant.js";
import { spinner } from "./utils/spinner.js";

try {
  while (true) {
    const query = (
      await input({ message: "請輸入要搜尋的城市內容：" })
    ).trim();

    if (query === "") continue;
    if (query.toLowerCase() === "exit") {
      console.log("謝謝您的提問，再見");
      break;
    }

    const spin = spinner("搜尋中...").start();
    const results = await searchCity(query, 2);
    spin.stop();

    for (const [i, r] of results.entries()) {
      console.log(`\n${i + 1}. ${r.title} (${r.type})`);
      console.log(`   分數：${r.score.toFixed(3)}`);
      console.log(`   描述：${r.description}`);
    }
    console.log();
  }
} catch (err) {
  if (err.name === "ExitPromptError") {
    console.log("\n謝謝您的提問，再見");
  } else {
    throw err;
  }
}