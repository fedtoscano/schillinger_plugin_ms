import Pitch from "./Pitch";
import Duration from "./Duration";

class Note{
  constructor(pitch, duration){
    if(!(pitch instanceof Pitch))
      throw new Error ("Invalid pitch");
    if(!(duration instanceof Duration))
      throw new Error ("Invalid duration");

    this.pitch = pitch;
    this.duration = duration;
  }
}
