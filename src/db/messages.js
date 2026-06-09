import { mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const HISTORY_DIR = ".history";

if (!existsSync(HISTORY_DIR)) {
  mkdirSync(HISTORY_DIR, { recursive: true });
}

const filename = `${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
const filepath = join(HISTORY_DIR, filename);

const adapter = new JSONFile(filepath);
const db = new Low(adapter, { messages: [] });

await db.read();

export async function initMessage(systemPrompt) {
  if (db.data.messages.length === 0) {
    db.data.messages.push({ role: "developer", content: systemPrompt });
    await db.write();
  }
}

export async function addMessage(content, role = "user", tool_call_id = null) {
  if (tool_call_id != null) {
    db.data.messages.push({ role, content, tool_call_id });
  }
  else {
    db.data.messages.push({ role, content });
  }
  await db.write();
}

export async function addClientMessage(message) {
    db.data.messages.push(message)
}

export function getMessages() {
  return db.data.messages;
}