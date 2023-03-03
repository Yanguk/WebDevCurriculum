import * as wasm from "./rust_hash2_bg.wasm";
import { __wbg_set_wasm } from "./rust_hash2_bg.js";
__wbg_set_wasm(wasm);
export * from "./rust_hash2_bg.js";
