import test from "ava";
import { sum } from ".";

test("test sum", (t) => {
  t.is(sum(1, 2), 3);
});
