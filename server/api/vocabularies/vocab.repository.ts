import { IVocab } from "~/interfaces/IVocab";
import { Vocabulary } from "./vocab.model";

export const getAllVocab = async (): Promise<IVocab[]> => {
    try {
        const vocabularies = await Vocabulary.find({});
        const vocab = await Vocabulary.findOne({ japanese: 'わたし' });

        console.log("Vocabularies found:", vocab);
        return vocabularies;
    } catch (error) {
        console.error("Error fetching vocabularies:", error);
        throw new Error("Error fetching vocabularies");
    }
};
