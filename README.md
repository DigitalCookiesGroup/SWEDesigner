# SWEDesigner
**SWEDesigner** è un progetto open-source implementato con lo scopo di generare codice Java partendo da semplici diagrammi UML.
Nello specifico è possibile andare a creare un diagramma delle classi per delineare l'architettura generale e successivamente un diagramma delle attività (con qualche modifica rispetto a quello previsto dallo standard) per definire il comportamento di ogni singolo metodo.

**SWEDesigner** è un'applicazione web che presenta sia il *front-end* sia il *back-end* sviluppati in JavaScript.

L'installazione e la compilazione del prodotto **SWEDesigner** sono state testate sui seguenti sistemi operativi:

  - Microsoft Windows 10
  - Apple OSX Sierra
  - Ubuntu 16.04lts 64bit
  - Manjaro 17

Nel seguito del documento potrete trovare utili informazioni che vi guideranno nell'installazione e nella compilazione del prodotto **SWEDesigner**.

## Installazione
### Prerequisiti per l'installazione
Prima di procedere con l'installazione è necessario verificare di aver già installato nel proprio sistema Node.js.

## Guida all'installazione
Seguendo la lista di operazioni riportata di seguito si può installare **SWEDesigner**:

  1. clonare la repository sul server dove si intende installare **SWEDesigner**;
  2. nell cartella *frontend/SWEDesigner/SWEDesigner-app* lanciare il comando `npm install` per installare le dipendenze (eventualmente da amministratore se richiesto) e successivamente il comando `npm run build` (eventualmente da amministratore se richiesto) per avviare la build del programma;
  3. appena `npm run build` ha terminato la propria esecuzione copiare la cartella *"dist"* che si sarà creata all'interno della cartella *Back-End/public*;
  4. posizionarsi all'interno della cartella *Back-End* e lanciare il comando `npm install` per installare le dipendenze (eventualmente da amministratore se richiesto);
  5. all'interno della cartella *Back-End* lanciare il comando `npm start` per avviare il server (eventualmente da amministratore).
