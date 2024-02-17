const app = require("./api/server");

const port = process.env.port || 8000;

app.listen(port, () => console.log(`*** Server listening on port ${port} ***`));
