
type ChatMessages = Array<ChatObject>;

type ChatRole = "user" | "system" | "assistant";

type ChatObject = {
	role: ChatRole,
	content: string,
};

export class OpenAIChat {
	public messages: ChatMessages = [];

	// Alias for setSystemChat()
	addSystemChat(content: string): void {
		return this.setSystemChat(content);
	}

	setSystemChat(content: string): void {
		if(!this.messages.length) {
			this.addChat("system", content);
			return;
		}
		
		this.messages[0].content = content;
	}

	addUserChat(content: string): ChatObject {
		return this.addChat("user", content);
	}

	addAssistantChat(content: string): ChatObject {
		return this.addChat("assistant", content);
	}

	private addChat(role: ChatRole, content: string): ChatObject {
		if(role !== "system" && !this.messages.length) {
			this.setSystemChat("React to the conversation based on your best interpretation of what is desired by the user.");
		}
		
		const chatObject: ChatObject = {
			role: role,
			content: content
		};
		
		this.messages.push(chatObject);
		
		return chatObject;
	}
}
