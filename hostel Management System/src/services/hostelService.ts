import { Resident } from '../model/residents.js';
import { Rooms } from "../model/rooms.js";
import { roomsAvailability } from "../data/roomsData.js";

export class hostelService{
    private rooms:Rooms[] = [];
    private resident:Resident[] = [];

    constructor(){
        this.loadData();
    }
    //web storage->browser gives storage of 5mb in json formate. This is also a web API
    //!This is for loading data
    loadData():void{
        const storedRoom=localStorage.getItem("rooms");
        const storedResidents = localStorage.getItem("residents");
        console.log(storedRoom);
        console.log(storedResidents);
        if(storedRoom){
            this.rooms = JSON.parse(storedRoom); 
        }else{
            this.rooms = roomsAvailability;
        }

        if(storedResidents){
            this.resident = JSON.parse(storedResidents);
        }else{
            this.resident = [];
        }
        console.log(this.rooms);
        
    }


    //! Getters for rooms and residents
    get getRooms(){
        return this.rooms;
    }
    get getResidents(){
        return this.resident;
    }


    //!Storing the data
    saveData(){
        localStorage.setItem("rooms",JSON.stringify(this.rooms));
        localStorage.setItem("residents",JSON.stringify(this.resident));
    }


    //!Add Resident
    addResident(name : string,age:number,phone:string,roomNumber:number,checkInDate:string){
       const room = this.rooms.find((r)=>r.roomNumber === roomNumber); //== for checking only value and === for checking both vlaues and types
       if(!room){
        throw new Error("Room doesn't exist");
       }else if(room.isOccupied){
        throw new Error("Room is already occupied");
       }

       const newResident : Resident = {
        id:Date.now().toString(),
        name:name,
        age:age,
        phone:phone,
        roomNumber:roomNumber,
        checkIndate:checkInDate,
       };
       this.resident.push(newResident);
       room.isOccupied = true;
       this.saveData();
       console.log(this.rooms);
       console.log(this.resident); 
    }

    //! Deleting Resident
    removeResident(residentId:string){
        const index = this.resident.findIndex((r)=>r.id === residentId);

        if(index===-1){
            throw new Error("Resident id doesn't exist");
        }

        const resident = this.resident[index];
        const room = this.rooms.find((r)=>r.roomNumber === resident.roomNumber);

        if(!room){
            throw new Error("Room doesn't exist");
        }
        room.isOccupied = false;
        this.resident.splice(index,1);
        this.saveData();
        console.log("Room freed successfully:", room);
    }

    //! Update Resident
   updateResident(residentId: string, updatedData: Partial<Resident>): void {

    const index = this.resident.findIndex(r => r.id === residentId);

    if (index === -1) {
        throw new Error("Resident not found");
    }

    const existingResident = this.resident[index];

    //  If room number is being changed
    if (updatedData.roomNumber !== undefined &&
        Number(updatedData.roomNumber) !== Number(existingResident.roomNumber)) {

        // Free old room
        const oldRoom = this.rooms.find(
            r => Number(r.roomNumber) === Number(existingResident.roomNumber)
        );

        if (oldRoom) {
            oldRoom.isOccupied = false;
        }

        // Check new room
        const newRoom = this.rooms.find(
            r => Number(r.roomNumber) === Number(updatedData.roomNumber)
        );

        if (!newRoom) {
            throw new Error("New room does not exist");
        }

        if (newRoom.isOccupied) {
            throw new Error("New room is already occupied");
        }

        // Occupy new room
        newRoom.isOccupied = true;
    }

    //  Update resident data
    this.resident[index] = { ...existingResident, ...updatedData };

    //  Save everything
    this.saveData();

    console.log("Resident updated properly");
}

    //! Get vaccant rooms
    getVaccentRooms(){
        return this.rooms.filter((r)=>!r.isOccupied);
    }


    //! get occupied rooms
    getOccupiedRooms(){
        return this.rooms.filter((r)=>r.isOccupied);
    }

    //! Rooms state
    getRoomState(){
        const total = this.rooms.length;
        const occupied = this.getOccupiedRooms().length;
        const result = total - occupied;

        return {total,occupied,result};
    }
}