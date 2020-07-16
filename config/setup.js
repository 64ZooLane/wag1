const { accessSync, constants, readFileSync, writeFileSync} = require("fs");
let path = "./config/settings.json";
let data = {};

try {
    accessSync(path, constants.F_OK)
    data = JSON.parse(readFileSync(path));
} catch (e) {};

let defaultConfig = {prefix: "-", embedcolor: "BLUE", message: "wag1 {mention}", delay: 2000, blacklist: []};
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

let path2 = "./config/token.json";
let data2 = {};

try {
    accessSync(path2, constants.F_OK)
    data2 = JSON.parse(readFileSync(path2));
} catch (e) {};

if (!data2.token || Array.isArray(data2.token)) data2.token = "";

writeFileSync(path2, JSON.stringify(data2, null, 4));