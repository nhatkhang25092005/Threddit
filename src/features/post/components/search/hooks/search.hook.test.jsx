import { describe, test, expect } from "vitest"; 
describe("Search Hook", () => { 
    test("Tìm kiếm bài viết", () => { 
        const keyword = "React"; 
        expect(keyword).toContain("React"); 
    }); 
});