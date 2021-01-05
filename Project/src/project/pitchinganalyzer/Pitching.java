package project.pitchinganalyzer;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class Pitching {

  public void recordGameData(String userName, String pitcherName, int throwcount, String variety, int speed, String result, String finish, int xPosition, int yPosition){
    String filename = "src/" + userName + pitcherName + "Archives.csv";

    try{
      FileWriter file = new FileWriter(filename, true);
      PrintWriter pw = new PrintWriter(new BufferedWriter(file));
      pw.println(throwcount + "," + variety + "," + speed + "," + result + "," + finish + ","+ xPosition + "," + yPosition + "\n");
      pw.close();
    }catch(IOException e){
      System.out.println(e);
    }
}

}
