<template>
    <div class="chat-window">
        <div class="chat-header">Chat with Bot</div>
        <div class="chat-body">
            <div class="message" v-for="(message, index) in messages" :key="index">
                <div :class="['message-bubble', message.isMine ? 'mine' : 'theirs']">
                    {{ message.content }}
                </div>
            </div>
        </div>
        <div class="chat-footer">
            <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
            <button @click="startVoiceChat">🎤</button> <!-- Microphone button -->
            <button @click="sendMessage">💬</button>
        </div>

        <voice-chat ref="voiceChat" @transcriptionUpdate="handleTranscriptionUpdate"
            @sendTranscription="handleSendTranscription" />


    </div>
</template>
<script>
import ChatAPI from '@/services/ChatAPI';
import VoiceChat from './VoiceChat.vue';

export default {
    components: {
        VoiceChat
    },
    data() {
        return {
            messages: [],
            newMessage: ''
        };
    },
    methods: {
        sendMessage() {
            if (!this.newMessage) return;
            this.addMessage(this.newMessage, true);
            ChatAPI.sendMessageToChat(this.newMessage)
                .then(response => {
                    this.addMessage(response.data.reply, false);
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });

            this.newMessage = '';
        },
        addMessage(content, isMine) {
            this.messages.push({
                content,
                isMine
            });
        },

        sendMessageToChat(message) {
            ChatAPI.sendMessageToChat(message)
                .then(response => {
                    this.addMessage(response.data.reply, false);
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });
        },
        handleTranscriptionUpdate(transcribedText) {
            this.newMessage = transcribedText;
        },
        startVoiceChat() {
            this.$refs.voiceChat.startListening();
        },
        handleSendTranscription(transcribedText) {
            if (transcribedText.trim().length > 0) {
                this.newMessage = transcribedText;
                this.sendMessage();
            }
        }
    },


};
</script>

<style scoped>
.chat-window {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    max-width: 80%;
    height: 400px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
}

.chat-header {
    background-color: #f5f5f5;
    padding: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: center;
    font-weight: bold;
}

.chat-body {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
}

.message {
    margin-bottom: 10px;
}

.message-bubble {
    padding: 5px 10px;
    border-radius: 15px;
    display: inline-block;
    max-width: 70%;
}

.mine {
    background-color: #dcf8c6;
    margin-left: auto;
}

.theirs {
    background-color: #fff;
    margin-right: auto;
}

.chat-footer {
    background-color: #f5f5f5;
    padding: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
}

.chat-footer input {
    flex: 1;
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
}

.chat-footer button {
    padding: 5px 15px;
    background-color: #007bff;
    border: none;
    border-radius: 20px;
    color: white;
    cursor: pointer;
}
</style>
