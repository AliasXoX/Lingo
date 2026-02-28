'use server';

import { db } from "@/lib/db"
import { ConjugatedVerb, Mode, Tense, Verb } from "@/lib/type";

type SubmitAnswerState = {
    success: boolean;
    correct: boolean;
    error?: undefined;
} | {
    success: boolean;
    error: string;
    correct?: undefined;
} | null;

export async function getVerbTense(userId: number, infinitive: string, mode: string, tense: string) {
    try {
        const result = await db.query(`SELECT * FROM verbs WHERE user_id = $1 AND infinitive = $2 AND mode = $3 AND tense = $4`, [userId, infinitive, mode, tense]);
        if (result.rows.length > 0) {
            return { success: true, verb: result.rows[0] };
        } else {
            return { success: false, error: "Verb not found" };
        }
    } catch (error) {
        console.error("Error fetching verb:", error);
        return { success: false, error: "Failed to fetch verb" };
    }
}

export async function submitAnswer(
    userId: number,
    infinitive: string,
    mode: string,
    tense: string,
    update: boolean,
    prevState: SubmitAnswerState,
    formData: FormData
) {
    const size = Array.from(formData.keys()).length;
    const answers = Array.from({ length: size }, (_, i) => (formData.get(`conjugation-${i}`) as string).toLowerCase());

    try {
        const result = await getVerbTense(userId, infinitive, mode, tense);
        if (result.success) {
            const verb = result.verb;
            const correctAnswers = verb['conjugation'] as string[];
            const isCorrect = answers.every((answer, index) => answer === correctAnswers[index].toLowerCase());

            if (isCorrect) {
                if (update) {
                    await upgradeBox(userId, infinitive, mode, tense);
                }
                return { success: true, correct: true };
            } else {
                return { success: true, correct: false };
            }
        }
        else {
            if (update) {
                await downgradeBox(userId, infinitive, mode, tense);
            }
            return { success: false, error: result.error || "Unknown error" };
        }
    } catch (error) {
        console.error("Error checking answer:", error);
        return { success: false, error: "Failed to check answer" };
    }
}

export async function addVerb(userId: number, formData: FormData) {
    const infinitive = (formData.get("infinitive") as string).toLowerCase();
    const mode = (formData.get("mode") as string).toLowerCase();
    const tense = (formData.get("tense") as string).toLowerCase();
    const size = Array.from(formData.keys()).length - 3; // Subtracting the keys for infinitive, mode and tense
    const conjugation = Array.from({ length: size }, (_, i) => (formData.get(`conjugation-${i}`) as string).toLowerCase());

    const dateNow = new Date();

    try {
        await db.query(`INSERT INTO verbs (user_id, infinitive, mode, tense, conjugation, box, date) VALUES ($1, $2, $3, $4, $5, 0, $6) ON CONFLICT (user_id, infinitive, mode, tense) DO NOTHING`, [userId, infinitive, mode, tense, conjugation, dateNow]);
        return { success: true };
    } catch (error) {
        console.error("Error adding verb:", error);
        return { success: false, error: "Failed to add verb" };
    }
}

export async function deleteVerb(userId: number, infinitive: string, mode: string, tense: string) {
    try {
        await db.query(`DELETE FROM verbs WHERE user_id = $1 AND infinitive = $2 AND mode = $3 AND tense = $4`, [userId, infinitive, mode, tense]);
        return { success: true };
    } catch (error) {
        console.error("Error deleting verb:", error);
        return { success: false, error: "Failed to delete verb" };
    }
}

export async function editVerb(userId: number, formData: FormData) {
    const infinitive = (formData.get("infinitive") as string).toLowerCase();
    const mode = (formData.get("mode") as string).toLowerCase();
    const tense = (formData.get("tense") as string).toLowerCase();
    const size = Array.from(formData.keys()).length - 3; // Subtracting the keys for infinitive, mode and tense
    const newConjugation = Array.from({ length: size }, (_, i) => (formData.get(`conjugation-${i}`) as string).toLowerCase());

    try {
        const response = await db.query(`UPDATE verbs SET conjugation = $1 WHERE user_id = $2 AND infinitive = $3 AND mode = $4 AND tense = $5`, [newConjugation, userId, infinitive, mode, tense]);
        console.error("Edit verb response:", infinitive);
        return { success: true };
    } catch (error) {
        console.error("Error editing verb:", error);
        return { success: false, error: "Failed to edit verb" };
    }
}

export async function getVerb(userId: number, infinitive: string) {
    try {
        const result = await db.query(`SELECT * FROM verbs WHERE user_id = $1 AND infinitive = $2`, [userId, infinitive]);
        if (result.rows.length > 0) {
            return { success: true, verb: result.rows };
        } else {
            return { success: false, error: "Verb not found" };
        }
    } catch (error) {
        console.error("Error fetching verb:", error);
        return { success: false, error: "Failed to fetch verb" };
    }
}

export async function getVerbsByOrder(userId: number, offset: number = 0, limit: number = 10) {
    try {
        const result = await db.query(
            `SELECT infinitive, json_agg(json_build_object('mode', mode, 'tense', tense, 'conjugation', conjugation)) AS conjugations
             FROM verbs
             WHERE user_id = $1
             GROUP BY infinitive
             ORDER BY infinitive ASC
             OFFSET $2
             LIMIT $3`
        , [userId, offset, limit]);

        const verbs = result.rows.map((row) => {
            const infinitive = row.infinitive as string;
            const conjugations = row.conjugations.map((conj: { mode: string; tense: string; conjugation: string[] }) => ({
                infinitive: infinitive,
                mode: conj.mode as Mode,
                tense: conj.tense as Tense,
                conjugation: conj.conjugation as string[]
            })) as ConjugatedVerb[];
            return {
                infinitive,
                conjugations
            } as Verb;
        }).flat();

        if (result.rows.length > 0) {
            return { success: true, verbs: verbs };
        }
        else {
            return { success: false, error: "No verbs found" };
        }
    }
    catch (error) {
        console.error("Error fetching verbs:", error);
        return { success: false, error: "Failed to fetch verbs" };
    }
}

export async function getTotalVerbsCount(userId: number) {
    try {
        const result = await db.query(`SELECT COUNT(DISTINCT infinitive) AS count FROM verbs WHERE user_id = $1`, [userId]);
        return { success: true, total: result.rows[0].count };
    } catch (error) {
        console.error("Error fetching verbs count:", error);
        return { success: false, error: "Failed to fetch verbs count" };
    }
}

export async function getNextVerb(userId: number, box: number) {
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
        const result = await db.query(`SELECT * FROM verbs WHERE user_id = $1 AND box = $2 AND ($3 - date >= ${daysLimit}) ORDER BY RANDOM() LIMIT 1`, [userId, box, dateNow]);
        if (result.rows.length === 0) {
            return { success: true, verb: null };
        }
        const row = result.rows[0];
        const infinitive = row.infinitive as string;
        const mode = row.mode as Mode;
        const tense = row.tense as Tense;

        return { success: true, verb: { infinitive: infinitive, mode: mode, tense: tense } };
    }
    catch (error) {
        console.error("Error fetching next verb:", error);
        return { success: false, error: "Failed to fetch next verb" };
    }

}

export async function getBoxCount(userId: number, box: number) {
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
        const result = await db.query(`SELECT COUNT(*) as count FROM verbs WHERE user_id = $1 AND box = $2`, [userId, box]);
        const total = Number(result.rows[0].count);
        const restResult = await db.query(`SELECT COUNT(*) as count FROM verbs WHERE user_id = $1 AND box = $2 AND ($3 - date >= ${daysLimit})`, [userId, box, dateNow]);
        const rest = Number(restResult.rows[0].count);
        return { success: true, rest: rest, total };
    } catch (error) {
        console.error("Error fetching box count:", error);
        return { success: false, error: "Failed to fetch box count" };
    }
}

export async function upgradeBox(userId: number, infinitive: string, mode: string, tense: string, maxBox: number = 6) {
    const dateNow = new Date();
    try {
        await db.query(`UPDATE verbs SET box = box + 1, date = $5 WHERE user_id = $1 AND infinitive = $2 AND mode = $3 AND tense = $4 AND box < $6`, [userId, infinitive, mode, tense, dateNow, maxBox]);
        return { success: true };
    } catch (error) {
        console.error("Error upgrading box:", error);
        return { success: false, error: "Failed to upgrade box" };
    }
}

export async function downgradeBox(userId: number, infinitive: string, mode: string, tense: string, minBox: number = 0) {
    const dateNow = new Date();
    try {
        await db.query(`UPDATE verbs SET box = box - 1, date = $5 WHERE user_id = $1 AND infinitive = $2 AND mode = $3 AND tense = $4 AND box > $6`, [userId, infinitive, mode, tense, dateNow, minBox]);
        return { success: true };
    } catch (error) {
        console.error("Error downgrading box:", error);
        return { success: false, error: "Failed to downgrade box" };
    }
}