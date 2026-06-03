import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

function Notification() {
    return <h1>Thông báo mới</h1>;
}

describe("Notification Component", () => {

    test("Hiển thị thông báo", () => {

        render(<Notification />);

        expect(
            screen.getByText("Thông báo mới")
        ).toBeTruthy();

    });

});