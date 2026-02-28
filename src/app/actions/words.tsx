'use server';

import { db } from "@/lib/db"

type SubmitAnswerState = {
    success: boolean;
    correct: boolean;
    error?: undefined;
} | {
    success: boolean;
    error: string;
    correct?: undefined;
} | null;

export async function submitAnswer(
    mode: string,
    userId: number,
    update: boolean,
    prevState: SubmitAnswerState,
    formData: FormData
) {
    // mode "it" or "fr" : the language to translate to, the other one is the language to translate from
    const unmode = mode === "it" ? "fr" : "it";
    const word = (formData.get("translate") as string).toLowerCase();
    const answer = (formData.get("answer") as string).toLowerCase();

    try {
        const result = await db.query(`SELECT ${mode} FROM words WHERE user_id = $1 AND ${unmode} = $2`, [userId, word]);
        if (result.rows.length > 0 && result.rows[0][mode].toLowerCase() === answer) {
            // In case of successful answer, we should upgrade the box
            if (update) {
                await upgradeBox(userId, mode === "it" ? answer : word, mode === "it" ? word : answer, mode);
            }
            return { success: true, correct: true };
        } else {
            // In case of wrong answer, we should downgrade the box
            const correctAnswer = result.rows.length > 0 ? result.rows[0][mode] : null;
            if (update) {
                await downgradeBox(userId, mode === "it" ? correctAnswer : word, mode === "it" ? word : correctAnswer, mode);
            }
            return { success: true, correct: false };
        }
    } catch (error) {
        console.error("Error checking answer:", error);
        return { success: false, error: "Failed to check answer" };
    }
}

export async function addWord(userId: number, formData: FormData) {
    const it = (formData.get("it") as string).toLowerCase();
    const fr = (formData.get("fr") as string).toLowerCase();

    const dateNow = new Date();

    try {
        await db.query(`INSERT INTO words (user_id, it, fr, box, date, box_inverse) VALUES ($1, $2, $3, 0, $4, 0) ON CONFLICT (user_id, it, fr) DO NOTHING`, [userId, it, fr, dateNow]);
        return { success: true };
    } catch (error) {
        console.error("Error adding word:", error);
        return { success: false, error: "Failed to add word" };
    }
}

export async function deleteWord(userId: number, it: string, fr: string) {
    it = it.toLowerCase();
    fr = fr.toLowerCase();
    try {
        await db.query(`DELETE FROM words WHERE user_id = $1 AND it = $2 AND fr = $3`, [userId, it, fr]);
        return { success: true };
    } catch (error) {
        console.error("Error deleting word:", error);
        return { success: false, error: "Failed to delete word" };
    }
}

export async function editWord(userId: number, oldIt: string, oldFr: string, newIt: string, newFr: string) {
    oldIt = oldIt.toLowerCase();
    oldFr = oldFr.toLowerCase();
    newIt = newIt.toLowerCase();
    newFr = newFr.toLowerCase();
    try {
        await db.query(`UPDATE words SET it = $4, fr = $5 WHERE user_id = $1 AND it = $2 AND fr = $3`, [userId, oldIt, oldFr, newIt, newFr]);
        return { success: true };
    } catch (error) {
        console.error("Error editing word:", error);
        return { success: false, error: "Failed to edit word" };
    }
}

export async function getWordsByBox(userId: number, box: number, mode: string, limit: number = 1000) {
    const boxMode = mode === "it" ? 'box' : 'box_inverse';
    try {
        const result = await db.query(`SELECT it, fr FROM words WHERE user_id = $1 AND ${boxMode} = $2 LIMIT $3`, [userId, box, limit]);
        return { success: true, words: result.rows };
    } catch (error) {
        console.error("Error fetching words by box:", error);
        return { success: false, error: "Failed to fetch words by box" };
    }
}

export async function getWordsByOrder(userId: number, order: string, skip: number = 0, limit: number = 1000) {
    const validOrders = ["it", "fr"];
    if (!validOrders.includes(order)) {
        return { success: false, error: "Invalid order parameter" };
    }
    try {
        const result = await db.query(`SELECT it, fr FROM words WHERE user_id = $1 ORDER BY ${order} LIMIT $2 OFFSET $3`, [userId, limit, skip]);
        return { success: true, words: result.rows };
    } catch (error) {
        console.error("Error fetching words by order:", error);
        return { success: false, error: "Failed to fetch words by order" };
    }
}

export async function getNextWord(userId: number, box: number, mode: string, excludeWords: string[] = []) {
    const unmode = mode === "it" ? "fr" : "it";
    const boxMode = mode === "it" ? 'box' : 'box_inverse';
    const dateNow = new Date();
    const daysLimitMap: Record<number, number> = {
        1: 1,
        2: 2,
        3: 7,
        4: 14,
        5: 30,
        6: 180,
    };
    const daysLimit = daysLimitMap[box] ?? 0;
    try {
        let result;
        if (excludeWords.length === 0) {
            result = await db.query(
                `SELECT ${unmode} FROM words WHERE user_id = $1 AND ($3 - date >= ${daysLimit}) AND ${boxMode} = $2 ORDER BY RANDOM() LIMIT 1`,
                [userId, box, dateNow]
            );
        }
        else {
            result = await db.query(
                `SELECT ${unmode} FROM words WHERE user_id = $1 AND ($3 - date >= ${daysLimit}) AND ${boxMode} = $2 AND ${unmode} NOT IN (${excludeWords.map((_, i) => `$${i + 4}`).join(", ")}) ORDER BY RANDOM() LIMIT 1`,
                [userId, box, dateNow, ...excludeWords]
            );
        }
        if (result.rows.length > 0) {
            return { success: true, word: result.rows[0][unmode] };
        } else {
            return { success: true, word: '' };
        }
    } catch (error) {
        console.error("Error fetching next word:", error);
        return { success: false, error: "Failed to fetch next word" };
    }
}

export async function upgradeBox(userId: number, it: string, fr: string, mode: string, maxBox: number = 6) {
    it = it.toLowerCase();
    fr = fr.toLowerCase();
    
    const dateNow = new Date();
    const boxMode = mode === "it" ? 'box' : 'box_inverse';
    try {
        await db.query(`UPDATE words SET ${boxMode} = ${boxMode} + 1, date = $4 WHERE user_id = $1 AND it = $2 AND fr = $3 AND ${boxMode} < $5`, [userId, it, fr, dateNow, maxBox]);
        return { success: true };
    } catch (error) {
        console.error("Error upgrading box:", error);
        return { success: false, error: "Failed to upgrade box" };
    }
}

export async function downgradeBox(userId: number, it: string, fr: string, mode: string, minBox: number = 0) {
    it = it.toLowerCase();
    fr = fr.toLowerCase();
    
    const dateNow = new Date();
    const boxMode = mode === "it" ? 'box' : 'box_inverse';
    try {
        await db.query(`UPDATE words SET ${boxMode} = ${boxMode} - 1, date = $4 WHERE user_id = $1 AND it = $2 AND fr = $3 AND ${boxMode} > $5`, [userId, it, fr, dateNow, minBox]);
        return { success: true };
    } catch (error) {
        console.error("Error downgrading box:", error);
        return { success: false, error: "Failed to downgrade box" };
    }
}

export async function  getBoxCount(userId: number, box: number, mode: string) {
    const dateNow = new Date();
    const boxMode = mode === "it" ? 'box' : 'box_inverse';
    const daysLimitMap: Record<number, number> = {
        1: 1,
        2: 2,
        3: 7,
        4: 14,
        5: 30,
        6: 180,
    };
    const daysLimit = daysLimitMap[box] ?? 0;
    try {
        const result = await db.query(`SELECT COUNT(*) as count FROM words WHERE user_id = $1 AND ${boxMode} = $2`, [userId, box]);
        const total = Number(result.rows[0].count);
        const restResult = await db.query(`SELECT COUNT(*) as count FROM words WHERE user_id = $1 AND ${boxMode} = $2 AND ($3 - date >= ${daysLimit})`, [userId, box, dateNow]);
        const rest = Number(restResult.rows[0].count);

        return { success: true, rest: rest, total: total };
    } catch (error) {
        console.error("Error fetching box count:", error);
        return { success: false, error: "Failed to fetch box count" };
    }
}

export async function getTotalWordsCount(userId: number) {
    try {
        const result = await db.query(`SELECT COUNT(*) as count FROM words WHERE user_id = $1`, [userId]);
        const total = Number(result.rows[0].count);
        return { success: true, total: total };
    } catch (error) {
        console.error("Error fetching total words count:", error);
        return { success: false, error: "Failed to fetch total words count" };
    }
}