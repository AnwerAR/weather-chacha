module.exports = {
    testEnvironment: 'jsdom',
    moduleDirectories: [
        'node_modules',
        'utils',
        __dirname,
    ],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    rootDir: '.',
};
