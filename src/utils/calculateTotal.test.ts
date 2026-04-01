import { describe, it, expect } from "vitest";
import { calculateTotal } from "./calculateTotal";

describe("calculateTotal", () => {
  it("应该正确计算由空格、换行或逗号分隔的金额总和", () => {
    const input = "1.5, 2.5\n3";
    // 1.5 + 2.5 + 3 = 7
    expect(calculateTotal(input)).toBe(7);
  });

  it("应该自动跳过无效的数字字符串", () => {
    const input = "1.0, invalid_amount, 2.0";
    // 1.0 + 2.0 = 3.0
    expect(calculateTotal(input)).toBe(3);
  });

  it("处理空输入应返回 0", () => {
    expect(calculateTotal("")).toBe(0);
    expect(calculateTotal("  \n  ")).toBe(0);
  });

  it("应该正确处理多个分隔符", () => {
    const input = "10,,, 20\n\n30";
    expect(calculateTotal(input)).toBe(60);
  });
  it("应该正确处理无效", () => {
    const input = "10three,,, 20\n\n30";
    expect(calculateTotal(input)).toBe(60);
  });
});
