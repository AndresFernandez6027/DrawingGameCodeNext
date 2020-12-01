let manager = new CanvasManager();

let db = firebase.database();
let myRef = db.ref('users/' + manager.myId);

myRef.onDisconnect().remove();

setInterval(() => {

	myRef.set(manager.getMyData());
}, 1);

db.ref('users').on('child_changed', (snapshot) => {
	let update = snapshot.val();
	let updates = Object.values(users);
	for (let i = 0; i<updates.length; i++) {
		let update = updates[i];
	if (update.id !== manager.myId) {
	manager.updateRemoteDisplay(update);
	}
}
});

db.ref('users').on('child_changed', (snapshot) => {
	let update = snapshot.val();
	if (update.id !== manager.myId) {
	manager.updateRemoteDisplay(update);
	}
});

db.ref('users').on('child_removed', (snapshot) => {
	let update = snapshot.val();
	if (update.id !== manager.myId) {
	manager.removeRemoteDisplay(update);
	}
});