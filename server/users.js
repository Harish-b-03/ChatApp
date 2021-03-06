const users = [];

const addUser = ( id, name, room ) => {

    console.log(`hii ${name}, ${room}`)
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser){
        return { error : "Username is taken"};
    }

    const user = { id, name, room };

    users.push(user);
    users.map((user)=>{console.log(`User ${user.id} ${user.name} ${user.room}`)})
    return { user }
}

const deleteUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        console.log(`${id} ${users[index].name} Removed`)
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room == room);

module.exports = { addUser, deleteUser, getUser, getUsersInRoom}