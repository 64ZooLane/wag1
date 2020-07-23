const { fork } = require("child_process");
const { readFileSync } = require("fs");
let tokens = [];

try
{
    tokens = readFileSync("./config/tokens.txt").toString().replace("\r", "").split("\n").filter(c => c);
}
catch (e)
{
    console.error(e);
    return process.exit();
}

if (tokens.length >= 1)
{
    console.log("Attempting startup on " + tokens.length + " account(s)")

    tokens.forEach((t, i) =>
    {
        setTimeout(() =>
        {
            fork("./bot.js", ["-token", t]);
        }, i * 4000)
    })
}
else
{
    console.error("[ERR] No token provided, run ./config/token.exe to automatically set your token or refer to README.md to manual setup");
    return process.exit();
}