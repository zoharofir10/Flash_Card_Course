/**
 * Seed script: adds 2 example decks with ~15 cards each for FlashyCardyCourse.
 * User ID: user_39khEYHm1CFgOIfoweFpCUt3GZ6
 *
 * Run from project root: npm run db:seed-example
 * Requires DATABASE_URL in .env.local
 */
import { config } from "dotenv";

// Load env before db so DATABASE_URL is set when db initializes
config({ path: ".env.local" });

// Dynamic import so DATABASE_URL is set before db initializes
const getDb = () => import("../src/lib/db").then((m) => m.db);
const getSchema = () => import("../src/db/schema").then((m) => ({ decks: m.decks, cards: m.cards }));

const USER_ID = "user_39khEYHm1CFgOIfoweFpCUt3GZ6";

const SPANISH_DECK = {
  name: "Spanish from English",
  description: "Learn Spanish vocabulary: English words and their Spanish translations.",
  userId: USER_ID,
};

const SPANISH_CARDS = [
  { front: "Hello", back: "Hola" },
  { front: "Goodbye", back: "Adiós" },
  { front: "Please", back: "Por favor" },
  { front: "Thank you", back: "Gracias" },
  { front: "Yes", back: "Sí" },
  { front: "No", back: "No" },
  { front: "Water", back: "Agua" },
  { front: "Food", back: "Comida" },
  { front: "House", back: "Casa" },
  { front: "Friend", back: "Amigo / Amiga" },
  { front: "Family", back: "Familia" },
  { front: "Morning", back: "Mañana" },
  { front: "Night", back: "Noche" },
  { front: "Book", back: "Libro" },
  { front: "School", back: "Escuela" },
];

const BRITISH_HISTORY_DECK = {
  name: "British History",
  description: "Questions and answers about British history.",
  userId: USER_ID,
};

const BRITISH_HISTORY_CARDS = [
  { front: "In which year did the Battle of Hastings take place?", back: "1066. William the Conqueror defeated King Harold II." },
  { front: "What was the name of the document signed in 1215 that limited the king's power?", back: "Magna Carta (Great Charter)." },
  { front: "Which English king had six wives?", back: "Henry VIII." },
  { front: "When did the Great Fire of London occur?", back: "1666." },
  { front: "Who was the British Prime Minister during most of World War II?", back: "Winston Churchill." },
  { front: "In which year did the Romans invade Britain?", back: "43 AD under Emperor Claudius." },
  { front: "What was the period of civil wars in England (1642–1651) called?", back: "The English Civil War(s)." },
  { front: "Who was the monarch when the Act of Union with Scotland was passed (1707)?", back: "Queen Anne." },
  { front: "When did Britain join the European Economic Community (EEC)?", back: "1973." },
  { front: "What was the name of the dynasty that ruled England from 1485 to 1603?", back: "The Tudors." },
  { front: "Which queen reigned during the Spanish Armada?", back: "Elizabeth I (1588)." },
  { front: "In which year did the British leave India?", back: "1947 (Indian independence)." },
  { front: "What was the name of the 19th-century period of industrial and social change in Britain?", back: "The Industrial Revolution." },
  { front: "Who was the first female Prime Minister of the United Kingdom?", back: "Margaret Thatcher (1979–1990)." },
  { front: "When did the United Kingdom leave the European Union (Brexit)?", back: "31 January 2020." },
];

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Check .env.local.");
  }

  const db = await getDb();
  const { decks, cards } = await getSchema();

  console.log("Seeding example decks for user:", USER_ID);

  const [spanishDeck] = await db.insert(decks).values(SPANISH_DECK).returning({ id: decks.id });
  if (!spanishDeck) throw new Error("Failed to create Spanish deck");
  const spanishDeckId = spanishDeck.id;

  await db.insert(cards).values(
    SPANISH_CARDS.map((c) => ({ deckId: spanishDeckId, front: c.front, back: c.back }))
  );
  console.log("Created deck 'Spanish from English' with", SPANISH_CARDS.length, "cards.");

  const [historyDeck] = await db.insert(decks).values(BRITISH_HISTORY_DECK).returning({ id: decks.id });
  if (!historyDeck) throw new Error("Failed to create British History deck");
  const historyDeckId = historyDeck.id;

  await db.insert(cards).values(
    BRITISH_HISTORY_CARDS.map((c) => ({ deckId: historyDeckId, front: c.front, back: c.back }))
  );
  console.log("Created deck 'British History' with", BRITISH_HISTORY_CARDS.length, "cards.");

  console.log("Done. Both example decks and cards have been added.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
