const app = require("./src/app");
require("dotenv").config();
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
	console.log(`Server Running on port: ${PORT}`);
});
