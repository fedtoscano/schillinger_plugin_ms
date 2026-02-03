import QtQuick 2.9
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3
import "src/gui"
import MuseScore 3.0

MuseScore {
    id: window
    pluginType: "dock"
    menuPath: "Plugins.Schillinger System"
    width: 400
    height: 600

    property bool zMap: false
    property bool zLog: true
    property int iTab: 0
    property string stsMesg: "Ready"
    property string csvPath: ""
    property string csvFile: ""
    property string logText: "" 
    property int currentTab: 0

    // Debugger {
    //     id: debuggerWindow
    // }

    RhythmSection {
    }

}

