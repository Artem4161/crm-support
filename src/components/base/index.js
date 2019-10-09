class BaseComponent {
  sendResponse(res, content, message, code = 200) {
    const response = {
      content,
    };
    if (message) {
      response.message = message;
    }
    res.status(code);
    return res.json(response);
  }

  sendError(res, code, error, message) {
    const response = {
      content: null,
      error,
    };
    if (message) {
      response.message = message;
    }
    res.status(code);
    return res.json(response);
  }
}

module.exports = BaseComponent;
