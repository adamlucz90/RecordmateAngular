module.exports = {
    // http://eslint.org/docs/user-guide/configuring#extending-configuration-files
    "extends": "eslint:recommended",

    "env": {
        "browser": true,
        "node": true
    },

    "plugins": [
        "standard",
        "promise"
    ],

    "globals": {
        "angular": true
    },

    // http://eslint.org/docs/rules/
    "rules": {
        "no-console": 0
    }

};