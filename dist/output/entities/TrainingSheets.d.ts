import { TrainingDays } from './TrainingDays';
export declare class TrainingSheets {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    publicName: string | null;
    slug: string | null;
    offlinePdf: string | null;
    newTabPdf: string | null;
    pdfPath: string | null;
    trainingDays: TrainingDays[];
}
