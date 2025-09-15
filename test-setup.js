import "@testing-library/jest-dom/vitest";
import { afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from "@testing-library/react";

import { setupServer } from 'msw/node';
import { http } from 'msw';

import mockdata from "./mockdata";


// Define handlers using MSW 1.x
export const restHandlers = [
    http.get('https://opentdb.com/api.php', (_, res, ctx) => {
        return res(ctx.json(mockdata));
    }),
];

// Set up server
const server = setupServer(...restHandlers);

// Establish requests interception layer before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Clean up after all tests are done, preventing this
// interception layer from affecting irrelevant tests.
afterAll(() => server.close());


// Clean up handlers
afterEach(() => {
    server.resetHandlers();
    cleanup();
});