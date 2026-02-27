function assignRole(user, role) {
    return { user, role };
} //it is for assigning role
function canEdit(user) {
    return user.role == "admin" || user.role == "editor";
} //admin and editor only have permission of editing
function canView(user) {
    return true;
} //all users have peermission of view
function canDelete(user) {
    return user.role == "admin";
}
let user1 = { id: 1, name: "soumyadeep ojha", role: "admin" };
console.log(assignRole(user1, "admin"));
let user2 = { id: 1, name: "Sana mondal", role: "admin" };
console.log(assignRole(user2, "editor"));
console.log(canDelete(user1));
console.log(canEdit(user2));
export {};
