Table data;
//String text; 
//PFont myFont;

void setup() {
  size(895,895);
  smooth(4);
  loadData("simpleData.csv");
  //myFont = createFont("Roboto-Black.ttf", 200);
  //textFont(myFont);

}

void draw() {
  colorMode(HSB, 360, 100, 100);
  background(0,0,20);
  noFill();
  stroke(0,0,35);
  strokeWeight(0.2);
  // draw a gird on background
  for(int i = 0; i < width; i += 5) {
  for(int j = 0; j < height; j += 5) {
  rect(i, j, 5, 5);
   }
  }
  
  // Visualize USA as a background
  //fill(35, 225);
  //textAlign(CENTER, CENTER);
  //text("UNITED", width/2, height/2-400);
  //text("STATE", width/2, height/2-200);
  //text("OF", width/2, height/2);
  //text("AMERICA", width/2, height/2+200);

  randomSeed(0);
  renderData(data);
}

void loadData(String url) {
     data = loadTable(url);
}

void renderData(Table t) {
  for (int i = 0; i < t.getRowCount(); i++) {
    TableRow row = t.getRow(i);
    
    //Country - string, name of the country
    String country = row.getString(0);
    //Estimate - int, number of immigrants from this country in the USA
    int estimate = row.getInt(1);
    //Error - sampling error on the estimate
    //int error = row.getInt(2);
    //float errorFraction = (float) error / estimate;

    // Compressing 10000 people into 1 cell 
    int num = floor(estimate/10000);
    // Picking a color for each country (Redish - majorty / Blusish - minority)

    int h = floor(map(num, 1170, 1, 20, 200));
    int s = 65;
    int b = 95;

    // Scattering cells for each country on the gird
    for (int j = 0; j < num; j++) {
      noStroke(); 
      fill(h,s,b);
      int x = int(random(width/5));
      int y = int(random(height/5));
      rectMode(CORNER);
      rect(5*x, 5*y, 5, 5);
    }
  }
}