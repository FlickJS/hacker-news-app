import { describe, it, expect } from "vitest";

describe("API tests", () => {
  let firstStoryId: number;

  it("fetches top stories", async () => {
    const response = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$priority"&limitToFirst=5'
    );
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.every((item: number) => typeof item === "number")).toBe(true);

    firstStoryId = data[0];
  });

  it("fetches a single story", async () => {
    if (!firstStoryId) {
      throw new Error("No story ID available from the top stories test.");
    }

    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${firstStoryId}.json`
    );
    const data = await response.json();

    expect(data).toMatchObject({
      by: expect.any(String),
      descendants: expect.any(Number),
      id: firstStoryId,
      score: expect.any(Number),
      time: expect.any(Number),
      title: expect.any(String),
      type: "story",
      url: expect.any(String),
    });

    if (data.kids) {
      expect(data.kids).toEqual(expect.any(Array));
    }
  });
});
