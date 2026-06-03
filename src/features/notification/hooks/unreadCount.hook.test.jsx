import { describe, test, expect } from "vitest"; 
describe("Unread Notification Count", () => { 
    test("Đếm số thông báo chưa đọc", () => { 
        const notifications = [ 
            { read: false }, 
            { read: false }, 
            { read: true } 
        ]; 
        const unread = notifications.filter( 
            item => !item.read 
        ); 
        expect(unread.length).toBe(2); 
    }); 
});