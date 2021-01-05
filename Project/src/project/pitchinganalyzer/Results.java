package project.pitchinganalyzer;

public enum Results{
  HIT("一塁打"),
  DOUBLE("二塁打"),
  TRIPLE("三塁打"),
  SWINGOUT("空振り三振"),
  LOOKING("見逃し"),
  FLY("フライ"),
  NEXT("継続");

  String name;
  Results(String name){
    this.name = name;
  }

  public String toStirng(){return name;}

}
