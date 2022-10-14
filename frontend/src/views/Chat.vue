<template>
  <div class="chat-wrapper">
    <span>{{ username }}</span>
    <div class="messages-wrapper">
      <p
        v-for="(message, index) in messages"
        :key="index"
        :class="username === message.username && 'message-author'"
      >
        {{ `${username === message.username ? "" : `${message.username}:`}` }}
        {{ message.message }}
      </p>
      <div class="message-input">
        <input
          v-model="message"
          type="text"
          name="name"
          id="name"
          @keyup.enter="sendMessage()"
        />
        <button @click="sendMessage()">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Vue
import Vue from "vue";
import { Component } from "vue-property-decorator";

// Clients
import io, { Socket } from "socket.io-client";

// Types
type MessageData = {
  username: string;
  message: string;
};

@Component({})
export default class ChatView extends Vue {
  public socket: Socket;
  public roomId: string;
  public username: string;
  public message: string;
  public messages: MessageData[];

  constructor() {
    super();
    this.roomId = this.$router.currentRoute.query.room_id as string;
    this.username = this.$router.currentRoute.query.username as string;
    this.socket = io("http://localhost:3000/room");
    this.message = "";
    this.messages = [];
  }

  // Methods:
  sendMessage(): void {
    const message: MessageData = {
      username: this.username,
      message: this.message,
    };
    this.socket.emit("send-message", message);
    this.messages.push(message);
    this.message = "";
  }

  // Life Cycles:
  beforeMount(): void {
    if (!this.roomId || !this.username) {
      this.$router.replace({ name: "home" });
    }
  }

  mounted(): void {
    this.socket.on("connect", () => {
      this.socket.emit("join-room", {
        username: this.username,
        roomId: this.roomId,
      });
    });
    this.socket.on(
      "receive-old-messages",
      (data: { messages: MessageData[] }) => {
        this.messages = data.messages;
        console.log("mensagens", this.messages);
      }
    );
    this.socket.on("receive-message", (message: MessageData) => {
      this.messages.push(message);
      console.log("mensagens", this.messages);
    });
  }
}
</script>

<style lang="scss" scoped>
.chat-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #2f2f30;
  padding: 0 2rem;

  span {
    align-self: flex-start;
    color: #fff;
    margin-top: 1rem;
    font-size: 1.25rem;
  }
}

.messages-wrapper {
  width: calc(min(100vw, 50rem));
  height: calc(100vh - 5rem);
  padding: 1.5rem;
  background: #444444;
  position: relative;
  color: #fff;
  display: flex;
  flex-direction: column;

  p {
    margin-bottom: 0.5rem;
    font-size: 1rem;

    &.message-author {
      align-self: flex-end;
    }
  }

  .message-input {
    width: 98%;
    height: 2rem;
    position: absolute;
    bottom: 0.5%;
    left: 1%;
    display: grid;
    grid-template-columns: 1fr 0.2fr;
    gap: 0.5rem;

    input {
      outline: 0;
      padding: 0 0.5rem;
    }

    button {
      cursor: pointer;
    }
  }
}
</style>
