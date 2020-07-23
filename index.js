const { fork } = require("child_process");
const { readFileSync } = require("fs");
let tokens = [];

try
{
    tokens = readFileSync("./config/tokens.txt").toString().replace("\r", "").split("\n").filter(c => c);
}
catch (e)
{
    if (e.code == "ENOENT")
    {
        console.error("[ERR] File tokens.txt does not exist. Run setup.bat to continue");
    }
    else
    {
        console.error(e);
    }
    return process.exit();
}

if (tokens.length >= 1)
{
    console.log("Attempting startup on " + tokens.length + " account(s)");

    tokens.forEach((t, i) =>
    {
        setTimeout(() =>
        {
            console.log();
            console.log(`Starting instance ${i + 1} of ${tokens.length}`);
            fork("./bot.js", ["-token", t]);
        }, i * 4000)
    })
}
else
{
    console.error("[ERR] No token provided. Start setup.bat to automatically set your token, or refer to README.md for manual instructions");
    return process.exit();
}