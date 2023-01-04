"use strict";
(() => {
var exports = {};
exports.id = 422;
exports.ids = [422];
exports.modules = {

/***/ 118:
/***/ ((module) => {

module.exports = require("openai");

/***/ }),

/***/ 183:
/***/ ((module) => {

module.exports = require("regexp-tree");

/***/ }),

/***/ 875:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const { Configuration , OpenAIApi  } = __webpack_require__(118);
const { search  } = __webpack_require__(183);
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(req, res) {
    const { need , language , platform  } = req.body;
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(need, language, platform),
        temperature: 0.6,
        max_tokens: 2048
    });
    res.status(200).json({
        result: parseResponse(completion.data.choices[0].text)
    });
}
function generatePrompt(need, language, platform) {
    return `suggest a software tool that can help with ${need} and is available for ${platform} and written in ${language}.`;
}
function parseResponse(response) {
    // Extract the recommended tool from the chatbot's response
    const tool_pattern = "recommend (.*?) for";
    const tool_match = search(tool_pattern, response);
    if (tool_match) {
        return tool_match[1];
    } else {
        return "I could not suggest a tool for this need.";
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(875));
module.exports = __webpack_exports__;

})();