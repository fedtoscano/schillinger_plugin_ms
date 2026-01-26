import QtQuick 2.9
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3 // Corretto da QtQuickLayouts 
import "../core/adatper/api.js" as Api 

Item {
    id: rhythmRoot
    Layout.fillWidth: true
    Layout.fillHeight: true

    ColumnLayout {
        anchors.fill: parent
        spacing: 15

        Label {
            text: "Schillinger Rhythm Generator" [cite: 13]
            font.bold: true
            font.pixelSize: 16
        }

        RowLayout {
            spacing: 10
            ColumnLayout {
                Label { text: "Generatore 1 (p):" }
                SpinBox { id: genP; value: 3; editable: true } [cite: 15]
            }
            ColumnLayout {
                Label { text: "Generatore 2 (q):" }
                SpinBox { id: genQ; value: 4; editable: true } [cite: 16, 17]
            }
        }

        ColumnLayout {
            Layout.fillWidth: true
            Label { text: "Operazione Ritmica:" } [cite: 18]
            ComboBox {
                id: operationSelector
                Layout.fillWidth: true
                model: ["sync", "fractioning"] [cite: 19]
            }
        }

        Item { Layout.fillHeight: true } 

        Button {
            text: "ESEGUI" [cite: 20]
            Layout.fillWidth: true
            
            onClicked: {
                // Usa l'ID del debugger definito nel padre (Schillinger.qml) [cite: 7]
                debuggerWindow.logDebug("Avvio generazione: p=" + genP.value + ", q=" + genQ.value, false);
                
                console.log("starting getSync()..."); [cite: 23]
                // Passa i valori numerici .value [cite: 24]
                Api.getSync(genQ.value, genP.value); 
                
                // Chiama la funzione nel file principale [cite: 6]
                window.runSchillingerBackend(genP.value, genQ.value, operationSelector.currentText);
            }
        }
    }
}
