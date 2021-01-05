package project.pitchinganalyzer;

import java.nio.file.*;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.PrintWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;


public class User{

  public boolean registerUser(String name, String password){
    Path path = Paths.get("src/Users.csv");
    boolean judge = true;

    String str = path.toAbsolutePath().toString();

        System.out.println("pass : " + str);


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

    if(judge == true){
      try{
        FileWriter file = new FileWriter(str, true);
        PrintWriter pw = new PrintWriter(new BufferedWriter(file));
        pw.println(name + ","  +password+"\n");
        pw.close();
      }catch(IOException e){
        System.out.println(e);
      }
    }

    return judge;
  }

  public boolean authenticUser(String name, String password){
    Path path = Paths.get("src/Users.csv");
    boolean judge = false;

    try(BufferedReader reader = Files.newBufferedReader(path)){
    String line = "0";
    while((line = reader.readLine()) != null){
      String[] user = line.split(",",0);
      if(user[0].equals(name) && user[1].equals(password))
      judge = true;
    }
  }catch(IOException e){
      System.out.println(e);
    }

    return judge;
  }


}
