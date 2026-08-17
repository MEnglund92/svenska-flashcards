// === SWEDISH STUDY APP — All Content Data ===

const courses = [
  // ========== COURSE 1: Rivstart A1+A2 ==========
  {
    id: "rivstart-a1",
    name: "Rivstart A1+A2 — Beginner Swedish",
    categories: [
      { id: "basics", name: "Basic Expressions", nameSv: "Grundläggande Uttryck", color: "#4fc3f7" },
      { id: "everyday", name: "Everyday Vocabulary", nameSv: "Vardagsord", color: "#81c784" },
      { id: "grammar", name: "Grammar Basics", nameSv: "Grammatikgrunder", color: "#ffb74d" },
      { id: "travel", name: "Travel & Directions", nameSv: "Resa & Vägbeskrivning", color: "#ba68c8" }
    ],
    entries: [
      { phrase: "Hej", meaning: "Hello — the most common Swedish greeting, used in both formal and informal situations", translation: "Hello", category: "basics",difficulty:"easy", related: ["Hejdå", "Trevligt att träffas"] },
      { phrase: "Hejdå", meaning: "Goodbye — used when leaving or ending a conversation", translation: "Goodbye", category: "basics",difficulty:"easy", related: ["Hej", "Vi ses"] },
      { phrase: "Tack", meaning: "Thank you — a fundamental polite expression", translation: "Thanks", category: "basics",difficulty:"easy", related: ["Tack så mycket", "Varsågod"] },
      { phrase: "Tack så mycket", meaning: "Thank you very much — an emphasized form of gratitude", translation: "Thank you so much", category: "basics",difficulty:"easy", related: ["Tack", "Varsågod"] },
      { phrase: "Varsågod", meaning: "You're welcome / Here you go — used when offering something or responding to thanks", translation: "You're welcome", category: "basics",difficulty:"easy", related: ["Tack", "Tack så mycket"] },
      { phrase: "Ja", meaning: "Yes — the affirmative response", translation: "Yes", category: "basics",difficulty:"easy", related: ["Nej"] },
      { phrase: "Nej", meaning: "No — the negative response", translation: "No", category: "basics",difficulty:"easy", related: ["Ja"] },
      { phrase: "Ursäkta", meaning: "Excuse me — used to get someone's attention or apologize", translation: "Excuse me", category: "basics",difficulty:"easy", related: ["Förlåt"] },
      { phrase: "Förlåt", meaning: "Sorry — an apology for a mistake or inconvenience", translation: "Sorry", category: "basics",difficulty:"easy", related: ["Ursäkta"] },
      { phrase: "Hur mår du?", meaning: "How are you? — a common greeting asking about someone's well-being", translation: "How are you?", category: "basics",difficulty:"easy", related: ["Jag mår bra, tack", "Vad heter du?"] },
      { phrase: "Jag mår bra, tack", meaning: "I'm fine, thanks — the standard response to 'Hur mår du?'", translation: "I'm fine, thanks", category: "basics",difficulty:"easy", related: ["Hur mår du?"], sentence: "Jag mår bra tack och du?" },
      { phrase: "Vad heter du?", meaning: "What is your name? — asking for someone's name", translation: "What's your name?", category: "basics",difficulty:"easy", related: ["Jag heter...", "Hur mår du?"], sentence: "Vad heter du?" },
      { phrase: "Jag heter...", meaning: "My name is... — introducing yourself", translation: "My name is...", category: "basics",difficulty:"easy", related: ["Vad heter du?"], sentence: "Jag heter Kalle." },
      { phrase: "Trevligt att träffas", meaning: "Nice to meet you — said when meeting someone for the first time", translation: "Nice to meet you", category: "basics",difficulty:"easy", related: ["Hej", "Jag heter..."] },
      { phrase: "Varifrån kommer du?", meaning: "Where are you from? — asking about someone's origin", translation: "Where are you from?", category: "basics",difficulty:"easy", related: ["Jag kommer från..."], sentence: "Varifrån kommer du?" },
      { phrase: "Jag kommer från...", meaning: "I come from... — stating your origin or nationality", translation: "I'm from...", category: "basics",difficulty:"easy", related: ["Varifrån kommer du?"], sentence: "Jag kommer från Sverige." },
      { phrase: "Vatten", meaning: "Water — a basic noun, neuter gender (ett vatten)", translation: "Water", category: "everyday",difficulty:"easy", related: ["Dricka", "Kaffe", "Mjölk"], sentence: "Jag dricker vatten varje dag." },
      { phrase: "Mat", meaning: "Food — a common noun, en-word (en mat)", translation: "Food", category: "everyday",difficulty:"easy", related: ["Äta", "Bröd", "Äpple", "Laga mat"], sentence: "Nu lagar jag mat i köket." },
      { phrase: "Kaffe", meaning: "Coffee — a popular beverage in Sweden, part of 'fika' culture", translation: "Coffee", category: "everyday",difficulty:"easy", related: ["Vatten", "Mjölk"], sentence: "På morgonen dricker jag kaffe." },
      { phrase: "Bröd", meaning: "Bread — a staple food, neuter gender (ett bröd)", translation: "Bread", category: "everyday",difficulty:"easy", related: ["Mat", "Äta"] },
      { phrase: "Mjölk", meaning: "Milk — common dairy product, en-word", translation: "Milk", category: "everyday",difficulty:"easy", related: ["Kaffe", "Vatten"] },
      { phrase: "Äpple", meaning: "Apple — a fruit, neuter gender (ett äpple)", translation: "Apple", category: "everyday",difficulty:"easy", related: ["Mat", "Bröd"] },
      { phrase: "Hus", meaning: "House — a building for living, neuter gender (ett hus)", translation: "House", category: "everyday",difficulty:"easy", related: ["Bord", "Stol", "Hotellet"], sentence: "Huset ligger vid sjön." },
      { phrase: "Bok", meaning: "Book — a reading material, en-word (en bok)", translation: "Book", category: "everyday",difficulty:"easy", related: ["Läsa", "Skriva"], sentence: "Jag läser en bok på kvällen." },
      { phrase: "Stol", meaning: "Chair — a piece of furniture, en-word", translation: "Chair", category: "everyday",difficulty:"easy", related: ["Bord", "Hus"] },
      { phrase: "Bord", meaning: "Table — a piece of furniture, neuter gender (ett bord)", translation: "Table", category: "everyday",difficulty:"easy", related: ["Stol", "Hus"] },
      { phrase: "Barn", meaning: "Child — a young person, neuter gender (ett barn)", translation: "Child", category: "everyday",difficulty:"easy", related: ["Familj", "Vän"] },
      { phrase: "Vän", meaning: "Friend — a person you know well, en-word (en vän)", translation: "Friend", category: "everyday",difficulty:"easy", related: ["Familj", "Barn"] },
      { phrase: "Familj", meaning: "Family — a group of related people", translation: "Family", category: "everyday",difficulty:"easy", related: ["Barn", "Vän"] },
      { phrase: "Jag är", meaning: "I am — first person singular of 'to be' (vara)", translation: "I am", category: "grammar",difficulty:"medium", related: ["Du är", "Han/Hon är", "Vi är", "De är", "Jag har"], sentence: "Jag är lärare." },
      { phrase: "Du är", meaning: "You are — second person singular of 'to be'", translation: "You are", category: "grammar",difficulty:"medium", related: ["Jag är", "Han/Hon är", "Vi är", "De är", "Du har"] },
      { phrase: "Han/Hon är", meaning: "He/She is — third person singular of 'to be'", translation: "He/She is", category: "grammar",difficulty:"medium", related: ["Jag är", "Du är", "Vi är", "De är"] },
      { phrase: "Vi är", meaning: "We are — first person plural of 'to be'", translation: "We are", category: "grammar",difficulty:"medium", related: ["Jag är", "Du är", "Han/Hon är", "De är"] },
      { phrase: "De är", meaning: "They are — third person plural of 'to be'. Note: 'De' is pronounced 'dom'", translation: "They are", category: "grammar",difficulty:"medium", related: ["Jag är", "Du är", "Han/Hon är", "Vi är"] },
      { phrase: "Jag har", meaning: "I have — first person singular of 'to have' (ha)", translation: "I have", category: "grammar",difficulty:"medium", related: ["Du har", "Jag är"] },
      { phrase: "Du har", meaning: "You have — second person singular of 'to have'", translation: "You have", category: "grammar",difficulty:"medium", related: ["Jag har", "Du är"] },
      { phrase: "Inte", meaning: "Not — the negation word, placed after the verb in main clauses", translation: "Not", category: "grammar",difficulty:"medium", related: ["Inte — negation placement"], sentence: "Jag äter inte kött." },
      { phrase: "från", meaning: "From — preposition indicating origin or source. 'Kommer från' = comes from", translation: "From", category: "grammar",difficulty:"medium", related: ["Till", "Jag kommer från..."], sentence: "Jag kommer ___ Sverige.", blankAnswer: "från" },
      { phrase: "till", meaning: "To — preposition indicating direction. 'Går till' = goes to", translation: "To", category: "grammar",difficulty:"medium", related: ["Från", "Gå"], sentence: "Jag går ___ skolan.", blankAnswer: "till" },
      { phrase: "på", meaning: "On/At — versatile preposition. 'På bordet' = on the table, 'på jobbet' = at work", translation: "On/At", category: "grammar",difficulty:"medium", related: ["I", "Vid"], sentence: "Boken ligger ___ bordet.", blankAnswer: "på" },
      { phrase: "i", meaning: "In — preposition for enclosed spaces and locations. 'I rummet' = in the room", translation: "In", category: "grammar",difficulty:"medium", related: ["På", "Vid"], sentence: "Han är ___ köket och lagar mat.", blankAnswer: "i" },
      { phrase: "vid", meaning: "By/At/Next to — preposition indicating proximity. 'Vid sjön' = by the lake", translation: "By/Next to", category: "grammar",difficulty:"medium", related: ["På", "I"], sentence: "Huset ligger ___ sjön.", blankAnswer: "vid" },
      { phrase: "En", meaning: "Indefinite article for common gender nouns (en-words) — e.g., en bok, en stol", translation: "A/An (common)", category: "grammar",difficulty:"medium", related: ["Ett"] },
      { phrase: "Ett", meaning: "Indefinite article for neuter gender nouns (ett-words) — e.g., ett hus, ett bord", translation: "A/An (neuter)", category: "grammar",difficulty:"medium", related: ["En"] },
      { phrase: "Var är...?", meaning: "Where is...? — a question phrase used to ask for location", translation: "Where is...?", category: "travel",difficulty:"medium", related: ["Stationen", "Hotellet", "Flygplatsen"], sentence: "Var är stationen?" },
      { phrase: "Höger", meaning: "Right — direction (till höger = to the right)", translation: "Right", category: "travel",difficulty:"medium", related: ["Vänster", "Rakt fram"], sentence: "Ta höger vid kyrkan." },
      { phrase: "Vänster", meaning: "Left — direction (till vänster = to the left)", translation: "Left", category: "travel",difficulty:"medium", related: ["Höger", "Rakt fram"], sentence: "Sväng vänster vid bron." },
      { phrase: "Rakt fram", meaning: "Straight ahead — direction for going forward", translation: "Straight ahead", category: "travel",difficulty:"medium", related: ["Höger", "Vänster"], sentence: "Gå rakt fram till torget." },
      { phrase: "Stationen", meaning: "The station — definite form of 'station', a common place", translation: "The station", category: "travel",difficulty:"medium", related: ["Tåget", "Bussen"] },
      { phrase: "Tåget", meaning: "The train — definite form of 'tåg' (neuter)", translation: "The train", category: "travel",difficulty:"medium", related: ["Stationen", "Bussen"], sentence: "Tåget kommer klockan åtta." },
      { phrase: "Bussen", meaning: "The bus — definite form of 'buss' (common)", translation: "The bus", category: "travel",difficulty:"medium", related: ["Stationen", "Tåget"], sentence: "Bussen går om tio minuter." },
      { phrase: "Flygplatsen", meaning: "The airport — definite form of 'flygplats'", translation: "The airport", category: "travel",difficulty:"medium", related: ["Hotellet", "Stationen"], sentence: "Hur kommer jag till flygplatsen?" },
      { phrase: "Hotellet", meaning: "The hotel — definite form of 'hotell' (neuter)", translation: "The hotel", category: "travel",difficulty:"medium", related: ["Flygplatsen", "Stationen"], sentence: "Hotellet ligger vid stranden." },
      { phrase: "Restaurang", meaning: "Restaurant — a place to eat out", translation: "Restaurant", category: "travel",difficulty:"medium", related: ["Mat", "Äta"], sentence: "Restaurangen har god mat." },
      { phrase: "Skola", meaning: "School — an educational institution. En skola, flera skolor", translation: "School", category: "everyday",difficulty:"easy", related: ["Lärare", "Elev", "Klass"], sentence: "Barnen går till skolan varje dag." },
      { phrase: "Lärare", meaning: "Teacher — a person who teaches. En lärare (masc.), en lärarinna (fem., dated)", translation: "Teacher", category: "everyday",difficulty:"easy", related: ["Elev", "Skola", "Studera"], sentence: "Läraren är snäll och hjälpsam." },
      { phrase: "Elev", meaning: "Student/pupil — a person who studies at a school. En elev, flera elever", translation: "Student", category: "everyday",difficulty:"easy", related: ["Lärare", "Skola", "Klass"], sentence: "Eleverna lyssnar på läraren." },
      { phrase: "Klass", meaning: "Class — a group of students who study together. En klass, flera klasser", translation: "Class", category: "everyday",difficulty:"easy", related: ["Elev", "Skola", "Lektion"], sentence: "Vi har en liten klass i svenska." },
      { phrase: "Lektio n", meaning: "Lesson — a teaching period. En lektion, flera lektioner", translation: "Lesson", category: "everyday",difficulty:"easy", related: ["Klass", "Lärare", "Studera"], sentence: "Lektionen börjar klockan nio." },
      { phrase: "Modig", meaning: "Brave/courageous — a positive character trait. En modig person", translation: "Brave", category: "grammar",difficulty:"medium", related: ["Rädd", "Stark"], sentence: "Hon är modig och stark." },
      { phrase: "Rädd", meaning: "Afraid/scared — describing fear. 'Var inte rädd!' = Don't be afraid!", translation: "Afraid", category: "grammar",difficulty:"medium", related: ["Modig", "Feg"], sentence: "Var inte rädd för mörkret." },
      { phrase: "Stark", meaning: "Strong — describing physical strength or character. En stark person, ett starkt kaffe", translation: "Strong", category: "grammar",difficulty:"medium", related: ["Modig", "Svag"], sentence: "Han är stark och frisk." },
      { phrase: "Svag", meaning: "Weak — describing lack of strength. Motsatsen till 'stark'", translation: "Weak", category: "grammar",difficulty:"medium", related: ["Stark", "Rädd"], sentence: "Jag känner mig svag idag." },
      { phrase: "Vänlig", meaning: "Kind/friendly — describing a warm and helpful person. En vänlig själ", translation: "Kind", category: "grammar",difficulty:"medium", related: ["Snäll", "Elak"], sentence: "Hon är alltid vänlig mot alla." },
      { phrase: "Elak", meaning: "Mean/cruel — describing someone who intentionally hurts others. Motsats till 'snäll'", translation: "Mean", category: "grammar",difficulty:"medium", related: ["Vänlig", "Snäll", "Grym"], sentence: "Han var elak mot de andra barnen." }
    ]
  },

  // ========== COURSE 2: På Svenska 1 ==========
  {
    id: "pa-svenska1",
    name: "På Svenska 1 — Swedish A1–A2",
    categories: [
      { id: "intro", name: "Introductions & Social", nameSv: "Introduktioner & Socialt", color: "#4fc3f7" },
      { id: "daily", name: "Daily Life", nameSv: "Vardagsliv", color: "#81c784" },
      { id: "numbers", name: "Numbers & Time", nameSv: "Siffror & Tid", color: "#ffb74d" },
      { id: "adj", name: "Adjectives & Descriptions", nameSv: "Adjektiv & Beskrivningar", color: "#e57373" }
    ],
    entries: [
      { phrase: "God morgon", meaning: "Good morning — used until about 10 AM", translation: "Good morning", category: "intro",difficulty:"easy", related: ["God kväll", "God natt"] },
      { phrase: "God kväll", meaning: "Good evening — used after about 6 PM", translation: "Good evening", category: "intro",difficulty:"easy", related: ["God morgon", "God natt"] },
      { phrase: "God natt", meaning: "Good night — said when going to bed or leaving late", translation: "Good night", category: "intro",difficulty:"easy", related: ["God morgon", "God kväll", "Sov gott"] },
      { phrase: "Vi ses", meaning: "See you — informal goodbye, implying a future meeting", translation: "See you", category: "intro",difficulty:"easy", related: ["Vi hörs", "Hejdå"] },
      { phrase: "Vi hörs", meaning: "Talk to you later — literally 'we hear each other', used for phone/chat", translation: "Talk later", category: "intro",difficulty:"easy", related: ["Vi ses", "Hejdå"] },
      { phrase: "Ha en bra dag", meaning: "Have a good day — a friendly farewell wish", translation: "Have a nice day", category: "intro",difficulty:"easy", related: ["Sov gott"] },
      { phrase: "Sov gott", meaning: "Sleep well — said before someone goes to bed", translation: "Sleep well", category: "intro",difficulty:"easy", related: ["God natt", "Ha en bra dag"] },
      { phrase: "Lycka till", meaning: "Good luck — wishing someone success", translation: "Good luck", category: "intro",difficulty:"easy", related: ["Grattis"] },
      { phrase: "Grattis", meaning: "Congratulations — short for 'grattis på födelsedagen' or general congratulations", translation: "Congrats", category: "intro",difficulty:"easy", related: ["Lycka till"] },
      { phrase: "Skål", meaning: "Cheers — said when clinking glasses before drinking", translation: "Cheers", category: "intro",difficulty:"easy" },
      { phrase: "Gå", meaning: "To go/walk — an irregular verb: går, gick, gått", translation: "Go/Walk", category: "daily",difficulty:"medium", related: ["Komma"], sentence: "Jag går till skolan varje dag." },
      { phrase: "Komma", meaning: "To come — irregular verb: kommer, kom, kommit", translation: "Come", category: "daily",difficulty:"medium", related: ["Gå", "Bo"], sentence: "Kommer du imorgon?" },
      { phrase: "Äta", meaning: "To eat — regular verb in group 2: äter, åt, ätit", translation: "Eat", category: "daily",difficulty:"medium", related: ["Dricka", "Mat", "Laga mat"], sentence: "Nu äter vi frukost." },
      { phrase: "Dricka", meaning: "To drink — strong verb: dricker, drack, druckit", translation: "Drink", category: "daily",difficulty:"medium", related: ["Äta", "Vatten", "Kaffe"], sentence: "Vad dricker du till maten?" },
      { phrase: "Sova", meaning: "To sleep — strong verb: sover, sov, sovit", translation: "Sleep", category: "daily",difficulty:"medium", related: ["Trött", "Sov gott"], sentence: "Jag sover åtta timmar varje natt." },
      { phrase: "Läsa", meaning: "To read — regular group 2 verb: läser, läste, läst", translation: "Read", category: "daily",difficulty:"medium", related: ["Skriva", "Bok"], sentence: "Jag läser en bok på kvällen." },
      { phrase: "Skriva", meaning: "To write — strong verb: skriver, skrev, skrivit", translation: "Write", category: "daily",difficulty:"medium", related: ["Läsa", "Bok"], sentence: "Hon skriver ett brev till sin mamma." },
      { phrase: "Tala", meaning: "To speak — regular group 1 verb: talar, talade, talat", translation: "Speak", category: "daily",difficulty:"medium", related: ["Förstå", "Infinitiv — att tala"], sentence: "Talar du svenska?" },
      { phrase: "Förstå", meaning: "To understand — irregular verb: förstår, förstod, förstått", translation: "Understand", category: "daily",difficulty:"medium", related: ["Tala"], sentence: "Jag förstår inte den här texten." },
      { phrase: "Arbeta", meaning: "To work — regular group 1 verb: arbetar, arbetade, arbetat", translation: "Work", category: "daily",difficulty:"medium", related: ["Handla", "Bo"], sentence: "Var arbetar du?" },
      { phrase: "Bo", meaning: "To live (somewhere) — regular group 3 verb: bor, bodde, bott", translation: "Live", category: "daily",difficulty:"medium", related: ["Komma", "Jag kommer från...", "Arbeta"], sentence: "Var bor du?" },
      { phrase: "Handla", meaning: "To shop — regular group 1 verb: handlar, handlade, handlat", translation: "Shop", category: "daily",difficulty:"medium", related: ["Arbeta", "Laga mat"], sentence: "Jag handlar mat på ICA." },
      { phrase: "Laga mat", meaning: "To cook — literally 'fix food', a common phrase", translation: "Cook", category: "daily",difficulty:"medium", related: ["Äta", "Handla", "Mat"], sentence: "Idag lagar jag mat hemma." },
      { phrase: "Ett", meaning: "One — the number 1", translation: "One", category: "numbers",difficulty:"easy", related: ["Två", "Tre"] },
      { phrase: "Två", meaning: "Two — the number 2", translation: "Two", category: "numbers",difficulty:"easy", related: ["Ett", "Tre", "Fyra"] },
      { phrase: "Tre", meaning: "Three — the number 3", translation: "Three", category: "numbers",difficulty:"easy", related: ["Två", "Fyra", "Fem"] },
      { phrase: "Fyra", meaning: "Four — the number 4", translation: "Four", category: "numbers",difficulty:"easy", related: ["Tre", "Fem", "Sex"] },
      { phrase: "Fem", meaning: "Five — the number 5", translation: "Five", category: "numbers",difficulty:"easy", related: ["Fyra", "Sex", "Sju"] },
      { phrase: "Sex", meaning: "Six — the number 6", translation: "Six", category: "numbers",difficulty:"easy", related: ["Fem", "Sju", "Åtta"] },
      { phrase: "Sju", meaning: "Seven — the number 7", translation: "Seven", category: "numbers",difficulty:"easy", related: ["Sex", "Åtta", "Nio"] },
      { phrase: "Åtta", meaning: "Eight — the number 8", translation: "Eight", category: "numbers",difficulty:"easy", related: ["Sju", "Nio", "Tio"] },
      { phrase: "Nio", meaning: "Nine — the number 9", translation: "Nine", category: "numbers",difficulty:"easy", related: ["Åtta", "Tio"] },
      { phrase: "Tio", meaning: "Ten — the number 10", translation: "Ten", category: "numbers",difficulty:"easy", related: ["Nio", "Sju", "Åtta"] },
      { phrase: "Klockan är...", meaning: "The time is... — used to tell the time e.g. 'Klockan är tio' (it's ten o'clock)", translation: "It's... o'clock", category: "numbers",difficulty:"easy", related: ["Halv", "Kvart"] },
      { phrase: "Halv", meaning: "Half — used in telling time: 'halv åtta' = 7:30 (half past seven, but literally 'half to eight')", translation: "Half", category: "numbers",difficulty:"easy", related: ["Klockan är...", "Kvart"] },
      { phrase: "Kvart", meaning: "Quarter — used in time: 'kvart över' = quarter past, 'kvart i' = quarter to", translation: "Quarter", category: "numbers",difficulty:"easy", related: ["Klockan är...", "Halv"] },
      { phrase: "Idag", meaning: "Today — the current day", translation: "Today", category: "daily",difficulty:"medium", related: ["Imorgon", "Igår"] },
      { phrase: "Imorgon", meaning: "Tomorrow — the day after today", translation: "Tomorrow", category: "daily",difficulty:"medium", related: ["Idag", "Igår"], sentence: "Imorgon ska jag resa till Stockholm." },
      { phrase: "Igår", meaning: "Yesterday — the day before today", translation: "Yesterday", category: "daily",difficulty:"medium", related: ["Idag", "Imorgon"], sentence: "Igår var jag hemma hela dagen." },
      { phrase: "Vecka", meaning: "Week — a seven-day period", translation: "Week", category: "numbers",difficulty:"easy", related: ["Måndag", "Fredag", "Söndag"] },
      { phrase: "Måndag", meaning: "Monday — first day of the Swedish work week", translation: "Monday", category: "numbers",difficulty:"easy", related: ["Tisdag", "Vecka"], sentence: "På måndag börjar kursen." },
      { phrase: "Tisdag", meaning: "Tuesday — second day", translation: "Tuesday", category: "numbers",difficulty:"easy", related: ["Måndag", "Onsdag"] },
      { phrase: "Onsdag", meaning: "Wednesday — third day", translation: "Wednesday", category: "numbers",difficulty:"easy", related: ["Tisdag", "Torsdag"] },
      { phrase: "Torsdag", meaning: "Thursday — fourth day", translation: "Thursday", category: "numbers",difficulty:"easy", related: ["Onsdag", "Fredag"] },
      { phrase: "Fredag", meaning: "Friday — fifth day, often 'fredagsmys' (cozy Friday)", translation: "Friday", category: "numbers",difficulty:"easy", related: ["Torsdag", "Lördag", "Vecka"] },
      { phrase: "Lördag", meaning: "Saturday — sixth day", translation: "Saturday", category: "numbers",difficulty:"easy", related: ["Fredag", "Söndag"] },
      { phrase: "Söndag", meaning: "Sunday — seventh day", translation: "Sunday", category: "numbers",difficulty:"easy", related: ["Lördag", "Vecka"] },
      { phrase: "Stor", meaning: "Big/Large — adjective, en-form: stor, ett-form: stort, plural: stora", translation: "Big", category: "adj",difficulty:"medium", related: ["Liten", "Ny"], sentence: "Det är ett stort hus." },
      { phrase: "Liten", meaning: "Small — adjective, en-form: liten, ett-form: litet, plural: små", translation: "Small", category: "adj",difficulty:"medium", related: ["Stor", "Gammal"], sentence: "Hon har en liten katt." },
      { phrase: "Vacker", meaning: "Beautiful — adjective describing appearance", translation: "Beautiful", category: "adj",difficulty:"medium", related: ["Snäll"] },
      { phrase: "Snäll", meaning: "Kind/Nice — describing a person's character", translation: "Kind", category: "adj",difficulty:"medium", related: ["Vacker", "Rolig"] },
      { phrase: "Rolig", meaning: "Fun/Funny — describing something entertaining or amusing", translation: "Fun", category: "adj",difficulty:"medium", related: ["Snäll", "Glad"] },
      { phrase: "Trött", meaning: "Tired — describing a state of fatigue", translation: "Tired", category: "adj",difficulty:"medium", related: ["Sova"] },
      { phrase: "Glad", meaning: "Happy — describing a joyful emotional state", translation: "Happy", category: "adj",difficulty:"medium", related: ["Ledsen", "Rolig"], sentence: "Jag är glad idag." },
      { phrase: "Ledsen", meaning: "Sad — describing a sorrowful emotional state", translation: "Sad", category: "adj",difficulty:"medium", related: ["Glad"], sentence: "Varför är du ledsen?" },
      { phrase: "Ny", meaning: "New — describing something recent or unused", translation: "New", category: "adj",difficulty:"medium", related: ["Gammal", "Stor"], sentence: "Jag har en ny bil." },
      { phrase: "Gammal", meaning: "Old — describing age or something ancient", translation: "Old", category: "adj",difficulty:"medium", related: ["Ny", "Liten"], sentence: "Mormor är gammal men frisk." },
      { phrase: "Bra", meaning: "Good — positive quality, does not change form", translation: "Good", category: "adj",difficulty:"medium", related: ["Dålig"], sentence: "Det är en bra bok." },
      { phrase: "Dålig", meaning: "Bad — negative quality", translation: "Bad", category: "adj",difficulty:"medium", related: ["Bra"], sentence: "Maten var dålig igår." },
      { phrase: "Jobbet", meaning: "The job/work — definite form of 'jobb' (ett-ord). 'På jobbet' = at work", translation: "The job", category: "daily",difficulty:"medium", related: ["Kontoret", "Chef", "Arbeta"], sentence: "Jag trivs på jobbet." },
      { phrase: "Chef", meaning: "Boss/manager — a person who manages others at work. En chef, flera chefer", translation: "Boss", category: "daily",difficulty:"medium", related: ["Jobbet", "Kollegor", "Möte"], sentence: "Chefen är borta idag." },
      { phrase: "Kollegor", meaning: "Colleagues/co-workers — people you work with. En kollega, flera kollegor", translation: "Colleagues", category: "daily",difficulty:"medium", related: ["Jobbet", "Chef", "Möte"], sentence: "Mina kollegor är trevliga." },
      { phrase: "Möte", meaning: "Meeting — a gathering for work discussions. Ett möte, flera möten", translation: "Meeting", category: "daily",difficulty:"medium", related: ["Jobbet", "Chef", "Kollegor"], sentence: "Mötet börjar klockan tio." },
      { phrase: "Kontoret", meaning: "The office — the physical workplace. Definite form of 'kontor' (ett-ord)", translation: "The office", category: "daily",difficulty:"medium", related: ["Jobbet", "Möte", "Arbeta"], sentence: "Kontoret ligger i centrum." },
      { phrase: "Berätta", meaning: "To tell/narrate — a common communication verb. Berättar, berättade, berättat", translation: "Tell/Narrate", category: "daily",difficulty:"medium", related: ["Tala", "Förklara", "Diskutera"], sentence: "Kan du berätta en historia?" },
      { phrase: "Förklara", meaning: "To explain — making something clear and understandable", translation: "Explain", category: "daily",difficulty:"medium", related: ["Berätta", "Förstå", "Tala"], sentence: "Läraren förklarar grammatiken." },
      { phrase: "Diskutera", meaning: "To discuss — exchanging ideas and opinions about a topic", translation: "Discuss", category: "daily",difficulty:"medium", related: ["Berätta", "Förklara", "Möte"], sentence: "Vi diskuterar frågan på mötet." },
      { phrase: "Samtal", meaning: "Conversation/dialogue — a talk between two or more people. Ett samtal, flera samtal", translation: "Conversation", category: "daily",difficulty:"medium", related: ["Diskutera", "Prat", "Möte"], sentence: "Vi hade ett långt samtal igår." },
      { phrase: "Makt", meaning: "Power — the ability to influence or control others. En makt, ingen plural", translation: "Power", category: "daily",difficulty:"medium", related: ["Chef", "Inflytande", "Ledare"], sentence: "Makt kan användas på gott och ont." },
      { phrase: "Påverka", meaning: "To influence/affect — to have an effect on someone or something", translation: "Influence", category: "daily",difficulty:"medium", related: ["Makt", "Övertyga", "Diskutera"], sentence: "Reklamen påverkar våra val." },
      { phrase: "i", meaning: "In — preposition used with months, years, and seasons", translation: "In (time)", category: "daily",difficulty:"medium", related: ["På", "Om"], sentence: "Vi åker till Sverige ___ juli.", blankAnswer: "i" },
      { phrase: "om", meaning: "In/About — future time ('om en timme') or topic ('prata om')", translation: "In (future)/About", category: "daily",difficulty:"medium", related: ["I", "På"], sentence: "Mötet börjar ___ tio minuter.", blankAnswer: "om" },
      { phrase: "för", meaning: "For/Ago — used in 'för...sedan' (ago) or 'tack för' (thanks for)", translation: "For/Ago", category: "daily",difficulty:"medium", related: ["Sedan", "Om"], sentence: "Jag flyttade hit ___ ett år sedan.", blankAnswer: "för" },
      { phrase: "med", meaning: "With — preposition indicating accompaniment or tool", translation: "With", category: "daily",difficulty:"medium", related: ["Utan", "För"], sentence: "Jag åker ___ tåget till Stockholm.", blankAnswer: "med" }
    ]
  },

  // ========== COURSE 3: Form i fokus — Swedish Grammar ==========
  {
    id: "form-fokus",
    name: "Form i fokus — Swedish Grammar",
    categories: [
      { id: "verbs", name: "Verb Tenses", nameSv: "Verbtempus", color: "#4fc3f7" },
      { id: "nouns", name: "Noun Forms", nameSv: "Substantivformer", color: "#81c784" },
      { id: "pronouns", name: "Pronouns & Possessives", nameSv: "Pronomen & Possessiver", color: "#ffb74d" },
      { id: "syntax", name: "Sentence Structure", nameSv: "Meningsstruktur", color: "#ba68c8" }
    ],
    entries: [
      { phrase: "Infinitiv — att tala", meaning: "Infinitive form — 'to speak'. Swedish infinitives most often end in -a. Used with 'att'", translation: "to speak (infinitive)", category: "verbs",difficulty:"medium", related: ["Presens — talar", "Preteritum — talade", "Supinum — har talat", "Futurum — ska tala", "Imperativ — Tala!"], sentence: "Jag vill tala svenska." },
      { phrase: "Presens — talar", meaning: "Present tense — speaks/am speaking. Formed by adding -r to the infinitive (group 1) or -er (group 2)", translation: "speak/speaks (present)", category: "verbs",difficulty:"medium", related: ["Infinitiv — att tala", "Preteritum — talade", "Perfekt — har talat"] },
      { phrase: "Preteritum — talade", meaning: "Past tense (imperfect) — spoke. Group 1 adds -de, group 2 adds -te, strong verbs change vowel", translation: "spoke (past)", category: "verbs",difficulty:"medium", related: ["Infinitiv — att tala", "Presens — talar", "Pluskvamperfekt — hade talat"], sentence: "Igår talade jag med läraren." },
      { phrase: "Supinum — har talat", meaning: "Supine — used with 'har' to form perfect tense. Group 1 ends in -at, group 2 in -t, strong verbs often in -it", translation: "have spoken (supine)", category: "verbs",difficulty:"medium", related: ["Infinitiv — att tala", "Perfekt — har talat", "Pluskvamperfekt — hade talat"], sentence: "Jag har talat med henne." },
      { phrase: "Perfekt — har talat", meaning: "Perfect tense — have/has spoken. Formed with 'har' + supinum. Describes past actions with present relevance", translation: "have spoken (perfect)", category: "verbs",difficulty:"medium", related: ["Infinitiv — att tala", "Supinum — har talat", "Pluskvamperfekt — hade talat"] },
      { phrase: "Pluskvamperfekt — hade talat", meaning: "Pluperfect tense — had spoken. Formed with 'hade' + supinum. Describes action before another past action", translation: "had spoken (pluperfect)", category: "verbs",difficulty:"medium", related: ["Infinitiv — att tala", "Preteritum — talade", "Perfekt — har talat"] },
      { phrase: "Futurum — ska tala", meaning: "Future tense — will speak. Formed with 'ska' (or 'kommer att') + infinitive", translation: "will speak (future)", category: "verbs",difficulty:"medium", related: ["Infinitiv — att tala", "Presens — talar"] },
      { phrase: "Imperativ — Tala!", meaning: "Imperative mood — Speak! The command form. Usually the verb stem without -a (Group 1) or just the stem", translation: "Speak! (imperative)", category: "verbs",difficulty:"medium", related: ["Infinitiv — att tala", "Presens — talar"] },
      { phrase: "Obestämd form singular — en bok", meaning: "Indefinite singular — 'a book'. En-words use 'en', ett-words use 'ett' as the indefinite article", translation: "a book (indef. sing.)", category: "nouns",difficulty:"medium", related: ["Bestämd form singular — boken", "Obestämd form plural — böcker", "Bestämd form plural — böckerna"] },
      { phrase: "Bestämd form singular — boken", meaning: "Definite singular — 'the book'. En-words add -en, ett-words add -et, or -t if the noun already ends in a vowel", translation: "the book (def. sing.)", category: "nouns",difficulty:"medium", related: ["Obestämd form singular — en bok", "Obestämd form plural — böcker", "Bestämd form plural — böckerna"] },
      { phrase: "Obestämd form plural — böcker", meaning: "Indefinite plural — 'books'. Plural endings vary: -or (en-words ending in -a), -ar (en-words), -er (en-words), -n (ett-words)", translation: "books (indef. pl.)", category: "nouns",difficulty:"medium", related: ["Obestämd form singular — en bok", "Bestämd form singular — boken", "Bestämd form plural — böckerna"] },
      { phrase: "Bestämd form plural — böckerna", meaning: "Definite plural — 'the books'. Formed by adding -na, -a, or -en to the indefinite plural", translation: "the books (def. pl.)", category: "nouns",difficulty:"medium", related: ["Obestämd form singular — en bok", "Bestämd form singular — boken", "Obestämd form plural — böcker"] },
      { phrase: "Jag", meaning: "I — first person singular subject pronoun", translation: "I", category: "pronouns",difficulty:"medium", related: ["Du", "Han / Hon / Den / Det", "Vi", "Ni", "De"] },
      { phrase: "Du", meaning: "You — second person singular subject pronoun (informal in modern Swedish)", translation: "You (singular)", category: "pronouns",difficulty:"medium", related: ["Jag", "Han / Hon / Den / Det", "Ni", "De"] },
      { phrase: "Han / Hon / Den / Det", meaning: "He / She / It — third person singular subject pronouns. 'Den' for en-words, 'det' for ett-words", translation: "He/She/It", category: "pronouns",difficulty:"medium", related: ["Jag", "Du", "De"] },
      { phrase: "Vi", meaning: "We — first person plural subject pronoun", translation: "We", category: "pronouns",difficulty:"medium", related: ["Jag", "Ni", "De"] },
      { phrase: "Ni", meaning: "You (plural) — second person plural subject pronoun", translation: "You (plural)", category: "pronouns",difficulty:"medium", related: ["Du", "Vi", "De"] },
      { phrase: "De", meaning: "They — third person plural subject pronoun. Pronounced 'dom' in speech", translation: "They", category: "pronouns",difficulty:"medium", related: ["Jag", "Du", "Han / Hon / Den / Det", "Vi", "Ni"] },
      { phrase: "Min / Mitt / Mina", meaning: "My/mine — possessive for en-words (min bok), ett-words (mitt hus), plural (mina böcker)", translation: "My/Mine", category: "pronouns",difficulty:"medium", related: ["Din / Ditt / Dina", "Vår / Vårt / Våra"] },
      { phrase: "Din / Ditt / Dina", meaning: "Your/yours (singular) — follows the same en/ett/plural pattern as 'min'", translation: "Your/Yours", category: "pronouns",difficulty:"medium", related: ["Min / Mitt / Mina", "Er / Ert / Era"] },
      { phrase: "Hans / Hennes / Dess", meaning: "His / Her / Its — third person possessive forms that do not change by gender/number", translation: "His/Her/Its", category: "pronouns",difficulty:"medium", related: ["Deras"] },
      { phrase: "Vår / Vårt / Våra", meaning: "Our/ours — first person plural possessive, follows en/ett/plural pattern", translation: "Our/Ours", category: "pronouns",difficulty:"medium", related: ["Min / Mitt / Mina", "Er / Ert / Era"] },
      { phrase: "Er / Ert / Era", meaning: "Your/yours (plural) — second person plural possessive", translation: "Your/Yours (pl.)", category: "pronouns",difficulty:"medium", related: ["Din / Ditt / Dina", "Vår / Vårt / Våra"] },
      { phrase: "Deras", meaning: "Their/theirs — third person plural possessive, does not change form", translation: "Their/Theirs", category: "pronouns",difficulty:"medium", related: ["Hans / Hennes / Dess"] },
      { phrase: "Sig / Sin / Sitt / Sina", meaning: "Reflexive possessive — used when the possessor is the subject. 'Han tvättar sig' (He washes himself). 'Han äter sin mat' (He eats his [own] food)", translation: "Himself/herself/itself (reflexive)", category: "pronouns",difficulty:"medium", related: ["Min / Mitt / Mina", "Din / Ditt / Dina"] },
      { phrase: "Rak ordföljd", meaning: "Main clause word order — Subject + Verb + Object. Swedish requires the verb in second position (V2 rule)", translation: "Straight word order", category: "syntax",difficulty:"hard", related: ["Omvänd ordföljd"] },
      { phrase: "Omvänd ordföljd", meaning: "Inverted word order — when the sentence begins with something other than the subject (e.g., an adverb), the verb still stays in second position and the subject moves after it", translation: "Inverted word order", category: "syntax",difficulty:"hard", related: ["Rak ordföljd"], sentence: "Idag äter jag frukost." },
      { phrase: "Inte — negation placement", meaning: "In main clauses, 'inte' is placed AFTER the verb. 'Jag äter inte kött.' In subordinate clauses, 'inte' comes BEFORE the verb", translation: "Not (negation placement)", category: "syntax",difficulty:"hard", related: ["Inte", "Bisats"], sentence: "Jag kan inte simma." },
      { phrase: "Frågor — ja/nej", meaning: "Yes/No questions are formed by placing the verb first: 'Äter du?' (Do you eat?). Answer with 'ja' or 'nej'", translation: "Yes/No questions", category: "syntax",difficulty:"hard", related: ["Frågeord"], sentence: "Talar du svenska?" },
      { phrase: "Frågeord", meaning: "Question words — Vad (what), Var (where), När (when), Varför (why), Hur (how), Vem (who). The verb stays in second position after the question word", translation: "Question words", category: "syntax",difficulty:"hard", related: ["Frågor — ja/nej"], sentence: "När kommer du hem?" },
      { phrase: "Bisats", meaning: "Subordinate clause — introduced by 'att', 'om', 'när', 'därför att', etc. Has different word order: 'Jag vet att han inte kommer'", translation: "Subordinate clause", category: "syntax",difficulty:"hard", related: ["Inte — negation placement", "Att — infinitivmärke vs konjunktion"], sentence: "Jag vet att du inte kommer." },
      { phrase: "Att — infinitivmärke vs konjunktion", meaning: "'att' has two uses: (1) as an infinitive marker ('Jag vill att äta'), (2) as a conjunction 'that' ('Jag vet att du är här')", translation: "To/That (infinitive vs conjunction)", category: "syntax",difficulty:"hard", related: ["Bisats", "Infinitiv — att tala"] },
      { phrase: "Som — relativpronomen", meaning: "Relative pronoun 'who/that/which' — 'Boken som jag läser är bra' (The book that I'm reading is good). Does not change form", translation: "Who/That/Which (relative)", category: "syntax",difficulty:"hard", related: ["Bisats"], sentence: "Boken som jag läser är bra." }
    ]
  },

  // ========== COURSE 4: Svenska idiom & Uttryck ==========
  {
    id: "svenska-idiom",
    name: "Svenska idiom — Idioms & Expressions",
    categories: [
      { id: "common", name: "Common Idioms", nameSv: "Vanliga Idiom", color: "#4fc3f7" },
      { id: "food", name: "Food-Related Expressions", nameSv: "Matrelaterade Uttryck", color: "#81c784" },
      { id: "nature", name: "Nature & Body Idioms", nameSv: "Natur & Kroppsidiom", color: "#ffb74d" },
      { id: "daily-expr", name: "Everyday Phrases", nameSv: "Vardagsfraser", color: "#e57373" }
    ],
    entries: [
      { phrase: "Det är ingen ko på isen", meaning: "There's no cow on the ice — meaning there's no rush or no danger. Everything is under control", translation: "No rush / No danger", category: "common",difficulty:"medium", related: ["Det är ingen fara"] },
      { phrase: "Att ligga i farstun", meaning: "To lie in the hallway — describing something obvious or right in front of you", translation: "To be staring you in the face", category: "common",difficulty:"medium" },
      { phrase: "Att kasta pärlor för svin", meaning: "To cast pearls before swine — wasting something valuable on someone who doesn't appreciate it", translation: "Casting pearls before swine", category: "common",difficulty:"medium" },
      { phrase: "Bättre sent än aldrig", meaning: "Better late than never — a saying about punctuality and effort", translation: "Better late than never", category: "common",difficulty:"medium" },
      { phrase: "Det är ingen fara", meaning: "There's no danger — used to reassure someone, meaning 'don't worry' or 'no problem'", translation: "No worries / It's fine", category: "common",difficulty:"medium", related: ["Det är ingen ko på isen", "Det spelar ingen roll"] },
      { phrase: "Att ha en räv bakom örat", meaning: "To have a fox behind the ear — meaning someone is cunning or sly", translation: "To be crafty/sly", category: "common",difficulty:"medium", related: ["Ha huvudet på skaft"] },
      { phrase: "Att vara ute och cykla", meaning: "To be out cycling — meaning someone is completely wrong or confused about something", translation: "To be way off / mistaken", category: "common",difficulty:"medium" },
      { phrase: "Nu är det jul igen", meaning: "Now it's Christmas again — said when something happens again or repeats", translation: "Here we go again", category: "common",difficulty:"medium" },
      { phrase: "Att ta bladet från munnen", meaning: "To take the leaf from one's mouth — meaning to speak frankly and say what you really think", translation: "To speak one's mind", category: "common",difficulty:"medium", related: ["Ha huvudet på skaft"] },
      { phrase: "Att vara i sitt esse", meaning: "To be in one's element — doing what you are best at or feel most comfortable with", translation: "To be in one's element", category: "common",difficulty:"medium" },
      { phrase: "Att känna sig som en fisk på torra land", meaning: "To feel like a fish on dry land — feeling out of place or uncomfortable", translation: "To be out of one's element", category: "food",difficulty:"medium", related: ["Som en fågel i bur"] },
      { phrase: "Som en fågel i bur", meaning: "Like a bird in a cage — feeling trapped or restricted", translation: "Caged in", category: "nature",difficulty:"medium", related: ["Att känna sig som en fisk på torra land"] },
      { phrase: "Som ett brev på posten", meaning: "Like a letter in the mail — meaning something is sure or guaranteed to happen", translation: "As sure as clockwork", category: "common",difficulty:"medium" },
      { phrase: "Att lägga benen på ryggen", meaning: "To put one's legs on one's back — meaning to run away quickly or flee", translation: "To flee / run for it", category: "nature",difficulty:"medium" },
      { phrase: "Ha huvudet på skaft", meaning: "To have one's head on a handle — meaning to be sharp, quick-witted, and alert", translation: "To be quick-witted", category: "nature",difficulty:"medium", related: ["Sätta fingret på", "Att ta bladet från munnen", "Att ha en räv bakom örat"] },
      { phrase: "Sätta fingret på", meaning: "To put one's finger on something — to identify or pinpoint exactly what's wrong or important", translation: "To put one's finger on it", category: "nature",difficulty:"medium", related: ["Ha huvudet på skaft"] },
      { phrase: "Koka soppa på en spik", meaning: "To cook soup on a nail — making something out of nothing, or making do with limited resources", translation: "To make something from nothing", category: "food",difficulty:"medium", related: ["Lätt som en plätt", "Bitter som en citron"] },
      { phrase: "Att äta ur handen på någon", meaning: "To eat out of someone's hand — being completely charmed or controlled by someone", translation: "Eat out of someone's hand", category: "food",difficulty:"medium" },
      { phrase: "Bitter som en citron", meaning: "Bitter as a lemon — describing a very bitter or resentful person", translation: "Bitter as a lemon", category: "food",difficulty:"medium", related: ["Koka soppa på en spik"] },
      { phrase: "Glad som en lärka", meaning: "Happy as a lark — describing someone very cheerful and carefree", translation: "Happy as a lark", category: "nature",difficulty:"medium" },
      { phrase: "Stark som en oxe", meaning: "Strong as an ox — describing physical strength", translation: "Strong as an ox", category: "nature",difficulty:"medium", related: ["Hungrig som en varg", "Fattig som en kyrkråtta", "Tyst som en mus"] },
      { phrase: "Hungrig som en varg", meaning: "Hungry as a wolf — describing extreme hunger", translation: "Starving / Hungry as a wolf", category: "nature",difficulty:"medium", related: ["Stark som en oxe", "Fattig som en kyrkråtta"] },
      { phrase: "Fattig som en kyrkråtta", meaning: "Poor as a church mouse — describing poverty", translation: "Poor as a church mouse", category: "nature",difficulty:"medium", related: ["Stark som en oxe", "Hungrig som en varg"] },
      { phrase: "Tyst som en mus", meaning: "Quiet as a mouse — describing someone very quiet", translation: "Quiet as a mouse", category: "nature",difficulty:"medium", related: ["Stark som en oxe"] },
      { phrase: "Lätt som en plätt", meaning: "Easy as a pancake — describing something very simple. 'Plätt' is a small Swedish pancake", translation: "Easy as pie", category: "food",difficulty:"medium", related: ["Koka soppa på en spik"] },
      { phrase: "Vad heter det?", meaning: "What is it called? — filler phrase when trying to recall a word", translation: "What's it called?", category: "daily-expr",difficulty:"medium", related: ["Precis! / Exakt!", "Just det"] },
      { phrase: "Det var inget", meaning: "It was nothing — downplaying a favor or apology, meaning 'don't mention it'", translation: "Don't mention it", category: "daily-expr",difficulty:"medium", related: ["Det går bra", "Det spelar ingen roll"] },
      { phrase: "Precis! / Exakt!", meaning: "Exactly! / Precisely! — expressing strong agreement", translation: "Exactly!", category: "daily-expr",difficulty:"medium", related: ["Just det", "Vad heter det?"] },
      { phrase: "Det förstås", meaning: "Of course / Naturally — acknowledging something obvious or expected", translation: "Of course", category: "daily-expr",difficulty:"medium", related: ["Naturligtvis"] },
      { phrase: "Jag vet inte riktigt", meaning: "I don't really know — hedging when uncertain", translation: "I'm not really sure", category: "daily-expr",difficulty:"medium", related: ["Jag tror det"] },
      { phrase: "Jag tror det", meaning: "I think so — expressing tentative agreement", translation: "I think so", category: "daily-expr",difficulty:"medium", related: ["Jag vet inte riktigt"] },
      { phrase: "Vad tycker du?", meaning: "What do you think? — asking for someone's opinion", translation: "What do you think?", category: "daily-expr",difficulty:"medium" },
      { phrase: "Det spelar ingen roll", meaning: "It doesn't matter — indicating indifference or that something is irrelevant", translation: "It doesn't matter", category: "daily-expr",difficulty:"medium", related: ["Det kvittar", "Det var inget"] },
      { phrase: "Jag är ledsen", meaning: "I'm sorry — expressing regret or apology", translation: "I'm sorry", category: "daily-expr",difficulty:"medium" },
      { phrase: "Det går bra", meaning: "That works / That's fine — expressing approval or acceptance", translation: "That's fine", category: "daily-expr",difficulty:"medium", related: ["Det var inget"] },
      { phrase: "Det kvittar", meaning: "It doesn't matter either way — even more indifferent than 'spelar ingen roll'", translation: "It's all the same", category: "daily-expr",difficulty:"medium", related: ["Det spelar ingen roll"] },
      { phrase: "Just det", meaning: "That's right / Exactly — confirming something correct", translation: "That's right", category: "daily-expr",difficulty:"medium", related: ["Precis! / Exakt!", "Vad heter det?"] },
      { phrase: "Naturligtvis", meaning: "Naturally / Of course — formal way of saying 'of course'", translation: "Naturally", category: "daily-expr",difficulty:"medium", related: ["Det förstås"] },
      { phrase: "Det beror på", meaning: "It depends — acknowledging that the answer varies based on circumstances", translation: "It depends", category: "daily-expr",difficulty:"medium" }
    ]
  },
  
  // ========== COURSE 5: Nybörjarsvenska ==========
  {
    id: "nyborjare",
    name: "Nybörjarsvenska — Beginner's Swedish",
    categories: [
      { id: "clothing", name: "Clothing & Appearance", nameSv: "Kläder & Utseende", color: "#4fc3f7" },
      { id: "home", name: "Home & Living", nameSv: "Hem & Boende", color: "#81c784" },
      { id: "nature-basic", name: "Nature & Weather", nameSv: "Natur & Väder", color: "#ffb74d" },
      { id: "health", name: "Health & Body", nameSv: "Hälsa & Kropp", color: "#e57373" }
    ],
    entries: [
      { phrase: "Tröja", meaning: "A shirt/sweater — a piece of clothing worn on the upper body", translation: "Shirt / Sweater", category: "clothing",difficulty:"easy", related: ["Byxor", "Jacka", "Kläder"] },
      { phrase: "Byxor", meaning: "Trousers/pants — clothing for the lower body, always plural in Swedish", translation: "Pants / Trousers", category: "clothing",difficulty:"easy", related: ["Tröja", "Skor", "Kläder"] },
      { phrase: "Skor", meaning: "Shoes — footwear, plural form", translation: "Shoes", category: "clothing",difficulty:"easy", related: ["Byxor", "Jacka", "Kläder"] },
      { phrase: "Jacka", meaning: "Jacket — an outer garment for cold weather", translation: "Jacket", category: "clothing",difficulty:"easy", related: ["Tröja", "Skor", "Kläder"] },
      { phrase: "Kläder", meaning: "Clothes — general term for clothing", translation: "Clothes", category: "clothing",difficulty:"easy", related: ["Tröja", "Byxor", "Skor", "Jacka"] },
      { phrase: "Köket", meaning: "The kitchen — room where food is prepared", translation: "The kitchen", category: "home",difficulty:"medium", related: ["Vardagsrummet", "Sovrummet", "Badrummet", "Lampan"] },
      { phrase: "Vardagsrummet", meaning: "The living room — main social area of a home", translation: "The living room", category: "home",difficulty:"medium", related: ["Köket", "Sovrummet", "Badrummet", "Lampan"] },
      { phrase: "Sovrummet", meaning: "The bedroom — room for sleeping", translation: "The bedroom", category: "home",difficulty:"medium", related: ["Köket", "Vardagsrummet", "Badrummet", "Sängen"] },
      { phrase: "Badrummet", meaning: "The bathroom — room with toilet and shower", translation: "The bathroom", category: "home",difficulty:"medium", related: ["Köket", "Vardagsrummet", "Sovrummet"] },
      { phrase: "Trädgården", meaning: "The garden — outdoor area around a house", translation: "The garden", category: "home",difficulty:"medium", related: ["Köket", "Vardagsrummet"] },
      { phrase: "Lampan", meaning: "The lamp — a light source in a room", translation: "The lamp", category: "home",difficulty:"medium", related: ["Sängen", "Köket"] },
      { phrase: "Sängen", meaning: "The bed — furniture for sleeping", translation: "The bed", category: "home",difficulty:"medium", related: ["Lampan", "Sovrummet"] },
      { phrase: "Solen", meaning: "The sun — the star that gives us light and warmth", translation: "The sun", category: "nature-basic",difficulty:"easy", related: ["Månen", "Stjärnorna", "Det är varmt"] },
      { phrase: "Månen", meaning: "The moon — Earth's natural satellite", translation: "The moon", category: "nature-basic",difficulty:"easy", related: ["Solen", "Stjärnorna"] },
      { phrase: "Stjärnorna", meaning: "The stars — celestial bodies visible at night", translation: "The stars", category: "nature-basic",difficulty:"easy", related: ["Solen", "Månen"] },
      { phrase: "Regn", meaning: "Rain — water falling from clouds", translation: "Rain", category: "nature-basic",difficulty:"easy", related: ["Snö", "Vind", "Det regnar"] },
      { phrase: "Snö", meaning: "Snow — frozen precipitation, common in Swedish winters", translation: "Snow", category: "nature-basic",difficulty:"easy", related: ["Regn", "Vind", "Det snöar"] },
      { phrase: "Vind", meaning: "Wind — moving air", translation: "Wind", category: "nature-basic",difficulty:"easy", related: ["Regn", "Snö"] },
      { phrase: "Det regnar", meaning: "It is raining — describing current weather conditions", translation: "It's raining", category: "nature-basic",difficulty:"easy", related: ["Regn", "Det snöar", "Det är kallt"], sentence: "Det regnar idag." },
      { phrase: "Det snöar", meaning: "It is snowing — describing snowfall", translation: "It's snowing", category: "nature-basic",difficulty:"easy", related: ["Snö", "Det regnar", "Det är kallt"], sentence: "Det snöar på vintern." },
      { phrase: "Det är kallt", meaning: "It is cold — describing low temperature", translation: "It's cold", category: "nature-basic",difficulty:"easy", related: ["Det är varmt", "Det regnar", "Det snöar"], sentence: "Nu är det kallt ute." },
      { phrase: "Det är varmt", meaning: "It is warm — describing mild or hot temperature", translation: "It's warm", category: "nature-basic",difficulty:"easy", related: ["Det är kallt", "Solen"], sentence: "Det är varmt på sommaren." },
      { phrase: "Stranden", meaning: "The beach — the sandy shore by the sea or lake, a common Swedish summer destination", translation: "The beach", category: "nature-basic",difficulty:"easy", related: ["Havet", "Solen", "Sommaren"], sentence: "På sommaren går vi till stranden." },
      { phrase: "Havet", meaning: "The sea — the ocean, central to Swedish geography and culture. 'Till havs' = at sea", translation: "The sea", category: "nature-basic",difficulty:"easy", related: ["Stranden", "Sjön", "Vattnet"], sentence: "Havet är djupt och kallt." },
      { phrase: "Sjön", meaning: "The lake — Sweden has nearly 100,000 lakes. A common feature of the landscape", translation: "The lake", category: "nature-basic",difficulty:"easy", related: ["Havet", "Vattnet", "Simma"], sentence: "Sjön är spegelblank idag." },
      { phrase: "Vattnet", meaning: "The water — a fundamental element. Definite form of 'vatten' (ett-ord)", translation: "The water", category: "nature-basic",difficulty:"easy", related: ["Havet", "Sjön", "Dricka"], sentence: "Vattnet är kallt i sjön." },
      { phrase: "Skogen", meaning: "The forest — Sweden is 70% forest. An essential part of Swedish identity and outdoor life", translation: "The forest", category: "nature-basic",difficulty:"easy", related: ["Trädet", "Djur", "Bäret"], sentence: "Skogen är vacker på hösten." },
      { phrase: "Trädet", meaning: "The tree — a common feature of the Swedish landscape. Definite form of 'träd' (ett-ord)", translation: "The tree", category: "nature-basic",difficulty:"easy", related: ["Skogen", "Blomman", "Lövet"], sentence: "Trädet står i trädgården." },
      { phrase: "Blomman", meaning: "The flower — Swedish summers are known for wildflowers. Definite form of 'blomma' (en-ord)", translation: "The flower", category: "nature-basic",difficulty:"easy", related: ["Trädet", "Grönt", "Våren"], sentence: "Blommorna blommar på våren." },
      { phrase: "Våren", meaning: "Spring — the season of renewal. Swedes eagerly await spring after the long winter", translation: "Spring", category: "nature-basic",difficulty:"easy", related: ["Sommaren", "Hösten", "Vintern"], sentence: "Våren är ljus och varm." },
      { phrase: "Sommaren", meaning: "Summer — the most beloved Swedish season, with long daylight and 'midsommar' celebrations", translation: "Summer", category: "nature-basic",difficulty:"easy", related: ["Våren", "Solen", "Semester"], sentence: "Sommaren är kort men vacker." },
      { phrase: "Hösten", meaning: "Autumn/Fall — the season when leaves change color. 'Höst' is an en-word", translation: "Autumn", category: "nature-basic",difficulty:"easy", related: ["Våren", "Sommaren", "Vintern"], sentence: "Hösten är regnig och blåsig." },
      { phrase: "Vintern", meaning: "Winter — the long Swedish winter with snow, ice, and limited daylight", translation: "Winter", category: "nature-basic",difficulty:"easy", related: ["Sommaren", "Hösten", "Snö"], sentence: "Vintern är kall och mörk." },
      { phrase: "Huvudet", meaning: "The head — the uppermost part of the body", translation: "The head", category: "health",difficulty:"medium", related: ["Hjärtat", "Handen", "Foten", "Ögat", "Örat"] },
      { phrase: "Hjärtat", meaning: "The heart — the organ that pumps blood", translation: "The heart", category: "health",difficulty:"medium", related: ["Huvudet", "Handen", "Foten"] },
      { phrase: "Handen", meaning: "The hand — the end part of the arm", translation: "The hand", category: "health",difficulty:"medium", related: ["Huvudet", "Foten", "Ögat"] },
      { phrase: "Foten", meaning: "The foot — the end part of the leg", translation: "The foot", category: "health",difficulty:"medium", related: ["Huvudet", "Handen"] },
      { phrase: "Ögat", meaning: "The eye — the organ for vision", translation: "The eye", category: "health",difficulty:"medium", related: ["Örat", "Huvudet"] },
      { phrase: "Örat", meaning: "The ear — the organ for hearing", translation: "The ear", category: "health",difficulty:"medium", related: ["Ögat", "Huvudet"] },
      { phrase: "Jag är sjuk", meaning: "I am sick — stating that you are unwell", translation: "I'm sick", category: "health",difficulty:"medium", related: ["Doktorn / Läkaren", "Jag har ont i huvudet"], sentence: "Jag är sjuk idag." },
      { phrase: "Jag har ont i huvudet", meaning: "I have a headache — describing pain in the head", translation: "I have a headache", category: "health",difficulty:"medium", related: ["Jag är sjuk", "Doktorn / Läkaren"], sentence: "Jag har ont i huvudet." },
      { phrase: "Doktorn / Läkaren", meaning: "The doctor — a medical professional. Both 'doktor' and 'läkare' are used", translation: "The doctor", category: "health",difficulty:"medium", related: ["Jag är sjuk", "Jag har ont i huvudet"], sentence: "Jag måste gå till doktorn." }
    ]
  },

  // ========== COURSE 6: Swedish Literature & Culture ==========
  {
    id: "svensk-litteratur",
    name: "Swedish Literature & Culture",
    categories: [
      { id: "literature", name: "Literary Terms", nameSv: "Litterära termer", color: "#4fc3f7" },
      { id: "nature-literature", name: "Nature Writing", nameSv: "Naturskrivande", color: "#81c784" },
      { id: "emotions-literature", name: "Emotions & Character", nameSv: "Känslor & Karaktär", color: "#e57373" },
      { id: "colloquial", name: "Colloquial Swedish", nameSv: "Talspråk", color: "#ba68c8" }
    ],
    entries: [
      { phrase: "Berättelse", meaning: "A story/narrative — a tale or account of events. En berättelse, flera berättelser", translation: "Story / Narrative", category: "literature",difficulty:"hard", related: ["Roman", "Novell", "Författare"], sentence: "Berättelsen handlar om en ung pojke." },
      { phrase: "Roman", meaning: "Novel — a long fictional narrative. En roman, flera romaner", translation: "Novel", category: "literature",difficulty:"hard", related: ["Berättelse", "Författare", "Bok"], sentence: "Romanen utspelar sig på 1950-talet." },
      { phrase: "Novell", meaning: "Short story — a shorter fictional work. En novell, flera noveller", translation: "Short story", category: "literature",difficulty:"hard", related: ["Roman", "Berättelse", "Författare"] },
      { phrase: "Författare", meaning: "Author/writer — a person who writes books. En författare, flera författare", translation: "Author", category: "literature",difficulty:"hard", related: ["Roman", "Berättelse", "Skriva"] },
      { phrase: "Handling", meaning: "Plot — the sequence of events in a story. En handling, inget plural", translation: "Plot", category: "literature",difficulty:"hard", related: ["Berättelse", "Roman", "Kapitel"] },
      { phrase: "Kapitel", meaning: "Chapter — a section of a book. Ett kapitel, flera kapitel", translation: "Chapter", category: "literature",difficulty:"hard", related: ["Roman", "Bok", "Sida"] },
      { phrase: "Miljö", meaning: "Setting — the time and place where a story occurs. En miljö, flera miljöer", translation: "Setting", category: "literature",difficulty:"hard", related: ["Handling", "Person", "Berättelse"] },
      { phrase: "Personbeskrivning", meaning: "Character description — describing a person's appearance and personality", translation: "Character description", category: "literature",difficulty:"hard", related: ["Miljö", "Berättelse", "Skrivboken"], sentence: "Personbeskrivningen gör karaktären levande." },
      { phrase: "Dialog", meaning: "Dialogue — conversation between characters in a story. En dialog, flera dialoger", translation: "Dialogue", category: "literature",difficulty:"hard", related: ["Berättelse", "Person", "Samtal"] },
      { phrase: "Huvudperson", meaning: "Main character/protagonist — the central figure in a story. En huvudperson", translation: "Main character", category: "literature",difficulty:"hard", related: ["Person", "Berättelse", "Handling"] },
      { phrase: "Älven", meaning: "The river — a large natural watercourse. Definite form of 'älv' (en-ord)", translation: "The river", category: "nature-literature",difficulty:"hard", related: ["Havet", "Sjön", "Vattnet"], sentence: "Älven flyter genom dalen." },
      { phrase: "Vågen", meaning: "The wave — a moving ridge on the water's surface. Definite form of 'våg' (en-ord)", translation: "The wave", category: "nature-literature",difficulty:"hard", related: ["Havet", "Stranden", "Stormen"], sentence: "Vågorna slog mot stranden." },
      { phrase: "Stormen", meaning: "The storm — a violent weather event with strong winds. Definite form of 'storm' (en-ord)", translation: "The storm", category: "nature-literature",difficulty:"hard", related: ["Vinden", "Regnet", "Havet"], sentence: "Stormen drog in över kusten." },
      { phrase: "Isen", meaning: "The ice — frozen water, central to Swedish winters. Definite form of 'is' (en-ord)", translation: "The ice", category: "nature-literature",difficulty:"hard", related: ["Snö", "Vintern", "Kallt"], sentence: "Isen på sjön är tjock på vintern." },
      { phrase: "Dalen", meaning: "The valley — a low area between hills or mountains. Definite form of 'dal' (en-ord)", translation: "The valley", category: "nature-literature",difficulty:"hard", related: ["Berget", "Skogen", "Älven"], sentence: "Dalen ligger mellan två berg." },
      { phrase: "Berget", meaning: "The mountain/hill — a raised landform. Definite form of 'berg' (ett-ord)", translation: "The mountain", category: "nature-literature",difficulty:"hard", related: ["Dalen", "Skogen", "Utsikten"], sentence: "Berget är täckt av snö." },
      { phrase: "Himlen", meaning: "The sky/heaven — the space above the earth. Definite form of 'himmel' (en-ord)", translation: "The sky", category: "nature-literature",difficulty:"hard", related: ["Solen", "Stjärnorna", "Molnet"], sentence: "Himlen är klar och blå." },
      { phrase: "Grym", meaning: "Cruel/vicious — describing extreme cruelty. Common in literature for villains", translation: "Cruel", category: "emotions-literature",difficulty:"medium", related: ["Elak", "Hänsynslös", "Ondska"], sentence: "Han var en grym och hänsynslös ledare." },
      { phrase: "Hänsynslös", meaning: "Ruthless — without consideration for others. 'Hänsyn' = consideration", translation: "Ruthless", category: "emotions-literature",difficulty:"medium", related: ["Grym", "Elak", "Ondska"] },
      { phrase: "Förtvivlan", meaning: "Despair — a state of complete hopelessness. En förtvivlan, no plural", translation: "Despair", category: "emotions-literature",difficulty:"medium", related: ["Rädsla", "Sorg", "Längtan"], sentence: "Förtvivlan spred sig bland eleverna." },
      { phrase: "Längtan", meaning: "Longing/yearning — a strong desire for something or someone. En längtan, no plural", translation: "Longing", category: "emotions-literature",difficulty:"medium", related: ["Saknad", "Hopp", "Kärlek"], sentence: "Längtan efter hemlandet var stor." },
      { phrase: "Saknad", meaning: "Missing/loss — the feeling of someone or something being absent. En saknad", translation: "Missing", category: "emotions-literature",difficulty:"medium", related: ["Längtan", "Sorg", "Ensamhet"], sentence: "Saknaden efter familjen var svår." },
      { phrase: "Ensamhet", meaning: "Loneliness — the state of being alone, often sad. En ensamhet, no plural", translation: "Loneliness", category: "emotions-literature",difficulty:"medium", related: ["Saknad", "Sorg", "Längtan"], sentence: "Ensamheten var det värsta." },
      { phrase: "Mod", meaning: "Courage/bravery — the ability to face danger or pain. Ett mod, no plural", translation: "Courage", category: "emotions-literature",difficulty:"medium", related: ["Modig", "Stark", "Rädsla"], sentence: "Hon visade stort mod." },
      { phrase: "Dom", meaning: "They/them — the spoken Swedish form of 'de' (they) and 'dem' (them). Used in all everyday speech", translation: "They/Them (spoken)", category: "colloquial",difficulty:"medium", related: ["De", "Dem", "Se'n"], sentence: "Dom kommer imorgon." },
      { phrase: "Se'n", meaning: "Then/afterwards — the spoken contraction of 'sedan'. Very common in dialogue", translation: "Then (spoken)", category: "colloquial",difficulty:"medium", related: ["Sedan", "Sen", "Senare"] },
      { phrase: "Farsan", meaning: "Dad/father — informal, affectionate term for one's father. 'Farsan' = 'fadern' in spoken Swedish", translation: "Dad (colloquial)", category: "colloquial",difficulty:"medium", related: ["Morsan", "Pappa"], sentence: "Farsan blev arg igår." },
      { phrase: "Morsan", meaning: "Mom/mother — informal term for one's mother. The counterpart of 'farsan'", translation: "Mom (colloquial)", category: "colloquial",difficulty:"medium", related: ["Farsan", "Mamma"], sentence: "Morsan lagar mat i köket." },
      { phrase: "Grabb", meaning: "Guy/dude/lad — informal term for a boy or young man. En grabb, flera grabbar", translation: "Guy (slang)", category: "colloquial",difficulty:"medium", related: ["Kille", "Tjej", "Snubbe"] },
      { phrase: "Tjej", meaning: "Girl/chick — informal term for a girl or young woman. En tjej, flera tjejer", translation: "Girl (slang)", category: "colloquial",difficulty:"medium", related: ["Kille", "Grabb", "Person"] },
      { phrase: "Kille", meaning: "Guy/dude — informal term for a boy or man. En kille, flera killar", translation: "Guy (slang)", category: "colloquial",difficulty:"medium", related: ["Tjej", "Grabb", "Snubbe"] },
      { phrase: "Snubbe", meaning: "Dude/fellow — very informal term for a man. En snubbe, flera snubbar", translation: "Dude (slang)", category: "colloquial",difficulty:"medium", related: ["Kille", "Grabb", "Tjej"] },
      { phrase: "Stryk", meaning: "A beating — physical punishment. Common in older Swedish literature. 'Få stryk' = to get beaten", translation: "Beating", category: "emotions-literature",difficulty:"medium", related: ["Våld", "Slag", "Ondska"], sentence: "Han fick stryk av de äldre pojkarna." },
      { phrase: "Ondska", meaning: "Evil — the quality of being morally bad. Central theme in Jan Guillou's 'Ondskan'", translation: "Evil", category: "emotions-literature",difficulty:"medium", related: ["Grym", "Elak", "Våld"], sentence: "Ondskan kan finnas överallt." },
      { phrase: "Upprorisk", meaning: "Rebellious — resisting authority or control. En upprorisk elev", translation: "Rebellious", category: "emotions-literature",difficulty:"medium", related: ["Mod", "Stark", "Ondska"] },
      { phrase: "Skildring", meaning: "Depiction/portrayal — a description in words. En skildring av livet på landet", translation: "Portrayal", category: "literature",difficulty:"hard", related: ["Berättelse", "Personbeskrivning", "Miljö"], sentence: "Boken ger en stark skildring av fattigdomen." }
    ]
  }
];

// ========== CONCEPTS ==========
const concepts = {
  "rivstart-a1": [
    {
      id: "concept-words",
      title: "Swedish Word Order — The V2 Rule",
      titleSv: "Svensk ordföljd — V2-regeln",
      txt: "One of the most important rules in Swedish grammar is the V2 rule: the verb must always be in the second position in main clauses.\n.1. What is the V2 Rule?\nIn Swedish main clauses, the finite verb (the conjugated verb) MUST come second. This holds regardless of what comes first — subject, adverb, question word, or any other element.\n.2. Straight Word Order — Rak Ordföljd\nThe most common pattern: Subject + Verb + Object. For example: 'Jag äter mat.' (I eat food.) The subject 'jag' is first, the verb 'äter' is second.\n.3. Inverted Word Order — Omvänd Ordföljd\nWhen a sentence begins with something other than the subject (like an adverb, a place, or a question word), the subject moves AFTER the verb. For example: 'Idag äter jag mat.' (Today eat I food.) The adverb 'idag' is first, the verb 'äter' stays second, and the subject 'jag' moves to third.\n.4. Questions\nIn yes/no questions, the verb comes first: 'Äter du mat?' For question-word questions, the question word is first, verb second: 'Vad äter du?'\n.5. Negation Placement\nIn main clauses, 'inte' comes AFTER the verb: 'Jag äter inte kött.' But in subordinate clauses, 'inte' comes BEFORE the verb: 'Jag vet att du inte äter kött.'",
      txtSv: "En av de viktigaste reglerna i svensk grammatik är V2-regeln: verbet måste alltid stå i andra position i huvudsatser.\n.1. Vad är V2-regeln?\nI svenska huvudsatser måste det finita verbet (det böjda verbet) ALLTID komma på andra plats. Detta gäller oavsett vad som kommer först — subjekt, adverb, frågeord eller något annat element.\n.2. Rak ordföljd\nDet vanligaste mönstret: Subjekt + Verb + Objekt. Till exempel: 'Jag äter mat.' Subjektet 'jag' är först, verbet 'äter' är andra.\n.3. Omvänd ordföljd\nNär en mening börjar med något annat än subjektet (som ett adverb, en plats eller ett frågeord), flyttas subjektet EFTER verbet. Till exempel: 'Idag äter jag mat.' Adverbet 'idag' är först, verbet 'äter' är andra, och subjektet 'jag' flyttas till tredje plats.\n.4. Frågor\nI ja/nej-frågor kommer verbet först: 'Äter du mat?' I frågeordsfrågor är frågeordet först, verbet andra: 'Vad äter du?'\n.5. Negationsplacering\nI huvudsatser kommer 'inte' EFTER verbet: 'Jag äter inte kött.' Men i bisatser kommer 'inte' FÖRE verbet: 'Jag vet att du inte äter kött.'",
      take: [
        "The verb is always in second position in Swedish main clauses",
        "When you start a sentence with an adverb or other element, the subject swaps places with the verb",
        "Negation 'inte' goes after the verb in main clauses but before the verb in subordinate clauses",
        "The V2 rule applies to all declarative sentences and questions",
        "Practice switching word order by starting sentences with time words like 'Idag', 'Imorgon', 'Nu'"
      ],
      takeSv: ["Verbet står alltid på andra plats i svenska huvudsatser", "När meningen börjar med ett adverb eller annat element byter subjektet plats med verbet", "Negationen 'inte' kommer efter verbet i huvudsatser men före verbet i bisatser", "V2-regeln gäller alla påståendesatser och frågor", "Öva på att byta ordföljd genom att börja meningar med tidsord som 'Idag', 'Imorgon', 'Nu'"],
      sections: [
        {
          heading: "Common Inversion Triggers",
          source: "Form i fokus C, Ch. 3",
          body: "<p>The most common elements that trigger inversion (omvänd ordföljd) are:</p><ul><li><strong>Time adverbs:</strong> Idag, Imorgon, Igår, Nu, Sedan, Snart</li><li><strong>Place expressions:</strong> Här, Där, Hemma, I Stockholm, På jobbet</li><li><strong>Sentence adverbs:</strong> Tyvärr, Kanske, Verkligen, Faktiskt</li><li><strong>Connecting words:</strong> Därför, Sedan, Ändå, Alltså</li></ul><p>Example: <em>Tyvärr kan jag inte komma imorgon.</em> (Unfortunately, I cannot come tomorrow.)</p>"
        },
        {
          heading: "Subordinate Clauses and the BIFF Rule",
          source: "Form i fokus C, Ch. 5",
          body: "<p>The BIFF rule helps you remember the word order in subordinate clauses: <strong>B</strong>isats — <strong>I</strong>nte — <strong>F</strong>öre — <strong>F</strong>init verb. In a subordinate clause, the negation and other sentence adverbs come <em>before</em> the finite verb.</p><p>Compare: <em>Jag kommer inte.</em> (main clause: inte after verb) vs <em>Han sa att jag inte kommer.</em> (subordinate clause: inte before verb).</p><p>Other BIFF adverbs: alltid, aldrig, ofta, sällan, redan, ännu, fortfarande.</p>"
        },
        {
          heading: "Practice Patterns",
          source: "Rivstart A1+A2, Ch. 8",
          body: "<p>Practice these transformations:</p><p><strong>Statement → Time-first:</strong><br><em>Jag går till jobbet. → Idag går jag till jobbet.</em></p><p><strong>Statement → Question:</strong><br><em>Du äter fisk. → Äter du fisk?</em></p><p><strong>Statement → Negative:</strong><br><em>Jag gillar kaffe. → Jag gillar inte kaffe.</em></p><p><strong>Main → Subordinate:</strong><br><em>Jag vet. Han kommer inte. → Jag vet att han inte kommer.</em></p>"
        },
        {
          heading: "Real-World Examples",
          source: "På Svenska 1, Kap. 6",
          body: "<p>Here are common real-world examples of V2 in action:</p><ul><li><em>Nu ska vi äta!</em> (Now we will eat!)</li><li><em>Här bor min familj.</em> (Here lives my family.)</li><li><em>Därför studerar jag svenska.</em> (That's why I study Swedish.)</li><li><em>Kanske kommer hon imorgon.</em> (Maybe she will come tomorrow.)</li><li><em>Igår såg jag en bra film.</em> (Yesterday I saw a good film.)</li></ul>"
        }
      ],
      sectionsSv: [
        {
          heading: "Vanliga inversionsutlösare",
          source: "Form i fokus C, Kap. 3",
          body: "<p>De vanligaste elementen som utlöser omvänd ordföljd är:</p><ul><li><strong>Tidsadverb:</strong> Idag, Imorgon, Igår, Nu, Sedan, Snart</li><li><strong>Platsuttryck:</strong> Här, Där, Hemma, I Stockholm, På jobbet</li><li><strong>Satsadverb:</strong> Tyvärr, Kanske, Verkligen, Faktiskt</li><li><strong>Bindningsord:</strong> Därför, Sedan, Ändå, Alltså</li></ul>"
        },
        {
          heading: "Bisatser och BIFF-regeln",
          source: "Form i fokus C, Kap. 5",
          body: "<p>BIFF-regeln hjälper dig komma ihåg ordföljden i bisatser: <strong>B</strong>isats — <strong>I</strong>nte — <strong>F</strong>öre — <strong>F</strong>init verb.</p>"
        },
        {
          heading: "Vanliga exempel",
          source: "På Svenska 1, Kap. 6",
          body: "<p>Här är vanliga exempel på V2 i praktiken.</p>"
        }
      ]
    },
    {
      id: "concept-nouns",
      title: "Swedish Nouns — Gender and Definiteness",
      titleSv: "Svenska substantiv — Genus och bestämdhet",
      categoryMatch: ["nouns"],
      txt: "Swedish nouns are divided into two grammatical genders: common gender (en-words) and neuter gender (ett-words). This affects articles, adjectives, and pronouns.\n.1. En-words and Ett-words\nAbout 75% of Swedish nouns are en-words. You must learn the gender with each noun. 'En bok' (a book) is an en-word. 'Ett hus' (a house) is an ett-word.\n.2. Indefinite and Definite Forms\nSwedish forms the definite by adding a suffix to the noun, not by using a separate word like 'the'. En-word: en bok → boken. Ett-word: ett hus → huset.\n.3. Plural Formation\nSwedish has five main plural patterns: -or (flickor), -ar (pojkar), -er (blommor), -n (äpplen), and zero-ending (hus). The gender and word ending usually determine which pattern to use.\n.4. Definite Plural\nThe definite plural is formed by adding -na, -a, or -en to the indefinite plural. En-words in -or and -ar add -na: flickorna, pojkarna. En-words in -er often add -na: blommorna. Ett-words in -n add -a: äpplena.",txtSv: "Svenska substantiv delas in i två grammatiska genus: utrum (en-ord) och neutrum (ett-ord). Detta påverkar artiklar, adjektiv och pronomen.\n.1. En-ord och Ett-ord\nCirka 75% av svenska substantiv är en-ord. Man måste lära sig genus med varje substantiv. 'En bok' (a book) är ett en-ord. 'Ett hus' (a house) är ett ett-ord.\n.2. Obestämd och bestämd form\nSvenskan bildar bestämd form genom att lägga ett suffix till substantivet, inte genom ett separat ord som 'the'. En-ord: en bok → boken. Ett-ord: ett hus → huset.\n.3. Pluralbildning\nSvenskan har fem huvudmönster för plural: -or (flickor), -ar (pojkar), -er (blommor), -n (äpplen) och nolländelse (hus). Genus och ordändelse avgör oftast vilket mönster som används.\n.4. Bestämd plural\nBestämd plural bildas genom att lägga till -na, -a eller -en till obestämd plural. En-ord på -or och -ar får -na: flickorna, pojkarna. En-ord på -er får ofta -na: blommorna. Ett-ord på -n får -a: äpplena.",
      take: [
        "Always learn the gender of a noun together with the noun itself",
        "Definite form is a suffix, not a separate word — this is unique to Scandinavian languages",
        "There are five main plural patterns; -ar and -or are the most common for en-words",
        "Adjectives change form based on the noun's gender and number",
        "The definite plural endings -na, -a, and -en depend on the indefinite plural form"
      ],
      takeSv: ["Lär dig alltid genus på ett substantiv tillsammans med själva substantivet", "Bestämd form är ett suffix, inte ett eget ord – detta är unikt för de skandinaviska språken", "Det finns fem huvudmönster för plural; -ar och -or är vanligast för en-ord", "Adjektiv ändrar form beroende på substantivets genus och numerus", "De bestämda pluraländelserna -na, -a och -en beror på den obestämda pluralformen"],
      sections: [
        {
          heading: "The Five Plural Patterns",
          source: "Form i fokus A, Kap. 4",
          body: "<table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left'>Pattern</th><th style='text-align:left'>Singular</th><th style='text-align:left'>Plural</th></tr><tr><td>-or (en-words ending in -a)</td><td>flicka</td><td>flickor</td></tr><tr><td>-ar (most en-words)</td><td>pojke</td><td>pojkar</td></tr><tr><td>-er (en-words, some)</td><td>blomma</td><td>blommor</td></tr><tr><td>-n (ett-words ending in vowel)</td><td>äpple</td><td>äpplen</td></tr><tr><td>Zero (ett-words ending in consonant)</td><td>hus</td><td>hus</td></tr></table>"
        },
        {
          heading: "Adjective Agreement",
          source: "Rivstart A1+A2, Ch. 5",
          body: "<p>Adjectives change form depending on the noun's gender, number, and definiteness:</p><ul><li><strong>En-word:</strong> en stor bok</li><li><strong>Ett-word:</strong> ett stort hus</li><li><strong>Plural:</strong> stora böcker / stora hus</li><li><strong>Definite:</strong> den stora boken / det stora huset / de stora böckerna</li></ul>"
        }
      ],
      sectionsSv: [
        {
          heading: "De fem pluralmönstren",
          source: "Form i fokus A, Kap. 4",
          body: "<p>De fem pluralmönstren i svenskan...</p>"
        }
      ],
      svg: '<svg viewBox="0 0 820 530" xmlns="http://www.w3.org/2000/svg"><rect width="820" height="530" rx="10" fill="#232b35"/><text x="410" y="42" text-anchor="middle" fill="#e0e0e0" font-size="22" font-weight="700">Swedish Noun System</text><text x="410" y="64" text-anchor="middle" fill="#a0a0a0" font-size="13">Gender · Definiteness · Plural · Adjective Agreement</text><rect x="30" y="90" width="360" height="180" rx="8" fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.3)" stroke-width="1.5"/><text x="210" y="118" text-anchor="middle" fill="#4ade80" font-size="16" font-weight="700">EN-WORDS (Common Gender ~75%)</text><text x="50" y="148" fill="#e0e0e0" font-size="13">en bok → boken (a book → the book)</text><text x="50" y="172" fill="#e0e0e0" font-size="13">en pojke → pojken (a boy → the boy)</text><text x="50" y="196" fill="#a0a0a0" font-size="12">Plural: flickOR, pojkAR, blommER</text><text x="50" y="224" fill="#a0a0a0" font-size="12">Definite plural: flickorna, pojkarna</text><text x="50" y="256" fill="#4ade80" font-size="12">Adjective: en STOR bok</text><rect x="430" y="90" width="360" height="180" rx="8" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.3)" stroke-width="1.5"/><text x="610" y="118" text-anchor="middle" fill="#3b82f6" font-size="16" font-weight="700">ETT-WORDS (Neuter Gender ~25%)</text><text x="450" y="148" fill="#e0e0e0" font-size="13">ett hus → huset (a house → the house)</text><text x="450" y="172" fill="#e0e0e0" font-size="13">ett äpple → äpplet (an apple → the apple)</text><text x="450" y="196" fill="#a0a0a0" font-size="12">Plural: äpplEN, hus (zero ending)</text><text x="450" y="224" fill="#a0a0a0" font-size="12">Definite plural: äpplena, husen</text><text x="450" y="256" fill="#3b82f6" font-size="12">Adjective: ett STORT hus</text><rect x="30" y="290" width="760" height="120" rx="8" fill="rgba(20,184,166,0.06)" stroke="rgba(20,184,166,0.25)" stroke-width="1.5"/><text x="410" y="320" text-anchor="middle" fill="#14b8a6" font-... (line truncated to 2000 chars)'
    },
    {
      id: "concept-adjektiv",
      title: "Adjectives — Comparison and Declension",
      titleSv: "Adjektiv — komparation och böjning",
      txt: "Swedish adjectives change form based on the noun's gender, number, and definiteness. They also have comparative and superlative forms.\n.1. Adjective Declension\nEn-word: 'en stor bok'. Ett-word: 'ett stort hus'. Plural: 'stora böcker'. Definite: 'den stora boken'.\n.2. Regular Comparison\nMost adjectives add -are for comparative and -ast for superlative: stor → större → störst. Note the vowel change (ö) in many common adjectives.\n.3. Irregular Comparison\nSome adjectives have irregular forms: bra → bättre → bäst, dålig → sämre → sämst, gammal → äldre → äldst, liten → mindre → minst.\n.4. Comparative with 'än'\nUse 'än' (than) after a comparative: 'Jag är äldre än dig.' (I am older than you.)\n.5. Superlative Usage\n'Den/Dett/De + adjective + -aste' is the definite superlative: 'Den största bilen' (the biggest car).",txtSv: "Svenska adjektiv ändrar form beroende på substantivets genus, numerus och bestämdhet. De har också komparativ- och superlativformer.\n.1. Adjektivets grundböjning\nEn-ord: 'en stor bok'. Ett-ord: 'ett stort hus'. Plural: 'stora böcker'. Bestämd form: 'den stora boken'.\n.2. Regelbunden komparation\nDe flesta adjektiv får -are i komparativ och -ast i superlativ: stor → större → störst. Lägg märke till vokalförändringen (ö) i många vanliga adjektiv.\n.3. Oregelbunden komparation\nVissa adjektiv har oregelbundna former: bra → bättre → bäst, dålig → sämre → sämst, gammal → äldre → äldst, liten → mindre → minst.\n.4. Komparativ med 'än'\nAnvänd 'än' (than) efter en komparativ: 'Jag är äldre än dig.' (I am older than you.)\n.5. Superlativ med bestämd form\n'Den/Det/De + adjektiv + -aste' är den bestämda superlativen: 'Den största bilen' (the biggest car).",
      take: [
        "Adjectives agree with noun gender: en stor (en-word) vs ett stort (ett-word)",
        "Plural always takes -a: stora böcker, stora hus",
        "Definite form always takes -a: den stora, det stora, de stora",
        "Regular comparison: -are (comparative), -ast (superlative)",
        "Learn common irregulars: bra/bättre/bäst, dålig/sämre/sämst"
      ],
      takeSv: ["Adjektiv kongruerar med substantivets genus: en stor (en-ord) vs ett stort (ett-ord)", "Plural tar alltid -a: stora böcker, stora hus", "Bestämd form tar alltid -a: den stora, det stora, de stora", "Regelbunden komparation: -are (komparativ), -ast (superlativ)", "Lär dig vanliga oregelbundna: bra/bättre/bäst, dålig/sämre/sämst"],
      sections: [
        {
          heading: "Adjective Declension Table",
          source: "Form i fokus A, Kap. 5",
          body: "<table style='width:100%;border-collapse:collapse'><tr><th>Form</th><th>En-word</th><th>Ett-word</th><th>Plural</th></tr><tr><td>Indefinite</td><td>en stor bil</td><td>ett stort hus</td><td>stora bilar</td></tr><tr><td>Definite</td><td>den stora bilen</td><td>det stora huset</td><td>de stora bilarna</td></tr></table>"
        },
        {
          heading: "Common Irregular Adjectives",
          source: "Rivstart A1+A2, Kap. 9",
          body: "<table style='width:100%;border-collapse:collapse'><tr><th>Positive</th><th>Comparative</th><th>Superlative</th></tr><tr><td>bra (good)</td><td>bättre</td><td>bäst</td></tr><tr><td>dålig (bad)</td><td>sämre</td><td>sämst</td></tr><tr><td>gammal (old)</td><td>äldre</td><td>äldst</td></tr><tr><td>liten (small/little)</td><td>mindre</td><td>minst</td></tr><tr><td>stor (big)</td><td>större</td><td>störst</td></tr><tr><td>ung (young)</td><td>yngre</td><td>yngst</td></tr></table>"
        }
      ],
      sectionsSv: [
        {
          heading: "Adjektivböjningstabell",
          source: "Form i fokus A, Kap. 5",
          body: "<p>Tabell över adjektivböjning i svenskan...</p>"
        }
      ]
    },
    {
      id: "concept-phrases",
      title: "Swedish Greetings and Social Interactions",
      titleSv: "Svenska hälsningsfraser och social interaktion",
      txt: "Swedish greetings and social interactions follow specific cultural patterns. Understanding these will help you navigate everyday situations.\n.1. Time-Based Greetings\nSwedes greet each other based on the time of day. 'God morgon' is used until about 10 AM. 'God dag' is a formal midday greeting. 'God kväll' starts around 6 PM. 'God natt' is only used right before sleep.\n.2. The Informal 'Hej'\n'Hej' is the universal Swedish greeting, used in virtually all situations — with friends, colleagues, and strangers. You can also say 'Hej hej' which is slightly more casual and friendly.\n.3. 'Hur mår du?' vs 'Hur är det?'\n'Hur mår du?' asks specifically about someone's health/well-being and expects a genuine answer. 'Hur är det?' is more like 'How's it going?' — a lighter, more casual greeting.\n.4. Fika Culture\n'Fika' is a Swedish cultural institution — a coffee break with conversation and usually a pastry. It's not just a break; it's a social ritual. Inviting someone to 'fika' is a common way to socialize.",txtSv: "Svenska hälsningsfraser och sociala interaktioner följer specifika kulturella mönster. Att förstå dessa hjälper dig att navigera i vardagliga situationer.\n.1. Tidsbaserade hälsningar\nSvenskar hälsar på varandra utifrån tid på dygnet. 'God morgon' används fram till cirka 10. 'God dag' är en formell middagshälsning. 'God kväll' börjar runt 18. 'God natt' används bara precis före sömnen.\n.2. Det informella 'Hej'\n'Hej' är den universella svenska hälsningen, som används i praktiskt taget alla situationer — med vänner, kollegor och främlingar. Man kan också säga 'Hej hej', som är lite mer vardagligt och vänligt.\n.3. 'Hur mår du?' vs 'Hur är det?'\n'Hur mår du?' frågar specifikt om någons hälsa/välbefinnande och förväntar sig ett ärligt svar. 'Hur är det?' är mer som 'How's it going?' — en lättare, mer vardaglig hälsning.\n.4. Fika-kulturen\n'Fika' är en svensk kulturinstitution — en kaffepaus med samtal och oftast ett bakverk. Det är inte bara en paus; det är en social ritual. Att bjuda någon på 'fika' är ett vanligt sätt att umgås.",
      take: [
        "'Hej' works in any situation — you cannot go wrong with it",
        "Use 'God morgon' in the morning, 'God kväll' in the evening",
        "'Hej då' is the standard goodbye, 'Vi ses' is more informal",
        "Fika is more than coffee — it's a social institution",
        "Swedes appreciate politeness but are generally direct in communication"
      ],
      takeSv: ["'Hej' fungerar i alla situationer – du kan inte göra fel med det", "Använd 'God morgon' på morgonen, 'God kväll' på kvällen", "'Hej då' är det vanliga avskedet, 'Vi ses' är mer informellt", "Fika är mer än kaffe – det är en social institution", "Svenskar uppskattar artighet men är i allmänhet raka i kommunikationen"],
      sections: [
        {
          heading: "Fika — More Than Just Coffee",
          source: "På Svenska 1, Kap. 2 — Swedish Culture",
          body: "<p>Fika is a concept that is hard to translate. It means taking a break from work or activities to have coffee (or tea) and often a pastry like a cinnamon bun (kanelbulle). But more importantly, it's a social moment for conversation and connection. In many Swedish workplaces, fika breaks are scheduled twice daily — around 10 AM and 2 PM.</p><p>Common fika pastries: <em>kanelbulle</em> (cinnamon bun), <em>chokladboll</em> (chocolate ball), <em>kladdkaka</em> (sticky chocolate cake), <em>prinsesstårta</em> (princess cake).</p>"
        }
      ],
      sectionsSv: [
        {
          heading: "Fika — Mer än bara kaffe",
          source: "På Svenska 1, Kap. 2",
          body: "<p>Fika är ett begrepp som är svårt att översätta...</p>"
        }
      ]
    }
  ],

  "pa-svenska1": [
    {
      id: "concept-verbs",
      title: "Swedish Verb Groups and Conjugation",
      titleSv: "Svenska verbgrupper och konjugation",
      categoryMatch: ["verbs", "grammar"],
      txt: "Swedish verbs are divided into four groups based on how they form past tense and supine. Understanding verb groups helps you conjugate correctly.\n.1. Group 1 — The Largest Group\nGroup 1 verbs end in -a in the infinitive and form past tense with -de and supine with -t. Examples: tala (talar, talade, talat). This group contains most new verbs.\n.2. Group 2 — Verbs Ending in Consonants\nGroup 2 verbs also end in -a but the stem ends in a consonant. They form past with -te and supine with -t. Examples: köpa (köper, köpte, köpt), läsa (läser, läste, läst).\n.3. Group 3 — Short Verbs\nGroup 3 verbs are short (usually one syllable) and end in a vowel in the infinitive. They form past with -dde and supine with -tt. Examples: bo (bor, bodde, bott), tro (tror, trodde, trott).\n.4. Group 4 — Strong Verbs\nStrong verbs change their stem vowel in past tense and often have a different supine form. These must be memorized individually. Examples: skriva (skriver, skrev, skrivit), dricka (dricker, drack, druckit).",txtSv: "Svenska verb delas in i fyra grupper utifrån hur de bildar preteritum och supinum. Att förstå verbgrupperna hjälper dig att böja korrekt.\n.1. Grupp 1 — den största gruppen\nGrupp 1-verb slutar på -a i infinitiv och bildar preteritum med -de och supinum med -t. Exempel: tala (talar, talade, talat). Den här gruppen innehåller de flesta nya verb.\n.2. Grupp 2 — verb som slutar på konsonant\nGrupp 2-verb slutar också på -a men stammen slutar på konsonant. De bildar preteritum med -te och supinum med -t. Exempel: köpa (köper, köpte, köpt), läsa (läser, läste, läst).\n.3. Grupp 3 — korta verb\nGrupp 3-verb är korta (oftast en stavelse) och slutar på vokal i infinitiv. De bildar preteritum med -dde och supinum med -tt. Exempel: bo (bor, bodde, bott), tro (tror, trodde, trott).\n.4. Grupp 4 — starka verb\nStarka verb ändrar stamvokalen i preteritum och har ofta en annan supinumform. Dessa måste läras in var för sig. Exempel: skriva (skriver, skrev, skrivit), dricka (dricker, drack, druckit).",
      take: [
        "Group 1 is the most common and most predictable — add -ade to form past tense",
        "Group 2 adds -te to form past tense (note the consonant stem)",
        "Group 3 verbs are short — they add -dde in past and -tt in supine",
        "Group 4 (strong verbs) must be memorized individually",
        "The imperative form is usually the verb stem without -a"
      ],
      takeSv: ["Grupp 1 är vanligast och mest förutsägbar – lägg till -ade för preteritum", "Grupp 2 lägger till -te för preteritum (observera konsonantstammen)", "Grupp 3-verb är korta – de lägger till -dde i preteritum och -tt i supinum", "Grupp 4 (starka verb) måste läras in utantill en och en", "Imperativformen är vanligtvis verbstammen utan -a"],
      sections: [
        {
          heading: "Group 2 Subtypes",
          source: "Form i fokus C, Kap. 1",
          body: "<p>Group 2 is subdivided into 2a and 2b:</p><p><strong>Group 2a:</strong> Verbs whose stem ends in -d, -g, or -v keep the -er ending in present but drop it in past: <em>bjuda</em> (bjuder, bjöd, bjudit).</p><p><strong>Group 2b:</strong> Verbs whose stem ends in -m, -n, -s, -t, or -p: <em>köpa</em> (köper, köpte, köpt). The past tense adds -te instead of -de.</p>"
        },
        {
          heading: "Common Strong Verbs to Memorize",
          source: "Rivstart A1+A2, Appendix",
          body: "<table style='width:100%;border-collapse:collapse'><tr><th>Infinitive</th><th>Present</th><th>Past</th><th>Supine</th></tr><tr><td>skriva</td><td>skriver</td><td>skrev</td><td>skrivit</td></tr><tr><td>dricka</td><td>dricker</td><td>drack</td><td>druckit</td></tr><tr><td>sitta</td><td>sitter</td><td>satt</td><td>suttit</td></tr><tr><td>finna</td><td>finner</td><td>fann</td><td>funnit</td></tr><tr><td>binda</td><td>binder</td><td>band</td><td>bundit</td></tr></table>"
        }
      ],
      sectionsSv: [
        {
          heading: "Grupp 2 Subtyper",
          source: "Form i fokus C, Kap. 1",
          body: "<p>Grupp 2 delas in i 2a och 2b...</p>"
        }
      ]
    },
    {
      id: "concept-siffror",
      title: "Numbers, Time, and Dates in Swedish",
      titleSv: "Siffror, tid och datum på svenska",
      categoryMatch: ["numbers"],
      txt: "Swedish numbers and time expressions have some unique features that differ from English. Learning them is essential for everyday communication.\n.1. Basic Numbers\nNumbers 1-10: ett, två, tre, fyra, fem, sex, sju, åtta, nio, tio. Note that 'sju' starts with a sj-sound that can be tricky for learners.\n.2. Teens and Tens\n11-19: elva, tolv, tretton, fjorton, femton, sexton, sjutton, arton, nitton. Tens: tjugo, trettio, fyrtio, femtio, sextio, sjuttio, åttio, nittio, hundra.\n.3. Telling Time\nSwedish uses a 'half to' system: 'Halv åtta' is 7:30 (half to eight, not half past seven!). Quarter expressions: 'Kvart över sju' (7:15), 'Kvart i åtta' (7:45).\n.4. Days and Months\nWeekdays: måndag, tisdag, onsdag, torsdag, fredag, lördag, söndag. Months: januari, februari, mars, april, maj, juni, juli, augusti, september, oktober, november, december.",txtSv: "Svenska siffror och tidsuttryck har en del unika drag som skiljer sig från engelskan. Att lära sig dem är viktigt för vardagskommunikation.\n.1. Grundläggande siffror\nSiffror 1-10: ett, två, tre, fyra, fem, sex, sju, åtta, nio, tio. Observera att 'sju' börjar med ett sj-ljud som kan vara svårt för inlärare.\n.2. Tonåren och tiotalen\n11-19: elva, tolv, tretton, fjorton, femton, sexton, sjutton, arton, nitton. Tiotal: tjugo, trettio, fyrtio, femtio, sextio, sjuttio, åttio, nittio, hundra.\n.3. Klockan\nSvenskan använder ett 'halv till'-system: 'Halv åtta' är 7:30 (halv till åtta, inte 'half past seven'!). Kvartar: 'Kvart över sju' (7:15), 'Kvart i åtta' (7:45).\n.4. Dagar och månader\nVeckodagar: måndag, tisdag, onsdag, torsdag, fredag, lördag, söndag. Månader: januari, februari, mars, april, maj, juni, juli, augusti, september, oktober, november, december.",
      take: [
        "'Halv åtta' means 7:30, not 8:30 — think 'half TO eight'",
        "'Sju' (7) has a unique sj-sound; practice saying it",
        "'Tjugo' is often pronounced 'tju-go' in speech",
        "Dates are written as 'den 1 januari' or just '1 januari'",
        "Sweden uses 24-hour time in official contexts but 12-hour in speech"
      ],
      takeSv: ["'Halv åtta' betyder 7:30, inte 8:30 – tänk 'halv timme TILL åtta'", "'Sju' (7) har ett unikt sj-ljud; öva på att säga det", "'Tjugo' uttalas ofta 'tju-go' i tal", "Datum skrivs som 'den 1 januari' eller bara '1 januari'", "Sverige använder 24-timmarsklocka i officiella sammanhang men 12-timmar i tal"],
      sections: [
        {
          heading: "Time Expressions",
          source: "På Svenska 1, Kap. 5",
          body: "<p>Key time prepositions: <em>på morgonen</em> (in the morning), <em>på eftermiddagen</em> (in the afternoon), <em>på kvällen</em> (in the evening), <em>på natten</em> (at night). For specific times: <em>klockan åtta</em> (at eight o'clock), <em>vid sjutiden</em> (around seven), <em>i tid</em> (on time), <em>för sent</em> (too late).</p>"
        }
      ],
      sectionsSv: [
        {
          heading: "Tidsuttryck",
          source: "På Svenska 1, Kap. 5",
          body: "<p>Viktiga tidsprepositioner...</p>"
        }
      ]
    },
    {
      id: "concept-arbetsplats",
      title: "Workplace Communication in Swedish",
      titleSv: "Kommunikation på arbetsplatsen",
      txt: "Swedish workplace culture has its own communication style — direct but polite, egalitarian, and consensus-seeking. Understanding workplace vocabulary is essential for professional life in Sweden.\n.1. Swedish Work Culture\nSwedish workplaces are known for flat hierarchies. 'Chefen' (the boss) is often approachable. Decision-making tends to be consensus-based. 'Fika' breaks are a daily ritual for social connection.\n.2. Meetings and Discussions\n'Vi har ett möte klockan tio' (We have a meeting at ten). 'Kan vi diskutera det här?' (Can we discuss this?). 'Jag håller med' (I agree). 'Jag håller inte med' (I disagree). 'Vad tycker du?' (What do you think?).\n.3. Communication Style\nSwedes value 'tydlighet' (clarity) and 'ärlighet' (honesty). However, they also avoid direct confrontation. 'Jag tror att...' (I think that...) softens statements. 'Kanske' (maybe) and 'nog' (probably) are common hedges.\n.4. Power and Influence\nUnderstanding power dynamics is important. 'Härskarteknik' (power techniques) is a concept about manipulation in the workplace. Key terms: 'makt' (power), 'inflytande' (influence), 'manipulera' (manipulate), 'konflikt' (conflict).",txtSv: "Svensk arbetsplatskultur har sin egen kommunikationsstil — direkt men artig, jämlik och konsensussökande. Att förstå arbetsplatsvokabulären är viktigt för yrkeslivet i Sverige.\n.1. Svensk arbetskultur\nSvenska arbetsplatser är kända för platta hierarkier. 'Chefen' (the boss) är ofta lättillgänglig. Beslutsfattandet är ofta konsensusbaserat. 'Fika'-raster är en daglig ritual för social samvaro.\n.2. Möten och diskussioner\n'Vi har ett möte klockan tio' (We have a meeting at ten). 'Kan vi diskutera det här?' (Can we discuss this?). 'Jag håller med' (I agree). 'Jag håller inte med' (I disagree). 'Vad tycker du?' (What do you think?).\n.3. Kommunikationsstil\nSvenskar värdesätter 'tydlighet' (clarity) och 'ärlighet' (honesty). Samtidigt undviker de direkt konfrontation. 'Jag tror att...' (I think that...) mjukar upp påståenden. 'Kanske' (maybe) och 'nog' (probably) är vanliga uttryck som dämpar.\n.4. Makt och inflytande\nAtt förstå maktrelationer är viktigt. 'Härskarteknik' (power techniques) är ett begrepp om manipulation på arbetsplatsen. Nyckelord: 'makt' (power), 'inflytande' (influence), 'manipulera' (manipulate), 'konflikt' (conflict).",
      take: [
        "Swedish workplaces are informal (use 'du' not 'ni') but maintain professional distance",
        "'Fika' breaks are a daily social ritual — accepting invitations builds relationships",
        "Use softening phrases: 'Jag tror', 'Kanske', 'Det verkar som'",
        "Flat hierarchy means you can speak directly to your boss, but always respectfully",
        "Consensus decision-making means meetings can take time"
      ],
      takeSv: ["Svenska arbetsplatser är informella (använd 'du' inte 'ni') men håller professionell distans", "Fikaraster är en daglig social ritual – att tacka ja till inbjudningar bygger relationer", "Använd mjukgörande fraser: 'Jag tror', 'Kanske', 'Det verkar som'", "Platt hierarki innebär att du kan prata direkt med chefen, men alltid respektfullt", "Konsensusbeslut innebär att möten kan ta tid"],
      sections: [
        {
          heading: "Meeting Phrases in Swedish",
          source: "Omgiven av idioter, Ch. 1 — Communication Psychology",
          body: "<p>Common meeting vocabulary and phrases:</p><ul><li><em>Dagordning</em> — Agenda</li><li><em>Protokoll</em> — Minutes (meeting notes)</li><li><em>Punkt</em> — Agenda item</li><li><em>Beslut</em> — Decision</li><li><em>Handling</em> — Action point</li><li><em>Skicka runt</em> — Circulate (a document)</li><li><em>Boka in</em> — Schedule (a meeting)</li><li><em>Ställa in</em> — Cancel (a meeting)</li></ul><p>Example: <em>Ska vi boka in ett möte nästa vecka för att diskutera budgeten?</em></p>"
        },
        {
          heading: "Giving Feedback and Managing Conflict",
          source: "Härskarteknik, Ch. 3 — Workplace Dynamics",
          body: "<p>Constructive feedback phrases:</p><ul><li><em>Jag vill ge dig feedback på...</em> — I'd like to give you feedback on...</li><li><em>Det fungerar bra / mindre bra</em> — That works well / less well</li><li><em>Hur tänker du kring det här?</em> — What are your thoughts on this?</li><li><em>Jag upplever att...</em> — I feel that...</li><li><em>Kan vi kompromissa?</em> — Can we compromise?</li></ul><p>Härskarteknik (power techniques) include: <em>osynliggörande</em> (invisibilization), <em>förlöjligande</em> (ridicule), <em>undanhållande av information</em> (withholding information). Recognizing these is the first step to countering them.</p>"
        }
      ],
      sectionsSv: [
        {
          heading: "Mötesfraser på svenska",
          source: "Omgiven av idioter, Kap. 1",
          body: "<p>Vanliga mötesord och fraser...</p>"
        }
      ]
    }
  ],

  "form-fokus": [
    {
      id: "concept-svensk-grammatik",
      title: "Swedish Sentence Structure — Deep Dive",
      titleSv: "Svensk meningsbyggnad — Djupdykning",
      txt: "Swedish sentence structure follows patterns that can be systematically learned. Beyond the V2 rule, there are important patterns for different clause types.\n.1. Main Clause Structure\nMain clauses follow: (Frame element) + Verb + Subject + (Sentence adverb) + Object + (Time/Place). The verb is ALWAYS second.\n.2. Subordinate Clauses\nSubordinate clauses follow: Conjunction + Subject + (Sentence adverb) + Verb + Rest. The sentence adverb comes BEFORE the verb (the BIFF rule).\n.3. Question Formation\nYes/no questions invert subject and verb: 'Kommer du?' Question-word questions: 'När kommer du?'\n.4. Imperative\nImperative is formed from the verb stem: 'Tala!' 'Köp!' 'Spring!'",txtSv: "Svensk meningsbyggnad följer mönster som kan läras in systematiskt. Utöver V2-regeln finns det viktiga mönster för olika satser.\n.1. Huvudsatsens struktur\nHuvudsatser följer: (fundament) + verb + subjekt + (satsadverbial) + objekt + (tid/plats). Verbet är ALLTID på andra plats.\n.2. Bisatser\nBisatser följer: konjunktion + subjekt + (satsadverbial) + verb + resten. Satsadverbialet kommer FÖRE verbet (BIFF-regeln).\n.3. Frågekonstruktion\nJa/nej-frågor vänder på subjekt och verb: 'Kommer du?' Frågeordsfrågor: 'När kommer du?'\n.4. Imperativ\nImperativ bildas av verbstammen: 'Tala!' 'Köp!' 'Spring!'",
      take: [
        "Main clause: verb second always",
        "Subordinate clause: sentence adverb before verb (BIFF)",
        "Yes/no questions: verb first",
        "Question-word questions: question word first, verb second",
        "Imperative: use the verb stem without -a"
      ],
      takeSv: ["Huvudsats: verbet alltid på andra plats", "Bisats: satsadverbial före verbet (BIFF)", "Ja/nej-frågor: verbet först", "Frågeordsfrågor: frågeordet först, verbet andra", "Imperativ: använd verbstammen utan -a"],
      sections: [
        {
          heading: "Frame Structure (Satsschema)",
          source: "Form i fokus C, Ch. 7",
          body: "<p>Swedish sentences can be analyzed using a 'frame' or 'field' model:</p><ul><li><strong>Fundament (First position):</strong> Any element can go here — subject, adverb, object, etc.</li><li><strong>Verb position:</strong> The finite verb MUST be second.</li><li><strong>Subject position:</strong> After the verb (unless subject is in first position).</li><li><strong>Sentence adverb position:</strong> inte, alltid, aldrig, etc.</li><li><strong>Rest:</strong> Objects, adverbials, etc.</li></ul>"
        }
      ],
      sectionsSv: [
        {
          heading: "Satsschema",
          source: "Form i fokus C, Kap. 7",
          body: "<p>Svenska meningar kan analyseras med ett satsschema...</p>"
        }
      ],
      svg: '<svg viewBox="0 0 820 530" xmlns="http://www.w3.org/2000/svg"><rect width="820" height="530" rx="10" fill="#232b35"/><text x="410" y="42" text-anchor="middle" fill="#e0e0e0" font-size="22" font-weight="700">Swedish Sentence Structure — The Frame Model</text><text x="410" y="64" text-anchor="middle" fill="#a0a0a0" font-size="13">V2 Rule · BIFF · Inversion · Question Formation</text><rect x="30" y="90" width="760" height="100" rx="8" fill="rgba(74,222,128,0.06)" stroke="rgba(74,222,128,0.25)" stroke-width="1.5"/><text x="410" y="118" text-anchor="middle" fill="#4ade80" font-size="16" font-weight="700">MAIN CLAUSE (Huvudsats)</text><rect x="40" y="130" width="100" height="46" rx="6" fill="rgba(74,222,128,0.12)" stroke="#4ade80" stroke-width="1.5"/><text x="90" y="157" text-anchor="middle" fill="#4ade80" font-size="13" font-weight="700">FUNDAMENT</text><rect x="148" y="130" width="80" height="46" rx="6" fill="rgba(239,68,68,0.12)" stroke="#ef4444" stroke-width="1.5"/><text x="188" y="157" text-anchor="middle" fill="#f87171" font-size="13" font-weight="700">VERB (V)</text><rect x="236" y="130" width="100" height="46" rx="6" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" stroke-width="1.5"/><text x="286" y="157" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="700">SUBJECT</text><rect x="344" y="130" width="100" height="46" rx="6" fill="rgba(234,179,8,0.12)" stroke="#eab308" stroke-width="1.5"/><text x="394" y="157" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="700">ADV (inte)</text><rect x="452" y="130" width="140" height="46" rx="6" fill="rgba(168,85,247,0.12)" stroke="#a855f7" stroke-width="1.5"/><text x="522" y="157" text-anchor="middle" fill="#a855f7" font-size="13" font-weight="700">OBJECT / REST</text><text x="50" y="206" fill="#a0a0a0" font-size="12">Example: Idag äter jag inte mat. → Fund=Idag, V=äter, Subj=jag, Adv=inte, Rest=mat</text><rect x="30" y="230" width="760" height="100" rx="8" fill="rgba(59,130,246,0.06)" st... (line truncated to 2000 chars)'
    },
    {
      id: "concept-pronomen",
      title: "Swedish Pronouns — Personal, Possessive, and Reflexive",
      titleSv: "Svenska pronomen — Personliga, possessiva och reflexiva",
      categoryMatch: ["pronouns"],
      txt: "Swedish pronouns have subject forms, object forms, and possessive forms. The reflexive possessive is a unique feature that English does not have.\n.1. Personal Pronouns\nSubject: jag, du, han/hon/den/det, vi, ni, de. Object: mig, dig, honom/henne/den/det, oss, er, dem. Note: 'Dem' is often replaced by 'dom' in speech.\n.2. Possessive Pronouns\nMin/mina (my), din/dina (your), hans/hennes (his/hers), vår/våra (our), er/era (your, plural), deras (their).\n.3. Reflexive 'Sig'\n'Sig' (himself/herself/itself/themselves) is used when the object is the same as the subject. 'Han tvättar sig' = He washes himself. 'Sin/sitt/sina' are the possessive reflexive forms.",txtSv: "Svenska pronomen har subjektsformer, objektsformer och possessiva former. Den reflexiva possessiven är unik och finns inte i engelskan.\n.1. Personliga pronomen\nSubjektsform: jag, du, han/hon/den/det, vi, ni, de. Objektsform: mig, dig, honom/henne/den/det, oss, er, dem. Observera: 'Dem' ersätts ofta av 'dom' i tal.\n.2. Possessiva pronomen\nMin/mina (my), din/dina (your), hans/hennes (his/hers), vår/våra (our), er/era (your, plural), deras (their).\n.3. Reflexivt 'sig'\n'Sig' (himself/herself/itself/themselves) används när objektet är samma som subjektet. 'Han tvättar sig' = He washes himself. 'Sin/sitt/sina' är de possessiva reflexiva formerna.",
      take: [
        "'De' (they) is pronounced 'dom' in everyday speech",
        "'Dem' (them) is also pronounced 'dom' — same sound as 'de'!",
        "Use 'sin/sitt/sina' when the possessor is the same as the subject",
        "'Den' refers to en-words, 'det' refers to ett-words",
        "Object pronouns: mig, dig, honom, henne, oss, er, dem"
      ],
      takeSv: ["'De' uttalas 'dom' i vardagligt tal", "'Dem' uttalas också 'dom' – samma ljud som 'de'!", "Använd 'sin/sitt/sina' när ägaren är samma som subjektet", "'Den' syftar på en-ord, 'det' på ett-ord", "Objektspronomen: mig, dig, honom, henne, oss, er, dem"],
      sections: [
        {
          heading: "Sin, Sitt, Sina — The Reflexive Possessive",
          source: "Form i fokus A, Kap. 3",
          body: "<p>This is one of the most challenging concepts for learners. Compare:</p><p><em>Han äter sin mat.</em> = He eats his (own) food.<br><em>Han äter hans mat.</em> = He eats his (someone else's) food.</p><p>The form depends on the noun: <strong>sin</strong> for en-words (sin bok), <strong>sitt</strong> for ett-words (sitt hus), <strong>sina</strong> for plurals (sina böcker).</p><p>Only the third person has this distinction; in first and second person, min/din/vår/er cover both meanings.</p>"
        }
      ],
      sectionsSv: [
        {
          heading: "Sin, Sitt, Sina — Det reflexiva possessivet",
          source: "Form i fokus A, Kap. 3",
          body: "<p>Detta är ett av de svåraste koncepten för inlärare...</p>"
        }
      ]
    },
    {
      id: "concept-prepositioner",
      title: "Swedish Prepositions — Time, Place, and Direction",
      titleSv: "Svenska prepositioner — tid, plats och riktning",
      categoryMatch: ["syntax", "grammar"],
      txt: "Swedish prepositions are often a challenge because they don't always correspond one-to-one with English. Learning them in context is essential.\n.1. Location Prepositions\n'På' is used for surfaces and islands: 'på bordet' (on the table), 'på Gotland'. 'I' is used for enclosed spaces: 'i rummet' (in the room), 'i Sverige'. 'Vid' means 'at/by/next to': 'vid fönstret' (by the window).\n.2. Direction Prepositions\n'Till' means 'to': 'gå till skolan'. 'Från' means 'from': 'kommer från Sverige'. 'Genom' means 'through': 'gå genom parken'. 'Över' means 'over/across': 'hoppa över bäcken'.\n.3. Time Prepositions\n'På' with seasons and days: 'på sommaren', 'på måndag'. 'I' with months and years: 'i januari', 'i 2024'. 'Om' with future time: 'om en timme' (in an hour). 'För...sedan' for past: 'för en timme sedan' (an hour ago).\n.4. Common Verb + Preposition Combinations\n'Vänta på' (wait for), 'titta på' (look at), 'lyssna på' (listen to), 'tänka på' (think about), 'tro på' (believe in), 'prata om' (talk about), 'drömma om' (dream about).",txtSv: "Svenska prepositioner är ofta en utmaning eftersom de inte alltid motsvarar engelskan en till en. Att lära sig dem i sitt sammanhang är viktigt.\n.1. Rumsliga prepositioner\n'På' används för ytor och öar: 'på bordet' (on the table), 'på Gotland'. 'I' används för slutna rum: 'i rummet' (in the room), 'i Sverige'. 'Vid' betyder 'at/by/next to': 'vid fönstret' (by the window).\n.2. Riktningsprepositioner\n'Till' betyder 'to': 'gå till skolan'. 'Från' betyder 'from': 'kommer från Sverige'. 'Genom' betyder 'through': 'gå genom parken'. 'Över' betyder 'over/across': 'hoppa över bäcken'.\n.3. Tidsprepositioner\n'På' med årstider och dagar: 'på sommaren', 'på måndag'. 'I' med månader och år: 'i januari', 'i 2024'. 'Om' för framtid: 'om en timme' (in an hour). 'För...sedan' för dåtid: 'för en timme sedan' (an hour ago).\n.4. Vanliga verb + preposition-kombinationer\n'Vänta på' (wait for), 'titta på' (look at), 'lyssna på' (listen to), 'tänka på' (think about), 'tro på' (believe in), 'prata om' (talk about), 'drömma om' (dream about).",
      take: [
        "'På' is used more broadly than English 'on' — also for islands, days, seasons",
        "'I' is for enclosed spaces, countries, months, years",
        "'Om' indicates future time — 'om en timme' = in an hour",
        "'För...sedan' = ago — 'för två dagar sedan' = two days ago",
        "Learn verb + preposition combinations as fixed units"
      ],
      takeSv: ["'På' används bredare än engelskans 'on' – även för öar, dagar, årstider", "'I' används för slutna rum, länder, månader, år", "'Om' anger framtid – 'om en timme' = 'in an hour'", "'För ... sedan' = 'ago' – 'för två dagar sedan' = 'two days ago'", "Lär in verb + preposition-kombinationer som fasta enheter"],
      sections: [
        {
          heading: "Prepositions with Locations",
          source: "Form i fokus C, Kap. 4",
          body: "<p>Swedish makes important distinctions that English does not:</p><ul><li><strong>På jobbet</strong> = at work (the workplace as an activity)<br><strong>I jobbet</strong> = in the work (inside the work itself)</li><li><strong>På gatan</strong> = on the street (surface)<br><strong>I gatan</strong> = in the street (down in the street)</li><li><strong>På biblioteket</strong> = at the library (visiting)<br><strong>I biblioteket</strong> = inside the library (inside the building)</li></ul>"
        },
        {
          heading: "Movement Prepositions",
          source: "Rivstart A1+A2, Kap. 7",
          body: "<p>Key movement prepositions with examples:</p><ul><li><em>Jag går till affären.</em> — I'm going to the store.</li><li><em>Han kommer från Sverige.</em> — He comes from Sweden.</li><li><em>Vi åker genom staden.</em> — We drive through the city.</li><li><em>Hoppa över staketet!</em> — Jump over the fence!</li><li><em>Hon går förbi skolan.</em> — She walks past the school.</li><li><em>Spring in i huset!</em> — Run into the house!</li></ul>"
        }
      ],
      sectionsSv: [
        {
          heading: "Prepositioner med platser",
          source: "Form i fokus C, Kap. 4",
          body: "<p>Svenskan gör viktiga skillnader som engelskan inte gör...</p>"
        }
      ]
    }
  ],

  "svenska-idiom": [
    {
      id: "concept-idiom",
      title: "Swedish Idioms — Cultural Context and Usage",
      titleSv: "Svenska idiom — Kulturell kontext och användning",
      txt: "Swedish idioms (idiomatiska uttryck) often reflect the culture, nature, and history of Sweden. Understanding them gives insight into Swedish thinking.\n.1. What is an Idiom?\nAn idiom is a fixed expression whose meaning cannot be deduced from the individual words. For example, 'Det är ingen ko på isen' literally means 'There's no cow on the ice' but means 'There's no rush.'\n.2. Nature-Inspired Idioms\nMany Swedish idioms come from nature and rural life. 'Att ha en räv bakom örat' (to have a fox behind the ear = to be sly) reflects Sweden's wildlife. 'Att vara ute och cykla' (to be out cycling = to be mistaken) comes from modern life.\n.3. Food Idioms\n'Koka soppa på en spik' (to cook soup on a nail = making something from nothing) and 'Lätt som en plätt' (easy as a pancake = very easy) show the connection to food.\n.4. Body Idioms\n'Ha huvudet på skaft' (to have one's head on a handle = quick-witted) and 'Sätta fingret på' (to put one's finger on = to identify) use body parts metaphorically.",txtSv: "Svenska idiom (idiomatiska uttryck) speglar ofta Sveriges kultur, natur och historia. Att förstå dem ger insikt i det svenska sättet att tänka.\n.1. Vad är ett idiom?\nEtt idiom är ett fast uttryck vars betydelse inte kan härledas ur de enskilda orden. Till exempel betyder 'Det är ingen ko på isen' ordagrant 'There's no cow on the ice' men betyder 'Det är ingen brådska.'\n.2. Naturinspirerade idiom\nMånga svenska idiom kommer från naturen och landsbygdslivet. 'Att ha en räv bakom örat' (to have a fox behind the ear = to be sly) speglar Sveriges djurliv. 'Att vara ute och cykla' (to be out cycling = to be mistaken) kommer från det moderna livet.\n.3. Mat-idiom\n'Koka soppa på en spik' (to cook soup on a nail = making something from nothing) och 'Lätt som en plätt' (easy as a pancake = very easy) visar kopplingen till mat.\n.4. Kropps-idiom\n'Ha huvudet på skaft' (to have one's head on a handle = quick-witted) och 'Sätta fingret på' (to put one's finger on = to identify) använder kroppsdelar bildligt.",
      take: [
        "Idioms cannot be translated literally — learn their meaning as a unit",
        "Nature and rural life are common sources of Swedish idioms",
        "Many idioms use animals to describe human traits",
        "Food idioms are common and often humorous",
        "Using idioms correctly shows advanced language proficiency"
      ],
      takeSv: ["Idiom kan inte översättas ordagrant – lär dig betydelsen som en enhet", "Natur och landsbygdsliv är vanliga källor till svenska idiom", "Många idiom använder djur för att beskriva mänskliga egenskaper", "Mat-idiom är vanliga och ofta humoristiska", "Att använda idiom korrekt visar avancerade språkkunskaper"],
      sections: [
        {
          heading: "Idioms in Daily Conversation",
          source: "Svenska idiom: 3500 vardagsuttryck",
          body: "<p>Here are idioms you'll hear in everyday Swedish conversations:</p><ul><li><em>Det var nog ingen höjdare.</em> — It wasn't very good (literally 'not a high point')</li><li><em>Ta det lugnt.</em> — Take it easy (very common)</li><li><em>Det är lugnt!</em> — It's cool / No problem (slang)</li><li><em>Ge dig!</em> — Give up! / Stop it!</li><li><em>Vad är haken?</em> — What's the catch?</li></ul>"
        },
        {
          heading: "The 'Lagom' Concept",
          source: "Swedish Cultural Studies",
          body: "<p>'Lagom' is a uniquely Swedish concept meaning 'just the right amount' — not too much, not too little. It's used in countless expressions and reflects the Swedish cultural value of moderation.</p><p>Example uses: <em>lagom varmt</em> (just warm enough), <em>lagom mycket</em> (just the right amount), <em>det är lagom</em> (it's just right).</p>"
        }
      ],
      sectionsSv: [
        {
          heading: "Idiom i vardagliga samtal",
          source: "Svenska idiom: 3500 vardagsuttryck",
          body: "<p>Här är idiom du hör i vardagliga svenska samtal...</p>"
        }
      ]
    },
    {
      id: "concept-uttryck",
      title: "Everyday Expressions and Filler Words",
      titleSv: "Vardagliga uttryck och utfyllnadsord",
      txt: "Filler words and everyday expressions make your Swedish sound more natural and fluent. They serve important conversational functions.\n.1. Common Fillers\nJust like English 'um' and 'like', Swedish has fillers: 'typ' (like), 'liksom' (like/you know), 'alltså' (so/I mean), 'ju' (as you know), 'väl' (right/probably), 'nog' (probably).\n.2. Discourse Markers\n'Alltså' marks a conclusion or explanation. 'Faktiskt' means 'actually'. 'Egentligen' means 'really/actually'. 'Nämligen' means 'namely/you see'.\n.3. Response Words\n'Precis!' (Exactly!), 'Just det!' (That's right!), 'Verkligen!' (Really!), 'Absolut!' (Absolutely!), 'Självklart!' (Of course!), 'Gärna!' (Gladly/Willingly!).",txtSv: "Utfyllnadsord och vardagliga uttryck gör att din svenska låter mer naturlig och ledig. De fyller viktiga funktioner i samtalet.\n.1. Vanliga utfyllnadsord\nPrecis som engelskans 'um' och 'like' har svenskan utfyllnadsord: 'typ' (like), 'liksom' (like/you know), 'alltså' (so/I mean), 'ju' (as you know), 'väl' (right/probably), 'nog' (probably).\n.2. Diskursmarkörer\n'Alltså' markerar en slutsats eller förklaring. 'Faktiskt' betyder 'actually'. 'Egentligen' betyder 'really/actually'. 'Nämligen' betyder 'namely/you see'.\n.3. Responsord\n'Precis!' (Exactly!), 'Just det!' (That's right!), 'Verkligen!' (Really!), 'Absolut!' (Absolutely!), 'Självklart!' (Of course!), 'Gärna!' (Gladly/Willingly!).",
      take: [
        "'Ju' implies shared knowledge — 'Det är ju bra' = 'It's good, as you know'",
        "'Väl' softens questions — 'Du kommer väl?' = 'You're coming, right?'",
        "'Typ' is the most common filler among young Swedes",
        "'Alltså' can mean 'so', 'I mean', or 'therefore' depending on context",
        "Using fillers naturally is a sign of advanced fluency"
      ],
      takeSv: ["'Ju' antyder gemensam kunskap – 'Det är ju bra' = 'Det är bra, som du vet'", "'Väl' mjukar upp frågor – 'Du kommer väl?' = 'Du kommer, eller hur?'", "'Typ' är det vanligaste utfyllnadsordet bland unga svenskar", "'Alltså' kan betyda 'so', 'I mean' eller 'therefore' beroende på sammanhang", "Att använda utfyllnadsord naturligt är ett tecken på avancerad språkfärdighet"],
      sections: [
        {
          heading: "Pragmatic Particles",
          source: "Svensk funktionell grammatik, Ch. 8",
          body: "<p>Swedish 'modal particles' (ju, väl, nog, visst) add nuance to sentences:</p><ul><li><strong>Ju:</strong> 'Det är ju bra' = 'That's good (as you and I both know)'</li><li><strong>Väl:</strong> 'Det går väl bra' = 'That should be fine (I assume)', also used in tag questions</li><li><strong>Nog:</strong> 'Han kommer nog' = 'He'll probably come' (uncertain expectation)</li><li><strong>Visst:</strong> 'Det är visst sant' = 'It is actually true (despite doubts)'</li></ul>"
        }
      ],
      sectionsSv: [
        {
          heading: "Pragmatiska partiklar",
          source: "Svensk funktionell grammatik, Kap. 8",
          body: "<p>Svenska modalpartiklar (ju, väl, nog, visst) lägger till nyans i meningar...</p>"
        }
      ]
    },
    {
      id: "concept-slang",
      title: "Swedish Slang and Youth Language",
      titleSv: "Svensk slang och ungdomsspråk",
      txt: "Swedish slang evolves rapidly, especially among younger speakers. Understanding slang helps with authentic conversations and media.\n.1. Common Slang Words\n'Tjej' (girl/chick), 'kille' (guy/dude), 'grabb' (lad/bro), 'snubbe' (dude). 'Grej' (thing) is used constantly: 'Vad är grejen?' (What's the thing/the deal?).\n.2. Slang for Good/Bad\n'Sjukt' (literally 'sick') = very/really: 'Det var sjukt kul!' (That was really fun!). 'Grym' (cruel) = awesome: 'En grym film'. 'Kass' = bad/crappy: 'Det var kass'.\n.3. Shortened Words\nSwedes love shortening words: 'universitet' → 'universitetet' → 'univ' or 'plugget'. 'Stort' → 'stört'. 'Alicante' (slang for 'alltså'). 'Lixom' (slang for 'liksom').\n.4. English Loanwords\nMany English words are used: 'softa' (to chill/relax), 'hångla' (to make out from 'hang loose'), 'fejka' (to fake), 'shoppa' (to shop).",txtSv: "Svensk slang utvecklas snabbt, särskilt bland yngre talare. Att förstå slang hjälper i autentiska samtal och i media.\n.1. Vanliga slangord\n'Tjej' (girl/chick), 'kille' (guy/dude), 'grabb' (lad/bro), 'snubbe' (dude). 'Grej' (thing) används hela tiden: 'Vad är grejen?' (What's the thing/the deal?).\n.2. Slang för bra/dåligt\n'Sjukt' (ordagrant 'sick') = väldigt: 'Det var sjukt kul!' (That was really fun!). 'Grym' (cruel) = jättebra: 'En grym film'. 'Kass' = dålig: 'Det var kass'.\n.3. Förkortade ord\nSvenskar älskar att förkorta ord: 'universitet' → 'universitetet' → 'univ' eller 'plugget'. 'Stort' → 'stört'. 'Alicante' (slang för 'alltså'). 'Lixom' (slang för 'liksom').\n.4. Engelska lånord\nMånga engelska ord används: 'softa' (to chill/relax), 'hångla' (to make out from 'hang loose'), 'fejka' (to fake), 'shoppa' (to shop).",
      take: [
        "'Sjukt' is a versatile intensifier — 'sjukt bra', 'sjukt trött'",
        "'Kass' means bad/crappy — very common in everyday speech",
        "Swedes shorten words extensively in casual speech",
        "'Tjej' and 'kille' are the standard slang for girl/guy",
        "English loanwords are adapted with Swedish spelling and endings"
      ],
      takeSv: ["'Sjukt' är ett mångsidigt förstärkningsord – 'sjukt bra', 'sjukt trött'", "'Kass' betyder dålig – mycket vanligt i vardagligt tal", "Svenskar förkortar ord flitigt i vardagligt tal", "'Tjej' och 'kille' är standardslang för tjej/kille", "Engelska lånord anpassas med svensk stavning och ändelser"],
      sections: [
        {
          heading: "Internet and Text Slang",
          source: "Svenska idiom: 3500 vardagsuttryck",
          body: "<p>Common abbreviations and internet slang:</p><ul><li><strong>Asg:</strong> asgarva (laugh out loud) — 'Det var asg!'</li><li><strong>Mvh:</strong> med vänlig hälsning (best regards) — email closing</li><li><strong>Imo/Imho:</strong> same as English 'in my opinion'</li><li><strong>Obv:</strong> obviously (English loan)</li><li><strong>Ironisk:</strong> ironic — used heavily in Swedish humor</li><li><strong>Palla:</strong> orka/be bothered — 'Orkar inte' = can't be bothered</li></ul>"
        },
        {
          heading: "Regional Slang Differences",
          source: "Språktidningen",
          body: "<p>Stockholm slang: 'softa' (relax), 'lugn' (cool), 'ba' (like, filler). Gothenburg slang: 'kex' (guy), 'balle' (penis, used lightly). Malmö/Scanian slang: 'svåra' (talking), 'vi hörs' (talk later). Northern dialects: 'hänn' (here), 'heim' (home).</p>"
        }
      ],
      sectionsSv: [
        {
          heading: "Internet- och textspråk",
          source: "Svenska idiom: 3500 vardagsuttryck",
          body: "<p>Vanliga förkortningar och internetslang...</p>"
        }
      ]
    }
  ],

  "nyborjare": [
    {
      id: "concept-vardagsliv",
      title: "Describing Your Daily Routine in Swedish",
      titleSv: "Beskriv din vardag på svenska",
      txt: "Being able to describe your daily routine is one of the first practical skills in Swedish conversation. This topic covers time expressions, reflexive verbs, and common daily activities.\n.1. Morning Routine\nCommon morning verbs: 'vakna' (wake up), 'gå upp' (get up), 'tvätta sig' (wash oneself), 'klä på sig' (get dressed), 'äta frukost' (eat breakfast).\n.2. Reflexive Daily Verbs\nMany daily routine verbs use the reflexive 'sig': 'Jag tvättar mig' (I wash myself), 'Jag klär på mig' (I get dressed), 'Jag lägger mig' (I go to bed). 'Klä på sig' means to dress — the 'på' is part of the phrasal verb.\n.3. Time and Sequence\nUse 'sedan' (then/afterwards), 'först' (first), 'därefter' (thereafter), 'innan' (before), 'efter' (after) to sequence activities.\n.4. Work and Study\n'Jag arbetar' (I work), 'Jag studerar' (I study), 'Jag går till skolan' (I go to school), 'Jag är ledig' (I am off/free).",txtSv: "Att kunna beskriva sin vardag är en av de första praktiska färdigheterna i svenska samtal. Det här ämnet tar upp tidsuttryck, reflexiva verb och vanliga vardagsaktiviteter.\n.1. Morgonrutin\nVanliga morgonverb: 'vakna' (wake up), 'gå upp' (get up), 'tvätta sig' (wash oneself), 'klä på sig' (get dressed), 'äta frukost' (eat breakfast).\n.2. Reflexiva vardagsverb\nMånga vardagsverb använder reflexivt 'sig': 'Jag tvättar mig' (I wash myself), 'Jag klär på mig' (I get dressed), 'Jag lägger mig' (I go to bed). 'Klä på sig' betyder att klä sig — 'på' är en del av partikelverbet.\n.3. Tid och ordningsföljd\nAnvänd 'sedan' (then/afterwards), 'först' (first), 'därefter' (thereafter), 'innan' (before), 'efter' (after) för att ordna aktiviteter i följd.\n.4. Arbete och studier\n'Jag arbetar' (I work), 'Jag studerar' (I study), 'Jag går till skolan' (I go to school), 'Jag är ledig' (I am off/free).",
      take: [
        "Reflexive verbs require 'mig/dig/sig' — 'Jag tvättar mig' not just 'Jag tvättar'",
        "'Klä på sig' is a particle verb — the 'på' stays with 'klä'",
        "Time expressions go at the beginning of sentences to trigger inversion",
        "'Sedan' is the most common connector for sequences",
        "'Att gå' can mean both 'to go' and 'to walk'"
      ],
      takeSv: ["Reflexiva verb kräver 'mig/dig/sig' – 'Jag tvättar mig', inte bara 'Jag tvättar'", "'Klä på sig' är ett partikelverb – 'på' hör ihop med 'klä'", "Tidsuttryck sätts i början av meningen för att utlösa inversion", "'Sedan' är det vanligaste sambandsordet för följder", "'Att gå' kan betyda både 'to go' och 'to walk'"],
      sections: [
        {
          heading: "Sample Daily Routine Text",
          source: "På Svenska 1, Kap. 4",
          body: "<p>Jag vaknar klockan sju på morgonen. Först tvättar jag mig och klär på mig. Sedan äter jag frukost — jag dricker kaffe och äter en smörgås. Klockan åtta går jag till jobbet. Jag arbetar från nio till fem. På kvällen lagar jag mat och tittar på TV. Jag lägger mig klockan elva.</p>"
        }
      ],
      sectionsSv: [
        {
          heading: "Exempel på vardaglig text",
          source: "På Svenska 1, Kap. 4",
          body: "<p>Jag vaknar klockan sju på morgonen...</p>"
        }
      ]
    },
    {
      id: "concept-vader",
      title: "Weather, Seasons, and Nature Vocabulary",
      titleSv: "Väder, årstider och natur-ord",
      categoryMatch: ["nature", "nature-basic"],
      txt: "Weather and seasons are common conversation topics in Sweden. The weather changes dramatically across the four seasons.\n.1. Seasons\nSpring: vår, Summer: sommar, Autumn/Fall: höst, Winter: vinter. 'På våren' = in spring, 'på sommaren' = in summer.\n.2. Common Weather Phrases\n'Det är varmt/kallt' (It's warm/cold), 'Det regnar' (It's raining), 'Det snöar' (It's snowing), 'Det blåser' (It's windy), 'Solen skiner' (The sun is shining).\n.3. Temperature\n'Det är tio grader' (It's 10 degrees), 'minus fem grader' (minus 5 degrees), 'Det är varmt idag' (It's warm today).\n.4. Nature Words\nSkog (forest), sjö (lake), hav (sea), berg (mountain), älv (river), blommor (flowers), träd (trees).",txtSv: "Väder och årstider är vanliga samtalsämnen i Sverige. Vädret förändras dramatiskt mellan de fyra årstiderna.\n.1. Årstider\nVår (spring), sommar (summer), höst (autumn), vinter (winter). 'På våren' = in spring, 'på sommaren' = in summer.\n.2. Vanliga väderfraser\n'Det är varmt/kallt' (It's warm/cold), 'Det regnar' (It's raining), 'Det snöar' (It's snowing), 'Det blåser' (It's windy), 'Solen skiner' (The sun is shining).\n.3. Temperatur\n'Det är tio grader' (It's 10 degrees), 'minus fem grader' (minus 5 degrees), 'Det är varmt idag' (It's warm today).\n.4. Naturord\nSkog (forest), sjö (lake), hav (sea), berg (mountain), älv (river), blommor (flowers), träd (trees).",
      take: [
        "'På' is used with seasons: på våren, på sommaren, på hösten, på vintern",
        "'Det' is the subject for all weather expressions — 'Det regnar', 'Det är kallt'",
        "Sweden uses Celsius exclusively",
        "'Grader' = degrees; 'minus' = below zero",
        "'Värmen' (the heat) and 'kylan' (the cold) are used as nouns"
      ],
      takeSv: ["'På' används med årstider: på våren, på sommaren, på hösten, på vintern", "'Det' är subjekt i alla väderuttryck – 'Det regnar', 'Det är kallt'", "Sverige använder uteslutande Celsius", "'Grader' = grader; 'minus' = under noll", "'Värmen' (heat) och 'kylan' (cold) används som substantiv"],
      sections: [
        {
          heading: "Swedish Climate and Weather Talk",
          source: "Nybörjarsvenska, Kap. 7",
          body: "<p>Weather is a common small-talk topic in Sweden. Key phrases:</p><ul><li><em>Vad är det för väder?</em> — What's the weather like?</li><li><em>Det är fint väder idag.</em> — The weather is nice today.</li><li><em>Det är dåligt väder.</em> — The weather is bad.</li><li><em>Det är mulet.</em> — It's cloudy.</li><li><em>Det är soligt.</em> — It's sunny.</li><li><em>Det blåser mycket.</em> — It's very windy.</li></ul><p>Winter temperatures in northern Sweden can reach -40°C, while southern Sweden is milder thanks to the Gulf Stream.</p>"
        }
      ],
      sectionsSv: [
        {
          heading: "Svenskt klimat och väderprat",
          source: "Nybörjarsvenska, Kap. 7",
          body: "<p>Väder är ett vanligt småpratsämne i Sverige...</p>"
        }
      ]
    },
    {
      id: "concept-klader",
      title: "Clothing, Shopping, and Prices in Swedish",
      titleSv: "Kläder, shopping och priser på svenska",
      categoryMatch: ["clothing"],
      txt: "Shopping is one of the first practical situations where you'll use Swedish. Knowing clothing vocabulary, sizes, and price expressions is essential.\n.1. Common Clothing Items\nEn tröja (sweater), en skjorta (shirt), en klänning (dress), en jacka (jacket), byxor (pants — always plural!), skor (shoes), en keps (cap), en halsduk (scarf).\n.2. Shopping Phrases\n'Jag tittar bara' (I'm just looking), 'Kan jag prova?' (Can I try on?), 'Var finns provrummet?' (Where is the fitting room?), 'Har ni den i en annan storlek?' (Do you have it in another size?), 'Jag tar den' (I'll take it).\n.3. Sizes and Colors\nSizes: XS, S, M, L, XL (same as English). Colors: röd (red), blå (blue), grön (green), gul (yellow), vit (white), svart (black), grå (gray), brun (brown). Remember: 'en röd tröja' but 'ett rött kläde'.\n.4. Prices and Payment\n'Vad kostar det?' (How much does it cost?), 'Den kostar...' (It costs...), 'Det är på rea' (It's on sale), 'Kan jag betala med kort?' (Can I pay by card?), 'Kvitto' (receipt).",txtSv: "Shopping är en av de första praktiska situationerna där du använder svenska. Att kunna klädord, storlekar och prisuttryck är viktigt.\n.1. Vanliga klädesplagg\nEn tröja (sweater), en skjorta (shirt), en klänning (dress), en jacka (jacket), byxor (pants — always plural!), skor (shoes), en keps (cap), en halsduk (scarf).\n.2. Shoppingfraser\n'Jag tittar bara' (I'm just looking), 'Kan jag prova?' (Can I try on?), 'Var finns provrummet?' (Where is the fitting room?), 'Har ni den i en annan storlek?' (Do you have it in another size?), 'Jag tar den' (I'll take it).\n.3. Storlekar och färger\nStorlekar: XS, S, M, L, XL (samma som på engelska). Färger: röd (red), blå (blue), grön (green), gul (yellow), vit (white), svart (black), grå (gray), brun (brown). Kom ihåg: 'en röd tröja' men 'ett rött kläde'.\n.4. Priser och betalning\n'Vad kostar det?' (How much does it cost?), 'Den kostar...' (It costs...), 'Det är på rea' (It's on sale), 'Kan jag betala med kort?' (Can I pay by card?), 'Kvitto' (receipt).",
      take: [
        "'Byxor' (pants) is always plural in Swedish",
        "Use 'prova' for trying on clothes — 'Kan jag prova den?'",
        "Adjective agreement applies: 'en röd tröja' vs 'ett rött plagg'",
        "'Rea' means sale (from French 'réclame')",
        "'Kvitto' is the all-important word for receipt"
      ],
      takeSv: ["'Byxor' är alltid plural i svenska", "Använd 'prova' för att prova kläder – 'Kan jag prova den?'", "Adjektivkongruens gäller: 'en röd tröja' vs 'ett rött plagg'", "'Rea' betyder utförsäljning (från franskans 'réclame')", "'Kvitto' är det viktigaste ordet när du handlar (receipt)"],
      sections: [
        {
          heading: "Swedish Sizes and Measurements",
          source: "På Svenska 1, Kap. 6",
          body: "<p>Svenska storlekar (Swedish sizes): Dam (Women's): 34-36 = XS, 38-40 = S, 42-44 = M, 46-48 = L. Herr (Men's): 44-46 = S, 48-50 = M, 52-54 = L, 56-58 = XL. Skor (Shoes): EU sizes are the same, but UK/US conversions differ. Ask: 'Vilken storlek har du?' (What size do you wear?)</p>"
        },
        {
          heading: "At the Market — Östermalmshallen Example",
          source: "Nybörjarsvenska, Kap. 10",
          body: "<p>Customer: <em>Hej! Hur mycket kostar äpplena?</em><br>Seller: <em>De kostar 25 kronor kilot.</em><br>Customer: <em>Jag tar ett halvt kilo, tack.</em><br>Seller: <em>Det blir 12 kronor och 50 öre.</em><br>Customer: <em>Här är 20 kronor.</em><br>Seller: <em>Här får du tillbaka 7 kronor och 50 öre. Tack och hej!</em></p>"
        }
      ],
      sectionsSv: [
        {
          heading: "Svenska storlekar",
          source: "På Svenska 1, Kap. 6",
          body: "<p>Svenska storlekar för kläder...</p>"
        }
      ]
    },
    {
      id: "concept-nature",
      title: "Swedish Nature and Landscape",
      titleSv: "Svensk natur och landskap",
      txt: "Sweden's landscape is defined by its vast forests, thousands of lakes, and long coastline. Nature vocabulary is essential for describing the country and its outdoors culture.\n.1. The Four Seasons\nSwedish nature changes dramatically with the seasons. 'Våren' brings flowers and longer days. 'Sommaren' is short but intense with the 'midnattssol' in the north. 'Hösten' paints the forests in gold and red. 'Vintern' covers the land in snow and ice.\n.2. Water Landscapes\nSweden has nearly 100,000 lakes ('sjöar'), a long coastline along the Baltic Sea ('Östersjön'), and countless rivers ('älvar'). 'Havet' (the sea) and 'stranden' (the beach) are central to Swedish summer life.\n.3. Forests and Mountains\nAbout 70% of Sweden is forest ('skog'). The north features mountains ('berg'), while the south is more gentle with farmland ('åker') and meadows ('äng').\n.4. Weather Vocabulary\nSwedes talk about weather constantly. 'Det är mulet' (cloudy), 'Det blåser' (windy), 'Det är soligt' (sunny), 'Det är milt' (mild), 'Det är frostigt' (frosty).",txtSv: "Sveriges landskap präglas av stora skogar, tusentals sjöar och en lång kustlinje. Naturord är viktiga för att beskriva landet och dess friluftskultur.\n.1. De fyra årstiderna\nSvensk natur förändras dramatiskt med årstiderna. 'Våren' ger blommor och längre dagar. 'Sommaren' är kort men intensiv med 'midnattssol' i norr. 'Hösten' målar skogarna i guld och rött. 'Vintern' täcker landet i snö och is.\n.2. Vattenlandskap\nSverige har nästan 100 000 sjöar ('sjöar'), en lång kustlinje längs Östersjön ('Östersjön') och otaliga älvar ('älvar'). 'Havet' (the sea) och 'stranden' (the beach) är centrala i det svenska sommarlivet.\n.3. Skogar och berg\nCirka 70% av Sverige är skog ('skog'). I norr finns berg ('berg'), medan söder är mjukare med åkermark ('åker') och ängar ('äng').\n.4. Väderord\nSvenskar pratar ständigt om vädret. 'Det är mulet' (cloudy), 'Det blåser' (windy), 'Det är soligt' (sunny), 'Det är milt' (mild), 'Det är frostigt' (frosty).",
      take: [
        "Sweden has four distinct seasons: vår, sommar, höst, vinter — use 'på' with seasons (på våren)",
        "Water landscape words: hav, sjö, älv, strand, våg — all are en-words except 'vatten' (ett-ord)",
        "'Skog' (forest) covers 70% of Sweden — important for understanding Swedish culture and outdoor life",
        "'Det är' + weather adjective is the standard pattern for weather descriptions",
        "Swedish uses Celsius and 'minus' for below-zero temperatures"
      ],
      takeSv: ["Sverige har fyra årstider: vår, sommar, höst, vinter – använd 'på' med årstider (på våren)", "Vattenlandskapsord: hav, sjö, älv, strand, våg – alla är en-ord utom 'vatten' (ett-ord)", "'Skog' täcker 70 % av Sverige – viktigt för att förstå svensk kultur och friluftsliv", "'Det är' + väderadjektiv är standardmönstret för väderbeskrivningar", "Svenska använder Celsius och 'minus' för temperaturer under noll"],
      sections: [
        {
          heading: "The Swedish Coastline",
          source: "Ålevangeliet, Ch. 2 — Swedish Coastal Landscapes",
          body: "<p>Sweden's coastline stretches over 3,000 kilometers along the Baltic Sea and the Gulf of Bothnia. The coastal landscape varies from the sandy beaches of Skåne in the south to the rugged archipelago (skärgård) of Stockholm and the rocky cliffs of Norrland.</p><p>Key coastal vocabulary: <em>kust</em> (coast), <em>strand</em> (beach), <em>skärgård</em> (archipelago), <em>klippa</em> (cliff), <em>hamn</em> (harbor), <em>fyr</em> (lighthouse), <em>bad</em> (swimming spot), <em>segla</em> (to sail), <em>fiska</em> (to fish).</p><p>Example from Ålevangeliet: <em>De har fått namn efter de fiskare som har brukat dem eller från sägner och historier som sägs ha utspelat sig där.</em></p>"
        },
        {
          heading: "Swedish Outdoor Life — Allemansrätten",
          source: "Nybörjarsvenska, Kap. 7 — Swedish Culture",
          body: "<p>'Allemansrätten' (Everyman's Right) is a unique Swedish concept that gives everyone the right to roam freely in nature — to walk, camp, and pick berries and mushrooms on private land, as long as you don't disturb or damage. This right is fundamental to Swedish identity and explains why nature vocabulary is so important.</p><p>Common outdoor phrases: <em>gå i skogen</em> (walk in the forest), <em>plocka bär</em> (pick berries), <em>tälta</em> (camp), <em>grilla korv</em> (barbecue sausage), <em>vandra</em> (hike), <em>bada</em> (swim/bathe).</p>"
        }
      ],
      sectionsSv: [
        {
          heading: "Den svenska kusten",
          source: "Ålevangeliet, Kap. 2 — Svenska kustlandskap",
          body: "<p>Sveriges kust sträcker sig över 3 000 kilometer...</p>"
        }
      ]
    }
  ],
  "svensk-litteratur": [
    {
      id: "concept-talsprak",
      title: "Colloquial Swedish — Spoken vs Written Language",
      titleSv: "Talspråk — skillnaden mellan talat och skrivet språk",
      txt: "Spoken Swedish differs significantly from written Swedish. Knowing these differences is essential for understanding real conversations, movies, and literature.\n.1. 'Dom' for 'De' and 'Dem'\nIn spoken Swedish, 'de' (they) and 'dem' (them) are both pronounced and often written as 'dom'. Example: 'Dom kommer imorgon' (They're coming tomorrow), 'Jag ser dom' (I see them). This is the most noticeable difference between spoken and written Swedish.\n.2. Contractions and Shortenings\n'Sen' for 'sedan' (then/afterwards), 'e' for 'är' (is/are), 'så' for 'bara så' (just), 'mej/dej' for 'mig/dig' (me/you). These are very common in speech and informal writing.\n.3. Modal Particles\nSwedish uses modal particles (ju, väl, nog, visst) constantly in speech to add nuance. 'Ju' implies shared knowledge, 'väl' softens questions, 'nog' indicates probability, 'visst' counters doubt.\n.4. Filler Words\n'Typ' (like), 'liksom' (like/you know), 'alltså' (I mean/so), 'ba' (like/said — young people's slang). These make speech flow naturally.\n.5. Regional Variations\nStockholm dialect uses 'softa' (relax), 'lugn' (cool). Gothenburg: 'kex' (guy). Skåne: 'svåra' (talking). Northern: 'hänn' (here).",txtSv: "Talad svenska skiljer sig betydligt från skriven svenska. Att känna till dessa skillnader är viktigt för att förstå verkliga samtal, filmer och litteratur.\n.1. 'Dom' för 'De' och 'Dem'\nI talad svenska uttalas och skrivs 'de' (they) och 'dem' (them) ofta som 'dom'. Exempel: 'Dom kommer imorgon' (They're coming tomorrow), 'Jag ser dom' (I see them). Detta är den tydligaste skillnaden mellan talad och skriven svenska.\n.2. Sammandragningar och förkortningar\n'Sen' för 'sedan' (then/afterwards), 'e' för 'är' (is/are), 'så' för 'bara så' (just), 'mej/dej' för 'mig/dig' (me/you). Dessa är mycket vanliga i tal och informellt skrivande.\n.3. Modalpartiklar\nSvenskan använder modalpartiklar (ju, väl, nog, visst) ständigt i tal för att nyansera. 'Ju' antyder gemensam kunskap, 'väl' mjukar upp frågor, 'nog' anger sannolikhet, 'visst' bemöter tvivel.\n.4. Utfyllnadsord\n'Typ' (like), 'liksom' (like/you know), 'alltså' (I mean/so), 'ba' (like/said — ungdomsslang). Dessa får talet att flyta naturligt.\n.5. Regionala variationer\nStockholmsdialekten använder 'softa' (relax), 'lugn' (cool). Göteborg: 'kex' (guy). Skåne: 'svåra' (talking). Norrland: 'hänn' (here).",
      take: [
        "'Dom' replaces both 'de' and 'dem' in spoken Swedish — use it in conversation, not formal writing",
        "'Ju' adds 'as you know' nuance — 'Det är ju bra' = 'That's good (as we both know)'",
        "'Väl' turns statements into questions — 'Du kommer väl?' = 'You're coming, right?'",
        "'Sen' (not 'sedan') is the normal spoken form",
        "Filler words like 'typ' and 'liksom' make your Swedish sound natural"
      ],
      takeSv: ["'Dom' ersätter både 'de' och 'dem' i talad svenska – använd det i samtal, inte i formellt skrift", "'Ju' lägger till nyansen 'som du vet' – 'Det är ju bra' = 'Det är bra (som vi båda vet)'", "'Väl' gör påståenden till frågor – 'Du kommer väl?' = 'Du kommer, eller hur?'", "'Sen' (inte 'sedan') är den normala talformen", "Utfyllnadsord som 'typ' och 'liksom' gör din svenska naturlig"],
      sections: [
        {
          heading: "Dialect Analysis — Ondskan",
          source: "Ondskan (Jan Guillou) — Dialogue Analysis",
          body: "<p>Jan Guillou's novel 'Ondskan' is rich in colloquial Swedish from the 1950s. The dialogue reveals how Swedes really spoke:</p><p><strong>Example 1</strong> (spoken by a student): <em>'Du behöver inte va rädd, dom e inte farliga.'</em> — 'You don't need to be afraid, they're not dangerous.'<br>Note: 'va' for 'vara', 'e' for 'är', 'dom' for 'de'.</p><p><strong>Example 2</strong> (Erik thinking about his father): <em>'Farsan va stolt över slaget för han inbillade sig att han kunde slå det snabbt.'</em><br>Note: 'farsan' (colloquial for father), 'va' (was — spoken shortening of 'var').</p><p><strong>Example 3</strong> (internal monologue): <em>'Det va nog så dom hade tänkt sig.'</em><br>Note: 'nog' as a modal particle = 'probably', 'dom' for 'de'.</p>"
        }
      ],
      sectionsSv: [
        {
          heading: "Dialektanalys — Ondskan",
          source: "Ondskan (Jan Guillou)",
          body: "<p>Jan Guillous roman 'Ondskan' är rik på talspråk från 1950-talet...</p>"
        }
      ]
    },
    {
      id: "concept-skrivande",
      title: "Creative Writing in Swedish",
      titleSv: "Kreativt skrivande på svenska",
      txt: "Writing creatively in Swedish requires vocabulary for describing people, places, and emotions. This concept covers narrative techniques and descriptive language.\n.1. Describing People — Personbeskrivning\nGood character description combines physical appearance and personality. 'Hur ser personen ut?' (What does the person look like?) vs 'Hur är personen?' (What is the person like?). Physical: 'lång' (tall), 'kort' (short), 'smal' (slim), 'kraftig' (sturdy). Personality: 'vänlig' (kind), 'bestämd' (firm), 'generös' (generous).\n.2. Setting the Scene — Miljöbeskrivning\nDescribe where the story takes place: 'i skogen' (in the forest), 'vid havet' (by the sea), 'i staden' (in the city). Use all senses: 'doften av salt' (the scent of salt), 'ljudet av vågor' (the sound of waves), 'kylan i luften' (the cold in the air).\n.3. Narrative Tenses\nSwedish uses 'presens' (present tense) for immediate narration and 'preteritum' (past tense) for past events. 'Perfekt' (perfect) connects past to present. 'Pluskvamperfekt' (pluperfect) refers to events before other past events.\n.4. Building Tension with Sentence Structure\nShort sentences create urgency: 'Han sprang. Hjärtat slog. Dörren var stängd.' Longer, complex sentences create atmosphere and detail. Inversion (starting with an adverb) varies rhythm: 'Plötsligt hörde han ett ljud.'",txtSv: "Att skriva kreativt på svenska kräver ordförråd för att beskriva människor, platser och känslor. Det här ämnet tar upp berättarteknik och beskrivande språk.\n.1. Att beskriva människor — Personbeskrivning\nEn bra personbeskrivning kombinerar fysiskt utseende och personlighet. 'Hur ser personen ut?' (What does the person look like?) vs 'Hur är personen?' (What is the person like?). Fysiskt: 'lång' (tall), 'kort' (short), 'smal' (slim), 'kraftig' (sturdy). Personlighet: 'vänlig' (kind), 'bestämd' (firm), 'generös' (generous).\n.2. Att bygga miljön — Miljöbeskrivning\nBeskriv var historien utspelar sig: 'i skogen' (in the forest), 'vid havet' (by the sea), 'i staden' (in the city). Använd alla sinnen: 'doften av salt' (the scent of salt), 'ljudet av vågor' (the sound of waves), 'kylan i luften' (the cold in the air).\n.3. Berättartempus\nSvenskan använder 'presens' (present tense) för direkt berättande och 'preteritum' (past tense) för tidigare händelser. 'Perfekt' (perfect) kopplar dåtid till nutid. 'Pluskvamperfekt' (pluperfect) syftar på händelser före andra dåtida händelser.\n.4. Att bygga spänning med meningsbyggnad\nKorta meningar skapar brådska: 'Han sprang. Hjärtat slog. Dörren var stängd.' Längre, komplexa meningar skapar stämning och detaljer. Inversion (att börja med ett adverbial) varierar rytmen: 'Plötsligt hörde han ett ljud.'",
      take: [
        "Personbeskrivning = appearance (utseende) + personality (personlighet)",
        "Use all five senses for effective miljöbeskrivning (setting description)",
        "Alternate short and long sentences for rhythm and tension",
        "Inversion (adverb first) adds variety: 'Plötsligt...', 'Där...', 'Aldrig...'",
        "Dialogue should reflect how people actually speak — use 'dom', 'sen', 'va'"
      ],
      takeSv: ["Personbeskrivning = utseende + personlighet", "Använd alla fem sinnen för en effektiv miljöbeskrivning", "Växla mellan korta och långa meningar för rytm och spänning", "Inversion (adverb först) ger variation: 'Plötsligt...', 'Där...', 'Aldrig...'", "Dialog ska spegla hur människor faktiskt talar – använd 'dom', 'sen', 'va'"],
      sections: [
        {
          heading: "Character Description Techniques",
          source: "Skrivboken (Lasse Ekholm) — Chapter: Att beskriva personer",
          body: "<p>Lasse Ekholm's 'Skrivboken' offers practical advice for describing characters:</p><p><strong>UTANPÅ (External):</strong> 'V ad en person heter och hur personen ser ut är förstås bra att veta, när du hittar på figurer till din berättelse.' — What a person is called and what they look like is of course good to know when you invent characters for your story.</p><p><strong>INUTI (Internal):</strong> 'Personerna får oss att skratta eller gråta och att läsa vidare sida efter sida för att få veta hur det ska gå för dem.' — The characters make us laugh or cry and keep reading page after page to find out what happens to them.</p><p><strong>OMKRING (Surroundings):</strong> 'Vad personen har omkring sig kan också vara betydelsefullt.' — What the person has around them can also be significant.</p><p>The book advises creating a full backstory for each character, even if most of it never appears in the story — because it shapes how the character acts and speaks.</p>"
        },
        {
          heading: "Describing Nature in Swedish",
          source: "Ålevangeliet (Patrik Svensson) — Nature Writing Examples",
          body: "<p>Patrik Svensson's 'Ålevangeliet' (The Eel Gospel) exemplifies beautiful Swedish nature writing. Key phrases for describing natural scenes:</p><ul><li><em>Havet låg spegelblankt.</em> — The sea was mirror-calm.</li><li><em>Vågorna slog mot stranden.</em> — The waves beat against the shore.</li><li><em>Stolparna stack upp över horisonten.</em> — The poles stuck up above the horizon.</li><li><em>Ett gammalt hus i tegel eller murad sten, med halmtak.</em> — An old house of brick or stone, with a thatched roof.</li><li><em>De har fått namn efter de fiskare som har brukat dem.</em> — They have been named after the fishermen who used them.</li><li><em>Halvt nergrävt i sanddynerna.</em> — Half buried in the sand dunes.</li></ul>"
        }
      ],
      sectionsSv: [
        {
          heading: "Tekniker för personbeskrivning",
          source: "Skrivboken (Lasse Ekholm)",
          body: "<p>Lasse Ekholms 'Skrivboken' ger praktiska råd för att beskriva karaktärer...</p>"
        }
      ]
    },
    {
      id: "concept-skrivregler",
      title: "Swedish Writing Rules and Style",
      titleSv: "Svenska skrivregler och stil",
      txt: "Formal Swedish writing follows specific rules about punctuation, formatting, and style. These are essential for academic and professional writing.\n.1. Särskrivning — A Common Error\nSwedish compounds words that English keeps separate. 'Särskrivning' (writing compounds separately) is one of the most common errors. Correct: 'en tågstation' → 'en tågstation' (but 'en tåg station' is wrong). Always check if two words should be one.\n.2. Capitalization\nSwedish capitalizes fewer words than English. Only proper nouns and the first word of a sentence are capitalized. Weekdays, months, languages, and nationalities are NOT capitalized: 'måndag', 'januari', 'svenska', 'svensk'.\n.3. Comma Usage\nSwedish uses commas differently from English. No comma before 'att' (that) or 'om' (if/whether). Use comma before 'men' (but) and before subordinate clauses beginning with 'eftersom', 'därför att', 'när', 'medan'.\n.4. The Genitive -s\nAdd -s to form the possessive, without an apostrophe: 'Eriks bok' (Erik's book), not 'Erik's bok'. Exception: names ending in s, x, or z can add -s or just an apostrophe: 'Lars bok' or 'Lars' bok' (both acceptable).\n.5. Number Format\nSwedish uses comma as decimal separator (3,14) and space as thousands separator (1 000). Currency: '100 kr' or '100:-'. Time: 24-hour format is standard (14:30 not 2:30 PM).",txtSv: "Formellt svenskt skrivande följer specifika regler för punktsättning, formatering och stil. Dessa är viktiga för akademiskt och professionellt skrivande.\n.1. Särskrivning — ett vanligt fel\nSvenskan sätter ihop sammansatta ord som engelskan håller isär. 'Särskrivning' (att skriva sammansättningar isär) är ett av de vanligaste felen. Rätt: 'en tågstation' (men 'en tåg station' är fel). Kontrollera alltid om två ord ska vara ett.\n.2. Versaler\nSvenskan använder färre versaler än engelskan. Bara egennamn och första ordet i en mening skrivs med stor bokstav. Veckodagar, månader, språk och nationaliteter skrivs INTE med stor bokstav: 'måndag', 'januari', 'svenska', 'svensk'.\n.3. Kommaanvändning\nSvenskan använder kommatecken annorlunda än engelskan. Inget kommatecken före 'att' eller 'om'. Använd kommatecken före 'men' och före bisatser som börjar med 'eftersom', 'därför att', 'när', 'medan'.\n.4. Genitiv -s\nLägg till -s för att bilda possessiv, utan apostrof: 'Eriks bok' (Erik's book), inte 'Erik's bok'. Undantag: namn som slutar på s, x eller z kan få -s eller bara apostrof: 'Lars bok' eller 'Lars' bok' (båda är korrekta).\n.5. Sifferformat\nSvenskan använder komma som decimaltecken (3,14) och mellanslag som tusentalsavgränsare (1 000). Valuta: '100 kr' eller '100:-'. Tid: 24-timmarsformat är standard (14:30, inte 2:30 PM).",
      take: [
        "Avoid 'särskrivning' — two-word compounds are almost always wrong in Swedish",
        "Weekdays, months, and languages are NOT capitalized in Swedish",
        "No apostrophe in genitive: 'Eriks bil' not 'Erik's bil'",
        "Comma before 'men' but not before 'att' or 'om'",
        "Swedish uses 24-hour time, comma decimal (3,14), and space thousands (1 000)"
      ],
      takeSv: ["Undvik särskrivning – sammansatta ord uppdelade i två ord är nästan alltid fel i svenska", "Veckodagar, månader och språk skrivs INTE med stor bokstav i svenska", "Ingen apostrof i genitiv: 'Eriks bil', inte 'Erik's bil'", "Kommatecken före 'men' men inte före 'att' eller 'om'", "Svenska använder 24-timmarsklocka, decimalkomma (3,14) och mellanslag i tusental (1 000)"],
      sections: [
        {
          heading: "Common Särskrivning Examples",
          source: "Svenska skrivregler (Språkrådet) — Chapter 3",
          body: "<table style='width:100%;border-collapse:collapse'><tr><th style='text-align:left'>Incorrect (särskrivning)</th><th style='text-align:left'>Correct</th></tr><tr><td>en lång tid</td><td>en långtid (if 'a long time' as concept, but 'en lång tid' = 'a long time' is actually correct in this case — be careful!)</td></tr><tr><td>sjuk sköterska</td><td>sjuksköterska (nurse)</td></tr><tr><td>kort varor</td><td>kortvaror (groceries)</td></tr><tr><td>stor lek</td><td>storlek (size)</td></tr><tr><td>bröd frukt</td><td>brödfrukt (breadfruit)</td></tr></table><p>The rule: if the compound has a meaning different from the individual words, write it as one word.</p>"
        },
        {
          heading: "Formal vs Informal Register",
          source: "Svenska skrivregler + Uppsatshandboken",
          body: "<p><strong>Formal (formal writing):</strong></p><ul><li>Use full forms: 'skall' not 'ska', 'endast' not 'bara', 'icke' not 'inte' (in very formal texts)</li><li>No contractions: 'det är' not 'de e'</li><li>Full sentences, no sentence fragments</li><li>Passive voice is common: 'Det kan konstateras att...'</li></ul><p><strong>Informal (everyday writing):</strong></p><ul><li>Use 'ska', 'bara', 'inte'</li><li>Shortened forms are fine: 'sen' for 'sedan', 'dom' for 'de/dem'</li><li>Active voice preferred: 'Jag tycker att...'</li></ul>"
        }
      ],
      sectionsSv: [
        {
          heading: "Vanliga särskrivningsexempel",
          source: "Svenska skrivregler (Språkrådet)",
          body: "<p>Särskrivning är ett av de vanligaste felen i svenskt skrivande...</p>"
        }
      ]
    }
  ]
};

// ========== VERB CONJUGATIONS (for Böj tab) ==========
const verbConjugations = [
  // ---- Group 1 (adds -ade in past, -at in supine) ----
  { infinitive: "att tala", present: "talar", preterite: "talade", supine: "talat", imperative: "tala", futurum: "kommer att tala", group: 1, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att arbeta", present: "arbetar", preterite: "arbetade", supine: "arbetat", imperative: "arbeta", futurum: "kommer att arbeta", group: 1, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att handla", present: "handlar", preterite: "handlade", supine: "handlat", imperative: "handla", futurum: "kommer att handla", group: 1, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att berätta", present: "berättar", preterite: "berättade", supine: "berättat", imperative: "berätta", futurum: "kommer att berätta", group: 1, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att förklara", present: "förklarar", preterite: "förklarade", supine: "förklarat", imperative: "förklara", futurum: "kommer att förklara", group: 1, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att diskutera", present: "diskuterar", preterite: "diskuterade", supine: "diskuterat", imperative: "diskutera", futurum: "kommer att diskutera", group: 1, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att påverka", present: "påverkar", preterite: "påverkade", supine: "påverkat", imperative: "påverka", futurum: "kommer att påverka", group: 1, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att studera", present: "studerar", preterite: "studerade", supine: "studerat", imperative: "studera", futurum: "kommer att studera", group: 1, category: "daily",difficulty:"medium", course: "rivstart-a1" },
  { infinitive: "att lagaga mat", present: "lagar mat", preterite: "lagade mat", supine: "lagat mat", imperative: "laga mat", futurum: "kommer att lagaga mat", group: 1, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att kasta", present: "kastar", preterite: "kastade", supine: "kastat", imperative: "kasta", futurum: "kommer att kasta", group: 1, category: "verbs",difficulty:"medium", course: "form-fokus" },
  { infinitive: "att hoppa", present: "hoppar", preterite: "hoppade", supine: "hoppat", imperative: "hoppa", futurum: "kommer att hoppa", group: 1, category: "verbs",difficulty:"medium", course: "form-fokus" },
  { infinitive: "att tvätta", present: "tvättar", preterite: "tvättade", supine: "tvättat", imperative: "tvätta", futurum: "kommer att tvätta", group: 1, category: "daily",difficulty:"medium", course: "nyborjare" },
  { infinitive: "att titta", present: "tittar", preterite: "tittade", supine: "tittat", imperative: "titta", futurum: "kommer att titta", group: 1, category: "daily",difficulty:"medium", course: "nyborjare" },
  { infinitive: "att vakna", present: "vaknar", preterite: "vaknade", supine: "vaknat", imperative: "vakna", futurum: "kommer att vakna", group: 1, category: "daily",difficulty:"medium", course: "nyborjare" },

  // ---- Group 2 (adds -er in present, -te in past, -t in supine) ----
  { infinitive: "att läsa", present: "läser", preterite: "läste", supine: "läst", imperative: "läs", futurum: "kommer att läsa", group: 2, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att köpa", present: "köper", preterite: "köpte", supine: "köpt", imperative: "köp", futurum: "kommer att köpa", group: 2, category: "daily",difficulty:"medium", course: "rivstart-a1" },
  { infinitive: "att äta", present: "äter", preterite: "åt", supine: "ätit", imperative: "ät", futurum: "kommer att äta", group: 4, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att stänga", present: "stänger", preterite: "stängde", supine: "stängt", imperative: "stäng", futurum: "kommer att stänga", group: 2, category: "daily",difficulty:"medium", course: "nyborjare" },
  { infinitive: "att öppna", present: "öppnar", preterite: "öppnade", supine: "öppnat", imperative: "öppna", futurum: "kommer att öppna", group: 1, category: "daily",difficulty:"medium", course: "nyborjare" },
  { infinitive: "att ringa", present: "ringer", preterite: "ringde", supine: "ringt", imperative: "ring", futurum: "kommer att ringa", group: 2, category: "daily",difficulty:"medium", course: "rivstart-a1" },

  // ---- Group 3 (short verbs, adds -dde in past, -tt in supine) ----
  { infinitive: "att bo", present: "bor", preterite: "bodde", supine: "bott", imperative: "bo", futurum: "kommer att bo", group: 3, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att tro", present: "tror", preterite: "trodde", supine: "trodd", imperative: "tro", futurum: "kommer att tro", group: 3, category: "daily",difficulty:"medium", course: "rivstart-a1" },
  { infinitive: "att må", present: "mår", preterite: "mådde", supine: "mått", imperative: "må", futurum: "kommer att må", group: 3, category: "daily",difficulty:"medium", course: "rivstart-a1" },
  { infinitive: "att sy", present: "syr", preterite: "sydde", supine: "sytt", imperative: "sy", futurum: "kommer att sy", group: 3, category: "daily",difficulty:"medium", course: "nyborjare" },

  // ---- Group 4 (strong verbs — vowel change) ----
  { infinitive: "att skriva", present: "skriver", preterite: "skrev", supine: "skrivit", imperative: "skriv", futurum: "kommer att skriva", group: 4, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att dricka", present: "dricker", preterite: "drack", supine: "druckit", imperative: "drick", futurum: "kommer att dricka", group: 4, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att sova", present: "sover", preterite: "sov", supine: "sovit", imperative: "sov", futurum: "kommer att sova", group: 4, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att komma", present: "kommer", preterite: "kom", supine: "kommit", imperative: "kom", futurum: "kommer att komma", group: 4, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att förstå", present: "förstår", preterite: "förstod", supine: "förstått", imperative: "förstå", futurum: "kommer att förstå", group: 4, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att gå", present: "går", preterite: "gick", supine: "gått", imperative: "gå", futurum: "kommer att gå", group: 4, category: "daily",difficulty:"medium", course: "pa-svenska1" },
  { infinitive: "att vara", present: "är", preterite: "var", supine: "varit", imperative: "var", futurum: "kommer att vara", group: 4, category: "grammar",difficulty:"medium", course: "rivstart-a1" },
  { infinitive: "att ha", present: "har", preterite: "hade", supine: "haft", imperative: "ha", futurum: "kommer att ha", group: 4, category: "grammar",difficulty:"medium", course: "rivstart-a1" },
  { infinitive: "att se", present: "ser", preterite: "såg", supine: "sett", imperative: "se", futurum: "kommer att se", group: 4, category: "daily",difficulty:"medium", course: "rivstart-a1" },
  { infinitive: "att ge", present: "ger", preterite: "gav", supine: "gett", imperative: "ge", futurum: "kommer att ge", group: 4, category: "daily",difficulty:"medium", course: "rivstart-a1" },
  { infinitive: "att sitta", present: "sitter", preterite: "satt", supine: "suttit", imperative: "sitt", futurum: "kommer att sitta", group: 4, category: "verbs",difficulty:"medium", course: "form-fokus" },
  { infinitive: "att finna", present: "finner", preterite: "fann", supine: "funnit", imperative: "finn", futurum: "kommer att finna", group: 4, category: "verbs",difficulty:"medium", course: "form-fokus" },
  { infinitive: "att binda", present: "binder", preterite: "band", supine: "bundit", imperative: "bind", futurum: "kommer att binda", group: 4, category: "verbs",difficulty:"medium", course: "form-fokus" },
  { infinitive: "att springa", present: "springer", preterite: "sprang", supine: "springit", imperative: "spring", futurum: "kommer att springa", group: 4, category: "daily",difficulty:"medium", course: "nyborjare" },
  { infinitive: "att sjunga", present: "sjunger", preterite: "sjöng", supine: "sjungit", imperative: "sjung", futurum: "kommer att sjunga", group: 4, category: "daily",difficulty:"medium", course: "nyborjare" },
  { infinitive: "att simma", present: "simmar", preterite: "simmade", supine: "simmat", imperative: "simma", futurum: "kommer att simma", group: 1, category: "daily",difficulty:"medium", course: "nyborjare" },
  { infinitive: "att resa", present: "reser", preterite: "reste", supine: "rest", imperative: "res", futurum: "kommer att resa", group: 2, category: "travel",difficulty:"medium", course: "rivstart-a1" }
];

// ========== WRITING PROMPTS (for Skriv tab) ==========
const writingPrompts = [
  {
    prompt: "Skriv en kort dialog mellan två personer som möts för första gången. Använd hälsningsfraser och fråga varandra var ni kommer ifrån.",
    promptEn: "Write a short dialogue between two people meeting for the first time. Use greetings and ask each other where you're from.",
    tips: ["Start with 'Hej!' and 'Vad heter du?'", "Use 'Varifrån kommer du?' and 'Jag kommer från...'", "End with 'Trevligt att träffas!'"],
    category: "dialogue",difficulty:"medium",
    source: "Rivstart A1+A2",
    modelAnswer: "Hej! Jag heter Anna. Vad heter du?\n— Jag heter Marco. Trevligt att träffas!\n— Tack, detsamma! Varifrån kommer du?\n— Jag kommer från Italien, från Rom. Och du?\n— Jag kommer från Sverige, från Stockholm. Bor du här i Stockholm?\n— Ja, jag studerar svenska här. Trevligt att träffas, Anna!"
  },
  {
    prompt: "Beskriv din vardag från morgon till kväll. Vad gör du? När vaknar du? Vad äter du till frukost?",
    promptEn: "Describe your daily routine from morning to evening. What do you do? When do you wake up? What do you eat for breakfast?",
    tips: ["Use presens (present tense)", "Start with 'Jag vaknar klockan...'", "Use sequencing words: först, sedan, därefter"],
    category: "daily-life",difficulty:"medium",
    source: "Nybörjarsvenska",
    modelAnswer: "Jag vaknar klockan sju varje morgon. Först äter jag frukost — jag dricker kaffe och äter en smörgås. Sedan borstar jag tänderna och klär på mig. Jag går till jobbet klockan åtta. På jobbet arbetar jag fram till lunch. Efter jobbet går jag hem och lagar mat. På kvällen tittar jag på TV eller läser en bok. Jag går och lägger mig klockan tio."
  },
  {
    prompt: "Skriv en kort berättelse som börjar med orden: 'Om jag gick till skolan fast det var söndag...' Vad händer sedan?",
    promptEn: "Write a short story that begins with the words: 'If I went to school even though it was Sunday...' What happens next?",
    tips: ["Use preteritum (past tense)", "Describe the setting: Where does it take place?", "Include at least one dialogue exchange"],
    category: "creative",difficulty:"medium",
    source: "Skrivboken — Skrivlek: Om/Skulle",
    modelAnswer: "Om jag gick till skolan fast det var söndag skulle allt vara tyst och tomt. Korridorerna var mörka och ingen satt i klassrummet. Plötsligt hörde jag musik från musikrummet. När jag öppnade dörren såg jag en gammal man som spelade piano. 'Vem är du?' frågade jag. Han vände sig om och log. 'Jag är den förre rektorn. Jag har bott här i 30 år.' Vi pratade hela förmiddagen om skolans historia."
  },
  {
    prompt: "Beskriv en person du känner väl. Hur ser personen ut? Hur är personen som människa? Vad tycker personen om att göra?",
    promptEn: "Describe a person you know well. What does the person look like? What is the person like as a human being? What does the person like to do?",
    tips: ["Utseende (appearance): lång, kort, hårfärg, ögonfärg", "Personlighet (personality): snäll, rolig, modig", "Use 'Hon/Han gillar att...'"],
    category: "descriptive",difficulty:"medium",
    source: "Skrivboken — Personbeskrivning",
    modelAnswer: "Min bästa vän heter Sara. Hon är ganska lång med långt blont hår och blå ögon. Sara är väldigt snäll och omtänksam — hon lyssnar alltid när jag har problem. Hon har ett smittsamt skratt som får alla runt omkring att bli glada. På fritiden tycker hon om att måla och gå på museum. Hon jobbar som lärare och älskar sitt jobb. Jag är väldigt tacksam att ha henne som vän."
  },
  {
    prompt: "Varför? Därför att... Skriv först en fråga som börjar med 'Varför' på en lapp. Skriv sedan ett svar som börjar med 'Därför att...' på en annan lapp. Kombinera dem — även om de inte hänger ihop!",
    promptEn: "Why? Because... First write a question starting with 'Varför' on one slip. Then write an answer starting with 'Därför att...' on another slip. Combine them — even if they don't match!",
    tips: ["Be creative and funny", "Write 3 different questions and answers", "The funniest combinations are often the best"],
    category: "creative",difficulty:"medium",
    source: "Skrivboken — Skrivlek: Varför/Därför",
    modelAnswer: "Varför måste man alltid borsta tänderna på morgonen? Därför att elefanter inte kan flyga. Varför är himlen blå? Därför att katter gillar att sova i solen. Varför måste man lära sig svenska? Därför att pannkakor är godast med sylt och grädde!"
  },
  {
    prompt: "Skriv en scen vid havet. Använd alla dina sinnen: Vad ser du? Vad hör du? Vad känner du? Vad luktar du?",
    promptEn: "Write a scene by the sea. Use all your senses: What do you see? What do you hear? What do you feel? What do you smell?",
    tips: ["Use nature vocabulary: hav, vågor, strand, vind", "Use inversion: 'Vid havet känner jag...'", "Describe the weather: 'Solen skiner' or 'Det blåser'"],
    category: "descriptive",difficulty:"medium",
    source: "Ålevangeliet — Nature Writing",
    modelAnswer: "Jag står på stranden och tittar ut över havet. Vattnet är mörkt och glittrar i solljuset. Vågorna slår mjukt mot klipporna med ett lugnande ljud. Jag känner den salta havsluften mot kinden och hör måsarna skrika i fjärran. Doften av tång och salt fyller mina sinnen. Det är alldeles tyst förutom vågornas rytmiska brus. Här vid havet känner jag mig lugn och fri."
  },
  {
    prompt: "Skriv en recension av en bok, film eller tv-serie som du nyligen sett eller läst. Vad handlade den om? Vad tyckte du? Skulle du rekommendera den?",
    promptEn: "Write a review of a book, movie, or TV series you've recently seen or read. What was it about? What did you think? Would you recommend it?",
    tips: ["Begin with: 'Jag har nyligen sett/läst...'", "Use preteritum to describe the plot", "Use 'Jag tycker att...' for your opinion"],
    category: "opinion",difficulty:"medium",
    source: "På Svenska 2",
    modelAnswer: "Jag såg nyligen filmen 'En man som heter Ove' på SVT. Filmen handlar om en äldre man som är ganska sur och arg på allt och alla. Men under filmens gång får man veta varför han är så ledsen inombords. Jag tyckte att filmen var både rolig och sorglig på samma gång. Skådespelarna var fantastiska! Jag skulle verkligen rekommendera den till alla som gillar varma och tankeväckande filmer. Betyg: 5 av 5 stjärnor."
  },
  {
    prompt: "Vem? Gör? Var? Skriv tre lappar: 1) Vem är huvudpersonen? 2) Vad gör personen? 3) Var händer det? Kombinera sedan allt till en berättelse.",
    promptEn: "Who? Does? Where? Write three slips: 1) Who is the main character? 2) What is the person doing? 3) Where does it happen? Then combine everything into a story.",
    tips: ["Example: En ilsken hund / kastar snöboll / i skolan", "Make it surprising — mix unrelated elements", "Write at least 5 sentences"],
    category: "creative",difficulty:"medium",
    source: "Skrivboken — Skrivlek: Vem/Gör/Var",
    modelAnswer: "En ilsken hund kastar snöboll i skolan. Ludde är en liten tax som är väldigt modig. En dag bestämde han sig för att hämnas på brevbäraren. Han smög in i skolans gympasal och hittade en snöboll i frysen. Med snöbollen i munnen smög han ut till brevbärarens cykel. Men när han skulle kasta snöbollen cyklade brevbäraren iväg och Ludde träffade istället rektorn! Rektorn skrattade och gav Ludde en hundkex."
  },
  {
    prompt: "Skriv ett mejl till din chef eller lärare. Berätta att du är sjuk och inte kan komma idag. Var artig och professionell.",
    promptEn: "Write an email to your boss or teacher. Tell them you are sick and cannot come today. Be polite and professional.",
    tips: ["Start with 'Hej [Namn]' or 'Kära [Namn]'", "Use 'Jag är sjuk idag och kan inte komma'", "End with 'Med vänlig hälsning'"],
    category: "practical",difficulty:"medium",
    source: "På Svenska 1",
    modelAnswer: "Hej Anna,\n\nJag är tyvärr sjuk idag och kan inte komma till jobbet. Jag har feber och ont i halsen. Jag hoppas att jag kan komma tillbaka imorgon om jag mår bättre.\n\nMed vänlig hälsning,\nMarco"
  },
  {
    prompt: "Plats, Person, Problem. Skriv tre lappar: 1) En plats där berättelsen utspelar sig 2) En huvudperson 3) Ett problem personen har. Skriv en berättelse som innehåller alla tre.",
    promptEn: "Place, Person, Problem. Write three slips: 1) A place where the story takes place 2) A main character 3) A problem the person has. Write a story containing all three.",
    tips: ["Example: Ett övergivet slott / En blyg bibliotekarie / Glömde sitt eget namn", "Use preteritum for storytelling", "Build tension with short sentences"],
    category: "creative",difficulty:"medium",
    source: "Skrivboken — Skrivlek: Plats/Person/Problem",
    modelAnswer: "Ett övergivet slott / En blyg bibliotekarie / Glömde sitt eget namn. Lisa jobbade som bibliotekarie i en liten stad. Hon var tyst och blyg och pratade mest med böcker. En dag vaknade hon och upptäckte att hon hade glömt sitt eget namn. Paniken spred sig genom hennes kropp. Hon gick till det gamla övergivna slottet utanför stan för att leta efter svar. I slottets bibliotek hittade hon en gammal bok med sitt namn på. När hon öppnade boken spelades plötsligt musik och slottet vaknade till liv. Lisa kom ihåg att hon var slottets väktare."
  },
  {
    prompt: "När? Var? Vad? Varför? Skriv fyra lappar och svara på: När utspelade sig historien? Var hände det? Vad hände? Varför hände det? Kombinera till en berättelse.",
    promptEn: "When? Where? What? Why? Write four slips answering: When did the story take place? Where did it happen? What happened? Why did it happen? Combine into a story.",
    tips: ["Make the 'why' surprising and unexpected", "Use time expressions: 'för länge sedan', 'igår', 'plötsligt'", "Use inversion for variety: 'Plötsligt hörde jag...'"],
    category: "creative",difficulty:"medium",
    source: "Skrivboken — Skrivlek: När/Var/Vad/Varför",
    modelAnswer: "För länge sedan, i en liten by i norra Sverige, hände något märkligt. Plötsligt började alla klockor i byn att gå baklänges. Varför? Jo, för att en gammal trollkarl hade tappat sin magiska klocka i byns brunn. Det var först när den yngsta flickan i byn fiskade upp klockan som allt blev normalt igen."
  },
  {
    prompt: "Beskriv en svensk tradition eller högtid. Berätta om hur den firas, vad man äter och vad man gör. Exempel: Midsommar, jul, påsk, nationaldagen.",
    promptEn: "Describe a Swedish tradition or holiday. Tell about how it is celebrated, what you eat and what you do. Examples: Midsummer, Christmas, Easter, National Day.",
    tips: ["Use presens for general traditions: 'På midsommar dansar man...'", "Include food vocabulary: 'Man äter sill, potatis och jordgubbar'", "Explain the significance of the tradition"],
    category: "cultural",difficulty:"medium",
    source: "På Svenska 1",
    modelAnswer: "Midsommar är en av de viktigaste svenska traditionerna. Man firar midsommar i juni, oftast på en fredag. Man åker ut till landet och dansar runt midsommarstången. Man äter sill, potatis och jordgubbar till middag. Man dricker också snaps och sjunger snapsvisor. Många har blommor i håret. Midsommar handlar om att fira att sommaren har kommit och att vara tillsammans med familj och vänner."
  },
  {
    prompt: "Skriv en kort dikt (minst 4 rader) om årstiden du gillar mest. Använd bildspråk och beskriv vad du ser, hör och känner.",
    promptEn: "Write a short poem (at least 4 lines) about your favorite season. Use imagery and describe what you see, hear, and feel.",
    tips: ["Choose a season: vår, sommar, höst, vinter", "Use nature vocabulary: blommor, snö, sol, regn", "Try rhyming or free verse"],
    category: "creative",difficulty:"medium",
    source: "Nybörjarsvenska",
    modelAnswer: "Våren kommer med ljus och sång,\nfåglar sjunger hela dan.\nBlommor blommar överallt,\nsolen värmer, allt blir klart.\nSnön har smält och bäckar porlar,\nåterfödd är jordens varma famn."
  },
  {
    prompt: "Skriv en argumenterande text om varför svenska är ett bra språk att lära sig. Ge minst tre anledningar.",
    promptEn: "Write an argumentative text about why Swedish is a good language to learn. Give at least three reasons.",
    tips: ["Start with: 'Jag tycker att svenska är...'", "Use 'För det första... För det andra... För det tredje...'", "End with a strong conclusion"],
    category: "opinion",difficulty:"medium",
    source: "Uppsatshandboken",
    modelAnswer: "Jag tycker att svenska är ett bra språk att lära sig av flera anledningar. För det första är svenska ett nordiskt språk som öppnar dörrar till hela Skandinavien — när man kan svenska kan man oftast förstå norska och danska också. För det andra är Sverige ett land med många spännande företag och bra jobbmöjligheter. För det tredje är svenska ett vackert språk med en intressant melodi. Slutligen, när man lär sig svenska får man också en djupare förståelse för svensk kultur och samhälle. Därför tycker jag att alla borde lära sig svenska!"
  },
  {
    prompt: "Skrivstafett! Skriv en mening som börjar en berättelse. Skicka sedan till någon annan (eller fortsätt själv) som skriver nästa mening. Fortsätt tills berättelsen är klar — minst 8 meningar.",
    promptEn: "Writing relay! Write a sentence that starts a story. Then pass to someone else (or continue yourself) who writes the next sentence. Continue until the story is complete — at least 8 sentences.",
    tips: ["The first sentence should be exciting or intriguing", "Each person adds only one sentence at a time", "Don't plan ahead — build on what the previous person wrote"],
    category: "creative",difficulty:"medium",
    source: "Skrivboken — Skrivlek: Skrivstafett",
    modelAnswer: "Det var en gång en katt som kunde tala. Katten heter Måns och bor i en liten gul stuga i skogen. En dag hittade Måns en magisk nyckel under sängen. Han visste inte vad nyckeln öppnade för dörr. Han gick ut i skogen för att leta efter låset. Efter en timme hittade han en gammal ek med en dörr i stammen. Han satte i nyckeln och vred om. Dörren öppnades och han såg en trappa som ledde ner i mörkret. 'Är du modig nog att gå ner?' viskade en röst."
  },
  {
    prompt: "Föreställ dig att du är en svensk journalist. Skriv en kort nyhetsartikel (50-100 ord) om en händelse i din stad. Använd rubrik, ingress och brödtext.",
    promptEn: "Imagine you're a Swedish journalist. Write a short news article (50-100 words) about an event in your city. Use headline, lead paragraph, and body text.",
    tips: ["Headline should grab attention: 'Brand i centrum — ingen skadad'", "Lead paragraph answers: vad, var, när, vem, varför", "Use passive voice for formal tone: 'Det rapporteras att...'"],
    category: "practical",difficulty:"medium",
    source: "Svenska impulser 3",
    modelAnswer: "BRAND I CENTRUM — INGEN SKADAD\n\nStockholm, 24 juli. En brand bröt ut i ett kök på en restaurang i centrala Stockholm under onsdagsmorgonen. Räddningstjänsten larmades klockan 08.30 och var snabbt på plats.\n\nBranden startade i restaurangens kök på grund av ett tekniskt fel. Restaurangens personal utrymde lokalen omedelbart. Inga personer skadades i branden. Restaurangen håller stängt tills vidare medan skadorna repareras. Polisen utreder händelsen."
  },
  {
    prompt: "Skriv en dialog mellan en kund och en expedit i en klädaffär. Kunden vill prova en tröja, frågar om storlek och färg, och bestämmer sig för att köpa.",
    promptEn: "Write a dialogue between a customer and a shop assistant in a clothing store. The customer wants to try on a sweater, asks about size and color, and decides to buy.",
    tips: ["Customer: 'Kan jag prova den här tröjan?'", "Assistant: 'Vilken storlek har du?'", "Include price and payment: 'Hur mycket kostar den?'"],
    category: "dialogue",difficulty:"medium",
    source: "Nybörjarsvenska — Shopping",
    modelAnswer: "Kund: Ursäkta, jag skulle vilja prova den här tröjan.\nExpedit: Självklart! Vilken storlek har du?\nKund: Jag tror jag har medium. Kan jag få prova en medium i blå?\nExpedit: Ja, här är en medium i blå. Omklädningsrummen är där borta.\nKund: Tack! *provar tröjan* Den passar bra! Vad kostar den?\nExpedit: Den kostar 399 kronor, men just nu är det 20% rea.\nKund: Perfekt, jag tar den!"
  },
  {
    prompt: "Titta ut genom fönstret just nu. Beskriv exakt vad du ser — väder, människor, djur, ljud, känslor. Skriv minst 50 ord.",
    promptEn: "Look out the window right now. Describe exactly what you see — weather, people, animals, sounds, feelings. Write at least 50 words.",
    tips: ["Use presens for what is happening now", "Use 'Det är...' for weather", "Describe movement: 'En person går förbi...'"],
    category: "descriptive",difficulty:"medium",
    source: "Skrivboken",
    modelAnswer: "Utanför mitt fönster ser jag en grå himmel. Det regnar lätt och dropparna rinner nerför rutan. På gatan går några människor med paraplyer. En äldre man går långsamt med sin hund. Hunden är brun och ser glad ut trots regnet. Bilar kör förbi och däcken susar mot den våta asfalten. Jag hör regnet mot taket och det känns mysigt och lugnt. Luften luktar fukt och höst. Jag känner mig lugn när jag tittar ut."
  },
  {
    prompt: "Om jag vore / skulle jag / då skulle. Skriv: 1) En mening som börjar med 'Om jag vore...' 2) En fortsättning med 'skulle jag...' 3) En avslutning med 'då skulle...' Utveckla till en kort berättelse!",
    promptEn: "If I were / I would / then would. Write: 1) A sentence starting with 'Om jag vore...' 2) A continuation with 'skulle jag...' 3) An ending with 'då skulle...' Develop into a short story!",
    tips: ["Example: Om jag vore en fågel, skulle jag flyga till fjärran land, då skulle jag se hela världen", "Use conditional form (skulle + infinitive)", "Be imaginative!"],
    category: "creative",difficulty:"medium",
    source: "Skrivboken — Skrivlek: Om jag vore",
    modelAnswer: "Om jag vore en fågel skulle jag flyga till fjärran länder, då skulle jag se hela världen från ovan. Jag skulle flyga över berg och hav, över städer och skogar. Jag skulle landa på taket av Eiffeltornet i Paris och sedan fortsätta till pyramiderna i Egypten. Men när hösten kom skulle jag flyga hem till Sverige igen. Då skulle jag bygga ett bo i en gammal ek och vila efter min långa resa."
  },
  {
    prompt: "Berätta om din favoritplats i Sverige (eller i ditt hemland). Var ligger den? Varför gillar du den? Vad kan man göra där?",
    promptEn: "Tell about your favorite place in Sweden (or in your home country). Where is it? Why do you like it? What can you do there?",
    tips: ["Use 'Det ligger...' to describe location", "Describe the atmosphere: 'Det är lugnt och vackert'", "Use 'Man kan...' for activities"],
    category: "descriptive",difficulty:"medium",
    source: "På Svenska 1",
    modelAnswer: "Min favoritplats i Sverige är Gamla Stan i Stockholm. Det ligger på en ö mitt i Stockholm. Jag gillar Gamla Stan för att gatorna är smala och vackra med gamla byggnader från 1600-talet. Man kan gå på kullerstensgatorna och titta på alla fina butiker och caféer. På sommaren sitter man ute på restaurangerna och äter god mat. Jag tycker också om att besöka Storkyrkan och slottet. Det finns alltid mycket att se och göra där."
  }
];

// ========== RESOURCES ==========
const resourcesData = {
  pdf: [
    { name: "Rivstart A1+A2 Textbok", desc: "Complete textbook for beginner Swedish, levels A1-A2 with dialogues, grammar, and exercises", file: "Rivstart  A1 + A2 svenska som främmande språk textbok. ... Textbok (Levy Scherrer, Paula 1963- VerfasserIn etc.) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Rivstart A1+A2" },
    { name: "Rivstart A1+A2 Övningsbok", desc: "Workbook with practice exercises for the Rivstart A1+A2 course", file: "Rivstart  svenska som främmande språk. [1, 2], A1 + A2 Övningsbok (Levy Scherrer, Paula, Lindemalm, Karl) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Rivstart A1+A2" },
    { name: "Rivstart B1+B2 Övningsbok", desc: "Workbook for intermediate Swedish, levels B1-B2 with advanced exercises", file: "Rivstart  svenska som främmande språk. B1 + B2, Övningsbok (Levy Scherrer, Paula, (1963- ...)., Auteur etc.) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Rivstart A1+A2" },
    { name: "På Svenska 2 Lärobok", desc: "Textbook for intermediate Swedish B1, continues from På Svenska 1", file: "På svenska 2 Lärobok Svenska som främmande språk B1 (2nd ed. 2007) (Ulla Göransson, Annika Helander, Mai Parada) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "På Svenska 1" },
    { name: "På Svenska Övningsbok A1-A2", desc: "Workbook with exercises matching the På Svenska 1 textbook", file: "På svenska Svenska som främmande språk Övningsbok  Workbook - Level A1A2 Book 1 (Swedish Edition) (Ulla Göransson, Annika Helander, Mai Parada) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "På Svenska 1" },
    { name: "Form i fokus A", desc: "Grammar workbook focusing on basic Swedish grammar forms — articles, nouns, adjectives, pronouns", file: "Form i fokus A. (Cecilia Fasth, Anita Kannermark) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Form i fokus" },
    { name: "Form i fokus C", desc: "Advanced grammar workbook covering sentence structure, subordinate clauses, and verb tenses", file: "Form i fokus C (Fasth Cecilia) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Form i fokus" },
    { name: "Form i fokus C Övningar", desc: "Additional grammar exercises for Form i fokus C", file: "Form i fokus  övningar i svensk grammatik. Del C (Cecilia Fasth, Anita Kannermark) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Form i fokus" },
    { name: "Svenska idiom 3500", desc: "Comprehensive collection of 3500 Swedish idioms and everyday expressions with explanations (7 MB)", file: "Svenska idiom 3500 vardagsuttryck (Hans Luthman) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Svenska idiom" },
    { name: "Bygg upp ditt ordförråd 1", desc: "Vocabulary builder with fun exercises and tests to expand your Swedish word bank", file: "Bygg upp ditt ordförråd 1 (Peter Watcyn-Jones) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Nybörjarsvenska Övningsbok", desc: "Exercise book for absolute beginners in Swedish with simple vocabulary and grammar", file: "Nybörjarsvenska. Nybörjarbok i svenska som främmande språk. Övningsbok (Ulla Göransson, Hans Lindholm etc.) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Nybörjarsvenska" },
    { name: "Norstedts första svenska ordbok", desc: "First Swedish dictionary with common words and simple definitions for learners", file: "Norstedts första svenska ordbok (Author Unknown) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Svenska Akademiens ordlista", desc: "The official Swedish Academy word list — the standard reference for Swedish spelling (SAOL)", file: "Svenska Akademiens ordlista över svenska språket (Author Unknown) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Svensk funktionell grammatik", desc: "Academic grammar reference covering functional Swedish grammar in depth", file: "Svensk funktionell grammatik (Maria Bolander) (z-library.sk, 1lib.sk, z-lib.sk) (1).pdf", course: "Form i fokus" },
    { name: "Svenska skrivregler", desc: "Official Swedish writing rules and style guide from the Language Council", file: "Svenska skrivregler (Ola Karlsson) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Svenska impulser 3", desc: "Swedish textbook for upper secondary school with literary analysis and writing", file: "Svenska impulser 3 (Carl-Johan Markstedt Sven Eriksson) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Svensk ordbok", desc: "Comprehensive Swedish dictionary with definitions and usage examples", file: "Svensk ordbok ( etc.) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Form i fokus B1", desc: "Intermediate grammar workbook covering sentence structure and verb forms — Part B1", file: "Form i fokus. Övningsbok i svensk grammatik. Del B (Fasth Cecilia, Kannermark Anita.) (z-library.sk, 1lib.sk, z-lib.sk)/Form i fokus del B1.pdf", course: "Form i fokus" },
    { name: "Form i fokus B2", desc: "Intermediate grammar workbook covering subordinate clauses and complex sentences — Part B2", file: "Form i fokus. Övningsbok i svensk grammatik. Del B (Fasth Cecilia, Kannermark Anita.) (z-library.sk, 1lib.sk, z-lib.sk)/Form i fokus del B2.pdf", course: "Form i fokus" }
  ],
  audio: [
  ],
  doc: [
    { name: "Form i fokus Facit Del C", desc: "Answer key for Form i fokus C grammar exercises", file: "Form i fokus. Facit. Del C (Fasth Cecilia, Kannermark Anita.) (z-library.sk, 1lib.sk, z-lib.sk).doc", course: "Form i fokus" },
    { name: "Svenska skrivregler för punktskrift", desc: "Swedish writing rules adapted for braille", file: "Svenska skrivregler för punktskrift (Punktskriftsnämnden Språkrådet) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" }
  ],
  books: [
    { name: "Ålevangeliet", desc: "The Story of the World's Most Mysterious Fish by Patrik Svensson — award-winning Swedish non-fiction (2.5 MB)", file: "Ålevangeliet berättelsen om världens mest gåtfulla fisk (Patrik Svensson) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Ett jävla solsken", desc: "Biography of Ester Blenda Nordström by Fatima Bremmer — Sweden's first investigative journalist (3.1 MB)", file: "Ett jävla solsken (Fatima Bremmer) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Expeditionen", desc: "Min kärlekshistoria by Bea Uusma — polar exploration and obsession (4.2 MB)", file: "Expeditionen. Min kärlekshistoria (Bea Uusma) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Omgiven av idioter", desc: "How to Understand People Who Can't Be Understood by Thomas Erikson — bestseller on DISC profiles (5.8 MB)", file: "Omgiven av idioter hur man förstår dem som inte går att förstå (Erikson, Thomas) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Härskarteknik reviderad", desc: "Power Techniques — The Ugly Path to Power by Elaine Eksvärd, revised edition (2.1 MB)", file: "Härskarteknik reviderad Den fula vägen till makt (Eksvärd, Elaine) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Ondskan", desc: "Evil — classic Swedish novel by Jan Guillou about boarding school and bullying (1.9 MB)", file: "Ondskan (Guillou Jan) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Sapiens", desc: "A Brief History of Humankind by Yuval Noah Harari — international bestseller (6.4 MB)", file: "Sapiens (Yuval Noah Harari) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Tio tankar om arbete", desc: "Ten Thoughts About Work by Bodil Jönsson — philosophical reflections on work and meaning (1.5 MB)", file: "Tio tankar om arbete (Bodil Jönsson) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Skrivboken", desc: "The Writing Book by Lasse Ekholm — practical guide to writing in Swedish (2.3 MB)", file: "Skrivboken (Lasse Ekholm) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Så säger man", desc: "Phrases and Dialogues with Exercises for Swedish as a Second Language by Gunnar Hellström (4.0 MB)", file: "Så säger man fraser och dialoger med övningar för undervisningen i svenska som andra- eller främmande språk (Gunnar Hellström) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Uppsatshandboken", desc: "The Essay Handbook by Siv Strömquist — guide to academic writing in Swedish (3.2 MB)", file: "Uppsatshandboken (Siv Strömquist) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" },
    { name: "Ålevangeliet (ePub)", desc: "E-book version — award-winning Swedish non-fiction about eels, nature, and a father-son relationship", file: "Ålevangeliet berättelsen om världens mest gåtfulla fisk (Patrik Svensson) (z-library.sk, 1lib.sk, z-lib.sk).epub", course: "Allmän" },
    { name: "Ondskan (ePub)", desc: "E-book version — classic Swedish novel by Jan Guillou about boarding school and bullying", file: "Ondskan (Guillou Jan) (z-library.sk, 1lib.sk, z-lib.sk).epub", course: "Allmän" },
    { name: "Skrivboken (ePub)", desc: "E-book version — practical guide to creative writing in Swedish by Lasse Ekholm", file: "Skrivboken (Lasse Ekholm) (z-library.sk, 1lib.sk, z-lib.sk).epub", course: "Allmän" },
    { name: "Tio tankar om arbete (ePub)", desc: "E-book version — philosophical reflections on work, life, and meaning by Bodil Jönsson", file: "Tio tankar om arbete (Bodil Jönsson) (z-library.sk, 1lib.sk, z-lib.sk).epub", course: "Allmän" },
    { name: "Så säger man (ePub)", desc: "E-book version — phrases and dialogues with exercises for Swedish as a second language", file: "Så säger man fraser och dialoger med övningar för undervisningen i svenska som andra- eller främmande språk (Gunnar Hellström) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Allmän" }
  ],
  websites: [
    { name: "Svenska Institutet", desc: "Official institute for Swedish language and culture — learning resources and information", file: "Resources/Swedish Institute", course: "Allmän", url: "https://si.se" },
    { name: "Språkrådet", desc: "Swedish Language Council — official language advice, grammar questions, and word lists", file: "Resources/Language Council", course: "Allmän", url: "https://sprakradet.se" },
    { name: "Duolingo Swedish", desc: "Free Swedish course on Duolingo — great for beginners building vocabulary", file: "Resources/Duolingo", course: "Allmän", url: "https://duolingo.com/course/sv" },
    { name: "SVT Språkplay", desc: "Watch Swedish TV with interactive subtitles — learn through news and shows", file: "Resources/SVT Play", course: "Allmän", url: "https://sprakplay.se" },
    { name: "Rivstart Online", desc: "Online exercises and resources for the Rivstart textbook series", file: "Resources/Rivstart Online", course: "Rivstart A1+A2", url: "https://rivstartonline.se" }
  ],
  github: [
  ],
  guide: [
  ],
  ovningar: [
    { name: "Form i fokus C — Övningar + Facit", desc: "Advanced grammar exercises with complete answer key — practice sentence structure, subordinate clauses, and verb tenses", ovningFile: "Form i fokus  övningar i svensk grammatik. Del C (Cecilia Fasth, Anita Kannermark) (z-library.sk, 1lib.sk, z-lib.sk).pdf", facitFile: "Form i fokus. Facit. Del C (Fasth Cecilia, Kannermark Anita.) (z-library.sk, 1lib.sk, z-lib.sk).doc", course: "Form i fokus", hasFacit: true },
    { name: "Rivstart A1+A2 — Övningsbok", desc: "Workbook for beginner Swedish — exercises matching the textbook chapters", ovningFile: "Rivstart  svenska som främmande språk. [1, 2], A1 + A2 Övningsbok (Levy Scherrer, Paula, Lindemalm, Karl) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Rivstart A1+A2", hasFacit: false },
    { name: "Rivstart B1+B2 — Övningsbok", desc: "Workbook for intermediate Swedish with advanced grammar and vocabulary exercises", ovningFile: "Rivstart  svenska som främmande språk. B1 + B2, Övningsbok (Levy Scherrer, Paula, (1963- ...)., Auteur etc.) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Rivstart A1+A2", hasFacit: false },
    { name: "På Svenska 1 — Övningsbok", desc: "Workbook with exercises matching the På Svenska 1 textbook chapters", ovningFile: "På svenska Svenska som främmande språk Övningsbok  Workbook - Level A1A2 Book 1 (Swedish Edition) (Ulla Göransson, Annika Helander, Mai Parada) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "På Svenska 1", hasFacit: false },
    { name: "Nybörjarsvenska — Övningsbok", desc: "Exercise book for absolute beginners with simple vocabulary and grammar drills", ovningFile: "Nybörjarsvenska. Nybörjarbok i svenska som främmande språk. Övningsbok (Ulla Göransson, Hans Lindholm etc.) (z-library.sk, 1lib.sk, z-lib.sk).pdf", course: "Nybörjarsvenska", hasFacit: false }
  ]
};
