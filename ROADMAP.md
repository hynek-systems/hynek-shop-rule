# Roadmap

Den här roadmapen beskriver vägen från den ursprungliga regelmotorn i version
`0.0.1` till ett stabilt och dokumenterat bibliotek som kan användas av andra
paket och applikationer. Prioriteringarna är resultatbaserade och saknar fasta
datum tills releasekapacitet och konsumenternas behov är kända.

## Målbild

Biblioteket ska erbjuda ett typsäkert API för att bygga, validera, serialisera,
klona och evaluera regelträd. Ett serialiserat regelträd ska kunna lagras och
återskapas deterministiskt, och publika API-förändringar ska följa semantisk
versionering.

## Nuläge

Projektet har redan en tydlig domänmodell och tester för följande delar:

- regelträd med grupper och regler
- operatorer för grupper, strängar, tal och datum
- fält, fälttyper och register
- evaluering via en utbytbar fältresolver
- serialisering och deserialisering
- validering, traversering och kloning

Version `0.3.0` har ett dokumenterat publikt API, versionssatt lagringsformat,
strukturerade fel och testade extension points. Nästa steg är produktion,
prestanda och automatiserad release.

## Fas 1: Användbart paket

**Status:** Klar i `0.1.0`.

**Syfte:** En ny konsument ska kunna installera biblioteket och genomföra ett
komplett arbetsflöde utan kunskap om intern filstruktur.

- Bestäm konsekvent namn för repository, paket och dokumentation.
- Inventera och definiera paketets publika API.
- Exponera de avsedda bygg-, evaluerings-, serialiserings- och validerings-API:erna.
- Ersätt starter-README med installation, kärnkoncept och ett komplett exempel:
  registrera fält och operatorer, bygga ett träd, validera, evaluera och
  serialisera det.
- Dokumentera stödda fälttyper, operatorer och deras operandformat.
- Lägg till ett konsumenttest som installerar den packade artefakten och endast
  importerar via paketets exports.

**Klart när:** Exemplet i README fungerar mot den packade artefakten, alla
avsedda funktioner kan importeras från dokumenterade entrypoints och `vp check`,
`vp test` samt `vp pack` passerar.

## Fas 2: Stabilt kontrakt

**Status:** Klar i `0.2.0`.

**Syfte:** Regelträd ska kunna sparas och flyttas mellan versioner med tydliga
fel när data eller konfiguration är ogiltig.

- Versionssätt det serialiserade formatet och dokumentera dess schema.
- Definiera strategi för bakåtkompatibilitet och migrering av sparade regelträd.
- Lägg till strukturerade fel för okända fält, operatorer och ogiltiga värden.
- Utöka valideringen med felvägar som pekar ut berörd grupp eller regel.
- Lägg till negativa tester för korrupta DTO:er, saknade registerposter och
  typmässigt felaktiga operander.
- Dokumentera beteendet för tomma grupper, `null`, saknade objektfält och
  ogiltiga datum eller intervall.

**Klart när:** Formatet har en dokumenterad version, kompatibilitet testas med
fixtures och konsumenten kan presentera användbara valideringsfel utan att tolka
generiska undantagsmeddelanden.

## Fas 3: Utbyggbart bibliotek

**Status:** Klar i `0.3.0`.

**Syfte:** Nya domänspecifika fält och operatorer ska kunna införas utan att
ändra bibliotekets kärna.

- Dokumentera extension points för egna fälttyper, operatorer och resolvers.
- Stabilisera register-API:erna och definiera regler för dubbletter och
  namnkonflikter.
- Lägg till fabriker eller builders där de minskar mängden felaktiga mellanlägen
  vid programmatisk konstruktion av regler.
- Utvärdera operatorer för medlemskap, tomt värde och negation utifrån konkreta
  konsumentbehov.
- Lägg till kontraktstester som återanvänds av tredjepartsoperatorer.

**Klart när:** En exempelimplementation av en egen operator och fälttyp kan
byggas i ett separat konsumentprojekt och verifieras av dokumenterade
kontraktstester.

## Fas 4: Produktion och prestanda

**Syfte:** Biblioteket ska vara förutsägbart under realistisk last och enkelt
att släppa och felsöka.

- Mät evaluering, serialisering och kloning för små, medelstora och stora träd.
- Sätt prestandabudgetar först efter att representativa användningsfall har
  samlats in.
- Lägg till skydd eller dokumenterade gränser för mycket djupa träd.
- Automatisera CI för kontroll, test, packning och konsumenttest på stödda
  Node.js-versioner.
- Automatisera changelog, versionshöjning, provenance och publicering till npm.
- Definiera supportpolicy och rutin för säkerhetsrapportering.

**Klart när:** Releaseflödet är reproducerbart, kompatibilitetsmatrisen körs i
CI och uppmätta prestandabudgetar bevakas automatiskt.

## Releaseplan

- `0.1.0`: Fas 1 klar; första dokumenterade och praktiskt användbara API:t.
- `0.2.0`: Fas 2 klar; versionssatt lagringsformat och stabil felmodell.
- `0.3.0`: Fas 3 klar; dokumenterade och testade extension points.
- `1.0.0`: Fas 4 klar och API:t har använts av minst en verklig konsument utan
  blockerande kontraktsändringar under en stabiliseringsperiod.

## Principer för prioritering

1. Prioritera kompletta konsumentflöden framför fler fristående funktioner.
2. Lägg inte till operatorer utan ett verifierat domänbehov och tydlig semantik.
3. Behandla serialiserat data och paketets exports som långlivade kontrakt.
4. Lägg till tester på den lägsta nivå som bevisar konsumentbeteendet.
5. Samla mätdata innan prestandaoptimeringar eller nya abstraktioner införs.

Roadmapen bör omprövas efter varje minor-release och när ett nytt konkret
konsumentbehov identifieras.
