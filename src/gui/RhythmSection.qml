import QtQuick 2.9
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3
import "Schillinger.js" as Schillinger

Item {
    id: rhythmRoot
    Layout.fillWidth: true
    Layout.fillHeight: true
    property var rhythmicOperators: ['sync', 'fractioning', 'balancing', 'contracting',]

    ColumnLayout {
        anchors.fill: parent
        spacing: 15
        RowLayout {
            spacing: 10
            ColumnLayout {
                Label {
                    text: "Generatore 1 (p):"
                }
                SpinBox {
                    id: genP
                    value: 3
                    editable: true
                }
            }
            ColumnLayout {
                Label {
                    text: "Generatore 2 (q):"
                }
                SpinBox {
                    id: genQ
                    value: 4
                    editable: true
                }
            }
            ColumnLayout {
                Label {
                    text: "Raggruppa: "
                }
                ComboBox {
                    id: groupBy
                    model: ["P", "Q"]
                }
            }
        }

        ColumnLayout {
            Layout.fillWidth: true
            Label {
                text: "Operazione Ritmica:"
            }
            ComboBox {
                id: operationSelector
                Layout.fillWidth: true
                model: rhythmicOperators
            }
        }

        Item {
            Layout.fillHeight: true
        }

        Button {
            text: "Calcola"
            Layout.fillWidth: true

            onClicked: {
                var gen1 = genP.value;
                var gen2 = genQ.value;
                var mode = operationSelector.currentText;
                var durations;

                switch (mode) {
                case 'sync':
                    durations = Schillinger.getSync(gen1, gen2);
                    break;
                case 'fractioning':
                    durations = Schillinger.getFractioning(gen1, gen2);
                    break;
                case 'balancing':
                    durations = Schillinger.getBalancing(gen1, gen2);
                    break;
                case 'contracting':
                    durations = Schillinger.getContracting(gen1, gen2);
                    break;
                default:
                    console.error("Operazione non valida:", mode);
                    return;
                }

                Schillinger.score.insertContinuity(durations);
            }
        }
    }
}
