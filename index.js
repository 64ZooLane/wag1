const { fork } = require("child_process");
let { token } = require("./config/token.json");

if (token[0])
{
    token.forEach((t, i) =>
    {
        setTimeout(() =>
        {
            fork("./bot.js", ["-token", t]);
        }, i * 4000)
    })
}
else if (typeof token == "string")
{
    fork("./bot.js", ["-token", token]);
}
else
{
    return console.error("[ERR] Provided token is invalid or does not exist");
}