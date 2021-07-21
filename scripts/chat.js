class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chat = db.collection("chat");
    this.unsub;
  }

  //adding new chat document to database
  async addChat(message) {
    //format a chat object
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    //save the chat document
    const response = await this.chat.add(chat);
    return response;
  }

  //setting up a real time listener to get new chats
  getChats(callback) {
    this.unsub = this.chat
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            //update ui
            callback(change.doc.data());
          }
        });
      });
  }
  //updating the username
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }

  //updating the room
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}
