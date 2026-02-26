/**
 * Lists decks and cards in the DB for the seeded user.
 * Run: npm run db:list-seeded
 */
import { config } from "dotenv";
config({ path: ".env.local" });

const getDb = () => import("../src/lib/db").then((m) => m.db);
const getSchema = () =>
  import("../src/db/schema").then((m) => ({ decks: m.decks, cards: m.cards }));

const USER_ID = "user_39khEYHm1CFgOIfoweFpCUt3GZ6";

async function list() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Check .env.local.");
  }
  const { eq } = await import("drizzle-orm");
  const db = await getDb();
  const { decks, cards } = await getSchema();

  const userDecks = await db
    .select()
    .from(decks)
    .where(eq(decks.userId, USER_ID));

  console.log("\n--- Decks ---\n");
  for (const deck of userDecks) {
    console.log(`Deck #${deck.id}: ${deck.name}`);
    console.log(`  Description: ${deck.description ?? "(none)"}`);
    console.log(`  Created: ${deck.createdAt}`);
    const deckCards = await db
      .select({ id: cards.id, front: cards.front, back: cards.back })
      .from(cards)
      .where(eq(cards.deckId, deck.id));
    console.log(`  Cards (${deckCards.length}):`);
    deckCards.forEach((c, i) =>
      console.log(`    ${i + 1}. [${c.id}] ${c.front} → ${c.back}`)
    );
    console.log("");
  }
  console.log("--- End ---\n");
}

list().catch((err) => {
  console.error(err);
  process.exit(1);
});

