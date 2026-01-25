import QtQuick 2.9
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3
RowLayout {
            Layout.fillWidth: true
            spacing: 5

            Button {
                text: "RHYTHM"
                highlighted: currentTab === 0
                Layout.fillWidth: true
                onClicked: currentTab = 0
            }
            Button {
                text: "MELODY"
                highlighted: currentTab === 1
                Layout.fillWidth: true
                onClicked: currentTab = 1
            }
            Button {
                text: "HARMONY"
                highlighted: currentTab === 2
                Layout.fillWidth: true
                onClicked: currentTab = 2
            }
        }
