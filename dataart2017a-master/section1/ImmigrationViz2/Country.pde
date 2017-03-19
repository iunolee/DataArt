class Country {

  String name;
  int foreignBorn;

  PVector pos = new PVector();
  PVector tpos = new PVector();

  //Size
  float s;

  //Color;
  color c = 255;

  //Size bounds
  float[] errorBounds = new float[2];

  void update() {
    //animation 
    pos.lerp(tpos, 0.05);
  }

  void render() {
    //draw the country

    pushMatrix();
    noStroke();

    translate(pos.x, pos.y);
    fill(c, 100);

    //Big circle (max error) in light
    ellipse(0, 0, errorBounds[0], errorBounds[0]);


    fill(c);
    //Small Circle (mim error) in dark
    ellipse(0, 0, s, s);
    ellipse(0, 0, errorBounds[1], errorBounds[1]);

    popMatrix();
  }
}