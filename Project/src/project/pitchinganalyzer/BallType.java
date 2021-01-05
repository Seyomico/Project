package project.pitchinganalyzer;

public enum BallType{
  FAST("フォーシーム"),
  MOVING("ツーシーム"),
  CUTTER("カッター"),
  SLIDER("スライダー"),
  FORK("フォーク"),
  CURVE("カーブ"),
  CHANGE("チェンジアップ"),
  SINKING("シュート"),
  SINKER("シンカー"),
  SCREW("スクリュー");

  String name;
  BallType(String name){
    this.name = name;
  }

  public String toStirng(){return name;}

}
