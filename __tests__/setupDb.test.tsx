import { setupDb } from '../src/db/index'; // Adjust path if needed

// Mock postgres-js and drizzle
const mockDrizzle = jest.fn(() => ({ __mock: 'drizzle instance' }));
const mockPostgres = jest.fn(() => ({ __mock: 'postgres client' }));

jest.mock('drizzle-orm/postgres-js', () => ({
    drizzle: mockDrizzle,
}));
jest.mock('postgres', () => {
    return jest.fn(() => mockPostgres());
});

describe('setupDb', () => {
    afterEach(() => {
        jest.clearAllMocks();
        delete process.env.DATABASE_URL;
        // Clear the cached instance
        jest.resetModules(); // Required to reset `dbInstance` between tests
    });

    test('throws error if DATABASE_URL is not set', () => {
        expect(() => setupDb()).toThrow("DATABASE_URL is not set.");
    });

    test('returns a drizzle instance and reuses it on second call', () => {
        process.env.DATABASE_URL = 'postgres://user:pass@localhost:5432/db';

        const db1 = setupDb();
        const db2 = setupDb();

        expect(mockPostgres).toHaveBeenCalledTimes(1);
        expect(mockDrizzle).toHaveBeenCalledTimes(1);
        expect(db1).toBe(db2);
        expect(db1).toEqual({ __mock: 'drizzle instance' });
    });
});
