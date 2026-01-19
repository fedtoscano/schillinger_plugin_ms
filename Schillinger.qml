import QtQuick 2.0
import MuseScore 3.0

MuseScore {
    pluginType: "dock"
    menuPath: "Plugins.Schillinger" // Obbligatorio per apparire correttamente nel menu
    description: "Generatore di ritmi basato sulla teoria di Schillinger"
    version: "1.0"

    onRun: {
        console.log("LOG: Plugin Schillinger avviato con successo!");
        
        if (curScore) {
            console.log("LOG: Spartito attivo trovato: " + curScore.scoreName);
        } else {
            console.log("LOG: Nessuno spartito attivo. Apri un file!");
        }
        
        // Non chiudere subito per dare tempo alla console di scrivere
        // Qt.quit(); 
    }
}
