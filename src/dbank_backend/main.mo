import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

persistent actor DBank {
  var startTime : Int = Time.now();
  Debug.print(debug_show(startTime));

  var currentValue : Float = 300.0;

  public func deposit(amount : Float){
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdraw(amount : Float){
    let tmpVal : Float = currentValue - amount;
    if (tmpVal >= 0.0){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else{
      Debug.print("Insufficient funds");
    }
    
  };

  public query func checkBalance() : async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNaS = currentTime - startTime;
    let timeElapsedS = timeElapsedNaS / 1000000000;
    currentValue := currentValue * (Float.pow(1.0 + 0.000001, Float.fromInt(timeElapsedS)));
    startTime := currentTime;
  };

}