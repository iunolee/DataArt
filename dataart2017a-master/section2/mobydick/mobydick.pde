import rita.*;

String dataPath = "/Users/iunolee/Desktop/2017Spring/DataArt/dataart2017a-master/data/lyrics/";
String[] sentences;

void setup() {
  size(1280, 720, P3D);
  smooth();
  loatText(dataPath + "bible.txt");
  ArrayList<String> results = findAndSaveWord(sentences, "god");
  annotateSentences(results, "godannotated.txt");
}

void draw() {
}

void annotateSentences(ArrayList<String> sentences, String fileName) {
  PrintWriter writer = createWriter(fileName);
  for (String s : sentences) {
    //Get parts of speech (POS)
    String[] pos = RiTa.getPosTags(s);
    //Get phonems
    String phonemes = RiTa.getPhonemes(s);
    //Get stressing pattern
    String stresses = RiTa.getStresses(s);
    writer.println(s + TAB + join(pos, "-") + TAB + phonemes + TAB + stresses);
  }
  writer.flush();
  writer.close();
}

void loatText(String url) {
  String[] lines = loadStrings(url);
  String allText = join(lines, " ");
  sentences = RiTa.splitSentences(allText);
  println(sentences.length);
}



ArrayList<String> findAndSaveWord(String[] sentences, String w) {
  PrintWriter writer = createWriter(w + ".txt");

  ArrayList<String> finds = new ArrayList();

  for (String sentence : sentences) {
    if (sentence.toLowerCase().indexOf(w) != -1) {
      finds.add(sentence);
      writer.println(sentence);
    }
  }

  writer.flush();
  writer.close();

  return (finds);
}