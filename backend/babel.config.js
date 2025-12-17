export default {
    // This preset transpiles modern JavaScript features down 
    // to a format that Jest and older environments can understand.
    presets: [
        ['@babel/preset-env', { 
            targets: {
                node: 'current' // Target the version of Node.js you are running
            }
        }]
    ]
}