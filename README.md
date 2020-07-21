## Table of contents
- [Changelog](#changelog)
- [About](#about)
- [Installation](#installation)
- [Example Usage](#example-usage)
- [Access Token](#access-token)
- [Help](#help)

## Changelog

UPDATE: (v1.0.3) 21st July 2020 - Added support for starting multiple bot instances.
To run multiple at once, change the token value to an array in the ./config/token.json file and add each token to it.

UPDATE: (v1.0.2) 17th July 2020 - Added token.exe in the config folder to copy your token to the clipboard

BUG FIX: (v1.0.1) 16th July 2020 - Regular wag1 command no longer ghost pings

RELEASE: (v1.0.0) 16th July 2020 - First Release

## About

This tool was created to have some fun with discord's api for the final months of selfbots existing :(

NOTE: NodeJS is required to run the bot. [NodeJS](https://nodejs.org/en/)

## Installation

Run the setup.bat file in the main directory to create the config files and download all required packages.

If you are missing this file, open a terminal and execute `npm run setup`

Navigate to config/token.json and add your user token.
If you do not know how to access your user token, follow this link [Access Token](#access-token)

## Example Usage

`-add blacklist 731918654685446226 731918655331238004 731918655776096346`
`-remove blacklist 731918655331238004 731918655776096346`

You can provide as many arguments to add as you want. The same goes for removing items.
When using the -add command, any items that already exist in the array will be filtered to
prevent duplicates. And any items which do not exist when attempting to remove items will 
also be ignored.

`-set embedcolor BLUE`
`-set delay 2000`
`-set message wag1 {mention}! what are the chances of seeing you in {guildname} :o`

The embedcolor setting supports hex colour codes and some preconfigured colours such
as RED, GREEN, BLUE, ORANGE etc.

The delay setting is the amount of time waited in milliseconds before each wag1 message is sent.
While it is possible to decrease the value to speed up the process, I would discourage going
below 2000 ms as it could cause your account to get terminated by discord for sending too many API requests.

The wag1 message currently has 5 preconfigured placeholders which can be accessed by typing one of
the following words inside of curly brackets {}. mention, username, nickname, channelname and guildname
For example, the default message is "wag1 {mention}" which would look like this https://prnt.sc/tiowvn

`-ghost @0.o#5319`
`-wag1 600811457331986582`

You can provide either a user mention or user id for both the wag1 and ghost commands. Both commands
will post the configured message in every mutual channel you and the target user can both read and
write messages in. However unlike the regular wag1 command, the ghost command will delete the message
after it is posted to ghost ping them in that channel.

Any guilds, categories or channels in the blacklist will be ignored when wag1'ing or ghosting somebody.
If you you believe some channels are not being processed when running the command, it is most likely
a problem with user caching. For the time being just send them a dm and it should fix it. (Will try and
find a permanent fix for this later).

`-mutual 600811457331986582`

The mutual command can also take either a mention or user id. It will display all mutual channels between
you and the user and will take the blacklist into consideration when filtering the channels.

Like with the wag1 and ghost command, the caching issue will also apply here. However from what I've noticed
while testing, as long as you've had atleast one dm between eachother at any point in time, it should begin
detecting all channels every time (Same goes for the wag1 and ghost command).

`help wag1`
`help 2`

The help command takes two optional arguments, page number and command. `help {command}` will display
information such as aliases, examples, notes, descriptions etc for the specified command. Providing a
page number will take you to the specified page in the command list (Not very useful rn though as there are 
currently only 8 commands as of v1.0.0). Finally, if you do not provide a page or command argument, it will
default by showing you page 1 of the command list.

## Access Token

1) Open the config folder and run the token.exe file
NOTE: Will copy your token to your clipboard
2) Continue from step 12 onwards.

Alternatively:

1) Open Discord on your browser or desktop.
2) Press CTRL + Shift + I to open the page source.
3) Select the Network button in the top bar.
4) Filter by ALL (default)
5) Press CTRL + R - This will reload your discord.
6) Type `science` into the filter.
7) Select the one nearest the top.
8) Press the button named Headers
9) Scroll down to the Request Headers
10) Find "authorization" in the list.
NOTE: It is in alphabetical order starting from A

11) Copy your authorization token
12) Navigate to ./config/token.json
13) Submit your token you just copied as the value in the token file
NOTE: Token value can be changed to an array to start multiple bot instances

## Help

If you need support setting up the bot you can contact my discord 0.o#5319
or leave an issue on the github page. https://github.com/64ZooLane/wag1/issues
