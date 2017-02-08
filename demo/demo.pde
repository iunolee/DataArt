void setup() {
  size(1280, 720, P3D);
  //smooth(4);
  loadData();
}



void loadData() {
PrintWriter writer = createWriter("simpleData.csv");

Table t = loadTable("data.csv");
TableRow labelRow = t.getRow(1);
TableRow dataRow = t.getRow(2);


for (int i=0; i < t.getColumnCount(); i++) {
String label = labelRow.getString(i);
String[] splits = label.split(":");
String last = splits[splits.length - 1];
if(last.indexOf('-') != -1) {
  writer.print(last);
  
  if (label.indexOf("Estimate") != -1) {
    writer.print("," + dataRow.getInt(i));
} else {
    writer.println("," + dataRow.getInt(i));
}
} 
writer.flush();
writer.close();
}
  
  
  
//Table myData = loadTable("data.csv");
//TableRow dataRow = myData.getRow(2);
//int syria = dataRow.getInt(172);
//int total = dataRow.getInt(3);

//float syriaSquare = sqrt(syria);
//float totlaSquare = sqrt(total);

////Viz
//translate(width/2, height/2);
//noStroke();
//scale(0.1);
////Big circle
//fill(#555555);
//ellipse(0, 0, totlaSquare, totlaSquare);
////Small circle
//fill(#FF6600);
//ellipse(0, 0, syriaSquare, syriaSquare);
//}
}