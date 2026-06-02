// Lec-67 :- URL_Shortener_Project using Drizzle ORM (with MYSQL)
// Lec-85 :- How to relate "users" table with "short_link" table using Drizzle ORM
// Lec-87 :- ZOD Validation & Edit/Update functionality in URLs and Shortcodes
// Lec-88 :- Delete functionality in URLs and Shortcodes
// Lec-124 :- Pagination
import { count, desc, eq } from "drizzle-orm";
import { db } from "../config/db.js";  // import your database_name
import { shortLinksTable } from "../drizzle/schema.js"; // import your table_name

// export const getAllShortLinks = async (userId) => {
//   return await db.select().from(shortLinksTable).where(eq(shortLinksTable.userId, userId)); // Lec-85 :- Je user a Login karyu 6, teni j short_links dekhadvani...
// };
// OR Lec-124
export const getAllShortLinks = async ({ userId, limit = 10, offset = 0 }) => {
  const condition = eq(shortLinksTable.userId, userId);
  const shortLinks = await db
    .select()
    .from(shortLinksTable)
    .where(condition)
    .orderBy(desc(shortLinksTable.createdAt))
    .limit(limit) // 10 j URL aape...
    .offset(offset); // for page-2, pellhi 10 URL skip kare...

  const [{ totalCount }] = await db // te userID related ketli total URLs chhe in DB -> 100
    .select({ totalCount: count() })
    .from(shortLinksTable)
    .where(condition);

  return { shortLinks, totalCount };
};

export const getShortLinkByShortCode = async (shortCode) => { // user a Form ma type karelo ShortCode is already exist in our database?
  const [result] = await db
    .select()
    .from(shortLinksTable)
    .where(eq(shortLinksTable.shortCode, shortCode));
  return result;
};

export const insertShortLink = async ({ url, finalShortcode, userId }) => {
  await db.insert(shortLinksTable).values({ url, shortCode: finalShortcode, userId });
};

// Lec-87
export const findShortLinkById = async (id) => {
  const [result] = await db.select().from(shortLinksTable).where(eq(shortLinksTable.id, id));
  return result;
};
export const updateShortCode = async ({ id, url, shortCode }) => {
  return await db
    .update(shortLinksTable)
    .set({ url: url, shortCode: shortCode })
    .where(eq(shortLinksTable.id, id));
};

// Lec-88
export const deleteShortCodeById = async (id) => {
  return await db.delete(shortLinksTable).where(eq(shortLinksTable.id, id));
};