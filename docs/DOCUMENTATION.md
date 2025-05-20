## Wstęp

`buy-list` to aplikacja internetowa, która ułatwia planowanie zakupów na podstawie wybranych przepisów kulinarnych. Aplikacja została zaprojektowana z myślą o wygodzie i przejrzystości zarówno na urządzeniach typu desktop jak i na urządzeniach mobilnych.

## Opis funkcjonalności

Użytkownik ma do dyspozycji 3 widoki aplikacji:
- **Strona główna** - strona powitalna
- **Lista zakupów** - strona, na której możemy wyświetlać, dodawać, odznaczać i usuwać produkty, które są do kupienia.
- **Wyszukiwarka przepisów** - strona, na której wpisując frazę możemy wyszukać interesujące nas dania, a następnie dodać jego składniki do listy zakupów.

## Opis techniczny

#### Użyte technologie:
- **Node.js** - środowisko uruchomieniowe JavaScript po stronie serwera.
- **Express.js** - framework Node.js, który umożliwia stworzenie serwera HTTP.
- **Axios** - biblioteka służąca do wykonywania requestów do komunikacji z zewnętrznym API.
- **Visual Studio Code** - edytor kodu umożliwiający sprawną pracę nad projektem.
- **Git** - system konrtoli wersji, umożliwiający śledzenie zmian w kodzie.
- **Lodash** - biblioteka ułatwiająca operacje na tablicach, obiektach i łańcuchach tekstowych.

#### Struktura projektu:

```
buy-list/
├── controllers
│   └── recepies.js
├── index.js
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── buylist.html
│   ├── index.html
│   ├── manifest.json
│   ├── recepies.html
│   ├── static
│   │   ├── css
│   │   │   └── style.css
│   │   ├── icons
│   │   │   ├── apple-icon.png
│   │   │   ├── bars-solid.svg
│   │   │   ├── cart-plus-solid.svg
│   │   │   ├── check-solid.svg
│   │   │   ├── favicon-96x96.png
│   │   │   ├── favicon.ico
│   │   │   ├── favicon.svg
│   │   │   ├── icon-192x192.png
│   │   │   ├── icon-512x512.png
│   │   │   └── trash-solid.svg
│   │   └── js
│   │       └── script.js
│   └── sw.js
└── routes.js
```

#### Plik manifest:

Plik `manifest.json` w aplikacji PWA służy do definiowania metadanych aplikacji, które pozwalają przeglądarce rozpoznać ją jako instalowaną.

Opis metadanych użytych w aplikacji:

- **name** - Określa pełną nazwę aplikacji, która będzie wyświetlana na urządzeniu użytkownika (np. na ekranie głównym po zainstalowaniu aplikacji). Jest to nazwa, którą użytkownicy będą widzieć w interfejsie systemowym.

- **short_name** - Krótsza wersja nazwy aplikacji, która może być wyświetlana w miejscach o ograniczonej przestrzeni, takich jak ikona aplikacji na ekranie głównym.

- **icons** - Lista obiektów zawierająca różne wersje ikon aplikacji w różnych rozmiarach i formatach. Te ikony są używane przez system operacyjny do wyświetlania aplikacji w różnych miejscach, np. na ekranie głównym, w powiadomieniach czy w menu.

- **start_url** - Określa URL, który ma zostać otwarty, gdy użytkownik uruchomi aplikację z ekranu głównego. Jest to punkt początkowy aplikacji, na którym użytkownik zacznie interakcję.

- **theme_color** - Określa kolor motywu aplikacji, który wpływa na wygląd paska statusu i innych elementów UI. Dzięki temu aplikacja może lepiej komponować się z systemowym wyglądem urządzenia.

- **background_color** - Kolor tła, który jest używany podczas ładowania aplikacji lub zanim aplikacja w pełni się załaduje. Umożliwia dostosowanie wyglądu ekranu ładowania do aplikacji.

- **display** - Określa sposób wyświetlania aplikacji po jej uruchomieniu. Może to być:
  - *standalone* - aplikacja działa jak natywna aplikacja bez pasków przeglądarki.

  - *fullscreen* - aplikacja wyświetla się na pełnym ekranie.

  - *minimal-ui* - aplikacja wyświetla minimalny interfejs użytkownika.

  - *browser* - aplikacja działa w tradycyjnej przeglądarce.

- **dir** - Określa kierunek tekstu w aplikacji.

- **lang** - Określa domyślny język aplikacji, używając standardu ISO 639-1. Na przykład en dla angielskiego, pl dla polskiego.

- **orientation** - Określa preferowaną orientację ekranu aplikacji.

- **id** - Unikalny identyfikator aplikacji w systemie operacyjnym. Może pomóc w rozróżnianiu aplikacji, zwłaszcza w przypadku aplikacji instalowanych w systemach operacyjnych.

- **description** - Krótki opis aplikacji, który wyjaśnia jej funkcje i cel. Może być wyświetlany w sklepie z aplikacjami lub w innych kontekstach, takich jak informacje o aplikacji w systemie operacyjnym.

#### Service Worker:

Service Worker to specjalny skrypt w JavaScript, który działa niezależnie od aplikacji. Skrypt ten pozwala na tworzenie aplikacji działających w trybie offline oraz na wykonywanie powiadomień push.

W aplikacji service worker składa się z 3 sekcji:

- **Instalacja** - w tej sekcji service worker tworzy cache, czyli miejsce w którym będzie przechowywał wybrane żądania sieciowe.
- **Aktywacja** - tutaj service worker sprawdza czy nie istnieją inne cache np. starsze wersjie i usuwa je tak aby mieć pewność, że dane są z aktualnej pamięci cache oraz żeby zaoszczędzić miejsce.
- **Przechwytywanie żądań sieciowych** - w tej sekcji service worker przechwytuje każde żądanie HTTP oraz decyduje czy odpowiedzieć z cache czy pobrać nowe dane z serwera. Decyzja jest zależna od strategii cache jaką zaimplementujemy.

#### Strategia Cache:

Tak jak zostało wspomniane powyżej decyzja jaką podejmuje service worker, czyli czy odpowiedzieć zasobami zapisywanymi w cache czy z serwera zostaje podjęta na podstawie tego jaką strategie cache zastosowaliśmy. Oto kilka najpopularniejszych strategii jakie się stosuje:

- **Cache First** - Service Worker sprawdza najpierw czy zasób istnieje w cache, jeśli nie to pobiera z Internetu zapisuje w pamięci i zwraca.
- **Network First** - Service Worker zawsze pobiera zasoby z Internetu natomiast używa danych z pamięci.
- **Stale While Revalidate** - Service Worker zwraca zasoby z cache, ale jednocześnie w tle aktualizuje pamięć.
- **Network Only** - pobiera dane tylko i wyłącznie z Internetu.
- **Cache Only** - pobiera dane tylko i wyłącznie z pamięci.

W aplikacji zostały zastosowane 2 strategie **Network Only** oraz **Stale While Revalidate**. Dla wszystkich statycznych zasobów została zastosowana strategia **SWR** natomiast dla ścieżki `/api/*` **Network Only**, ponieważ dane są pobierane z zewnętrznego API oraz cache uniemożliwia zapytań metodą `POST`.

#### Uruchomienie w środowisku testowym / developerskim:

1. Pobranie repozytorium

```bash
git clone https://github.com/bednark/buy-list
cd buy-list/
```

2. Instalacja zależności

```bash
pnpm i
```

3. Ustawienie zmiennych środowiskowych

```bash
echo "MEALDB_BASE_URL=https://www.themealdb.com" >> .env
```

4. Uruchomienie aplikacji

```bash
pnpm dev
```

#### Wdrożenie do środowiska produkcyjnego:

Aplikacja została wdrożona na platformie render.com, ponieważ wymaga środowiska Node.js do działania. Hostingi typu GitHub Pages nie są odpowiednie, ponieważ obsługują wyłącznie statyczne pliki i nie wspierają uruchamiania backendu (np. Express.js), a ta aplikacja posiada część serwerową.

Wdrożenie środowiska:
- Zakładamy konto na stronie https://render.com
- Łączymy konto z kontem na GitHub / GitLab
- Nadajemy uprawnienia do repozytorium z aplikacją
- Tworzymy nowy Web Service i ustawiamy:
  - Source Code - wybieramy repozytorium
  - Name - nazwa aplikacji
  - Environment - Node
  - Build Command - `pnpm install --frozen-lockfile`
  - Start Commend - `node start`
  - Region - najbliższy naszej lokalizacji
  - Plan - Free
  - Dodajemy zmienną środowiskowym taką samą jak w środowisku developerskim
- Klikamy "Create Web Service"

![Hosting 1](https://raw.githubusercontent.com/bednark/buy-list/master/docs/screenshots/hosting-1.png)

![Hosting 2](https://raw.githubusercontent.com/bednark/buy-list/master/docs/screenshots/hosting-2.png)

![Hosting 3](https://raw.githubusercontent.com/bednark/buy-list/master/docs/screenshots/hosting-3.png)

## Napotkane problemy

- **Brak obsługi żądań POST w cache** - W początkowej wersji service workera zastosowano strategię cache również dla endpointów API, co powodowało błędy podczas wysyłania zapytań POST (np. dodawanie składników do listy zakupów). Problem został rozwiązany przez wykluczenie ścieżki /api/* z cache i zastosowanie strategii Network Only.

## Podsumowanie

`Buy-list` to responsywna aplikacja typu PWA, która ułatwia planowanie zakupów spożywczych poprzez integrację z zewnętrzną bazą przepisów. Dzięki zastosowaniu technologii takich jaki Service Worker, Axios, Express oraz Node.js aplikacja oferuje szybkie działanie, możliwość pracy offline oraz wygodny interfejs zarówno na komputerach jak i urządzaniach mobilnych. Aplikacja może być dalej rozwijana na przykład o możliwość logowania użytkowników, zapisywania list na koncie oraz synchronizację danych między urządzeniami.

## Załączniki

Link to repozytorium: https://github.com/bednark/buy-list
Link do aplikacji: https://buy-list.onrender.com

Zrzuty ekranu aplikacji:

![Aplikacja 1](https://raw.githubusercontent.com/bednark/buy-list/master/docs/screenshots/aplikacja-1.png)

![Aplikacja 2](https://raw.githubusercontent.com/bednark/buy-list/master/docs/screenshots/aplikacja-2.png)

![Aplikacja 3](https://raw.githubusercontent.com/bednark/buy-list/master/docs/screenshots/aplikacja-3.png)