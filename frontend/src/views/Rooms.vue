<template>
  <div class="rooms-wrapper">
    <h1>SALAS</h1>
    <label for="name">
      Nome:
      <input v-model="username" type="text" name="name" id="name" />
    </label>
    <div
      class="room"
      v-for="room in rooms"
      :key="room.id"
      @click="goToChat(room.id)"
    >
      <span>id: {{ room.id }}</span>
      <span>nome: {{ room.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
// Vue
import Vue from "vue";
import { Component } from "vue-property-decorator";

// Clients
import { HttpClient } from "../config";

// Models
import { Room } from "@/models";

@Component({})
export default class RoomView extends Vue {
  public httpClient: HttpClient;
  public rooms: Room[];
  public username: string;

  constructor() {
    super();
    this.httpClient = HttpClient.getInstance("http://localhost:3000");
    this.username = "";
    this.rooms = [];
  }

  // Methods:
  goToChat(roomId: number): void {
    this.$router.push({
      name: "chat",
      query: { room_id: roomId.toString(), username: this.username },
    });
  }

  // Life Cycles:
  async mounted(): Promise<void> {
    try {
      const result = await this.httpClient.request("/rooms");
      this.rooms = result.data;
    } catch (error: any) {
      alert(error.message);
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  width: 250px;
  height: 20px;
  margin-bottom: 1.5rem;
  outline: 0;
}

.room {
  width: 120px;
  height: 60px;
  background: #13ab42;
  color: white;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
}
</style>
