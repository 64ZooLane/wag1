const { accessSync, constants, readFileSync, writeFileSync} = require("fs");
const { execFile } = require("child_process");
let path = "./config/settings.json";
let data = {};

try {
    accessSync(path, constants.F_OK)
    data = JSON.parse(readFileSync(path));
} catch (e) {};

let defaultConfig = {prefix: "-", embedcolor: "BLUE", message: "wag1 {mention}", delay: 2000, blacklist: ["731918654685446226"]};
let entries = Object.entries(defaultConfig);

function defualtSetting(data, setting) {
    data[setting[0]] = defaultConfig[setting[0]];
}

for (setting of entries) 
{
    if (Array.isArray(setting[1])) {
        if (Array.isArray(data[setting[0]])) {
            if (!data[setting[0]][0]) defualtSetting(data, setting);
        } else defualtSetting(data, setting);
    } else {
        if (Array.isArray(data[setting[0]])) defualtSetting(data, setting);
        else if (!data[setting[0]]) defualtSetting(data, setting);
    }
}

writeFileSync(path, JSON.stringify(data, null, 4));

ask();

function ask()
{
    console.log("Would you like to automatically fetch and set all your user tokens? (y/n)")

    process.stdin.resume();
    process.stdin.once("data", (data) =>
    {
        process.stdin.pause();

        data = data.toString().toLowerCase().replace("\r\n", "");

        if (data == "n")
        {
            console.log();
            return process.exit();
        }
        else if (data == "y")
        {
            execFile("./config/token.exe", ["-cmd"], (err, stdout, stderr) =>
            {
                if (err)
                {
                    throw err;
                }
                console.error(stdout)
            });
        }
        else
        {
            return ask();
        }
    })
}
