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


    Debugger {
      id: debug
      pluginName: "Schillinger"
    }
    // Proprietà per gestire la navigazione
    property int currentTab: 0

    ColumnLayout {
        anchors.fill: parent
        anchors.margins: 10
        spacing: 15

        // --- NAVIGATION BAR ---
        TopNav{
          id: "topnav"
        } 

        // --- LINEA DI SEPARAZIONE ---
        Rectangle {
            Layout.fillWidth: true
            height: 1
            color: "#cccccc"
        }

        // --- MAIN CONTENT AREA ---
        // Usiamo un Item che cambia contenuto in base a currentTab
        ColumnLayout {
            Layout.fillWidth: true
            Layout.fillHeight: true

            // SEZIONE RHYTHM


            // SEZIONE MELODY (Placeholder)
            ColumnLayout {
                visible: currentTab === 1
                Label { text: "Contenuto Melody in arrivo..." }
            }

            // SEZIONE HARMONY (Placeholder)
            ColumnLayout {
                visible: currentTab === 2
                Label { text: "Contenuto Harmony in arrivo..." }
            }
        }
    }

    // --- BACKEND LOGIC ---
    function runSchillingerBackend(p, q, operation) {
        console.log("Esecuzione Backend Schillinger...")
        console.log("Parametri: p=" + p + ", q=" + q)
        console.log("Operazione: " + operation)
        
        if (!curScore) {
            console.log("Errore: Nessuno spartito aperto.")
            return
        }

        // Qui inserirai la logica Schillinger per modificare lo spartito
        // Esempio: curScore.startCmd(); ... curScore.endCmd();
    }
}
