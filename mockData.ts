import { 
  Module, 
  ModuleType, 
  Lesson, 
  Flashcard, 
  FlashcardStatus, 
  QuizQuestion, 
  GlossaryEntry,
  UserSettings,
  DifficultyLevel
} from './types';

// Mock-Daten für die initiale App-Befüllung

// Benutzereinstellungen (Default)
export const defaultUserSettings: UserSettings = {
  username: 'Student',
  studyProgram: 'Biologie',
  semester: 1,
  difficultyLevel: DifficultyLevel.BASIC,
  darkMode: false,
};

// Module
export const modules: Module[] = [
  {
    id: 'genetics',
    type: ModuleType.GENETICS,
    title: 'Genetik',
    description: 'Grundlagen der Vererbungslehre, DNA-Struktur und Genexpression',
    iconName: 'dna',
    lessons: []
  },
  {
    id: 'cell-biology',
    type: ModuleType.CELL_BIOLOGY,
    title: 'Zellbiologie',
    description: 'Aufbau und Funktion eukaryotischer und prokaryotischer Zellen',
    iconName: 'cell',
    lessons: []
  },
  {
    id: 'biochemistry',
    type: ModuleType.BIOCHEMISTRY,
    title: 'Biochemie',
    description: 'Stoffwechselwege, Enzyme und biologische Makromoleküle',
    iconName: 'flask',
    lessons: []
  },
  {
    id: 'botany',
    type: ModuleType.BOTANY,
    title: 'Botanik',
    description: 'Pflanzenanatomie, Physiologie und Systematik',
    iconName: 'leaf',
    lessons: []
  },
  {
    id: 'microbiology',
    type: ModuleType.MICROBIOLOGY,
    title: 'Mikrobiologie',
    description: 'Bakterien, Viren und andere Mikroorganismen',
    iconName: 'bacteria',
    lessons: []
  },
  {
    id: 'ecology',
    type: ModuleType.ECOLOGY,
    title: 'Ökologie',
    description: 'Ökosysteme, Populationen und Umweltfaktoren',
    iconName: 'globe',
    lessons: []
  }
];

// Lektionen für Genetik
export const geneticsLessons: Lesson[] = [
  {
    id: 'genetics-dna',
    moduleId: 'genetics',
    title: 'DNA-Struktur und Replikation',
    description: 'Aufbau der DNA und Mechanismen der Replikation',
    content: `
# DNA-Struktur und Replikation

Die DNA (Desoxyribonukleinsäure) ist der Träger der genetischen Information in allen Lebewesen. Sie besteht aus zwei komplementären Strängen, die eine Doppelhelix bilden.

## Aufbau der DNA
- Nukleotide als Grundbausteine (Phosphat, Desoxyribose, Stickstoffbase)
- Vier Basen: Adenin (A), Thymin (T), Guanin (G), Cytosin (C)
- Komplementäre Basenpaarung: A-T, G-C
- 3'- und 5'-Ende der DNA-Stränge

## DNA-Replikation
- Semikonservative Replikation
- Replikationsgabel und Helicase
- Leading Strand und Lagging Strand
- Okazaki-Fragmente
- DNA-Polymerase und Primase
    `,
    order: 1
  },
  {
    id: 'genetics-transcription',
    moduleId: 'genetics',
    title: 'Transkription',
    description: 'Prozess der RNA-Synthese aus DNA',
    content: `
# Transkription

Die Transkription ist der erste Schritt der Genexpression, bei dem die genetische Information von der DNA auf die RNA übertragen wird.

## Ablauf der Transkription
- Initiation: RNA-Polymerase bindet an Promotor
- Elongation: RNA-Synthese in 5'→3'-Richtung
- Termination: Ende der RNA-Synthese

## Besonderheiten bei Eukaryoten
- RNA-Processing
- Spleißen von Introns
- Capping und Polyadenylierung
    `,
    order: 2
  },
  {
    id: 'genetics-translation',
    moduleId: 'genetics',
    title: 'Translation',
    description: 'Proteinsynthese anhand der mRNA',
    content: `
# Translation

Die Translation ist der Prozess der Proteinsynthese, bei dem die genetische Information der mRNA in eine Aminosäuresequenz übersetzt wird.

## Ablauf der Translation
- Initiation: Bildung des Initiationskomplexes
- Elongation: Peptidkettenverlängerung
- Termination: Ende der Proteinsynthese

## Genetischer Code
- Tripletts (Codons)
- Universalität des genetischen Codes
- Degeneriertheit des Codes
    `,
    order: 3
  },
  {
    id: 'genetics-mutations',
    moduleId: 'genetics',
    title: 'Mutationen',
    description: 'Arten und Auswirkungen von Genveränderungen',
    content: `
# Mutationen

Mutationen sind Veränderungen in der DNA-Sequenz, die spontan auftreten oder durch Mutagene induziert werden können.

## Arten von Mutationen
- Punktmutationen (Substitution, Insertion, Deletion)
- Chromosomenmutationen
- Genommutationen

## Auswirkungen von Mutationen
- Stille Mutationen
- Missense-Mutationen
- Nonsense-Mutationen
- Frameshift-Mutationen
    `,
    order: 4
  },
  {
    id: 'genetics-inheritance',
    moduleId: 'genetics',
    title: 'Vererbungslehre',
    description: 'Mendelsche Regeln und Vererbungsmuster',
    content: `
# Vererbungslehre

Die Vererbungslehre beschäftigt sich mit der Weitergabe genetischer Merkmale von einer Generation zur nächsten.

## Mendelsche Regeln
- Uniformitätsregel
- Spaltungsregel
- Unabhängigkeitsregel

## Vererbungsmuster
- Dominante und rezessive Vererbung
- Kodominanz und unvollständige Dominanz
- Geschlechtsgebundene Vererbung
    `,
    order: 5
  }
];

// Lektionen für Zellbiologie
export const cellBiologyLessons: Lesson[] = [
  {
    id: 'cell-biology-structure',
    moduleId: 'cell-biology',
    title: 'Zellstruktur',
    description: 'Aufbau und Komponenten eukaryotischer Zellen',
    content: `
# Zellstruktur

Die eukaryotische Zelle ist durch membranumschlossene Kompartimente gekennzeichnet, die verschiedene Funktionen erfüllen.

## Zellmembran
- Phospholipid-Doppelschicht
- Membranproteine und ihre Funktionen
- Fluidität und Selektivität

## Zellorganellen
- Zellkern und Kernmembran
- Endoplasmatisches Retikulum
- Golgi-Apparat
- Mitochondrien
- Lysosomen und Peroxisomen
    `,
    order: 1
  },
  {
    id: 'cell-biology-membrane',
    moduleId: 'cell-biology',
    title: 'Membrantransport',
    description: 'Transportmechanismen über Zellmembranen',
    content: `
# Membrantransport

Der Transport von Molekülen über die Zellmembran ist essentiell für die Zellhomöostase und Kommunikation.

## Passive Transportmechanismen
- Einfache Diffusion
- Erleichterte Diffusion
- Osmose

## Aktive Transportmechanismen
- Primär aktiver Transport (ATP-abhängig)
- Sekundär aktiver Transport
- Endozytose und Exozytose
    `,
    order: 2
  },
  {
    id: 'cell-biology-cytoskeleton',
    moduleId: 'cell-biology',
    title: 'Zytoskelett',
    description: 'Struktur und Funktion des Zytoskeletts',
    content: `
# Zytoskelett

Das Zytoskelett gibt der Zelle Struktur, ermöglicht Bewegung und ist an intrazellulären Transportprozessen beteiligt.

## Komponenten des Zytoskeletts
- Mikrofilamente (Aktinfilamente)
- Intermediärfilamente
- Mikrotubuli

## Funktionen des Zytoskeletts
- Zellform und mechanische Stabilität
- Zellbewegung und Migration
- Intrazellulärer Transport
- Zellteilung
    `,
    order: 3
  },
  {
    id: 'cell-biology-division',
    moduleId: 'cell-biology',
    title: 'Zellteilung',
    description: 'Mitose, Meiose und Zellzyklus',
    content: `
# Zellteilung

Die Zellteilung ist ein fundamentaler Prozess für Wachstum, Entwicklung und Fortpflanzung.

## Zellzyklus
- G1-, S-, G2- und M-Phase
- Zellzyklusregulation und Checkpoints

## Mitose
- Prophase, Metaphase, Anaphase, Telophase
- Chromosomensegregation
- Zytokinese

## Meiose
- Reduktion des Chromosomensatzes
- Crossing-over und genetische Rekombination
- Unterschiede zur Mitose
    `,
    order: 4
  },
  {
    id: 'cell-biology-communication',
    moduleId: 'cell-biology',
    title: 'Zellkommunikation',
    description: 'Signalübertragung zwischen Zellen',
    content: `
# Zellkommunikation

Die Kommunikation zwischen Zellen ist essentiell für die Koordination zellulärer Aktivitäten in mehrzelligen Organismen.

## Signalübertragungswege
- Direkte Zell-Zell-Kommunikation (Gap Junctions)
- Parakrine und autokrine Signalübertragung
- Endokrine Signalübertragung

## Signaltransduktion
- Rezeptortypen (membranständig, intrazellulär)
- Second Messenger
- Signalkaskaden
    `,
    order: 5
  }
];

// Karteikarten für Genetik
export const geneticsFlashcards: Flashcard[] = [
  {
    id: 'flashcard-genetics-1',
    moduleId: 'genetics',
    lessonId: 'genetics-dna',
    question: 'Aus welchen drei Komponenten besteht ein Nukleotid?',
    answer: 'Ein Nukleotid besteht aus einem Phosphatrest, einem Zucker (Desoxyribose in DNA) und einer Stickstoffbase (A, T, G oder C).',
    status: FlashcardStatus.NEW,
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'flashcard-genetics-2',
    moduleId: 'genetics',
    lessonId: 'genetics-dna',
    question: 'Welche komplementären Basenpaarungen kommen in der DNA vor?',
    answer: 'In der DNA paart sich Adenin (A) mit Thymin (T) und Guanin (G) mit Cytosin (C).',
    status: FlashcardStatus.NEW,
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'flashcard-genetics-3',
    moduleId: 'genetics',
    lessonId: 'genetics-transcription',
    question: 'Was ist der Unterschied zwischen DNA und RNA bezüglich der Basen?',
    answer: 'RNA enthält Uracil (U) anstelle von Thymin (T), das in der DNA vorkommt. Die anderen Basen (A, G, C) sind in beiden Nukleinsäuren gleich.',
    status: FlashcardStatus.NEW,
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'flashcard-genetics-4',
    moduleId: 'genetics',
    lessonId: 'genetics-translation',
    question: 'Was ist ein Codon und wie viele Nukleotide umfasst es?',
    answer: 'Ein Codon ist eine Sequenz von drei aufeinanderfolgenden Nukleotiden in der mRNA, die für eine bestimmte Aminosäure oder ein Stopp-Signal codiert.',
    status: FlashcardStatus.NEW,
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'flashcard-genetics-5',
    moduleId: 'genetics',
    lessonId: 'genetics-mutations',
    question: 'Was ist eine Frameshift-Mutation und welche Auswirkungen hat sie?',
    answer: 'Eine Frameshift-Mutation entsteht durch Insertion oder Deletion von Nukleotiden, deren Anzahl nicht durch drei teilbar ist. Dies führt zu einer Verschiebung des Leserasters und verändert alle nachfolgenden Codons, was meist zu einem nicht-funktionalen Protein führt.',
    status: FlashcardStatus.NEW,
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5
  }
];

// Karteikarten für Zellbiologie
export const cellBiologyFlashcards: Flashcard[] = [
  {
    id: 'flashcard-cell-1',
    moduleId: 'cell-biology',
    lessonId: 'cell-biology-structure',
    question: 'Was sind die Hauptkomponenten der Zellmembran?',
    answer: 'Die Zellmembran besteht hauptsächlich aus einer Phospholipid-Doppelschicht mit eingelagerten Proteinen, Cholesterin und Glykoproteinen.',
    status: FlashcardStatus.NEW,
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'flashcard-cell-2',
    moduleId: 'cell-biology',
    lessonId: 'cell-biology-structure',
    question: 'Welche Funktion haben Mitochondrien in der Zelle?',
    answer: 'Mitochondrien sind die "Kraftwerke" der Zelle und produzieren durch oxidative Phosphorylierung ATP, die Hauptenergiequelle für zelluläre Prozesse.',
    status: FlashcardStatus.NEW,
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'flashcard-cell-3',
    moduleId: 'cell-biology',
    lessonId: 'cell-biology-membrane',
    question: 'Was ist der Unterschied zwischen passivem und aktivem Transport?',
    answer: 'Passiver Transport erfolgt ohne Energieverbrauch entlang eines Konzentrationsgradienten (z.B. Diffusion), während aktiver Transport Energie (meist ATP) benötigt, um Moleküle gegen einen Konzentrationsgradienten zu transportieren.',
    status: FlashcardStatus.NEW,
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'flashcard-cell-4',
    moduleId: 'cell-biology',
    lessonId: 'cell-biology-cytoskeleton',
    question: 'Aus welchen drei Hauptkomponenten besteht das Zytoskelett?',
    answer: 'Das Zytoskelett besteht aus Mikrofilamenten (Aktinfilamenten), Intermediärfilamenten und Mikrotubuli.',
    status: FlashcardStatus.NEW,
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5
  },
  {
    id: 'flashcard-cell-5',
    moduleId: 'cell-biology',
    lessonId: 'cell-biology-division',
    question: 'Was ist der Hauptunterschied zwischen Mitose und Meiose?',
    answer: 'Die Mitose erzeugt zwei genetisch identische diploide Tochterzellen, während die Meiose vier genetisch unterschiedliche haploide Zellen produziert. Die Meiose ist für die sexuelle Fortpflanzung wichtig, die Mitose für Wachstum und Regeneration.',
    status: FlashcardStatus.NEW,
    lastReviewed: null,
    nextReview: null,
    repetitions: 0,
    easeFactor: 2.5
  }
];

// Quiz-Fragen für Genetik
export const geneticsQuizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-genetics-1',
    moduleId: 'genetics',
    lessonId: 'genetics-dna',
    question: 'Welche Aussage zur DNA-Struktur ist korrekt?',
    options: [
      'DNA besteht aus einer Einzelstrang-Helix',
      'In der DNA paart sich Adenin mit Guanin',
      'Die DNA-Doppelhelix ist rechtsgängig',
      'DNA enthält den Zucker Ribose'
    ],
    correctOptionIndex: 2,
    explanation: 'Die DNA-Doppelhelix ist rechtsgängig. Sie besteht aus zwei komplementären Strängen, wobei sich Adenin mit Thymin und Guanin mit Cytosin paart. Der Zucker in der DNA ist Desoxyribose, nicht Ribose.'
  },
  {
    id: 'quiz-genetics-2',
    moduleId: 'genetics',
    lessonId: 'genetics-transcription',
    question: 'Was ist das Produkt der Transkription?',
    options: [
      'DNA',
      'RNA',
      'Protein',
      'Aminosäuren'
    ],
    correctOptionIndex: 1,
    explanation: 'Das Produkt der Transkription ist RNA. Während der Transkription wird die genetische Information von der DNA auf die RNA übertragen.'
  },
  {
    id: 'quiz-genetics-3',
    moduleId: 'genetics',
    lessonId: 'genetics-translation',
    question: 'Wo findet die Translation in eukaryotischen Zellen statt?',
    options: [
      'Im Zellkern',
      'In den Mitochondrien',
      'Im Zytoplasma an Ribosomen',
      'Im Golgi-Apparat'
    ],
    correctOptionIndex: 2,
    explanation: 'Die Translation findet im Zytoplasma an Ribosomen statt. Ribosomen sind die Orte der Proteinsynthese, wo die genetische Information der mRNA in eine Aminosäuresequenz übersetzt wird.'
  },
  {
    id: 'quiz-genetics-4',
    moduleId: 'genetics',
    lessonId: 'genetics-mutations',
    question: 'Welche Art von Mutation führt zu einer Verschiebung des Leserasters?',
    options: [
      'Stille Mutation',
      'Missense-Mutation',
      'Frameshift-Mutation',
      'Nonsense-Mutation'
    ],
    correctOptionIndex: 2,
    explanation: 'Eine Frameshift-Mutation führt zu einer Verschiebung des Leserasters. Sie entsteht durch Insertion oder Deletion von Nukleotiden, deren Anzahl nicht durch drei teilbar ist.'
  },
  {
    id: 'quiz-genetics-5',
    moduleId: 'genetics',
    lessonId: 'genetics-inheritance',
    question: 'Was besagt die Spaltungsregel (2. Mendelsche Regel)?',
    options: [
      'Alle Nachkommen der F1-Generation sind phänotypisch gleich',
      'In der F2-Generation spalten sich die Merkmale im Verhältnis 3:1 auf',
      'Verschiedene Merkmale werden unabhängig voneinander vererbt',
      'Rezessive Merkmale werden nie exprimiert'
    ],
    correctOptionIndex: 1,
    explanation: 'Die Spaltungsregel (2. Mendelsche Regel) besagt, dass sich in der F2-Generation die Merkmale im Verhältnis 3:1 aufspalten. Bei der Kreuzung zweier heterozygoter Individuen (Aa × Aa) entstehen Nachkommen im Verhältnis 1 AA : 2 Aa : 1 aa, was phänotypisch einem Verhältnis von 3:1 entspricht.'
  }
];

// Quiz-Fragen für Zellbiologie
export const cellBiologyQuizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-cell-1',
    moduleId: 'cell-biology',
    lessonId: 'cell-biology-structure',
    question: 'Welches Organell wird als "Kraftwerk der Zelle" bezeichnet?',
    options: [
      'Golgi-Apparat',
      'Endoplasmatisches Retikulum',
      'Mitochondrium',
      'Lysosom'
    ],
    correctOptionIndex: 2,
    explanation: 'Mitochondrien werden als "Kraftwerke der Zelle" bezeichnet, da sie durch oxidative Phosphorylierung ATP produzieren, die Hauptenergiequelle für zelluläre Prozesse.'
  },
  {
    id: 'quiz-cell-2',
    moduleId: 'cell-biology',
    lessonId: 'cell-biology-membrane',
    question: 'Welcher Prozess benötigt keinen direkten Energieverbrauch?',
    options: [
      'Aktiver Transport',
      'Osmose',
      'Endozytose',
      'Exozytose'
    ],
    correctOptionIndex: 1,
    explanation: 'Osmose ist ein passiver Transportprozess, der keinen direkten Energieverbrauch (ATP) benötigt. Es handelt sich um die Diffusion von Wassermolekülen durch eine semipermeable Membran entlang eines Konzentrationsgradienten.'
  },
  {
    id: 'quiz-cell-3',
    moduleId: 'cell-biology',
    lessonId: 'cell-biology-cytoskeleton',
    question: 'Welche Komponente des Zytoskeletts ist an der Muskelkontraktion beteiligt?',
    options: [
      'Mikrotubuli',
      'Intermediärfilamente',
      'Aktinfilamente',
      'Zentrosomen'
    ],
    correctOptionIndex: 2,
    explanation: 'Aktinfilamente (Mikrofilamente) sind an der Muskelkontraktion beteiligt. In Muskelzellen interagieren Aktinfilamente mit Myosinfilamenten, um die Kontraktion zu ermöglichen.'
  },
  {
    id: 'quiz-cell-4',
    moduleId: 'cell-biology',
    lessonId: 'cell-biology-division',
    question: 'In welcher Phase des Zellzyklus findet die DNA-Replikation statt?',
    options: [
      'G1-Phase',
      'S-Phase',
      'G2-Phase',
      'M-Phase'
    ],
    correctOptionIndex: 1,
    explanation: 'Die DNA-Replikation findet in der S-Phase (Synthese-Phase) des Zellzyklus statt. In dieser Phase wird die DNA verdoppelt, damit jede Tochterzelle nach der Zellteilung einen vollständigen Chromosomensatz erhält.'
  },
  {
    id: 'quiz-cell-5',
    moduleId: 'cell-biology',
    lessonId: 'cell-biology-communication',
    question: 'Was sind Second Messenger?',
    options: [
      'Proteine, die Signale zwischen Zellen übertragen',
      'Intrazelluläre Signalmoleküle, die nach Aktivierung eines Rezeptors freigesetzt werden',
      'Hormone, die über das Blut transportiert werden',
      'Neurotransmitter an chemischen Synapsen'
    ],
    correctOptionIndex: 1,
    explanation: 'Second Messenger sind intrazelluläre Signalmoleküle, die nach Aktivierung eines Rezeptors durch einen primären Botenstoff (First Messenger) freigesetzt werden. Sie verstärken und verbreiten das Signal innerhalb der Zelle. Beispiele sind cAMP, cGMP, IP3 und Calcium-Ionen.'
  }
];

// Glossar-Einträge
export const glossaryEntries: GlossaryEntry[] = [
  {
    id: 'glossary-dna',
    term: 'DNA',
    definition: 'Desoxyribonukleinsäure (DNA) ist ein Makromolekül, das die genetische Information trägt und aus zwei komplementären Nukleotidsträngen besteht, die eine Doppelhelix bilden.',
    moduleTypes: [ModuleType.GENETICS, ModuleType.CELL_BIOLOGY, ModuleType.BIOCHEMISTRY],
    relatedTerms: ['glossary-rna', 'glossary-nucleotide', 'glossary-gene']
  },
  {
    id: 'glossary-rna',
    term: 'RNA',
    definition: 'Ribonukleinsäure (RNA) ist ein einzelsträngiges Nukleinsäuremolekül, das eine wichtige Rolle bei der Proteinbiosynthese spielt. Im Gegensatz zur DNA enthält RNA den Zucker Ribose und die Base Uracil anstelle von Thymin.',
    moduleTypes: [ModuleType.GENETICS, ModuleType.BIOCHEMISTRY],
    relatedTerms: ['glossary-dna', 'glossary-transcription', 'glossary-translation']
  },
  {
    id: 'glossary-cell',
    term: 'Zelle',
    definition: 'Die Zelle ist die kleinste strukturelle und funktionelle Einheit aller Lebewesen. Eukaryotische Zellen besitzen einen Zellkern und verschiedene Organellen, während prokaryotische Zellen keinen echten Zellkern haben.',
    moduleTypes: [ModuleType.CELL_BIOLOGY, ModuleType.MICROBIOLOGY],
    relatedTerms: ['glossary-organelle', 'glossary-nucleus', 'glossary-membrane']
  },
  {
    id: 'glossary-mitochondria',
    term: 'Mitochondrien',
    definition: 'Mitochondrien sind Zellorganellen, die für die Energieproduktion durch oxidative Phosphorylierung verantwortlich sind. Sie besitzen eine eigene DNA und werden daher als semiautonome Organellen betrachtet.',
    moduleTypes: [ModuleType.CELL_BIOLOGY, ModuleType.BIOCHEMISTRY],
    relatedTerms: ['glossary-cell', 'glossary-atp', 'glossary-organelle']
  },
  {
    id: 'glossary-enzyme',
    term: 'Enzym',
    definition: 'Enzyme sind biologische Katalysatoren, meist Proteine, die biochemische Reaktionen beschleunigen, indem sie die Aktivierungsenergie herabsetzen, ohne selbst verbraucht zu werden.',
    moduleTypes: [ModuleType.BIOCHEMISTRY, ModuleType.CELL_BIOLOGY],
    relatedTerms: ['glossary-protein', 'glossary-metabolism', 'glossary-substrate']
  },
  {
    id: 'glossary-photosynthesis',
    term: 'Photosynthese',
    definition: 'Photosynthese ist ein biochemischer Prozess, bei dem Pflanzen, Algen und bestimmte Bakterien mithilfe von Lichtenergie aus Kohlendioxid und Wasser organische Verbindungen (Glucose) und Sauerstoff produzieren.',
    moduleTypes: [ModuleType.BOTANY, ModuleType.BIOCHEMISTRY, ModuleType.ECOLOGY],
    relatedTerms: ['glossary-chloroplast', 'glossary-chlorophyll', 'glossary-calvin-cycle']
  },
  {
    id: 'glossary-ecosystem',
    term: 'Ökosystem',
    definition: 'Ein Ökosystem umfasst alle lebenden Organismen (Biozönose) in einem bestimmten Gebiet sowie deren physikalische Umgebung (Biotop), mit der sie in Wechselwirkung stehen.',
    moduleTypes: [ModuleType.ECOLOGY],
    relatedTerms: ['glossary-biome', 'glossary-food-chain', 'glossary-biodiversity']
  },
  {
    id: 'glossary-bacteria',
    term: 'Bakterien',
    definition: 'Bakterien sind einzellige Mikroorganismen ohne echten Zellkern (Prokaryoten). Sie kommen in nahezu allen Lebensräumen vor und spielen wichtige Rollen in Ökosystemen, in der menschlichen Gesundheit und in biotechnologischen Anwendungen.',
    moduleTypes: [ModuleType.MICROBIOLOGY, ModuleType.ECOLOGY],
    relatedTerms: ['glossary-prokaryote', 'glossary-microorganism', 'glossary-cell-wall']
  },
  {
    id: 'glossary-gene',
    term: 'Gen',
    definition: 'Ein Gen ist ein Abschnitt der DNA, der die Information für die Synthese eines funktionellen Genprodukts, meist ein Protein oder eine RNA, enthält.',
    moduleTypes: [ModuleType.GENETICS, ModuleType.CELL_BIOLOGY],
    relatedTerms: ['glossary-dna', 'glossary-chromosome', 'glossary-allele']
  },
  {
    id: 'glossary-mutation',
    term: 'Mutation',
    definition: 'Eine Mutation ist eine dauerhafte Veränderung des genetischen Materials (DNA oder RNA), die spontan auftreten oder durch Mutagene induziert werden kann.',
    moduleTypes: [ModuleType.GENETICS, ModuleType.CELL_BIOLOGY],
    relatedTerms: ['glossary-dna', 'glossary-gene', 'glossary-evolution']
  }
];

// Zusammenführen der Daten
export const allLessons = [...geneticsLessons, ...cellBiologyLessons];
export const allFlashcards = [...geneticsFlashcards, ...cellBiologyFlashcards];
export const allQuizQuestions = [...geneticsQuizQuestions, ...cellBiologyQuizQuestions];

// Aktualisieren der Module mit den entsprechenden Lektionen
export const updatedModules = modules.map(module => {
  if (module.id === 'genetics') {
    return { ...module, lessons: geneticsLessons };
  } else if (module.id === 'cell-biology') {
    return { ...module, lessons: cellBiologyLessons };
  }
  return module;
});
