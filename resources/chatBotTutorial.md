# IBM Watson Chatbot Tutorial

## Full-Length Tutorial
[Full-Length Tutorial](https://console.bluemix.net/docs/services/conversation/getting-started.html#gettingstarted)

## Condensed Tutorial on Basics
- Create a Watson Assistant by signing up/logging in to an IBM Cloud account (just do the free/lite version)
    - [Link To Sign Up](https://idaas.iam.ibm.com/idaas/mtfim/sps/authsvc?PolicyId=urn:ibm:security:authentication:asf:basicldapuser)
- Set up a workspace for where the chatbot would be contained
- Once inside your workspace, go to the Dialog tab. This is where you can edit what the user can enter and see.
    - On the right side of the screen, there is a "Try it" button that you can click to actually use the chatbot.
    - Watson is configured where as you update your chatbot, it will analyze what you've done, shown by the "Watson is learning" pop-up, and do some behind-the-scenes work to account for understanding grammatical errors and inputs that are "close enough" to what you chose.
- Inside the Dialog tab, there are a few different branches off of whatever you named your chatbot. These are things called intents that were imported from the Intents tab.
    - Intents are just what they might sound like -- what the computer thinks a user might be "intending" to say whenever they type inputs into the chat.
- Inside the Intents tab, you can look more into specific intents and how they work in the Watson Assistant.
    - Each intent is made up of lots of example sentences or phrases which Watson uses to find the general meaning behind what you are saying.
    - The more examples you provide, and the more ways you say it (ex. "Greetings", "Hello", "How are you doing?"
    "What's up?"), the more data Watson has to get the "intent" of what a user types in.
    - You can create your own intent here and add example phrases for whatever you have in mind.
- Going back to the Dialog tab, you can now add other intents by clicking on the triple dots of an existing intent and either adding a node above or below
    - You can call one of the intents from the Intents tab by writing #[intent_name] in the "If the bot recognizes..." space.
    - At this point, the intent is now added to your chatbot and after Watson learns about it, if you enter inputs similar enough to the example inputs, it will recognize the input.
- However, even though the intent is added to your project, there aren't any responses coded in yet. You can add these by clicking on the intent and clicking on "Add a response".
    - Responses can be text, images, links, etc., so feel free to try out whatever you want
- After you've added the intent and created responses, you can see what you did in the "Try it"
- These are just the basics, and if you want to dive deeper into this, you can follow the linked tutorial at the top