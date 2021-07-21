//dom queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

//adding a new chat to the database
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch((err) => console.log(err));
});

//update username
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //update name via the chatroom class
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  //resetting the form for later use
  newNameForm.reset();
  //show then hide the update message
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => (updateMssg.innerText = ""), 3000);
});

//update the chatroom
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});

//check local storage for username
const username = localStorage.username ? localStorage.username : "anonymous";

//class instancse
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("gaming", username);

//get chats and render
chatroom.getChats((data) => {
  chatUI.render(data);
});
