import QtQuick 2.9
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3 
import "../core/adapter/api.js" as Api 

Item {
    id: rhythmRoot
    Layout.fillWidth: true
    Layout.fillHeight: true

    ColumnLayout {
        anchors.fill: parent
        spacing: 15


        RowLayout {
            spacing: 10
            ColumnLayout {
                Label { text: "Generatore 1 (p):" }
                SpinBox { 
                  id: genP 
                  value: 3 
                  editable: true 
                } 
            }
            ColumnLayout {
                Label { text: "Generatore 2 (q):" }
                SpinBox { 
                  id: genQ 
                  value: 4 
                  editable: true 
                } 
            }
        }

        ColumnLayout {
            Layout.fillWidth: true
            Label { text: "Operazione Ritmica:" } 
            ComboBox {
                id: operationSelector
                Layout.fillWidth: true
                model: ["sync", "fractioning"] 
            }
        }

        Item { Layout.fillHeight: true } 

        Button {
            text: "ESEGUI" 
            Layout.fillWidth: true
            
            onClicked: {
                debuggerWindow.logDebug("Avvio generazione: p=" + genP.value + ", q=" + genQ.value, false);
                Api.getSync(genQ.value, genP.value); 
            }
        }
    }
}
