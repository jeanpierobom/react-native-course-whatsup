module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "import/no-named-as-default": 0,
      "import/no-named-as-default-member": 0,
      "react/prop-types": 0,

      "no-underscore-dangle": 0,
      "global-require": 0,
      "no-else-return": 0,
      "arrow-body-style": 0,
      "react/jsx-no-bind": 0,
      
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    }    
};