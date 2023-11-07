<template>
    <div>

    </div>
</template>
  
<script>
export default {
    data() {
        return {
            recognition: null,
            transcribedText: '',
            botReply: '',
            listening: false
        };
    },
    methods: {
        startListening() {
            const SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                this.recognition = new SpeechRecognition();
                this.recognition.continuous = true;
                this.recognition.interimResults = true;

                this.recognition.onresult = event => {
                    let interim_transcript = '';
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            this.transcribedText += event.results[i][0].transcript;
                        } else {
                            interim_transcript += event.results[i][0].transcript;
                        }
                    }
                    this.$emit('transcriptionUpdate', this.transcribedText + interim_transcript);
                };

                this.recognition.onerror = event => {
                    console.error(event.error);
                };

                this.recognition.onend = () => {
                    // Start a timer when the recognition ends
                    this.sendTimer = setTimeout(() => {
                        this.$emit('sendTranscription', this.transcribedText);
                        this.transcribedText = ''; // Reset the transcript after sending
                    }, 1000); // 2 seconds of silence
                    this.listening = false;
                };

                this.recognition.start();
                this.listening = true;
            } else {
                console.error('Speech recognition not supported in this browser.');
            }
        },
        stopListening() {
            if (this.recognition) {
                this.recognition.stop();
                clearTimeout(this.sendTimer); // Clear the timer when manually stopped
                this.listening = false;
            }
        },
        destroyed() {
            if (this.sendTimer) {
                clearTimeout(this.sendTimer);
            }
        },
        speak(message) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(message);
            synth.speak(utterance);
        }
    }
};
</script>
  