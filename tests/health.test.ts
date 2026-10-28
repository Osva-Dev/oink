import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/config/app.js"

describe("GET /health", () => {
  it("responde ok", async () => {
    const res = await request(createApp()).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});