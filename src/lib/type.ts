export type Tense = 'presente' | 'imperfetto' | 'passato prossimo' | 'futuro' | 'trapassato prossimo' | 'passato remoto' | 'trapassato remoto' | 'futuro anteriore' | 'passato' | 'trapassato';
export type Mode = 'indicativo' | 'congiuntivo' | 'condizionale' | 'imperativo' | 'gerundio' | 'participio';

export type ConjugatedVerb = {
    infinitive: string;
    tense: Tense;
    mode: Mode;
    conjugation: string[];
}

export type Verb = {
    infinitive: string;
    conjugations: ConjugatedVerb[];
}

export function modeToPronouns(mode: Mode): string[] {
    switch (mode) {
        case 'imperativo':
            return ['tu', 'Lei', 'noi', 'voi', 'loro'];
        case 'gerundio':
        case 'participio':
            return ['']
        default:
            return ['io', 'tu', 'lui/lei', 'noi', 'voi', 'loro'];
    }
}