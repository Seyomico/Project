package project.pitchinganalyzer;

import java.util.List;
import java.util.ArrayList;
import java.nio.file.*;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.PrintWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Pitcher{

  public boolean registerPitcher(String name, String dexterity, String form, String[] ballType){
    boolean judge = true;
    Path path = Paths.get("src/Pitchers.csv");
    String str = path.toAbsolutePath().toString();

    try(BufferedReader reader = Files.newBufferedReader(path)){
    String line = "0";
    while((line = reader.readLine()) != null){
      String[] user = line.split(",",0);
      if(user[0].equals(name)){
        judge = false;
        break;
      }
    }
  }catch(IOException e){
      System.out.println(e);
      judge = false;
    }

    if(judge){
      try{
        FileWriter file = new FileWriter(str, true);
        PrintWriter pw = new PrintWriter(new BufferedWriter(file));
        pw.print(name + ","  +dexterity+ ","  +form+ ",");
        for(String type : ballType)
          pw.print(type + ",");
          pw.println("\n");
        pw.close();
      }catch(IOException e){
        System.out.println(e);
      }
    }

    return judge;
  }

  public List<String> getPitcherName(){
    Path path = Paths.get("src/Pitchers.csv");
    ArrayList<String> names  = new ArrayList<String>();

    try(BufferedReader reader = Files.newBufferedReader(path)){
    String line = "0";
    while((line = reader.readLine()) != null){
      String[] user = line.split(",",0);
      if(!user[0].equals(""))
        names.add(user[0]);
    }
  }catch(IOException e){
      System.out.println(e);
    }
    return names;
  }

  public List<String> getPitcherVariety(String pitcherName){
    Path path = Paths.get("src/Pitchers.csv");
    ArrayList<String> varietys  = new ArrayList<String>();

    String str = path.toAbsolutePath().toString();
   System.out.println("pass : " + str);

    try(BufferedReader reader = Files.newBufferedReader(path)){
    String line = "0";
    while((line = reader.readLine()) != null){
      String[] user = line.split(",",0);
      if(user[0].equals(pitcherName)){
        for(int i = 3; i < user.length; i++)
          varietys.add(user[i]);
        break;
      }
    }
  }catch(IOException e){
      System.out.println(e);
    }
    return varietys;
  }

  public String getPitcherDexterity(String pitcherName){
    Path path = Paths.get("src/Pitchers.csv");
    String dexterity = "right";

    String str = path.toAbsolutePath().toString();
   System.out.println("pass : " + str);

    try(BufferedReader reader = Files.newBufferedReader(path)){
    String line = "0";
    while((line = reader.readLine()) != null){
      String[] user = line.split(",",0);
      if(user[0].equals(pitcherName)){
        dexterity = user[1];
        break;
      }
    }
  }catch(IOException e){
      System.out.println(e);
    }
    return dexterity;
  }

}
