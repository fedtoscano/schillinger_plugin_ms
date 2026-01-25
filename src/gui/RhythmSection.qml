import Quick 2.9
import QtQuick.Controls 2.2
import QtQuickLayouts 1.3
import "../core/adatper/api.js"

            ColumnLayout {
                visible: currentTab === 0
                Layout.fillWidth: true
                spacing: 15

                Label {
                    text: "Schillinger Rhythm Generator"
                    font.bold: true
                    font.pixelSize: 16
                }

                // Input Numerici
                RowLayout {
                    spacing: 10
                    ColumnLayout {
                        Label { text: "Generatore 1 (p):" }
                        SpinBox { id: genP; value: 3; editable: true }
                    }
                    ColumnLayout {
                        Label { text: "Generatore 2 (q):" }
                        SpinBox { id: genQ; value: 4; editable: true }
                    }
                }

                // Selezione Operazione
                ColumnLayout {
                    Layout.fillWidth: true
                    Label { text: "Operazione Ritmica:" }
                    ComboBox {
                        id: operationSelector
                        Layout.fillWidth: true
                        model: ["sync", "fractioning"]
                    }
                }

                Item { Layout.fillHeight: true } // Spacer

                Button {
                    text: "ESEGUI"
                    Layout.fillWidth: true
                    contentItem: Text {
                        text: parent.text
                        color: "white"
                        horizontalAlignment: Text.AlignHCenter
                    }
                    background: Rectangle {
                        color: parent.down ? "#1976D2" : "#2196F3"
                        radius: 4
                    }
                    onClicked: {
                    
                      console.log("startint getSync()...");
                     getSync(genQ, genP);
                    }
                }
            }
