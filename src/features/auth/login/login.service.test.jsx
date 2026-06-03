import { describe, test, expect } from "vitest"; 
describe("Login Service", () => { 
    test("Email hợp lệ", () => { 
        const email = "test@gmail.com"; 
        expect(email.includes("@")).toBe(true); 
    }); 
    test("Password không được rỗng", () => { 
        const password = "123456"; 
        expect(password.length).toBeGreaterThan(0); 
    }); 
});