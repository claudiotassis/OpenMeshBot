# OPENMESH-BOT
Telegram bot that interacts with the Directus' OPENMESH system. Its main objetive is to make it easier and faster to test, add or delete data from the system using a Telegram bot.

## Installation
1. Clone this repo
2. yarn

## Create new bot on Telegram
To use the Telegram Bot API, you first have to get a bot account by chatting with Telegram's @BotFather.
1. Open Telegram and search for @botfather
![Screenshot from 2022-12-28 11-19-48](https://user-images.githubusercontent.com/108586700/209826060-b0081c3e-6bc2-48de-b91e-cd029363aa4e.png)

2. Create a new bot by typing /newbot

![Screenshot from 2022-12-28 11-24-12](https://user-images.githubusercontent.com/108586700/209826653-4803c150-b7d2-4b9b-898c-5b0d256c6194.png)

3. follow @botfather's instruction to create your bot

![Screenshot from 2022-12-28 11-29-23](https://user-images.githubusercontent.com/108586700/209827356-4946541d-8b0f-4bad-a4c2-b4066c8292f0.png)

The given link is the bot you have created.
@BotFather will give you a token, something like 123456789:AbCdefGhIJKlmNoPQRsTUVwxyZ. Save it! you will use it in your .env file.
Type Help if you need to see all available commands.

4. Type /setcommands to create the blue menu with the commands that will be available for the bot. Click on the bot's name.
![Screenshot from 2022-12-28 11-38-28](https://user-images.githubusercontent.com/108586700/209828569-5642f40a-28a6-4549-a302-d919ba25dd6a.png)

5. Add the commands that will be used to interact with the Directus' OPENMESH system. In our case, we need two commands: /medidor and /openmesh

![Screenshot from 2022-12-28 11-42-44](https://user-images.githubusercontent.com/108586700/209829028-89106d66-06b5-4c85-80f9-6adbacd79ac0.png)

6. Open you bot on telegram. The link is on step 3 above.

7. As you press START, the bot will be all set, including the commands in the MENU.

![Screenshot from 2022-12-28 11-46-16](https://user-images.githubusercontent.com/108586700/209829470-e88d8682-91b9-4b8d-a786-b243b6b67cf7.png)


# Open your Directus project and generate the ACCOUNT TOKEN
1. Open users option and select the account which will be linked to the bot. You can create an account only for that if you want, setting up the privilegies under the option FUNCTIONS AND PERMISSIONS .
2. Generate a token and copy it.

![Screenshot from 2022-12-28 11-50-04](https://user-images.githubusercontent.com/108586700/209830209-b946ad4a-d249-4097-a69e-32316f3e6a88.png)

![Screenshot from 2022-12-28 12-00-13](https://user-images.githubusercontent.com/108586700/209831298-47f9400e-5b22-43e4-958f-c80925119606.png)

## EDIT THE FILE .ENV.EXAMPLE AND SAVE IT AS .ENV

![Screenshot from 2022-12-28 11-54-23](https://user-images.githubusercontent.com/108586700/209830554-349c5241-8e20-4331-94b1-9119dfcc1907.png)
1. Add your Directus Project's URL
2. Add your Directus TOKEN
3. Add you Telegram Bot TOKEN (step 3)
4. Add you telegram User Id. To get your Telegram userID, open telegram and look for /userinfobot. Open it and click START. It will give you the user infomration. Copy the ID and Paste it under the "TELEGRAM_BOT_USUARIOS of your .ENV file.
![Screenshot from 2022-12-28 12-12-45](https://user-images.githubusercontent.com/108586700/209833180-ab6bf96e-a061-4f6c-ba2b-3d69f9b0e1dd.png)

# RUN

## VScode's Terminal 
yarn

## Telegram bot
start

![Screenshot from 2022-12-28 12-21-01](https://user-images.githubusercontent.com/108586700/209834251-302ef160-ff39-444f-a7f7-a8d35b8883dc.png)

