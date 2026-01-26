import QtQuick 2.0
import QtQuick.Controls 2.0

ApplicationWindow { 
  id: winDebug
  x: 20; y: 70
  width: 360; height: 900
  title: "Debug"
  visible: zLog
  ScrollView { id: scrDebug
    anchors.fill:parent
    TextArea{
      id: txtDebug
      width: winDebug.width; height: winDebug.height
      textMargin: 15
      readOnly: true
      wrapMode: TextEdit.Wrap 
      text: logText
    }
  }

  Component.onCompleted: {
    csvPath = "#";
    logDebug("onRun", false);
  }

  function logDebug(info, zclr) {
    if(zLog){
     if(zclr) logText = info;
     else logText += "\n" + " ".repeat(iTab) + info;
   }
  }

}

