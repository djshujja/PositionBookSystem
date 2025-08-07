// jest.setup.ts
import "@testing-library/jest-dom";

// disable MUI ripples
jest.mock("@mui/material/ButtonBase/TouchRipple", () => () => null);

// polyfill TextEncoder/TextDecoder (needed by react-router-dom)
const util = require("util");
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;
