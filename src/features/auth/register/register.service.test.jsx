import { describe, test, expect } from "vitest"; 
describe("Register Service", () => { 
    test("Username không được rỗng", () => { 
        const username = "dungpham"; 
        expect(username).not.toBe(""); 
    }); 
    test("Password tối thiểu 6 ký tự", () => { 
        const password = "123456"; 
        expect(password.length).toBeGreaterThanOrEqual(6); 
    }); 
});