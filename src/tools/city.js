import { z } from "zod";
import { defineTool } from "../utils/func-tool.js";
import { searchCity } from "../lib/qdrant.js";

async function search({ query, limit = 2 }) {
  return await searchCity(query, limit);
}

export const cityTool = defineTool({
  name: "search_city",
  description:
    "在 台灣城市資料庫中以語意搜尋對應城市",
  fn: search,
  parameters: z.object({
    query: z.string().describe("查詢內容，可以是城市描述、地形、歷史或產業"),
    limit: z.number().default(2).describe("回傳筆數上限，預設 2"),
  }),
});