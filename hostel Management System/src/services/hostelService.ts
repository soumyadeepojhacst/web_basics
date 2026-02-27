import { Resident } from './../model/residents';
import { Rooms } from "../model/rooms";
import { roomsAvailability } from "../data/roomsData";

export class hostelService{
    private room:Rooms[] = [];
    private resident:Resident[] = [];

    constructor(){

    }
    //web storage->browser gives storage of 5mb in json formate. This is also a web API
    loadData():void{
        const storedRoom=localStorage.getItem("rooms");
        const storedResidents = localStorage.getItem("residents");
        console.log(storedRoom);
        console.log(storedResidents);
    }

}