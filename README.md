# React
<h1>Progetto App Web</h1>
<h2>The 500 Greatest Songs by Rolling Stones</h2>
<i>Rabaioli Claudia, Teoria e Tecnologia della Comunicazione, A.A. 2022-2023</i>
<h3>Il progetto</h3>
Il <u>tema</u> scelto per questo progetto è quello <strong>musicale</strong>, con l’obiettivo di consultare informazioni essenziali riguardanti gli autori dei brani selezionati, mentre si fruisce del brano stesso.<br><u>Si sconsiglia il lancio dell'applicativo tramite build</u>, le motivazioni sono riportate qui sotto.
<h3>Il materiale</h3>
La lista di brani scelta è l’elenco dei 500 migliori brani musicali secondo la rivista statunitense Rolling Stone; nella versione del 2014, tale lista è usata tramite <a href="https://gist.github.com/keune/0de5c7fb669f7b682874">un file statico .json</a> reperito su github.<br>Per reperire le immagini delle copertine degli album e degli artisti e degli estratti di 30 secondi dei diversi brani, è stata usata l’<a href="https://developers.deezer.com/api">API di Deezer</a>; per quanto riguarda invece le informazioni degli artisti, l’<a href="https://musicbrainz.org/doc/MusicBrainz_API">API di MusicBrainz</a>. La scelta è ricaduta su questi due database in quanto permettevano entrambi la ricerca secondo nome dell’artista e nome della canzone, i quali sono stati estratti dal json.
<h3>Organizzazione del progetto</h3>
Il codice sorgente è organizzato come visto in classe. La build è disponibile nella cartella omonima, però non consente l’accesso ai dai ricavati tramite l’API di Deezer. Per lanciarla: scaricare la cartella; tramite prompt comandi digitare: cd percorso della cartella, npm install -g serve, npx serve -s build; dopodiché copiare sul browser l’indirizzo http://localhost:3000 .
<u>Si consiglia, per poter accedere al progetto completo dei dati di Deezer, di eseguire dal codice <b>npm start</b>.</u>
<h3>Aspetti importanti e/o distintivi</h3>
<h4>CORS policy e setupProxy.js</h4>
L’API di Deezer, durante l’utilizzo, presentava problemi a livello di CORS policy. L’opzione della chiamata fetch “mode: 'no-cors'”, la soluzione del progetto cors-anywhere, scrivere manualmente gli headers della richiesta oppure utilizzare librerie .jsonp non risolvevano la situazione: per diverse motivazioni, continuavano a presentarsi errori. Dunque ho configurato una proxy middleware, tramite la libreria <u>“http-proxy-middleware”</u>: ciò mi ha permesso di cambiare l’origine delle chiamate API, non incorrendo dunque nel blocco CORS.<br><u>L’utilizzo di questo metodo ha però reso la build del progetto non idonea alla fruizione dei dati API.</u>
<h4>Controllo errori</h4>
I render che richiedevano l’utilizzo di dati dalle API sono stati realizzati con condizioni di controllo per eventuali errori, risposte vuote o diverse da quanto necessario, inserendo immagini e testi segnaposto.
<h4>Stile</h4>
Lo stile è stato realizzato principalmente con Bootstrap; quasi tutti i componenti hanno il proprio module.css, usato in particolare per media queries, importazione font, :hover, posizionamenti, filter delle immagini, ombreggiature. 
<h4>Rendering condizionale</h4>
Sulla pagina con la lista completa delle canzoni, è presente un rendering condizionale per la diversa visualizzazione degli elementi: in griglia o tabulare.
<h4>Altro</h4>
<ul>
<li>Il progetto è <u>responsive</u>.</li>
<li>Sulle schermate con la lista completa delle canzoni, è presente un tasto che permette di <u>scorrere in cima</u> alla pagina.</li>
<li>È presente una pagina da visualizzare quando non ci sono corrispondenze con i percorsi definiti (<u>page not found</u>).</li>
</ul>
