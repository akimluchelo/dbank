import Debug "mo:base/Debug"

persistent actor DBank{
  transient var currentValue : Nat = 300;

  system func postupgrade(){
    currentValue := 100;
    Debug.print("Hello Akim");
  }

}