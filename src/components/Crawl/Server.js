const express = require("express");
const { getHTML } = require("./crawl.js");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const cron = require("node-cron");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function handleAsync(){
    const totalCommit=await getHTML();

    console.log(totalCommit);
    return totalCommit;
}
cron.schedule("*/1 * * * *", async () => {
    console.log("running a task every two minutes");
    await handleAsync();
});
app.get("/api/crwal", async (req, res) => {
    const text = await handleAsync();
    var accumulate = text[0];

    res.send([
        {
            id: 1,
            accumulate,
        },
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
