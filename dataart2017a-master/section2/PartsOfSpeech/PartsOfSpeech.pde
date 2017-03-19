import rita.*;

Table textTable;

void setup() {
  size(1280, 720, P3D);
  loadAnnotatedText("godannotated.txt");
  searchByPOS("the lazy brown dog");
}


void draw() {
}

void searchByPOS(String posPattern) {
  //Take the pattern sentence and find its POS
  String[] pos = RiTa.getPosTags(posPattern);
  String posString = join(pos, "-");
  println(posString);

  //Go through our anntated text and look for that patter
  for (TableRow r : textTable.rows()) {
    String rowPos = r.getString(1);
    if (rowPos.indexOf(posString) != -1) {
      println("MATCH!:" + r.getString(0));
    }
  }
}

void loadAnnotatedText(String url) {
  Table textTable = loadTable(url, "tsv");
  for (TableRow r : textTable.rows()) {
    println(r.getString(1));
  }
}