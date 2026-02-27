import { hostelService } from "./services/hostelService.ts";

let service = new hostelService();
console.log(service.loadData);