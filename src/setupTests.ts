// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom';

// Mocking the Chrome storage API
const mockChrome = {
    storage: {
        local: {
            get: jest.fn((query, callback) => {
                const result = { 'flights': [] }; // Mock response
                callback(result);
            }),
            set: jest.fn()
        }
    },
    tabs: {
        create: jest.fn()
    }
};

// Define global chrome object
//global.chrome = mockChrome;