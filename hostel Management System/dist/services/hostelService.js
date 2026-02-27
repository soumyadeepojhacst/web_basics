export class hostelService {
    constructor() {
        this.room = [];
        this.resident = [];
    }
    //web storage->browser gives storage of 5mb in json formate. This is also a web API
    loadData() {
        const storedRoom = localStorage.getItem("rooms");
        const storedResidents = localStorage.getItem("residents");
        console.log(storedRoom);
        console.log(storedResidents);
    }
}
