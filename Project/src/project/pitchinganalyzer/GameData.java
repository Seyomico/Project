package project.pitchinganalyzer;

import java.io.File;
import java.util.List;
import java.util.ArrayList;
import java.nio.file.*;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.PrintWriter;
import java.io.FileWriter;
import java.io.IOException;

public class GameData{
  private String mark = "M4RK";

  public boolean recordGameData(String userName, String pitcherName, String[] runner, String batter, int out){
    boolean bool = true;

    String filename = "src/" + userName + pitcherName + "Archives.csv";
    File newfile = new File(filename);
    try{
    newfile.createNewFile();
    }catch(IOException e){
      System.out.println(e);
    }


    try{
      FileWriter file = new FileWriter(filename, true);
      PrintWriter pw = new PrintWriter(new BufferedWriter(file));
      pw.print("\n" + mark + ",");

      for(String str : runner)
      pw.print(str + ",");

      pw.print(batter + "," + out + "\n");
      pw.close();
    }catch(IOException e){
      System.out.println(e);
      bool = false;
    }

    return bool;
}

  public List<String[]> getGameData(String userName, String pitcherName, int selectNumber){
    String filename = "src/" + userName + pitcherName + "Archives.csv";
    Path path = Paths.get(filename);
    List<String[]> datas = new ArrayList<String[]>();

    try(BufferedReader reader = Files.newBufferedReader(path)){
    String line = "0";
    String[] tmp;
    int countNumber = 0;
    int flag = 0;

    while((line = reader.readLine()) != null){
      tmp = line.split(",", 0);

      if(tmp[0].equals("M4RK")){
        countNumber++;
        if(countNumber == selectNumber){
          datas.add(tmp);
          while((line = reader.readLine()) != null){
            tmp = line.split(",", 0);

            if(tmp[0].equals("M4RK")){
              flag++;
              break;
            }

            else if(!tmp[0].equals("")){
              datas.add(tmp);
            }
          }
        }
      }

      else if(flag > 0)
      break;
    }
  }catch(IOException e){
      System.out.println(e);
    }

    return datas;
  }

  public int getGameNumber(String userName, String pitcherName){
    String filename = "src/" + userName + pitcherName + "Archives.csv";
    Path path = Paths.get(filename);
    int countNumber = 0;

    try(BufferedReader reader = Files.newBufferedReader(path)){
    String line = "0";
    String[] tmp;

    while((line = reader.readLine()) != null){
      tmp = line.split(",", 0);
      if(tmp[0].equals("M4RK")){
        countNumber++;
      }
    }
  }catch(IOException e){
      System.out.println(e);
    }

    return countNumber;
  }


    public List<double[]> analyzeGameData(String userName, String pitcherName){
      List<double[]> analyzedDatas = new ArrayList<double[]>();
      double totalPitching = 0;
      double tfast=0, tmoving=0, tcutter=0, tslider=0, tfork=0, tcurve=0, tchange=0, tsinking=0, tsinker=0, tscrew=0;
      double sfast=0, smoving=0, scutter=0, sslider=0, sfork=0, scurve=0, schange=0, ssinking=0, ssinker=0, sscrew=0;
      double hfast=0, hmoving=0, hcutter=0, hslider=0, hfork=0, hcurve=0, hchange=0, hsinking=0, hsinker=0, hscrew=0;
      double afast=0, amoving=0, acutter=0, aslider=0, afork=0, acurve=0, achange=0, asinking=0, asinker=0, ascrew=0;
      

      String filename = "src/" + userName + pitcherName + "Archives.csv";
      Path path = Paths.get(filename);

      for (int s = 0;s < 2 ; s++) {

      }

      try(BufferedReader reader = Files.newBufferedReader(path)){
      String line = "0";
      String[] tmp;

      while((line = reader.readLine()) != null){
        tmp = line.split(",",0);
        for(int i = 0; i < tmp.length;i++){
          switch(tmp[i]){
            case "4seam":
              totalPitching++;
              tfast++;
              sfast += Integer.parseInt(tmp[i+1]);
              break;

            case "2seam":
              totalPitching++;
              tmoving++;
              smoving += Integer.parseInt(tmp[i+1]);
              break;

            case "cutter":
              totalPitching++;
              tcutter++;
              scutter += Integer.parseInt(tmp[i+1]);
              break;

            case "slider":
              totalPitching++;
              tslider++;
              sslider += Integer.parseInt(tmp[i+1]);
              break;

            case "fork":
              totalPitching++;
              tfork++;
              sfork += Integer.parseInt(tmp[i+1]);
              break;

            case "curve":
              totalPitching++;
              tcurve++;
              scurve += Integer.parseInt(tmp[i+1]);
              break;

            case "change":
              totalPitching++;
              tchange++;
              schange += Integer.parseInt(tmp[i+1]);
              break;

            case "sinking_fast":
              totalPitching++;
              tsinking++;
              ssinking += Integer.parseInt(tmp[i+1]);
              break;

            case "sinker":
              totalPitching++;
              tsinker++;
              ssinker += Integer.parseInt(tmp[i+1]);
              break;

            case "screw":
              totalPitching++;
              tscrew++;
              sscrew += Integer.parseInt(tmp[i+1]);
              break;

            case "併殺打":
            case "アウト":

            switch(tmp[i-3]){
              case "4seam":
                afast++;
                break;

              case "2seam":
                amoving++;
                break;

              case "cutter":
                acutter++;
                break;

              case "slider":
                aslider++;
                break;

              case "fork":
                afork++;
                break;

              case "curve":
                acurve++;
                break;

              case "change":
                achange++;
                break;

              case "sinking_fast":
                asinking++;
                break;

              case "sinker":
                asinker++;
                break;

              case "screw":
                ascrew++;
                break;

            default: break;
          }
            break;
            case "単打":
            case "二塁打":
            case "三塁打":
            case "ホームラン":
            // case "四球":
            // case "死球":
            // case "犠打":

            switch(tmp[i-3]){
              case "4seam":
                hfast++;
                afast++;
                break;

              case "2seam":
                hmoving++;
                amoving++;
                break;

              case "cutter":
                hcutter++;
                acutter++;
                break;

              case "slider":
                hslider++;
                aslider++;
                break;

              case "fork":
                hfork++;
                afork++;
                break;

              case "curve":
                hcurve++;
                acurve++;
                break;

              case "change":
                hchange++;
                achange++;
                break;

              case "sinking_fast":
                hsinking++;
                asinking++;
                break;

              case "sinker":
                hsinker++;
                asinker++;
                break;

              case "screw":
                hscrew++;
                ascrew++;
                break;

            default: break;
          }
        }
      }
    }
    }catch(IOException e){
        System.out.println(e);
      }

      double[] rateByBallType = new double[10];
      double[] speedByBallType = new double[10];
      double[] hitedByBallType = new double[10];

      if(totalPitching != 0){
      rateByBallType[0] = tfast/totalPitching;
      rateByBallType[1] = tmoving/totalPitching;
      rateByBallType[2] = tcutter/totalPitching;
      rateByBallType[3] = tslider/totalPitching;
      rateByBallType[4] = tfork/totalPitching;
      rateByBallType[5] = tcurve/totalPitching;
      rateByBallType[6] = tchange/totalPitching;
      rateByBallType[7] = tsinking/totalPitching;
      rateByBallType[8] = tsinker/totalPitching;
      rateByBallType[9] = tscrew/totalPitching;

      speedByBallType[0] = sfast/tfast;
      speedByBallType[1] = smoving/tmoving;
      speedByBallType[2] = scutter/tcutter;
      speedByBallType[3] = sslider/tslider;
      speedByBallType[4] = sfork/tfork;
      speedByBallType[5] = scurve/tcurve;
      speedByBallType[6] = schange/tchange;
      speedByBallType[7] = ssinking/tsinker;
      speedByBallType[8] = ssinker/tsinker;
      speedByBallType[9] = sscrew/tscrew;


      double a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;
      if(afast != 0)
        a = hfast/afast;
      if(amoving != 0)
        b = hmoving/amoving;
      if(acutter != 0)
        c = hcutter/acutter;
      if(aslider != 0)
        d = hslider/aslider;
      if(afork != 0)
        e = hfork/afork;
      if(acurve != 0)
        f = hcurve/acurve;
      if(achange != 0)
        g = hchange/achange;
      if(asinking != 0)
        h = hsinking/asinking;
      if(asinker != 0)
        i = hsinker/asinker;
      if(ascrew != 0)
        j = hscrew/ascrew;

        hitedByBallType[0] = a;
        hitedByBallType[1] = b;
        hitedByBallType[2] = c;
        hitedByBallType[3] = d;
        hitedByBallType[4] = e;
        hitedByBallType[5] = f;
        hitedByBallType[6] = g;
        hitedByBallType[7] = h;
        hitedByBallType[8] = i;
        hitedByBallType[9] = j;


    }



      analyzedDatas.add(rateByBallType);
      analyzedDatas.add(speedByBallType);
      analyzedDatas.add(hitedByBallType);

      return analyzedDatas;
    }

 }
