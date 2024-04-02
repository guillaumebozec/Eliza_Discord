Certainly, here's the README file in English:

---

# ChatGPT Discord Bot

This Discord bot utilizes ChatGPT to respond to messages in a specific channel. It can also perform actions such as adding roles to users.

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/guillaumebozec/Eliza_Discord.git
    ```

2. Install dependencies:

    ```
    npm install
    ```

## Configuration

1. In the project directory, create a `.env` file:

    ```
    TOKEN=MTIyNDYyODA1OTk0MDg0NzYxNg.G_uT1t.SkJqcKNo5faARYNpYZuT5SAX880TYdvTKylFXw
    CHANNEL_ID=CHANNEL_ID_HERE
    OPENAI_API_KEY=YOUR_CHATGPT_API_KEY
    ```

    Replace `CHANNEL_ID_HERE` with the ID of the Discord channel where the bot should respond.

2. Replace `YOUR_CHATGPT_API_KEY` with your own OpenAI API key.

## Usage

- To start the bot, run the following command:

    ```
    node index.js
    ```

- In the Discord chat of the specified channel, the bot will automatically respond to each message.

- To get help, type `!help` in the chat.

- To add a role to a user, type `!add @role @user` in the chat, replacing `@role` with the role to add and `@user` with the user to whom the role should be added.

## Contributing

Contributions are welcome! If you have any suggestions for improvement or issues to report, please open an issue or create a pull request.

## Disclaimer

Make sure to abide by Discord and OpenAI usage policies when using this bot.

--- 

Don't forget to replace `YOUR_CHATGPT_API_KEY`, `MTIyNDYyODA1OTk0MDg0NzYxNg.G_uT1t.SkJqcKNo5faARYNpYZuT5SAX880TYdvTKylFXw`, and `CHANNEL_ID_HERE` with your own values in the `.env` file.
