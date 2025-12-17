export default {

    // Explicitly map the transformer for .js files to babel-jest
    // This is necessary when running in ESM mode.
    transform: {
        '^.+\\.js$': 'babel-jest',
    },

    // Tell Jest to apply Babel to these specific node_modules.
    // This forces transformation of modern packages like uuid and the AWS mocks.
    transformIgnorePatterns: [
        "/node_modules/(?!(uuid|@aws-sdk|aws-sdk-client-mock|aws-sdk-client-mock-jest|tslib)/)"
    ],
    
    // Handle imports without file extensions (e.g., import { foo } from './bar')
    moduleNameMapper: {
        // This regex ensures imports like './s3Service' correctly resolve to './s3Service.js'
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
}