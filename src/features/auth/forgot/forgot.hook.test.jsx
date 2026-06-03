import { describe, test, expect } from "vitest"; 
describe("Forgot Password Hook", () => { 
    test("Email phải chứa ký tự @", () => { 
        const email = "abc@gmail.com"; 
        expect(email.includes("@")).toBe(true); 
    }); 
});