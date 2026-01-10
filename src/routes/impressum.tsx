import { createFileRoute } from "@tanstack/react-router";
import BackToHome from "@/components/back-button";
import MastHead from "@/components/masthead";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Imprint & Privacy | Gardening WebDev" },
      { name: "description", content: "Imprint and Privacy Statement" },
    ],
  }),
  component: ImpressumPage,
});

function ImpressumPage() {
  return (
    <div className="container">
      <main className="mx-auto max-w-6xl px-6 py-12 md:px-8 lg:px-12">
        <MastHead />

        <section className="mb-20 mt-12">
          <div className="mx-auto max-w-4xl space-y-12">
            <h2>Datenschutz</h2>
            <p>
              Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der
              EU-Datenschutzgrundverordnung (DSGVO), ist:
            </p>
            <div className="h-card">
              <span className="p-name">Andreas Sander</span>,
              <span className="p-nickname">andi1984</span>
              <p className="p-street-address">Im Stockwald 12</p>
              <span className="p-postal-code">66265</span>
              <span className="p-locality">Heusweiler</span>,
              <div className="p-country-name">Germany</div>
            </div>
            <h2>Ihre Betroffenenrechte</h2>
            <p>
              Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten
              können Sie jederzeit folgende Rechte ausüben:
            </p>
            <ul>
              <li>
                Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung,
              </li>
              <li>Berichtigung unrichtiger personenbezogener Daten,</li>
              <li>Löschung Ihrer bei uns gespeicherten Daten,</li>
              <li>
                Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund
                gesetzlicher Pflichten noch nicht löschen dürfen,
              </li>
              <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns und</li>
              <li>
                Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt
                haben oder einen Vertrag mit uns abgeschlossen haben.
              </li>
            </ul>
            <p>
              Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese
              jederzeit mit Wirkung für die Zukunft widerrufen.
            </p>
            <p>
              Sie können sich jederzeit mit einer Beschwerde an die für Sie zuständige
              Aufsichtsbehörde wenden. Ihre zuständige Aufsichtsbehörde richtet sich
              nach dem Bundesland Ihres Wohnsitzes, Ihrer Arbeit oder der mutmaßlichen
              Verletzung. Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen
              Bereich) mit Anschrift finden Sie unter:{" "}
              <a
                href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html
              </a>
              .
            </p>
            <h2>
              Zwecke der Datenverarbeitung durch die verantwortliche Stelle und Dritte
            </h2>
            <p>
              Wir verarbeiten Ihre personenbezogenen Daten nur zu den in dieser
              Datenschutzerklärung genannten Zwecken. Eine Übermittlung Ihrer
              persönlichen Daten an Dritte zu anderen als den genannten Zwecken findet
              nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte weiter,
              wenn:
            </p>
            <ul>
              <li>Sie Ihre ausdrückliche Einwilligung dazu erteilt haben,</li>
              <li>
                die Verarbeitung zur Abwicklung eines Vertrags mit Ihnen erforderlich
                ist,
              </li>
              <li>
                die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung
                erforderlich ist,
              </li>
            </ul>
            <p>
              die Verarbeitung zur Wahrung berechtigter Interessen erforderlich ist
              und kein Grund zur Annahme besteht, dass Sie ein überwiegendes
              schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben.
            </p>
            <h2>SSL-Verschlüsselung</h2>
            <p>
              Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden
              wir dem aktuellen Stand der Technik entsprechende
              Verschlüsselungsverfahren (z. B. SSL) über HTTPS.
            </p>
            <h2>Eingebettete YouTube-Videos</h2>
            <p>
              Auf einigen unserer Webseiten betten wir Youtube-Videos ein. Betreiber
              der entsprechenden Plugins ist die YouTube, LLC, 901 Cherry Ave., San
              Bruno, CA 94066, USA. Wenn Sie eine Seite mit dem YouTube-Plugin
              besuchen, wird eine Verbindung zu Servern von Youtube hergestellt. Dabei
              wird Youtube mitgeteilt, welche Seiten Sie besuchen. Wenn Sie in Ihrem
              Youtube-Account eingeloggt sind, kann Youtube Ihr Surfverhalten Ihnen
              persönlich zuzuordnen. Dies verhindern Sie, indem Sie sich vorher aus
              Ihrem Youtube-Account ausloggen.
            </p>
            <p>
              Wird ein Youtube-Video gestartet, setzt der Anbieter Cookies ein, die
              Hinweise über das Nutzerverhalten sammeln.
            </p>
            <p>
              Wer das Speichern von Cookies für das Google-Ad-Programm deaktiviert
              hat, wird auch beim Anschauen von Youtube-Videos mit keinen solchen
              Cookies rechnen müssen. Youtube legt aber auch in anderen Cookies
              nicht-personenbezogene Nutzungsinformationen ab. Möchten Sie dies
              verhindern, so müssen Sie das Speichern von Cookies im Browser
              blockieren.
            </p>
            <p>
              Weitere Informationen zum Datenschutz bei „Youtube" finden Sie in der
              Datenschutzerklärung des Anbieters unter:{" "}
              <a
                href="https://www.google.de/intl/de/policies/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.google.de/intl/de/policies/privacy/{" "}
              </a>
            </p>
            <h2>
              <strong>Änderung unserer Datenschutzbestimmungen</strong>
            </h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
              stets den aktuellen rechtlichen Anforderungen entspricht oder um
              Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen,
              z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt
              dann die neue Datenschutzerklärung.
            </p>
            <h2>
              <strong>Fragen an den Datenschutzbeauftragten</strong>
            </h2>
            <p>
              Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine
              E-Mail oder wenden Sie sich direkt an die für den Datenschutz
              verantwortliche Person in unserer Organisation:
            </p>
            <p>
              <em>Die Datenschutzerklärung wurde mit dem </em>
              <a
                href="https://www.activemind.de/datenschutz/datenschutzhinweis-generator/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <em>Datenschutzerklärungs-Generator der activeMind AG erstellt</em>
              </a>
              <em>.</em>
            </p>
          </div>
        </section>

        {/* Back Link */}
        <div className="mx-auto max-w-4xl">
          <BackToHome />
        </div>
      </main>
    </div>
  );
}
