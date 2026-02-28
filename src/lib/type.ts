
export type Verb = {
    infinitive: string;
    tense: 'presente' | 'imperfetto' | 'passato prossimo' | 'futuro' | 'trapassato prossimo' | 'passato remoto' | 'trapassato remoto' | 'futuro anteriore' | 'passato' | 'trapassato';
    mode: 'indicativo' | 'congiuntivo' | 'condizionale' | 'imperativo' | 'gerundio' | 'participio';
}

export function modeToPronouns(mode: Verb['mode']): string[] {
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