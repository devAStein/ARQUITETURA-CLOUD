async function proxyRequest(res, requestPromise) {
  try {
    const response = await requestPromise;
    res.status(response.status).json(response.data);
  } catch (error) {
    const status = error.response?.status || 502;
    const reason = error.response?.data || error.message || "Proxy request failed";
    res.status(status).json({
      error: "BFF proxy error",
      reason
    });
  }
}

module.exports = { proxyRequest };
