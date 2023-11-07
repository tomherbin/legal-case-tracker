<template>
    <div>
        <p>{{ isConnected ? '🟢' : '🔴' }} User</p>
    </div>
</template>
  
<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            isConnected: false,
            socket: null,
        };
    },
    created() {
        this.socket = io('http://localhost:3000', {
            reconnection: false // Prevent automatic reconnection attempts
        });

        // When the socket connects, update the connection status
        this.socket.on('connect', () => {
            this.isConnected = true;
        });

        // When the socket disconnects, update the connection status
        this.socket.on('disconnect', () => {
            this.isConnected = false;
        });

        // Handle connection errors (e.g., server not available)
        this.socket.on('connect_error', (error) => {
            this.isConnected = false;
            console.error('Connection Error:', error);
        });
    },
    beforeUnmount() {
        if (this.socket) {
            this.socket.disconnect();
        }
    },
};
</script>
  