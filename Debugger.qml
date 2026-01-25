//==============================================
//
//  Ce programme est un logiciel libre: vous pouvez le redistribuer/modifier
//  sous les conditions de la licence GNU (Version 3 ou ultérieure)
//
//  Nous espèrons que ce programme vous sera utile,
//  mais il est fourni SANS GARANTIE.  Voir la licence
//  GNU pour plus de détails.
//
//  Pour voir la licence GNU :
//  voir le site  <http://www.gnu.org/licenses/>.
//
//  Attention : la version de Musescore 4.0 (ou plus) est requise
//  2023 Dominique Verrière
//  Versione corretta per compatibilità Linux/MS4
//==============================================

import QtQuick 2.9
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3
import FileIO 3.0

Item {
    id: debugTools
    property string pluginName: "" 
    property string logContent: ""
    property string versionTools: "1.02" 

    FileIO {
        id: fhFichierLog
        source: ""
        onError: console.log("FileIO Error: " + msg)
    }

    Component.onCompleted: {
        var logFileName;
        if (pluginName && pluginName !== "") {
            logFileName = fhFichierLog.homePath() + "/Documenti/MuseScore4/Plugins/" + pluginName + "/" + pluginName + "log.txt";
            fhFichierLog.source = logFileName;
            appendLog("Démarrage " + getDateSysteme());
        }
    }

    Component.onDestruction: {
        // Al disfacimento del plugin, scrive i log rimanenti
        if (fhFichierLog.source === "")
            return;
        appendLog("Arrêt " + getDateSysteme());
        writeLogFile();
    }

    // --- FUNZIONI UTILI ---

    function appendLog(chaine) {
        // Aggiunge una riga alla memoria del log
        logContent = logContent + chaine + "\n";
        // Opzionale: stampa anche in console per debug immediato
        console.log(pluginName + ": " + chaine);
    }

    function writeLogFile(clearLog = false) {
        // Scrive il contenuto del log sul file fisico
        if (fhFichierLog.source !== "") {
            fhFichierLog.write(logContent);
            if (clearLog)
                logContent = "";
        }
    }

    function getDateSysteme() {
        // Restituisce data e ora formattate
        return Qt.formatDateTime(new Date(), "yyyy-MM-dd h:mm:ss AP");
    }

    function viewItem(clItem, showFonctions = false) {
        // Analizza un oggetto MuseScore e ne logga le proprietà
        if (!clItem) {
            appendLog("===> Tentativo di analizzare un elemento NULL");
            return;
        }

        appendLog("===> Elément nom: " + (clItem.name || "N/A") + " de type: " + (clItem.type || "N/A"));
        
        for (var p1 in clItem) {
            if (typeof clItem[p1] !== "function") {
                if (p1 !== "objectName" && clItem[p1] !== undefined) {
                    try {
                        appendLog("Propriété " + p1 + ": " + clItem[p1]);
                    } catch(e) {
                        // Alcune proprietà potrebbero non essere accessibili
                    }
                }
            }
        }

        if (!showFonctions) return;

        for (var p2 in clItem) {
            if (typeof clItem[p2] === "function") {
                appendLog("Function " + p2);
            }
        }
    }
}
