require('dotenv').config();
const app = require("./index")

const port = process.env.PORT

app.listen(port, ()=>{
  console.log(`server running on port ${port}`);
});