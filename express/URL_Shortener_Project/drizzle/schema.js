// Lec-67 :- URL_Shortener_Project using Drizzle ORM (with MYSQL)
// Lec-74 :- user-schema in drizzle-orm 

// Lec-85 :- How to relate "users" table with "short_link" table using Drizzle ORM

// Lec-90 :- Session-Schema in our ExpressJS application
// Lec-97 :- Add Schema for Email verification
// Lec-98 :- create "verify_email_tokens" Schema in Drizzle ORM

// Lec-114 :- Forgot(Reset) Password

// Lec-121 :- Complete Login with Google

// Lec-126 :- Add Image Upload in User Profile using Multer

import { relations, sql } from "drizzle-orm";
import {
    boolean,
    int,
    mysqlTable,
    timestamp,
    varchar,
    text,
    mysqlEnum,
} from "drizzle-orm/mysql-core";

export const shortLinksTable = mysqlTable("short_link", { // Table name is = "short_link"
    id: int().autoincrement().primaryKey(),
    url: varchar({ length: 255 }).notNull(),
    shortCode: varchar("short_code", { length: 20 }).notNull().unique(),
    // Lec-84
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(), // timestamp() :- Jyare koi short link update karse, tyare aa field update thai jase
    userId: int("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }), // Foreign Key -> Jo user delete thayo, toh te short link pan delete thai jase
});

// Lec-98
export const verifyEmailTokensTable = mysqlTable("is_email_valid", {
    id: int().autoincrement().primaryKey(),
    userId: int("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }), // Foreign key
    token: varchar({ length: 8 }).notNull(), // 8-digit verification token(string) 
    expiresAt: timestamp("expires_at")
        // The brackets inside sql`` is necessary here, otherwise you would get syntax error.
        .default(sql`(CURRENT_TIMESTAMP + INTERVAL 1 DAY)`) // aaj na 12:00 PM thi kal na 12:00 PM sudhi Token valid rahshe --> 24 Hours -> Otherwise Token Expired thai jashe (To pachhi -> fari thi registration karvanu, To generate a token)
        .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Lec-74, 126
export const usersTable = mysqlTable("users", { // Table name is = "users"
    id: int().autoincrement().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }),
    avatarUrl: text("avatar_url"), // Lec-126 -> Image ni URL store thashe
    isEmailValid: boolean("is_email_valid").default(false).notNull(), // Lec-97
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Lec-90 :- Dual based Authentication
export const sessionsTable = mysqlTable("sessions", {
    id: int().autoincrement().primaryKey(),
    userId: int("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }), // Foreign Key (kya user a Login karelu 6?) -> Jo user delete karye toh te session pan automatically delete thai jase...
    valid: boolean().default(true).notNull(), // Jyare Refresh_token ni help thi Access_token generate karva jaishu, tyare aa kam aavshe...
    // If anybody try to steal token from cookies, then Attcker has different IP & User-Agent -> To ahiya thi aapde check karishu ke IP & User-Agent same 6 ke nahi...
    userAgent: text("user_agent"), // Basically, user agent -> contains information about the user's browser, operating system, and device.
    ip: varchar({ length: 255 }), // IP Address
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Lec-85 (Now, we have to define relations between users and short_link tables)
export const usersRelations = relations(usersTable, ({ many }) => ({ // A user can have multiple short links -> One to Many relationship
    shortLinks: many(shortLinksTable),
    // Lec-90 :- user table no Relation (sessions table sathe) --> one user can create multiple sessions
    session: many(sessionsTable),
}));
export const shortLinksRelations = relations(shortLinksTable, ({ one }) => ({ // A short link belongs to one user -> One to One relationship
    user: one(usersTable, {
        fields: [shortLinksTable.userId], // Foreign Key
        references: [usersTable.id], // Primary Key
    }),
}));


// Lec-90 :- sessions tables no Relation (users table sathe) --> One session belongs to one user only -> One to One relationship
export const sessionsRelation = relations(sessionsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [sessionsTable.userId], // foreign key
        references: [usersTable.id],
    }),
}));

// Lec-114 :- Forgot(Reset) Password
export const passwordResetTokensTable = mysqlTable("password_reset_tokens", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" })
        .unique(), // Foreign Key
    tokenHash: text("token_hash").notNull(),
    expiresAt: timestamp("expires_at")
        .default(sql`(CURRENT_TIMESTAMP + INTERVAL 1 HOUR)`)
        .notNull(), // Token 1 hour pachhi Expire thai jase
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Lec-121
export const oauthAccountsTable = mysqlTable("oauth_accounts", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }), // Foreign Key
    provider: mysqlEnum("provider", ["google", "github"]).notNull(), // Provider (Google or GitHub)
    providerAccountId: varchar("provider_account_id", { length: 255 })
        .notNull()
        .unique(), // 10 emails mathi koi ak unique email, jenu potanu unique = "Provider Account ID"
    createdAt: timestamp("created_at").defaultNow().notNull(), // Created At
}); 