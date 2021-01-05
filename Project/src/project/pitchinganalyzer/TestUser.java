package project.pitchinganalyzer;

public class TestUser{
  public static void main(String[] args){
    String name = args[0];
    String password = args[1];

    User usr = new User();

    if(usr.registerUser(name,password)){
      System.out.println("登録完了");
    }

  }
}
